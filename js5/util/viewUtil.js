"use strict";

drill.define(function () {
    // 获取单位
    var getUnit = function getUnit(val) {
        var arr = /[\d\.]+(.+)/.exec(val);
        return arr ? arr[1] : "";
    };

    var getBwPx = function getBwPx(ele) {
        var eleData = ele.eleData;


        var width = void 0;

        // 获取单位
        var wUnit = getUnit(eleData.w);

        switch (wUnit) {
            case "%":
                var mainWidth = $(ele).parent().parent().width();
                width = mainWidth * (parseFloat(eleData.w) / 100);
                break;
            case "px":
                width = parseFloat(eleData.w);
                break;
        }

        return width / 100;
    };

    var refreshView = function refreshView(ele) {
        var pageData = ele.pageData,
            eleData = ele.eleData;


        var $ele = $(ele);

        var $pele = $ele.find(".p_ele");

        if (pageData) {
            // 子元素渲染
            $ele.children().each(function (i, e) {
                refreshView(e);
            });
        } else if (eleData) {
            // 计算bw的单个px值
            var bwpx = getBwPx(ele);

            // 设置并修正各个值
            var sKeys = ["letterSpacing", "fontSize", "height", "left", "bottom"];
            ["letterSpacing", "fontSize", "h", "x", "y"].forEach(function (k, i) {
                var val = eleData[k];

                // 判断是否需要转换bw单位
                var unit = getUnit(val);

                if (unit == "bw") {
                    // 转换像素
                    val = (parseFloat(val) * bwpx).toFixed(3) + "px";
                }

                // 设置元素
                $pele.css(sKeys[i], val);
            });
        }
    };

    var util = {
        // getBwPx,
        refreshView: refreshView
    };

    return util;
});