"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.define(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var animationUtil;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    animationUtil = {
                        // 主体animation
                        animation: [],
                        // 获取相应animation的提前设置样式对象
                        // getInitCSS(animateName) {
                        //     animationUtil.animation.forEach(e => {
                        //         debugger
                        //     });
                        // },
                        // 转换frame对象成样式字符串
                        frameToStr: function frameToStr(frame) {
                            debugger;
                            var str = "";
                            Object.keys(frame).forEach(function (k) {
                                if (k === "transform") {
                                    var transformStr = "transform:";
                                    var transObj = frame[k];
                                    Object.keys(transObj).forEach(function (k2) {
                                        var transVal = transObj[k2];
                                        transformStr += k2 + "(" + transVal + ") ";
                                    });
                                    str += transformStr.slice(0, -1) + ";";
                                } else {
                                    var val = frame[k];
                                    str += k + ":" + val + ";";
                                }
                            });
                            return str;
                        },
                        animationDataToStr: function animationDataToStr(animation) {
                            var str = "";
                            Object.keys(animation).forEach(function (k) {
                                if (/\D/.test(k)) {
                                    return;
                                }
                                var val = animation[k];
                                var s = animationUtil.frameToStr(val);
                                str += k + "%{" + s + "}\n";
                            });
                            return str;
                        },

                        // 获取animationIn的动画样式字符
                        getAnimateIn: function getAnimateIn(animateData) {
                            // if (animateData.css) {
                            //     debugger
                            // }
                            var frameStr = void 0;
                            var str = void 0;
                            if (animateData.frame) {
                                frameStr = animationUtil.frameToStr(animateData.frame);
                                str = "@keyframes " + animateData.name + "{\n                    0%{" + frameStr + "}\n                    100%{transform:translate3d(0,0,0); opacity:1;}\n                }\n                ";
                            } else {
                                frameStr = animationUtil.animationDataToStr(animateData.animation);
                                str = "@keyframes " + animateData.name + "{\n                    " + frameStr + "\n                }\n                ";
                            }
                            return str;
                        },
                        getAnimateOut: function getAnimateOut(animateData) {
                            var frameStr = void 0;
                            var str = void 0;
                            if (animateData.frame) {
                                frameStr = animationUtil.frameToStr(animateData.frame);
                                str = "@keyframes " + animateData.name + "{\n                    0%{transform:translate3d(0,0,0); opacity:1;}\n                    100%{" + frameStr + "}\n                }\n                ";
                            } else {
                                frameStr = animationUtil.animationDataToStr(animateData.animation);
                                str = "@keyframes " + animateData.name + "{\n                    " + frameStr + "\n                }\n                ";
                            }
                            return str;
                        },

                        // 获取整个animation转换的style字符串
                        animationToStr: function animationToStr(animation) {
                            animation = animation || animationUtil.animation;
                            var str = "";
                            animation.forEach(function (e) {
                                var frameStr = void 0;
                                switch (e.type) {
                                    case "animeIn":
                                        frameStr = animationUtil.getAnimateIn(e);
                                        break;
                                    case "animeOut":
                                        frameStr = animationUtil.getAnimateOut(e);
                                        break;
                                }
                                str += frameStr;

                                // 自带css
                                var cssStr = '';

                                if (e.css) {
                                    debugger;
                                    Object.keys(e.css).forEach(function (k) {
                                        var val = e.css[k];
                                        cssStr += k + ":" + val + ";";
                                    });
                                }

                                // 添加生成class
                                str += "." + e.name + "{\n                    " + cssStr + "\n                    -webkit-animation:" + e.name + " ease .5s;\n                    animation:" + e.name + " ease .5s;\n                }\n                ";
                            });

                            return str;
                        }
                    };
                    return _context.abrupt("return", animationUtil);

                case 2:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
})));