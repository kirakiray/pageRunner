"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.init(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load, _ref2) {
        var initActiveId = _ref2.initActiveId;

        var _ref3, _ref4, commonData, animationCSSUtil, pageUtil, rData, mainEle, pageFirst, pageData, runAnimeSetter, mEle, mTimer;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return load("common/data", "util/animationCSSUtil", "util/pageUtil", "data -r");

                    case 2:
                        _ref3 = _context.sent;
                        _ref4 = _slicedToArray(_ref3, 4);
                        commonData = _ref4[0];
                        animationCSSUtil = _ref4[1];
                        pageUtil = _ref4[2];
                        rData = _ref4[3];


                        // 初始化页面元素的的动画样式
                        animationCSSUtil.initAnimation(rData.animation);

                        // 直接开始加载第一个
                        mainEle = $(".p_main");
                        pageFirst = mainEle.children().eq(initActiveId);
                        pageData = pageFirst.prop("pageData");

                        // runnerAnime记录

                        runAnimeSetter = new Set();

                        // 添加初始那个

                        runAnimeSetter.add(initActiveId);

                        // 注册隐藏
                        commonData.on("pageLoaded", function (e, d) {
                            // 比initActiveId大的都要清除
                            if (d.pageId >= initActiveId) {
                                // 清空内元素进行动画
                                pageUtil.clearPageAnime(d.page);
                            } else {
                                runAnimeSetter.add(d.pageId);
                            }
                        });

                        // 滚动监听
                        mEle = mainEle[0];

                        // 点火第一个

                        _context.next = 18;
                        return pageData.startLoad();

                    case 18:

                        // 滚动到第一个页面的位置
                        mEle.scrollTop = mEle.offsetHeight * initActiveId;

                        // 等待300毫秒，等元素内Loading动画结束
                        _context.next = 21;
                        return new Promise(function (res) {
                            return setTimeout(res, 300);
                        });

                    case 21:

                        // 进行动画
                        pageUtil.runPageAnime(pageFirst);

                        mTimer = 0;

                        mEle.addEventListener("scroll", function (e) {
                            if (mTimer) {
                                return;
                            }
                            mTimer = 1;
                            setTimeout(function () {
                                mTimer = 0;
                            }, 200);
                            var scrollTop = mEle.scrollTop,
                                offsetWidth = mEle.offsetWidth,
                                offsetHeight = mEle.offsetHeight;

                            // 当scrollTop达到相应高度时，进行动画设定 

                            var snum = Math.floor((scrollTop + offsetHeight / 4) / offsetHeight);

                            // 判断是否存在，不存在进行动画
                            if (!runAnimeSetter.has(snum)) {
                                runAnimeSetter.add(snum);
                                pageUtil.runPageAnime(mainEle.children().eq(snum));
                            }
                        });

                    case 24:
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