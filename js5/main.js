"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, _ref2, _ref3, addLength, transPos, animateUtil, mainEle;

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
                    return load("util/addLength", "util/transPos", "util/animateUtil");

                case 7:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 3);
                    addLength = _ref3[0];
                    transPos = _ref3[1];
                    animateUtil = _ref3[2];


                    // 设置初始animation
                    animateUtil.animation = data.animation;

                    // 添加长度参数
                    addLength(data);

                    // 添加active
                    _context.next = 16;
                    return load("task/addActive").post(data);

                case 16:

                    // 转换定位数据
                    transPos(data);

                    mainEle = $(".main");

                    // 渲染数据

                    _context.next = 20;
                    return load('task/renderPage').post({
                        target: mainEle,
                        data: data
                    });

                case 20:

                    // 去除主的loading
                    $('.mainLoading').remove();

                    // 初始化页面切换效果控件
                    _context.next = 23;
                    return load("task/initPageSwiper").post({
                        target: mainEle
                    });

                case 23:
                    _context.next = 25;
                    return load("task/initEleAnime");

                case 25:

                    commonData.on("changePageStart", function (e, data) {
                        console.log("changePageStart => ", data);
                    });
                    commonData.on("changePageEnd", function (e, data) {
                        console.log("changePageEnd => ", data);
                    });

                case 27:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();