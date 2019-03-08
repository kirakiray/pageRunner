"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 渲染数据到html
drill.init(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load, d) {
        var target, data, _ref2, _ref3, getTransformStr, viewUtil, activeId, resizeTimer;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        target = d.target, data = d.data;
                        _context.next = 3;
                        return load("util/getTransformStr", "util/viewUtil");

                    case 3:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        getTransformStr = _ref3[0];
                        viewUtil = _ref3[1];


                        // 获取激活的页面id
                        activeId = "";


                        Array.from(data.mainPage).some(function (e, i) {
                            if (e.active) {
                                activeId = i;
                                return true;
                            }
                        });

                        // 填充html
                        Array.from(data.mainPage).forEach(function (p, pageId) {
                            var page = $("\n        <div class=\"page\"></div>\n        ");

                            // 填充子元素
                            Array.from(p).forEach(function (e) {
                                var ele = $("\n            <div class=\"p_ele_outer\" ver=\"" + e.ver + "\" hor=\"" + e.hor + "\">\n                <div class=\"p_text p_ele\">" + e.intext + "</div>\n            </div>");

                                // 添加元素数据
                                ele.prop("eleData", e);

                                var tarEle = ele.find(".p_ele");

                                // 设置元素宽高
                                tarEle.css("width", e.w);

                                // 添加元素
                                page.append(ele);

                                // 根据类型修正元素
                                switch (e.tag) {
                                    case "text":
                                        // 设置字体大小颜色什么的
                                        ["fontWeight", "fontStyle", "color", "lineHeight"].forEach(function (k) {
                                            e[k] && tarEle.css(k, e[k]);
                                        });
                                        break;
                                    case "pic":
                                        break;
                                }
                            });

                            // 设置样式
                            var cssObj = {};
                            ["background-color"].forEach(function (k) {
                                p[k] && (cssObj[k] = p[k]);
                            });
                            page.css(cssObj);

                            // 添加page数据
                            page.prop("pageData", p);

                            // 是否激活页面
                            if (pageId == activeId) {
                                // 清空transform
                                page.css("transform", "");
                            } else if (pageId < activeId) {
                                page.css({
                                    "transform": getTransformStr(p.pos1.transform)
                                });
                            } else {
                                page.css({
                                    "transform": getTransformStr(p.pos2.transform)
                                });
                            }
                            page.attr("active", p.active || 0);

                            // 添加page
                            target.append(page);
                        });

                        // 所有页面刷新操作
                        target.children().each(function (i, e) {
                            viewUtil.refreshView(e);
                        });

                        // 当页面大小改变时，修正元素大小
                        resizeTimer = void 0;

                        $(window).on("resize", function (e) {
                            clearTimeout(resizeTimer);
                            resizeTimer = setTimeout(function () {
                                target.children().each(function (i, e) {
                                    viewUtil.refreshView(e);
                                });
                            }, 300);
                        });

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());