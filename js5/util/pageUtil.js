"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var util;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        util = {
                            // 运行页面动画
                            runPageAnime: function runPageAnime($page) {
                                // 判断页面是否当前页，不是的话就别比比了
                                // if (commonData.currentPageId != $page.index()) {
                                //     return;
                                // }

                                var childs = $page.children();
                                childs.each(function (i, e) {
                                    var ele = $(e).find(".p_ele");

                                    if (!ele.length) {
                                        return;
                                    }

                                    // 获取元素定义的数据
                                    var eleData = e.eleData;

                                    // 判断是否有animateIn

                                    if (eleData.animateIn) {
                                        // 添加动画class
                                        ele.addClass(eleData.animateIn);

                                        // 设置动画
                                        ele.css({
                                            "animation-duration": eleData.animateInTime + "s",
                                            "animation-delay": eleData.animateInDelay + "s",
                                            "animation-fill-mode": "both"
                                        });

                                        // 去掉透明度
                                        ele.css("opacity", "");
                                    }
                                });
                            },

                            // 去除页面动画元素的终结状态
                            clearPageAnime: function clearPageAnime($page) {
                                // 下一页的动画元素都先隐藏
                                var childs = $page.children();
                                childs.each(function (i, e) {
                                    var ele = $(e).find(".p_ele");

                                    if (!ele.length) {
                                        return;
                                    }

                                    // 获取元素定义的数据
                                    var eleData = e.eleData;

                                    // 判断是否有animateIn

                                    if (eleData.animateIn) {
                                        // 去除动画class
                                        ele.removeClass(eleData.animateIn);

                                        // 清空动画样式
                                        ele.css({
                                            "animation-duration": "",
                                            "animation-delay": "",
                                            "animation-fill-mode": ""
                                        });

                                        // 提前透明度
                                        ele.css("opacity", "0");
                                    }
                                });
                            }
                        };
                        return _context.abrupt("return", util);

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());