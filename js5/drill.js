'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(function (glo) {
    // common
    // 处理器（针对js类型）
    var processors = new Map();
    // 加载器（针对文件类型）
    var loaders = new Map();
    // 地址寄存器
    var bag = new Map();

    // 映射资源
    var paths = new Map();

    // 映射目录
    var dirpaths = {};

    // 错误处理数据
    var errInfo = {
        // 每个错误资源的最大错误请求次数
        // 默认错误的时候回再请求3次
        loadNum: 3,
        // 加载错误之后，再次加载的间隔时间(毫秒)
        time: 1000,
        // baseUrl后备仓
        backups: new Set()
    };

    // 基础数据对象
    var base = {
        processors: processors,
        loaders: loaders,
        bag: bag,
        paths: paths,
        dirpaths: dirpaths,
        errInfo: errInfo,
        // 根目录
        baseUrl: "",
        // 临时挂起的模块对象
        tempM: {}
    };

    // function
    // 获取随机id
    var getRandomId = function getRandomId() {
        return Math.random().toString(32).substr(2);
    };
    var objectToString = Object.prototype.toString;
    var getType = function getType(value) {
        return objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    };
    var isFunction = function isFunction(d) {
        return getType(d).search('function') > -1;
    };
    var isEmptyObj = function isEmptyObj(obj) {
        return !(0 in Object.keys(obj));
    };

    //改良异步方法
    var nextTick = function () {
        var isTick = false;
        var nextTickArr = [];
        return function (fun) {
            if (!isTick) {
                isTick = true;
                setTimeout(function () {
                    for (var i = 0; i < nextTickArr.length; i++) {
                        nextTickArr[i]();
                    }
                    nextTickArr = [];
                    isTick = false;
                }, 0);
            }
            nextTickArr.push(fun);
        };
    }();

    // 获取文件类型
    var getFileType = function getFileType(url) {
        var lastOri = url.split('/').pop();
        var fileType = void 0;
        var sArr = lastOri.match(/(.+)\.(.+)/);
        if (sArr) {
            // 得出文件类型
            fileType = sArr[2];
        }
        return fileType;
    };

    // 获取目录名
    var getDir = function getDir(url) {
        var urlArr = url.match(/(.+\/).+/);
        return urlArr && urlArr[1];
    };

    //修正字符串路径
    var removeParentPath = function removeParentPath(url) {
        var urlArr = url.split(/\//g);
        var newArr = [];
        urlArr.forEach(function (e) {
            if (e == '..' && newArr.length && newArr.slice(-1)[0] != "..") {
                newArr.pop();
                return;
            }
            newArr.push(e);
        });
        return newArr.join('/');
    };

    // 获取根目录地址
    var rootHref = getDir(document.location.href);

    // main
    // loaders添加css
    loaders.set("css", function (packData) {
        // 给主体添加css
        var linkEle = document.createElement('link');
        linkEle.rel = "stylesheet";
        linkEle.href = packData.link;

        linkEle.onload = function () {
            // 设置完成
            packData.stat = 3;
        };

        linkEle.onerror = function () {
            packData.stat = 2;
        };

        // 添加到head
        document.head.appendChild(linkEle);
    });

    // loaders添加json支持
    loaders.set("json", function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(packData) {
            var data;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            data = void 0;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return fetch(packData.link);

                        case 4:
                            data = _context2.sent;
                            _context2.next = 11;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](1);

                            packData.stat = 2;
                            return _context2.abrupt('return');

                        case 11:
                            _context2.next = 13;
                            return data.json();

                        case 13:
                            data = _context2.sent;


                            // 重置getPack
                            packData.getPack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                return _context.abrupt('return', data);

                                            case 1:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            // 设置完成
                            packData.stat = 3;

                        case 16:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[1, 7]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());

    // loaders添加json支持
    loaders.set("wasm", function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(packData) {
            var data, module, instance;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            data = void 0;
                            _context4.prev = 1;
                            _context4.next = 4;
                            return fetch(packData.link);

                        case 4:
                            data = _context4.sent;
                            _context4.next = 11;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4['catch'](1);

                            packData.stat = 2;
                            return _context4.abrupt('return');

                        case 11:
                            _context4.next = 13;
                            return data.arrayBuffer();

                        case 13:
                            data = _context4.sent;
                            _context4.next = 16;
                            return WebAssembly.compile(data);

                        case 16:
                            module = _context4.sent;
                            instance = new WebAssembly.Instance(module);

                            // 重置getPack

                            packData.getPack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                        switch (_context3.prev = _context3.next) {
                                            case 0:
                                                return _context3.abrupt('return', instance.exports);

                                            case 1:
                                            case 'end':
                                                return _context3.stop();
                                        }
                                    }
                                }, _callee3, undefined);
                            }));

                            // 设置完成
                            packData.stat = 3;

                        case 20:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined, [[1, 7]]);
        }));

        return function (_x2) {
            return _ref3.apply(this, arguments);
        };
    }());

    // processors添加普通文件加载方式
    processors.set("file", function (packData) {
        // 直接修改完成状态
        packData.stat = 3;
    });

    // 添加define模块支持
    processors.set("define", function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(packData) {
            var d, exports, module, path, dir;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            d = base.tempM.d;
                            exports = {}, module = {
                                exports: exports
                            };

                            // 根据内容填充函数

                            if (isFunction(d)) {
                                path = packData.path, dir = packData.dir;

                                // 函数类型

                                d = d(function () {
                                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                        args[_key] = arguments[_key];
                                    }

                                    return _load(toUrlObjs(args, dir));
                                }, exports, module, {
                                    FILE: path,
                                    DIR: dir
                                });
                            }

                            // Promise函数

                            if (!(d instanceof Promise)) {
                                _context6.next = 7;
                                break;
                            }

                            _context6.next = 6;
                            return d;

                        case 6:
                            d = _context6.sent;

                        case 7:

                            // 判断值是否在 exports 上
                            if (!d && !isEmptyObj(module.exports)) {
                                d = module.exports;
                            }

                            // 修正getPack方法
                            packData.getPack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                    while (1) {
                                        switch (_context5.prev = _context5.next) {
                                            case 0:
                                                return _context5.abrupt('return', d);

                                            case 1:
                                            case 'end':
                                                return _context5.stop();
                                        }
                                    }
                                }, _callee5, undefined);
                            }));

                            // 修正状态
                            packData.stat = 3;

                        case 10:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function (_x3) {
            return _ref5.apply(this, arguments);
        };
    }());

    // 添加task模块支持
    processors.set("task", function (packData) {
        var d = base.tempM.d;

        // 判断d是否函数
        if (!isFunction(d)) {
            throw 'task must be a function';
        }

        var path = packData.path,
            dir = packData.dir;

        // 修正getPack方法

        packData.getPack = function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(urlData) {
                var reData;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return d(function () {
                                    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                        args[_key2] = arguments[_key2];
                                    }

                                    return _load(toUrlObjs(args, dir));
                                }, urlData.data, {
                                    FILE: path,
                                    DIR: dir
                                });

                            case 2:
                                reData = _context7.sent;
                                return _context7.abrupt('return', reData);

                            case 4:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, undefined);
            }));

            return function (_x4) {
                return _ref7.apply(this, arguments);
            };
        }();

        // 修正状态
        packData.stat = 3;
    });

    // 添加init模块支持
    processors.set("init", function (packData) {
        var d = base.tempM.d;

        // 判断d是否函数
        if (!isFunction(d)) {
            throw 'init must be a function';
        }

        var path = packData.path,
            dir = packData.dir;


        var isRun = 0;
        var redata = void 0;

        // 修正getPack方法
        packData.getPack = function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(urlData) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                if (!isRun) {
                                    _context8.next = 2;
                                    break;
                                }

                                return _context8.abrupt('return', redata);

                            case 2:
                                _context8.next = 4;
                                return d(function () {
                                    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                        args[_key3] = arguments[_key3];
                                    }

                                    return _load(toUrlObjs(args, dir));
                                }, urlData.data, {
                                    FILE: path,
                                    DIR: dir
                                });

                            case 4:
                                redata = _context8.sent;


                                // 设置已运行
                                isRun = 1;

                                return _context8.abrupt('return', redata);

                            case 7:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, undefined);
            }));

            return function (_x5) {
                return _ref8.apply(this, arguments);
            };
        }();

        // 修正状态
        packData.stat = 3;
    });

    // loaders添加js加载方式
    loaders.set("js", function (packData) {
        // 主体script
        var script = document.createElement('script');

        //填充相应数据
        script.type = 'text/javascript';
        script.async = true;
        script.src = packData.link;

        // 添加事件
        script.addEventListener('load', function () {
            // 根据tempM数据设置type
            var tempM = base.tempM;

            // type:
            // file 普通文件类型
            // define 模块类型
            // task 进程类型

            var type = tempM.type,
                moduleId = tempM.moduleId;

            // 判断是否有自定义id

            if (moduleId) {
                bag.get(moduleId) || bag.set(moduleId, packData);
            }

            // 进行processors断定
            // 默认是file类型
            var process = processors.get(type || "file");

            if (process) {
                process(packData);
            } else {
                throw "no such this processor => " + type;
            }

            // 清空tempM
            base.tempM = {};
        });
        script.addEventListener('error', function () {
            // 加载错误
            packData.stat = 2;
        });

        // 添加进主体
        document.head.appendChild(script);
    });

    // 代理加载
    // 根据不同加载状态进行组装
    var agent = function agent(urlObj) {
        // 根据url获取资源状态
        var packData = bag.get(urlObj.path);

        if (!packData) {
            var _packData;

            // 加载状态
            // 1加载中
            // 2加载错误，重新装载中
            // 3加载完成
            // 4彻底加载错误，别瞎折腾了
            var stat = 1;

            packData = (_packData = {
                get stat() {
                    return stat;
                },
                set stat(d) {
                    // 记录旧状态
                    var oldStat = stat;

                    // set
                    stat = d;

                    // 改动stat的时候触发changes内的函数
                    this.changes.forEach(function (callback) {
                        return callback({
                            change: "stat",
                            oldStat: oldStat,
                            stat: stat
                        });
                    });
                },
                dir: urlObj.dir,
                path: urlObj.path,
                link: urlObj.link
            }, _defineProperty(_packData, 'dir', urlObj.dir), _defineProperty(_packData, 'changes', new Set()), _defineProperty(_packData, 'fileType', urlObj.fileType), _defineProperty(_packData, 'getPack', function getPack(urlObj) {
                var _this = this;

                return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while (1) {
                            switch (_context9.prev = _context9.next) {
                                case 0:
                                case 'end':
                                    return _context9.stop();
                            }
                        }
                    }, _callee9, _this);
                }))();
            }), _packData);

            // 设置包数据
            bag.set(urlObj.path, packData);

            // 立即请求包处理
            var loader = loaders.get(urlObj.fileType);

            if (loader) {
                // 存在Loader的话，进行加载
                loader(packData);
            } else {
                throw "no such this loader => " + packData.fileType;
            }
        }

        return new Promise(function (res, rej) {
            // 根据状态进行处理
            switch (packData.stat) {
                case 2:
                // 加载错误的重新装载，也加入队列
                case 1:
                    // 添加状态改动callback，确认加载完成的状态后，进行callback
                    var _statChangeCallback = void 0;
                    packData.changes.add(_statChangeCallback = function statChangeCallback(d) {
                        // 获取改动状态
                        var stat = d.stat;


                        switch (stat) {
                            case 3:
                                // 加载完成，运行getPack函数
                                packData.getPack(urlObj).then(res);

                                // 清除自身callback
                                packData.changes.delete(_statChangeCallback);
                                packData = null;
                                break;
                            case 2:
                                // 重新装载
                                // 获取计数器
                                var loadCount = packData.loadCount != undefined ? packData.loadCount : packData.loadCount = 0;

                                // 存在次数
                                if (loadCount < errInfo.loadNum) {
                                    // 递增
                                    packData.loadCount++;

                                    // 重新装载
                                    var _loader = loaders.get(packData.fileType);
                                    setTimeout(function () {
                                        return _loader(packData);
                                    }, errInfo.time);
                                } else {
                                    // 查看有没有后备仓
                                    var backups = errInfo.backups;

                                    // 确认后备仓

                                    if (backups.size) {
                                        // 查看当前用了几个后备仓
                                        var backupId = packData.backupId != undefined ? packData.backupId : packData.backupId = -1;
                                        if (backupId < backups.size) {
                                            // 转换数组
                                            var barr = Array.from(backups);
                                            var oldBaseUrl = barr[backupId] || packData.dir;

                                            // 递增backupId
                                            backupId = ++packData.backupId;
                                            var newBaseUrl = barr[backupId];

                                            // 修正数据重新载入
                                            packData.loadCount = 1;
                                            packData.link = packData.link.replace(new RegExp("^" + oldBaseUrl), newBaseUrl);

                                            // 重新装载
                                            var _loader2 = loaders.get(packData.fileType);
                                            setTimeout(function () {
                                                return _loader2(packData);
                                            }, errInfo.time);
                                            return;
                                        }
                                    }
                                    // 载入不进去啊大佬，别费劲了
                                    packData.stat = 4;
                                }

                                break;
                            case 4:
                                rej("source error");
                                break;
                        }
                    });
                    break;
                case 3:
                    nextTick(function () {
                        // 已经加载完成的，直接获取
                        packData.getPack(urlObj).then(res);
                    });
                    break;
                case 4:
                    // 彻底加载错误的资源，就别瞎折腾了
                    rej("source error");
                    break;
            }
        });
    };

    // 主体加载函数
    var _load = function load(urlObjs) {
        var pendFunc = void 0;
        var p = new Promise(function (res, rej) {
            // 要返回的数据
            var reValue = [];

            // 获取原来的长度
            var length = urlObjs.length;

            var sum = length;

            // 是否有出错
            var hasError = [];

            urlObjs.forEach(function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(obj, i) {
                    var stat, d;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                            switch (_context10.prev = _context10.next) {
                                case 0:
                                    // 载入的状态
                                    stat = "succeed";

                                    // 中转加载资源

                                    _context10.next = 3;
                                    return agent(obj).catch(function (e) {
                                        stat = "error";
                                        Object.assign(obj, {
                                            type: "error",
                                            descript: e
                                        });
                                        hasError.push(obj);
                                    });

                                case 3:
                                    d = _context10.sent;


                                    // 设置数据
                                    reValue[i] = d;

                                    // 触发pending
                                    pendFunc && pendFunc({
                                        // 当前所处id
                                        id: i,
                                        // 总数
                                        sum: sum,
                                        ready: sum - length + 1,
                                        stat: stat
                                    });

                                    // 计时减少
                                    length--;

                                    if (!length) {
                                        if (!hasError.length) {
                                            // 单个的话直接返回单个的数据
                                            if (sum == 1) {
                                                res(d);
                                            } else {
                                                res(reValue);
                                            }
                                        } else {
                                            // 出错了
                                            rej(hasError);
                                        }
                                        reValue = null;
                                    }

                                case 8:
                                case 'end':
                                    return _context10.stop();
                            }
                        }
                    }, _callee10, undefined);
                }));

                return function (_x6, _x7) {
                    return _ref9.apply(this, arguments);
                };
            }());
        });

        // 挂载两个方法
        p.post = function (data) {
            urlObjs.forEach(function (e) {
                return e.data = data;
            });
            return this;
        };
        p.pend = function (func) {
            pendFunc = func;
            return this;
        };

        return p;
    };

    // 转换出url字符串对象
    var fixUrlObj = function fixUrlObj(urlObj) {
        var str = urlObj.str;

        // 判断是否注册在bag上的直接的id

        if (bag.has(str)) {
            var tarBag = bag.get(str);
            Object.assign(urlObj, {
                path: tarBag.path,
                link: tarBag.link,
                dir: tarBag.dir
            });
            return urlObj;
        }

        // 拆分空格数据
        var ndata = str.split(/\s/).filter(function (e) {
            return e && e;
        });

        var param = ndata.slice(1);

        // 第一个参数是路径名
        var ori = ndata[0];

        // 拆分问号(?)后面的 url param
        var search = ori.match(/(.+)\?(\S+)$/) || "";
        if (search) {
            ori = search[1];
            search = search[2];
        }
        // 判断是否要加版本号
        var _drill$cacheInfo = drill.cacheInfo,
            k = _drill$cacheInfo.k,
            v = _drill$cacheInfo.v;

        if (k && v) {
            search && (search += "&");
            search += k + '=' + v;
        }

        // 查看是否有映射路径
        var tarpath = paths.get(ori);
        if (tarpath) {
            ori = tarpath;
        } else {
            // 查看是否有映射目录
            // 判断是否注册目录
            for (var i in dirpaths) {
                var tar = dirpaths[i];
                if (tar.reg.test(ori)) {
                    ori = ori.replace(tar.reg, tar.value);
                    break;
                }
            }
        }

        // 得出fileType
        var fileType = getFileType(ori) || "js";

        // ori去掉后缀
        ori = ori.replace(new RegExp('\\.' + fileType + "$"), "");

        // 主体path
        var path = void 0;

        // 判断是否有基于根目录参数
        if (param.indexOf('-r') > -1 || /^.+:\/\//.test(ori)) {
            path = ori;
        } else if (/^\./.test(ori)) {
            if (urlObj.relative) {
                // 添加相对路径
                path = urlObj.relative + ori;
            } else {
                path = ori.replace(/^\.\//, "");
            }
        } else {
            // 添加相对目录，得出资源地址
            path = base.baseUrl + ori;
        }

        // 判断是否带有 -pack 参数
        if (param.includes('-pack')) {
            var pathArr = path.match(/(.+)\/(.+)/);
            if (2 in pathArr) {
                ori = path = pathArr[1] + "/" + pathArr[2] + "/" + pathArr[2];
            }
        }

        // 判断不是协议开头的，加上当前的根目录
        if (!/^.+:\/\//.test(path)) {
            path = rootHref + path;
        }

        // 修正单点
        path = path.replace(/\/\.\//, "/");

        // 修正两点（上级目录）
        if (/\.\.\//.test(path)) {
            path = removeParentPath(path);
        }

        // 添加后缀
        path += "." + fileType;

        // 根据资源地址计算资源目录
        var dir = getDir(path);

        // 写入最终请求资源地址
        var link = search ? path + "?" + search : path;

        Object.assign(urlObj, {
            link: link,
            search: search,
            ori: ori,
            fileType: fileType,
            path: path,
            dir: dir,
            param: param
        });

        return urlObj;
    };

    // 轻转换函数
    var toUrlObjs = function toUrlObjs(args, relative) {
        // 生成组id
        var groupId = getRandomId();

        // 转化成urlObj
        return args.map(function (url, id) {
            return fixUrlObj({
                loadId: getRandomId(),
                id: id,
                str: url,
                groupId: groupId,
                relative: relative
            });
        });
    };

    var drill = {
        load: function load() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return _load(toUrlObjs(args));
        },
        remove: function remove(url) {
            var _fixUrlObj = fixUrlObj({
                str: url
            }),
                path = _fixUrlObj.path;

            if (bag.has(path)) {
                bag.delete(path);

                //告示删除成功
                return !0;
            } else {
                console.warn('pack %c' + url, "color:red", 'does not exist');
            }
        },
        has: function has(url) {
            var _fixUrlObj2 = fixUrlObj({
                str: url
            }),
                path = _fixUrlObj2.path;

            var packData = bag.get(path);

            return packData && packData.stat;
        },
        config: function config(options) {
            options.baseUrl && (base.baseUrl = options.baseUrl);

            //配置paths
            var oPaths = options.paths;
            oPaths && Object.keys(oPaths).forEach(function (i) {
                if (/\/$/.test(i)) {
                    //属于目录类型
                    dirpaths[i] = {
                        // 正则
                        reg: new RegExp('^' + i),
                        // 值
                        value: oPaths[i]
                    };
                } else {
                    //属于资源类型
                    paths.set(i, oPaths[i]);
                }
            });

            // 后备仓
            if (base.baseUrl && options.backups) {
                options.backups.forEach(function (url) {
                    errInfo.backups.add(url);
                });
            }
        },
        define: function define(d, moduleId) {
            base.tempM = {
                type: "define",
                d: d,
                moduleId: moduleId
            };
        },
        task: function task(d, moduleId) {
            base.tempM = {
                type: "task",
                d: d,
                moduleId: moduleId
            };
        },
        init: function init(d, moduleId) {
            base.tempM = {
                type: "init",
                d: d,
                moduleId: moduleId
            };
        },

        // 扩展开发入口
        ext: function ext(f_name, func) {
            if (isFunction(f_name)) {
                f_name(base);
            } else {
                // 旧的方法
                var oldFunc = void 0;

                // 中间件方法
                var middlewareFunc = function middlewareFunc() {
                    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                        args[_key5] = arguments[_key5];
                    }

                    return func(args, oldFunc, base);
                };

                switch (f_name) {
                    case "fixUrlObj":
                        oldFunc = fixUrlObj;
                        fixUrlObj = middlewareFunc;
                        break;
                    case "load":
                        oldFunc = _load;
                        _load = middlewareFunc;
                        break;
                    case "agent":
                        oldFunc = agent;
                        agent = middlewareFunc;
                        break;
                }
            }
        },

        cacheInfo: {
            k: "d_ver",
            v: ""
        },
        debug: {
            bag: bag
        }
    };

    // init 
    glo.load || (glo.load = drill.load);
    glo.define || (glo.define = drill.define);
    glo.task || (glo.task = drill.task);
    glo.init || (glo.init = drill.init);

    // 初始化版本号
    var cScript = document.currentScript;
    !cScript && (cScript = document.querySelector(['drill-cache']));

    if (cScript) {
        var cacheVersion = cScript.getAttribute('drill-cache');
        cacheVersion && (drill.cacheInfo.v = cacheVersion);
    }

    // 判断全局是否存在变量 drill
    var gloDrill = glo.drill;

    // 定义全局drill
    Object.defineProperty(glo, 'drill', {
        get: function get() {
            return drill;
        },
        set: function set(func) {
            if (isFunction(func)) {
                func(drill);
            } else {
                console.error('drill type error =>', func);
            }
        }
    });

    // 执行全局的 drill函数
    gloDrill && gloDrill(drill);
})(window);