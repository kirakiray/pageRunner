"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var _ref2, _ref3, dataUtil, commonData, isRunAnime, util;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return load("util/dataUtil", "common/data");

                    case 2:
                        _ref2 = _context.sent;
                        _ref3 = _slicedToArray(_ref2, 2);
                        dataUtil = _ref3[0];
                        commonData = _ref3[1];
                        isRunAnime = 0;

                        _context.t0 = function toPage(pageId) {
                            if (isRunAnime) {
                                // 运行中就别插队
                                return;
                            }

                            // 获取激活中的页面
                            var activePage = $('.p_main .page[active="1"]');
                            var activeId = activePage.index();

                            // 获取下一页
                            var nextPage = $('.p_main .page').eq(pageId);

                            var activePageData = activePage.prop("pageData");
                            var nextPageData = nextPage.prop("pageData");

                            if (!nextPage.length || activeId == pageId) {
                                return;
                            }

                            // 下一页设置状态修正
                            nextPage.attr("active", 2);
                            nextPage.css("transform", "");
                            nextPage.css("opacity", "");

                            var transStr = void 0;
                            if (activeId > pageId) {
                                transStr = dataUtil.getTransformStr(activePageData.pos2.transform);
                                activePage.css({
                                    "transform": transStr,
                                    opacity: activePageData.pos2.opacity
                                });
                            } else {
                                transStr = dataUtil.getTransformStr(activePageData.pos1.transform);
                                activePage.css({
                                    "transform": transStr,
                                    opacity: activePageData.pos1.opacity
                                });
                            }

                            isRunAnime = 1;

                            // 触发切换页面事件
                            commonData.trigger("changePageStart", {
                                activePage: activePage,
                                activeId: activeId,
                                nextPage: nextPage,
                                nextId: pageId
                            });

                            // 计时后还原
                            setTimeout(function () {
                                isRunAnime = 0;
                                activePage.attr("active", 0);
                                nextPage.attr("active", 1);

                                // 触发切换页面事件
                                commonData.trigger("changePageEnd", {
                                    activePage: nextPage,
                                    activeId: pageId,
                                    oldPage: activePage,
                                    oldId: activeId
                                });
                            }, 500);
                        };

                        _context.t1 = function toNextPage() {
                            // 获取激活中的页面
                            var activePage = $('.p_main .page[active="1"]');

                            this.toPage(activePage.index() + 1);
                        };

                        _context.t2 = function toPrevPage() {
                            // 获取激活中的页面
                            var activePage = $('.p_main .page[active="1"]');

                            var prevIndex = activePage.index() - 1;

                            if (prevIndex >= 0) {
                                this.toPage(prevIndex);
                            }
                        };

                        util = {
                            get isRunAnime() {
                                return isRunAnime;
                            },
                            toPage: _context.t0,
                            toNextPage: _context.t1,
                            toPrevPage: _context.t2
                        };
                        return _context.abrupt("return", util);

                    case 12:
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