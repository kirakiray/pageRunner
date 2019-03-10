"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 渲染数据到html
drill.init(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(load, d) {
        var target, data, _ref2, _ref3, getTransformStr, viewUtil, cacheUtil, commonData, setEleCSS, addEles, activeId, resizeTimer;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        target = d.target, data = d.data;
                        _context2.next = 3;
                        return load("util/getTransformStr", "util/viewUtil", "util/cacheUtil", "common/data");

                    case 3:
                        _ref2 = _context2.sent;
                        _ref3 = _slicedToArray(_ref2, 4);
                        getTransformStr = _ref3[0];
                        viewUtil = _ref3[1];
                        cacheUtil = _ref3[2];
                        commonData = _ref3[3];

                        // 修正 $/Url
                        // const transImgUrl = (picUrl) => {
                        //     if (/\$\//.test(picUrl)) {
                        //         picUrl = "/" + picUrl;
                        //     } else {
                        //         debugger
                        //     }
                        //     return picUrl;
                        // }

                        // 设置通用css
                        setEleCSS = function setEleCSS(tarEle, data) {
                            var cssObj = {};
                            var bgimg = data["background-image"];
                            if (bgimg) {
                                cssObj["background-image"] = "url(" + bgimg + ")";
                            }
                            ["background-color", "background-repeat", "background-size", "background-position"].forEach(function (k) {
                                data[k] && (cssObj[k] = data[k]);
                            });
                            tarEle.css(cssObj);
                        };

                        // 填充子元素


                        addEles = function addEles(page, p) {
                            Array.from(p).forEach(function (e) {
                                var ele = $("\n            <div class=\"p_ele_outer\" style=\"opacity:0;\" ver=\"" + e.ver + "\" hor=\"" + e.hor + "\">\n                <div class=\"p_ele\"></div>\n            </div>");

                                // 让元素进场不显得那么突兀
                                setTimeout(function () {
                                    ele.css("opacity", "");
                                }, 50);

                                // 添加元素数据
                                ele.prop("eleData", e);

                                // 主体元素
                                var tarEle = ele.find(".p_ele");

                                // 设置元素宽高
                                tarEle.css("width", e.w);

                                // 添加元素
                                page.append(ele);

                                // 根据类型修正元素
                                switch (e.tag) {
                                    case "text":
                                        // 添加class
                                        tarEle.addClass('p_text');
                                        tarEle.text(e.intext);

                                        // 设置字体大小颜色什么的
                                        ["fontWeight", "fontStyle", "color", "lineHeight"].forEach(function (k) {
                                            e[k] && tarEle.css(k, e[k]);
                                        });
                                        break;
                                    case "pic":
                                        // 添加class
                                        tarEle.addClass('p_pic');

                                        // let picUrl = transImgUrl(e.picUrl);

                                        // 设置图片属性
                                        // tarEle.append(`<img src="${picUrl}" />`);
                                        tarEle.append("<img src=\"" + e.picUrl + "\" />");
                                        break;
                                }

                                // 背景元素等属性修正
                                setEleCSS(tarEle, e);
                            });
                        };

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
                            var page = $("\n        <div class=\"page\">\n            <div class=\"loading_layer\">\n                <svg width=\"38\" height=\"38\" viewBox=\"0 0 38 38\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"rgba(200,200,200,.5)\">\n                    <g fill=\"none\" fill-rule=\"evenodd\">\n                        <g transform=\"translate(1 1)\" stroke-width=\"2\">\n                            <circle stroke-opacity=\".5\" cx=\"18\" cy=\"18\" r=\"18\" />\n                            <path d=\"M36 18c0-9.94-8.06-18-18-18\"></path>\n                        </g>\n                    </g>\n                </svg>\n            </div>\n        </div>\n        ");

                            // 设置样式
                            setEleCSS(page, p);

                            // 添加page数据
                            page.prop("pageData", p);
                            page.attr("active", p.active || 0);

                            // 添加页面加载器
                            p.startLoad = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                var imgarr;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (!p.loaded) {
                                                    _context.next = 2;
                                                    break;
                                                }

                                                return _context.abrupt("return", 1);

                                            case 2:

                                                // 总结出所有图片元素
                                                imgarr = [];

                                                Array.from(p).forEach(function (e) {
                                                    if (e.tag == "pic") {
                                                        // let picUrl = transImgUrl(e.picUrl);
                                                        // imgarr.push(picUrl);
                                                        imgarr.push(e.picUrl);
                                                    }

                                                    // 查看是否有bgimg
                                                    if (e["background-image"]) {
                                                        // let picUrl = transImgUrl(e["background-image"]);
                                                        // imgarr.push(picUrl);
                                                        imgarr.push(e["background-image"]);
                                                    }
                                                });

                                                // 缓存元素内的所有图片
                                                _context.next = 6;
                                                return cacheUtil.cacheImg(imgarr);

                                            case 6:

                                                // 添加元素进去
                                                // 填充子元素
                                                addEles(page, p);

                                                // 清空状态
                                                p.clearPageAnime();

                                                // 去掉loading_layer
                                                page.find(".loading_layer").remove();

                                                // 设置加载完成
                                                p.loaded = 1;

                                                // 刷新大小
                                                viewUtil.refreshView(page[0]);

                                                // 判断是否当前页
                                                // if (commonData.currentPageId == page.index()) {
                                                //     await load("task/initEleAnime");
                                                //     p.runPageAnime();
                                                // } else {
                                                //     // 去除loading，加载动画
                                                //     await load("task/initEleAnime");
                                                //     p.runPageAnime();
                                                // }

                                                // 去除loading，加载动画
                                                _context.next = 13;
                                                return load("task/initEleAnime");

                                            case 13:
                                                p.runPageAnime();

                                                // 触发loadend事件
                                                commonData.trigger("pageLoaded", {
                                                    page: page,
                                                    pageId: pageId
                                                });

                                                p.checkPrevAndNext();

                                            case 16:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            // 查看上下页面并执行缓存的方法
                            p.checkPrevAndNext = function () {
                                // 当前页的上下页都进行缓存
                                var prevPage = page.prev();
                                var nextPage = page.next();

                                if (prevPage.length) {
                                    prevPage[0].pageData.startLoad();
                                }

                                if (nextPage.length) {
                                    nextPage[0].pageData.startLoad();
                                }
                            };

                            // 初始状态没加载完成
                            p.loaded = 0;

                            // 是否激活页面
                            if (pageId == activeId) {
                                // 清空transform
                                page.css("transform", "");

                                // 加载激活的页面
                                load("task/initEleAnime").then(function (e) {
                                    p.startLoad();
                                });
                            } else if (pageId < activeId) {
                                page.css({
                                    "transform": getTransformStr(p.pos1.transform)
                                });
                            } else {
                                page.css({
                                    "transform": getTransformStr(p.pos2.transform)
                                });
                            }

                            // 添加page
                            target.append(page);

                            // 当前页渐进
                            if (commonData.currentPageId == page.index()) {
                                page.addClass('eleFadeIn');
                                setTimeout(function () {
                                    page.removeClass('eleFadeIn');
                                }, 300);
                            }
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

                    case 17:
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