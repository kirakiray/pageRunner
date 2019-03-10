"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var _ref2, _ref3, commonData, animateUtil, animateCSSStr;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return load("common/data", "util/animateUtil");

                    case 2:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        commonData = _ref3[0];
                        animateUtil = _ref3[1];


                        // 添加animation style
                        animateCSSStr = animateUtil.animationToStr();

                        // 添加style

                        $('head').append("\n    <style>" + animateCSSStr + "</style>\n    ");

                        // 给pageData添加清空和进行动画的函数
                        $(".main").children().each(function (i, e) {
                            var pageData = e.pageData;


                            var $page = $(e);

                            // 清空动画
                            pageData.clearPageAnime = function () {
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
                            };

                            // 进行动画
                            pageData.runPageAnime = function () {
                                // 判断页面是否当前页，不是的话就别比比了
                                if (commonData.currentPageId != i) {
                                    return;
                                }

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
                            };
                        });

                        commonData.on("changePageStart", function (e, data) {
                            var activePage = data.activePage,
                                nextPage = data.nextPage;


                            nextPage[0].pageData.clearPageAnime();
                        });

                        commonData.on("changePageEnd", function (e, data) {
                            var activePage = data.activePage,
                                oldPage = data.oldPage;


                            activePage[0].pageData.runPageAnime();
                        });

                    case 11:
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