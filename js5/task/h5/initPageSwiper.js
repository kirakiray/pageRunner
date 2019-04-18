"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.init(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load, d) {
        var pageUtil, mainEle, startX, startY;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return load("./h5Util");

                    case 2:
                        pageUtil = _context.sent;
                        mainEle = $(".p_main");

                        // 监听滚动

                        mainEle.on("mousewheel", function (e) {
                            // 禁用默认事件
                            e.preventDefault();

                            var originalEvent = e.originalEvent;
                            var wheelDeltaY = originalEvent.wheelDeltaY,
                                wheelDeltaX = originalEvent.wheelDeltaX;


                            if (wheelDeltaY < -100) {
                                pageUtil.toNextPage();
                            } else if (wheelDeltaY > 100) {
                                pageUtil.toPrevPage();
                            }
                        });

                        // Firefox监听滚动
                        mainEle.on("DOMMouseScroll", function (e) {
                            // 禁用默认事件
                            e.preventDefault();

                            var originalEvent = e.originalEvent;
                            var detail = originalEvent.detail;


                            if (detail > 6) {
                                pageUtil.toNextPage();
                            } else if (detail < -6) {
                                pageUtil.toPrevPage();
                            }
                        });

                        // 监听touch
                        startX = void 0, startY = void 0;

                        mainEle.on("touchstart", function (e) {
                            e.preventDefault();
                            var point = e.originalEvent.changedTouches[0];

                            startX = point.clientX;
                            startY = point.clientY;
                        });
                        mainEle.on("touchmove", function (e) {
                            return e.preventDefault();
                        });
                        mainEle.on("touchend", function (e) {
                            var point = e.originalEvent.changedTouches[0];

                            var clientX = point.clientX,
                                clientY = point.clientY;


                            var diffX = clientX - startX;
                            var diffY = clientY - startY;

                            if (diffY < -60) {
                                pageUtil.toNextPage();
                            } else if (diffY > 60) {
                                pageUtil.toPrevPage();
                            }
                        });

                    case 10:
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