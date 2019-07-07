"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.task(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(load, data) {
        var initActiveId, _ref2, _ref3, commonData, animationCSSUtil, pageUtil, rData, h5Util, mainEle, pageFirst, pageData, arrId, sarr, parentWin, runAnime;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        initActiveId = data.initActiveId;
                        _context2.next = 3;
                        return load("common/data", "util/animationCSSUtil", "util/pageUtil", "data -r");

                    case 3:
                        _ref2 = _context2.sent;
                        _ref3 = _slicedToArray(_ref2, 4);
                        commonData = _ref3[0];
                        animationCSSUtil = _ref3[1];
                        pageUtil = _ref3[2];
                        rData = _ref3[3];
                        _context2.next = 11;
                        return load("../h5/h5Util");

                    case 11:
                        h5Util = _context2.sent;


                        // 初始化页面元素的的动画样式
                        animationCSSUtil.initAnimation(rData.animation);

                        // 直接开始加载第一个
                        mainEle = $(".p_main");


                        console.log(initActiveId);

                        pageFirst = mainEle.children().eq(initActiveId);
                        pageData = pageFirst.prop("pageData");


                        commonData.on("pageLoaded", function (e, d) {
                            // 清空内元素进行动画
                            pageUtil.clearPageAnime(d.page);
                        });

                        // 点火第一个
                        // await pageData.startLoad();
                        pageData.startLoad();

                        // 计算的进行id
                        arrId = 0;

                        // 所有元素的进场序列

                        sarr = [];

                        // 添加相应的active

                        $(".p_main > .page").each(function (pageId, e) {
                            var $page = $(e);

                            if (initActiveId === pageId) {
                                $page.attr("active", 1);
                            } else {
                                $page.attr("active", 0);
                            }

                            var pageData = e.pageData;

                            // 设置arrId
                            if (initActiveId === pageId) {
                                arrId = sarr.length;
                            }

                            // 添加队列
                            sarr.push({
                                type: "page",
                                ele: e,
                                data: pageData
                            });

                            // 提前设置样式
                            if (pageId == initActiveId) {
                                // 清空transform
                                $page.css(animationCSSUtil.toCSSObj(pageData.pos1_after));
                            } else if (pageId < initActiveId) {
                                $page.css(animationCSSUtil.toCSSObj(pageData.pos2_after));
                            } else {
                                $page.css(animationCSSUtil.toCSSObj(pageData.pos1));
                            }

                            // 子数组对象
                            var cKeysObj = {};
                            var cKeys = new Set();

                            Array.from(pageData).forEach(function (eleData) {
                                if (eleData && eleData.animateIn) {
                                    // 添加key
                                    cKeys.add(eleData.animateInDelay);

                                    var tarGroupObj = cKeysObj[eleData.animateInDelay] || (cKeysObj[eleData.animateInDelay] = {
                                        type: "group",
                                        arr: []
                                    });

                                    tarGroupObj.arr.push({
                                        type: "ele",
                                        data: eleData
                                    });
                                }
                            });

                            // 排序ckeys
                            cKeys = Array.from(cKeys);
                            cKeys.sort();

                            // 转换排序数组
                            cKeys.forEach(function (kid) {
                                sarr.push(cKeysObj[kid]);
                            });
                        });

                        parentWin = top;


                        console.log(sarr, commonData);

                        mainEle.on("click", function (e) {
                            runAnime();
                        });

                        // 已经加载完成的pageId
                        // let pageLoadedId = [];

                        runAnime = function runAnime() {
                            var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                            // 递增序号
                            arrId++;

                            var tarObj = sarr[arrId];

                            if (tarObj) {
                                switch (tarObj.type) {
                                    case "group":
                                        tarObj.arr.forEach(function (e) {
                                            pageUtil.runEleAnime($("[outer-id=\"" + e.data.outerId + "\"] .p_ele"), e.data, {
                                                noDelay: 1,
                                                noAnime: opt.noAnime
                                            });
                                        });
                                        break;
                                    case "page":
                                        h5Util.toPage($(tarObj.ele).index());
                                        break;
                                }

                                parentWin.postMessage({
                                    type: "pptModeBack",
                                    cid: arrId,
                                    count: sarr.length
                                }, "*");
                            } else {
                                console.log('最后一页了');

                                return;
                            }

                            console.log("arrId => ", arrId);
                        };

                        window.addEventListener("message", function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
                                var data, rid, tarPageId, tarData;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                data = e.data;


                                                console.log(e);

                                                _context.t0 = data.type;
                                                _context.next = _context.t0 === "pptModeCommond" ? 5 : 18;
                                                break;

                                            case 5:
                                                rid = data.rid;

                                                if (!(rid === arrId)) {
                                                    _context.next = 8;
                                                    break;
                                                }

                                                return _context.abrupt("return");

                                            case 8:
                                                tarPageId = rid;

                                                // 判断是否page元素，不是的话就向前溯源，找到page并切换到page，在加载到当前的元素

                                                tarData = sarr[rid];


                                                while (tarData.type !== "page") {
                                                    tarData = sarr[--tarPageId];
                                                }

                                                // 进行页面缓存
                                                _context.next = 13;
                                                return tarData.data.startLoad();

                                            case 13:

                                                // let startPageId = sarr.indexOf(tarData);

                                                // 向前跳，并进行nextPage
                                                arrId = rid - 1;
                                                runAnime();

                                                tarPageId++;
                                                // 进行到相应位置
                                                for (; tarPageId < rid; tarPageId++) {
                                                    sarr[tarPageId].arr.forEach(function (e) {
                                                        pageUtil.runEleAnime($("[outer-id=\"" + e.data.outerId + "\"] .p_ele"), e.data, {
                                                            noDelay: 1,
                                                            noAnime: true
                                                        });
                                                    });
                                                }
                                                return _context.abrupt("break", 18);

                                            case 18:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x4) {
                                return _ref4.apply(this, arguments);
                            };
                        }());

                        // 查看页面是否缓存完毕
                        // commonData.on("pageLoaded", (e, data) => {
                        //     pageLoadedId.push(data.pageId);
                        //     console.log(data);
                        // });

                        // pageUtil.runPageAnime(pageFirst);

                    case 27:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());