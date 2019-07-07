"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, commonData, dataUtil, mainEle, mainPage, initActiveId;
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
                    return load('common/data');

                case 7:
                    commonData = _context.sent;


                    // 给外部用的对象，内部模块别使用该对象
                    window.pageRunner = {
                        v: "10300",
                        data: data,
                        commonData: commonData
                    };

                    if (window.beforeInit) {
                        beforeInit(commonData, data);
                    }

                    // 加载基础库
                    _context.next = 12;
                    return load("util/dataUtil");

                case 12:
                    dataUtil = _context.sent;

                    if (!$('[p-custom]').length) {
                        _context.next = 16;
                        break;
                    }

                    _context.next = 16;
                    return load("task/initCustomEle");

                case 16:

                    // 添加长度参数
                    dataUtil.addLength(data);

                    // 修正activeId
                    _context.next = 19;
                    return load("task/fixActive").post(data);

                case 19:

                    // 转换定位数据
                    dataUtil.transPos(data);

                    mainEle = $(".p_main");

                    // 渲染数据

                    _context.next = 23;
                    return load('task/renderPage').post({
                        target: mainEle,
                        data: data
                    });

                case 23:

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
                    _context.next = _context.t0 === "scroll" ? 31 : _context.t0 === "ppt" ? 34 : _context.t0 === "h5" ? 37 : 37;
                    break;

                case 31:
                    _context.next = 33;
                    return load("task/scroll/initScrollMode").post({
                        initActiveId: initActiveId
                    });

                case 33:
                    return _context.abrupt("break", 39);

                case 34:
                    _context.next = 36;
                    return load("task/ppt/initPPTMode").post({
                        initActiveId: initActiveId
                    });

                case 36:
                    return _context.abrupt("break", 39);

                case 37:
                    _context.next = 39;
                    return load("task/h5/initH5").post({
                        initActiveId: initActiveId
                    });

                case 39:

                    if (top !== window) {
                        top.postMessage({
                            type: "initBack"
                        }, "*");
                    }

                    // commonData.on("changePageStart", (e, data) => {
                    //     console.log("changePageStart => ", data);
                    // });
                    // commonData.on("changePageEnd", (e, data) => {
                    //     console.log("changePageEnd => ", data);
                    // });

                case 40:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();