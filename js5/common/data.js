"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

drill.define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var mainEle, commonData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        mainEle = $(".p_main");

                        // 主体数据

                        commonData = $({});

                        // 定义常规数据

                        Object.defineProperties(commonData, {
                            currentPage: {
                                get: function get() {
                                    return mainEle.find("[active=\"1\"]");
                                }
                            },
                            currentPageId: {
                                get: function get() {
                                    var currentPage = this.currentPage;


                                    return currentPage.length ? currentPage.index() : 0;
                                }
                            }
                        });

                        return _context.abrupt("return", commonData);

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