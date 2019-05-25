"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, _ref2, _ref3, dataUtil, animateUtil, mainEle, mainPage, initActiveId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return load("data -r");

                case 2:
                    data = _context.sent;
                    _context.next = 5;
                    return load("xque");

                case 5:
                    _context.next = 7;
                    return load("util/dataUtil", "util/animateUtil");

                case 7:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 2);
                    dataUtil = _ref3[0];
                    animateUtil = _ref3[1];


                    // 设置初始animation
                    animateUtil.animation = data.animation;

                    // 添加长度参数
                    dataUtil.addLength(data);

                    // 修正activeId
                    _context.next = 15;
                    return load("task/fixActive").post(data);

                case 15:

                    // 转换定位数据
                    dataUtil.transPos(data);

                    mainEle = $(".p_main");

                    // 渲染数据

                    _context.next = 19;
                    return load('task/renderPage').post({
                        target: mainEle,
                        data: data
                    });

                case 19:

                    // 去除主的loading
                    // $('.mainLoading').addClass("eleFadeOut");
                    // setTimeout(() => {
                    $('.mainLoading').hide();
                    // }, 300);

                    mainPage = data.mainPage;

                    // 获取激活的页面id

                    initActiveId = 0;

                    Array.from(mainPage).some(function (e, i) {
                        if (e.active) {
                            initActiveId = i;
                            return true;
                        }
                    });

                    // 添加类型
                    mainEle.attr('h5-mode', mainPage.type || "h5");

                    // 根据type进行初始化类型
                    _context.t0 = mainPage.type;
                    _context.next = _context.t0 === "scroll" ? 27 : _context.t0 === "h5" ? 30 : 30;
                    break;

                case 27:
                    _context.next = 29;
                    return load("task/scroll/initScrollMode").post({
                        initActiveId: initActiveId
                    });

                case 29:
                    return _context.abrupt("break", 32);

                case 30:
                    _context.next = 32;
                    return load("task/h5/initH5").post({
                        initActiveId: initActiveId
                    });

                case 32:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();