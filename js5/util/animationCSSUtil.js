"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var animationStyle, animationCSSUtil;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // 主体动画style
                        animationStyle = document.createElement('style');
                        animationCSSUtil = {
                            // 转换成cssObject
                            toCSSObj: function toCSSObj(frameobj) {
                                var cssObj = {};
                                Object.keys(frameobj).forEach(function (k) {
                                    var val = frameobj[k];
                                    if (k === "transform" && (typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
                                        var aStr = "";
                                        Object.keys(val).forEach(function (k) {
                                            var d = val[k];
                                            aStr += k + "(" + d + ") ";
                                        });
                                        val = aStr.slice(0, -1);
                                    }

                                    cssObj[k] = val;
                                });
                                return cssObj;
                            },

                            // 转换单帧样式
                            transFrame: function transFrame(frameObj) {
                                var str = "";
                                Object.keys(frameObj).forEach(function (k) {
                                    var val = frameObj[k];

                                    if (k === "transform" && (typeof val === "undefined" ? "undefined" : _typeof(val)) == "object") {
                                        var aStr = "";
                                        Object.keys(val).forEach(function (k) {
                                            var d = val[k];
                                            aStr += k + "(" + d + ") ";
                                        });
                                        val = aStr.slice(0, -1);
                                    }

                                    str += k + ":" + (val === "" ? '\"\"' : val) + ";";
                                });
                                return str;
                            },

                            // 转换 animation 对象为字符串
                            transAnimation: function transAnimation(animation, name) {
                                var str = "";
                                var from = animation.from,
                                    to = animation.to;


                                if (from) {
                                    str += "from{\n                    " + animationCSSUtil.transFrame(from) + "\n                }\n                to{\n                    " + animationCSSUtil.transFrame(to) + "\n                }\n                ";
                                } else {
                                    Object.keys(animation).forEach(function (p) {
                                        var val = animation[p];
                                        str += p + "%{\n                        " + animationCSSUtil.transFrame(val) + "\n                    }\n                    ";
                                    });
                                }
                                return "@keyframes " + name + "{\n                " + str + "\n            }";
                            },

                            // 转化所有animation对象为字符串
                            initAnimation: function initAnimation(arr) {
                                var str = "";

                                arr.forEach(function (e) {
                                    // 获取keyframes
                                    var keyframes = animationCSSUtil.transAnimation(e.animation, e.animateId);
                                    str += keyframes;
                                    str += "\n                ." + e.animateId + "{\n                    animation:" + e.animateId + " ease .5s;\n                    animation-fill-mode: forwards;\n                }\n                ";
                                });

                                // 主体style
                                animationStyle.innerHTML = str;

                                // 添加到head
                                document.head.appendChild(animationStyle);
                            }
                        };
                        return _context.abrupt("return", animationCSSUtil);

                    case 3:
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