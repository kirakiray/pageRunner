"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

drill.define(function () {
    // 获取单位
    var getUnit = function getUnit(val) {
        var arr = /[\d\.]+(.+)/.exec(val);
        return arr ? arr[1] : "";
    };

    var mainEle = $(".p_main");

    // 刷新视图的宽高定位
    var refreshView = function refreshView(ele) {
        var pageData = ele.pageData,
            eleData = ele.eleData;


        var $ele = $(ele);

        if (pageData) {
            // 子元素渲染
            $ele.children().each(function (i, e) {
                refreshView(e);
            });
        } else if (eleData) {
            var $pele = $ele.find(".p_ele");

            // 获取当前页的宽高
            var p_width = mainEle.width();
            var p_height = mainEle.height();

            // 计算并重新设置盒模型的值
            var w = eleData.w,
                h = eleData.h,
                hor = eleData.hor,
                ver = eleData.ver,
                x = eleData.x,
                y = eleData.y;


            var width = void 0,
                height = void 0,
                left = void 0,
                bottom = void 0;

            // 宽度单位
            var unit_w = getUnit(w);
            switch (unit_w) {
                case "px":
                    // 不用操作
                    width = parseFloat(w);
                    break;
                case "%":
                    // 转换数值
                    width = parseFloat(w) / 100 * p_width;
                    break;
            }

            // 计算bw的像素值
            var bwPx = width / 100;

            // 高度单位
            var unit_h = getUnit(h);
            switch (unit_h) {
                case "px":
                    // 不用操作
                    height = parseFloat(h);
                    break;
                case "%":
                    height = parseFloat(h) / 100 * p_height;
                    break;
                case "bw":
                    height = parseFloat(h) * bwPx;
                    break;
            }

            // 根据定位值计算x
            switch (hor) {
                case "start":
                    left = 0;
                    break;
                case "center":
                    left = (p_width - width) / 2;
                    break;
                case "end":
                    left = p_width - width;
                    break;
            }

            var unit_x = getUnit(x);
            switch (unit_x) {
                case "px":
                    left += parseFloat(x);
                    break;
                case "%":
                    left += parseFloat(x) / 100 * p_width;
                    break;
                case "bw":
                    left += parseFloat(x) * bwPx;
                    break;
            }

            // 根据定位值计算y
            switch (ver) {
                case "start":
                    bottom = p_height - height;
                    break;
                case "center":
                    bottom = (p_height - height) / 2;
                    break;
                case "end":
                    bottom = 0;
                    break;
            }

            var unit_y = getUnit(y);
            switch (unit_y) {
                case "px":
                    bottom += parseFloat(y);
                    break;
                case "%":
                    bottom += parseFloat(y) / 100 * p_height;
                    break;
                case "bw":
                    bottom += parseFloat(y) * bwPx;
                    break;
            }

            // 添加px
            width += "px";
            height += "px";
            left += "px";
            bottom += "px";

            // 设置定位
            $pele.css({
                width: width,
                height: height,
                left: left,
                bottom: bottom
            });

            // 设置并修正各个值
            [["letterSpacing", "letterSpacing"], ["fontSize", "fontSize"]].forEach(function (e) {
                var _e = _slicedToArray(e, 2),
                    skey = _e[0],
                    k = _e[1];

                var val = eleData[k];

                // 判断是否需要转换bw单位
                var unit = getUnit(val);

                if (unit == "bw") {
                    // 转换像素
                    val = (parseFloat(val) * bwPx).toFixed(3) + "px";
                }

                // 设置元素
                $pele.css(skey, val);
            });

            // 其他属性直接设置
            ["textAlign"].forEach(function (k) {
                var val = eleData[k];
                $pele.css(k, val);
            });
        }
    };

    var util = {
        // getBwPx,
        refreshView: refreshView
    };

    return util;
});