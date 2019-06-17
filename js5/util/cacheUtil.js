"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var loadImg, cacheImg, cacheUtil;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        // 加载图片进缓存
                        loadImg = function loadImg(src, callback) {
                            var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

                            // 获取图片数量
                            var img = new Image();

                            img.onload = function () {
                                callback();
                            };

                            img.onerror = function () {
                                if (count <= 0) {
                                    console.error("img cache error => ", src);
                                    // 没办法了，加载失败也执行
                                    callback();
                                } else {
                                    loadImg(src, callback, --count);
                                }
                            };

                            // 设置图片地址
                            img.src = src;
                        };

                        // 缓存图片


                        cacheImg = function cacheImg(imgs) {
                            return new Promise(function (res) {
                                // 所有待加载图片数量
                                var len = imgs.length;

                                if (!len) {
                                    res("no imgs");
                                    return;
                                }

                                imgs.forEach(function (src) {
                                    // 加载图片
                                    loadImg(src, function () {
                                        // 图片加载完成，递减
                                        len--;

                                        if (!len) {
                                            res('imgs loaded');
                                        }
                                    });
                                });
                            });
                        };

                        cacheUtil = {
                            loadImg: loadImg,
                            cacheImg: cacheImg
                        };
                        return _context.abrupt("return", cacheUtil);

                    case 4:
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