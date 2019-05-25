'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 添加自定义的元素
drill.init(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(load) {
        var commonData, customCon;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return load("common/data");

                    case 2:
                        commonData = _context.sent;
                        customCon = $('[p-custom]');


                        commonData.on('pageLoaded', function (e, data) {
                            var tarPage = customCon.find('[p-page="' + data.pageId + '"]');

                            if (tarPage.length) {
                                tarPage.prop("eleData", {
                                    "target": tarPage.attr("p-target") || "safe",
                                    "hor": tarPage.attr("hor") || "center",
                                    "ver": tarPage.attr("ver") || "center",
                                    "x": "0",
                                    "y": "0",
                                    "w": "100%",
                                    "h": "100%"
                                });

                                data.page.append(tarPage);

                                // 初始化
                                load("util/viewUtil").then(function (viewUtil) {
                                    viewUtil.refreshView(tarPage[0]);
                                });
                            }
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());