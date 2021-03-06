"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.init(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load, _ref2) {
        var initActiveId = _ref2.initActiveId;

        var _ref3, _ref4, commonData, pageUtil, animationCSSUtil, rData, tarPage, targetPageData;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return load("common/data", "util/pageUtil", "util/animationCSSUtil", "data -r");

                    case 2:
                        _ref3 = _context.sent;
                        _ref4 = _slicedToArray(_ref3, 4);
                        commonData = _ref4[0];
                        pageUtil = _ref4[1];
                        animationCSSUtil = _ref4[2];
                        rData = _ref4[3];


                        // 添加相应的active
                        $(".p_main > .page").each(function (pageId, e) {
                            var $page = $(e);

                            if (initActiveId === pageId) {
                                $page.attr("active", 1);
                            } else {
                                $page.attr("active", 0);
                            }

                            var pageData = e.pageData;

                            // 提前设置样式
                            if (pageId == initActiveId) {
                                // 清空transform
                                $page.css(animationCSSUtil.toCSSObj(pageData.pos1_after));
                            } else if (pageId < initActiveId) {
                                $page.css(animationCSSUtil.toCSSObj(pageData.pos2_after));
                            } else {
                                $page.css(animationCSSUtil.toCSSObj(pageData.pos1));
                            }
                        });

                        // 初始化页面切换效果控件
                        _context.next = 11;
                        return load("task/h5/initPageSwiper");

                    case 11:

                        // 初始化页面元素的的动画样式
                        animationCSSUtil.initAnimation(rData.animation);

                        commonData.on("changePageStart", function (e, data) {
                            var activePage = data.activePage,
                                nextPage = data.nextPage;


                            pageUtil.clearPageAnime(nextPage);
                        });

                        commonData.on("changePageEnd", function (e, data) {
                            var activePage = data.activePage,
                                oldPage = data.oldPage;


                            pageUtil.runPageAnime(activePage);
                        });

                        // 获取初始页
                        tarPage = $(".p_main > .page").eq(initActiveId);
                        targetPageData = tarPage.prop("pageData");

                        // 根据initActiveId点火

                        _context.next = 18;
                        return targetPageData.startLoad();

                    case 18:

                        // 清空状态
                        pageUtil.clearPageAnime(tarPage);

                        // 等待200毫秒，page上的loading消失
                        _context.next = 21;
                        return new Promise(function (res) {
                            return setTimeout(function () {
                                return res();
                            }, 200);
                        });

                    case 21:

                        // 加载完成后进行初始动画
                        pageUtil.runPageAnime(tarPage);

                    case 22:
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