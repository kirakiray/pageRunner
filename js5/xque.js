"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (glo) {
    "use strict";

    // 全局存在 jQuery 的情况下，就不瞎折腾了

    if (glo.$) {
        return;
    }

    // COMMON
    var DOCUMENT = document;
    var STR_string = "string";
    var STR_array = "array";

    var FALSE = !1;
    var TRUE = !0;
    var UNDEFINED = undefined;

    // function
    // 获取类型
    var objToString = Object.prototype.toString;
    var getType = function getType(value) {
        return objToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    };

    // 是否函数(包括异步函数)
    var isFunction = function isFunction(v) {
        return getType(v).search('function') > -1;
    };

    var isString = function isString(v) {
        return getType(v) === "string";
    };

    // 是否 undefined
    var isUndefined = function isUndefined(v) {
        return v === undefined;
    };

    // 是否像数组（包括数组）
    var isArrayLike = function isArrayLike(obj) {
        return !isUndefined(obj) && getType(obj.length) === "number" && obj.length >= 0 && !isFunction(obj) && !isString(obj);
    };

    var isElement = function isElement(obj) {
        return obj instanceof Element || obj == glo;
    };

    var defineProperty = Object.defineProperty,
        assign = Object.assign;

    // 生成数组

    var makeArray = function makeArray(arr) {
        return Array.from(arr);
    };

    // 获得随机id
    var getRandomId = function getRandomId() {
        return Math.random().toString(32).substr(2);
    };

    // 合并数组
    var merge = function merge(mainArr, arr2) {
        return mainArr.splice.apply(mainArr, [mainArr.length, 0].concat(_toConsumableArray(arr2)));
    };

    // 删除数组内的某项
    var removeByArr = function removeByArr(arr, tar) {
        var id = arr.indexOf(tar);
        if (id > -1) {
            arr.splice(id, 1);
        }
    };

    // 遍历
    var _each = function _each(arr, func) {
        return arr.some(function (e, i) {
            return func(e, i) === FALSE;
        });
    };

    // 获取样式
    var getStyle = getComputedStyle;

    // 拆分空格参数
    var splitSpace = function splitSpace(value, func) {
        var vArr = value.split(' ');
        _each(vArr, function (e) {
            return func(e);
        });
    };

    // 关键key
    var XQUEKEY = "XQUE_" + getRandomId();
    var XQUEEVENTKEY = XQUEKEY + "_event";

    // 单个参数的拆分固定式
    // getFunc 非必须
    // isReturnGetFunc 是否返回 getFunc 函数
    var singleIn = function singleIn(targets, value, func, getFunc, isReturnGetFunc) {
        // 获取值的类型
        var v_isFunc = isFunction(value);

        if (!isUndefined(value)) {
            // 遍历对象
            _each(targets, function (e, i) {
                // 获取值
                var before_val = void 0;
                if (v_isFunc) {
                    before_val = value.call(e, i, getFunc && getFunc(e));
                } else {
                    before_val = value;
                }
                if (!isUndefined(before_val)) {
                    func(e, before_val, i);
                }
            });
        } else {
            // 属于获取值
            if (isReturnGetFunc) {
                return getFunc(targets[0]);
            }
        }

        return targets;
    };

    // 两个参数的拆分固定式
    var pairIn = function pairIn(targets, args, setCall, getCall) {
        // 获取两个参数
        var _args = _slicedToArray(args, 2),
            arg1 = _args[0],
            arg2 = _args[1];

        // 获取第一个参数的类型


        var a1Type = getType(arg1);

        if (a1Type == "object") {
            var _loop = function _loop(i) {
                _each(targets, function (e) {
                    setCall(e, i, arg1[i]);
                });
            };

            // 对象类型，遍历代入
            for (var i in arg1) {
                _loop(i);
            }
        } else if (isFunction(arg2)) {
            // 如果参数2是函数
            _each(targets, function (e, i) {
                arg2.call(e, i, getCall(e, arg1));
            });
        } else if (isUndefined(arg2)) {
            // 不存在第二个参数，属于返回值
            return getCall(targets[0], arg1);
        } else {
            //普通类型，直接代入
            _each(targets, function (e) {
                setCall.apply(undefined, [e].concat(_toConsumableArray(args)));
            });
        }

        // 返回targets
        return targets;
    };

    // 修正数字类型变成像素字符串
    var fixNumber = function fixNumber(value) {
        return getType(value) == "number" ? value + "px" : value;
    };

    // main function
    // 查找元素
    var findElement = function findElement(selector) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DOCUMENT;
        return makeArray(context.querySelectorAll(selector));
    };

    // 转换元素
    var parseDom = function parseDom(str) {
        var par = DOCUMENT.createElement('div');
        par.innerHTML = str;
        var childs = makeArray(par.childNodes);
        return childs.filter(function (e) {
            var isInText = e instanceof Text;
            if (!isInText || e.textContent && e.textContent.trim()) {
                return e;
            }
        });
    };

    // 判断元素是否符合条件
    var meetsEle = function meetsEle(ele, expr) {
        if (ele === expr) {
            return !0;
        }
        var fadeParent = DOCUMENT.createElement('div');
        if (ele === DOCUMENT) {
            return false;
        }
        fadeParent.appendChild(ele.cloneNode(false));
        return 0 in findElement(expr, fadeParent) ? true : false;
    };

    // 获取元素的数据
    var getData = function getData(ele) {
        return ele[XQUEKEY] || (ele[XQUEKEY] = {});
    };

    // 获取事件数据对象
    var getEventData = function getEventData(ele) {
        return ele[XQUEEVENTKEY] || (ele[XQUEEVENTKEY] = {});
    };

    // main
    // 主体class
    // 只接受数组
    function XQue() {
        var elems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        merge(this, elems);
    }

    // 从属数组类型
    var xQuePrototype = Object.create(Array.prototype);

    // 合并方法
    assign(xQuePrototype, {
        // addClass(val) {
        //     return singleIn(this, val, (target, value) => {
        //         splitSpace(value, value => {
        //             target.classList.add(value);
        //         });
        //     }, target => target.classList.value);
        // },
        // removeClass(val) {
        //     return singleIn(this, val, (target, value) => {
        //         splitSpace(value, value => {
        //             target.classList.remove(value);
        //         });
        //     }, target => target.classList.value);
        // },
        // toggleClass(val) {
        //     return singleIn(this, val, (target, value) => {
        //         splitSpace(value, value => {
        //             target.classList.toggle(value);
        //         });
        //     }, target => target.classList.value);
        // },
        attr: function attr() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return pairIn(this, args, function (target, key, value) {
                target.setAttribute(key, value);
            }, function (target, key) {
                return target.getAttribute(key);
            });
        },
        removeAttr: function removeAttr(val) {
            return singleIn(this, val, function (target, value) {
                splitSpace(value, function (value) {
                    target.removeAttribute(value);
                });
            });
        },
        prop: function prop() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return pairIn(this, args, function (target, key, value) {
                target[key] = value;
            }, function (target, key) {
                return target[key];
            });
        },
        removeProp: function removeProp(val) {
            return singleIn(this, val, function (target, value) {
                splitSpace(value, function (value) {
                    delete target[value];
                });
            });
        },
        data: function data() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return pairIn(this, args, function (target, key, value) {
                getData(target)[key] = value;
            }, function (target, key) {
                var data = {};
                assign(data, target.dataset);
                assign(data, getData(target));
                return data[key];
            });
        },
        removeData: function removeData(val) {
            return singleIn(this, val, function (target, value) {
                splitSpace(value, function (value) {
                    delete getData(target)[value];
                });
            });
        },
        css: function css() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return pairIn(this, args, function (target, key, value) {
                if (String(getStyle(target)[key]).indexOf('px') > -1) {
                    value = fixNumber(value);
                }
                target.style[key] = value;
            }, function (target, key) {
                return getStyle(target)[key];
            });
        },
        text: function text(val) {
            return singleIn(this, val, function (target, value) {
                target.textContent = value;
            }, function (target) {
                return target.textContent;
            }, 1);
        },
        html: function html(val) {
            return singleIn(this, val, function (target, value) {
                target.innerHTML = value;
            }, function (target) {
                return target.innerHTML;
            }, 1);
        },
        val: function val(_val) {
            // let r = singleIn(this, val, (target, value) => {
            //     target.value = value;
            // }, (target) => {
            //     return target.value
            // }, 1);
            // return r;
            return singleIn(this, _val, function (target, value) {
                target.value = value;
            }, function (target) {
                return target.value;
            }, 1);
        },
        each: function each(callback) {
            _each(this, function (e, i) {
                callback.call(e, i, e);
            });
            return this;
        },
        index: function index(ele) {
            var owner = void 0,
                tar = void 0;
            if (!ele) {
                tar = this[0];
                owner = makeArray(tar.parentNode.children);
            } else if (ele.nodeType) {
                tar = ele;
                owner = this;
            } else if (ele instanceof $) {
                tar = ele[0];
                owner = this;
            } else if (getType(ele) === STR_string) {
                tar = this[0];
                owner = $(ele);
            }
            return owner.indexOf(tar);
        },
        extend: function extend(obj) {
            assign(xQuePrototype, obj);
        }
    });

    // class操作
    var classControlObj = {
        addClass: function addClass(target, value) {
            target.classList.add(value);
        },
        removeClass: function removeClass(target, value) {
            target.classList.remove(value);
        },
        toggleClass: function toggleClass(target, value) {
            target.classList.toggle(value);
        }
    };

    var _loop2 = function _loop2(funcName) {
        // 获取函数
        var func = classControlObj[funcName];

        // 初始化操作
        xQuePrototype[funcName] = function (val) {
            return singleIn(this, val, function (target, value) {
                splitSpace(value, function (value) {
                    func(target, value);
                });
            }, function (target) {
                return target.classList.value;
            });
        };
    };

    for (var funcName in classControlObj) {
        _loop2(funcName);
    }

    var eachContext = function eachContext(context, callback) {
        if (isArrayLike(context)) {
            _each(makeArray(context), function (ele) {
                callback(ele);
            });
        } else {
            callback(context);
        }
    };

    // 外部方法
    var $ = function $(selector, context) {
        // 获取type
        var type = getType(selector);

        // 元素
        var elems = [];

        // 针对不同类型做处理
        switch (type) {
            case STR_string:
                if (selector.search('<') > -1) {
                    elems = parseDom(selector);
                } else {
                    eachContext(context, function (ele) {
                        var eles = findElement(selector, ele);
                        merge(elems, eles);
                    });
                }
                break;
            case STR_array:
                elems = selector;
                break;
            default:
                if (selector instanceof Element || selector === glo) {
                    elems = [selector];
                } else if (isArrayLike(selector)) {
                    // 类数组
                    elems = makeArray(selector);
                } else if (isFunction(selector)) {
                    // 属于函数
                    if (DOCUMENT.readyState === "complete") {
                        selector($);
                    } else {
                        DOCUMENT.addEventListener('DOMContentLoaded', function () {
                            selector($);
                        }, false);
                    }
                    elems = [DOCUMENT];
                } else if (selector) {
                    if (context && isElement(selector)) {
                        eachContext(context, function (ele) {
                            var selectorTagName = selector.tagName.toLowerCase();
                            var findEles = findElement(selectorTagName, ele);
                            _each(findEles, function (e) {
                                selector === e && elems.push(e);
                            });
                        });
                    } else {
                        // 其他类型
                        elems = [selector];
                    }
                }
        }

        return new XQue(elems);
    };

    // 修正为元素
    var fixToEle = function fixToEle(tars, val, func) {
        // 获取需要添加目标元素的长度
        var tarLen = tars.length;

        return singleIn(tars, val, function (target, value) {
            // 获取 value 类型
            var valueType = getType(value);

            // 减去长度计量器
            tarLen--;

            // 最后要添加进去的类型
            var eles = value;

            // 根据不同数据类型进行转换
            if (valueType === STR_string) {
                // 转换字符串类型
                eles = parseDom(value);
            } else if (isElement(value)) {
                // 判断是否元素，是的话进行克隆
                eles = [value];
            }

            // 修正元素数组
            if (tarLen > 0) {
                eles = [].map.call(eles, function (e) {
                    return e.cloneNode(true);
                });
            }

            // 全部添加进去
            _each(eles, function (ele) {
                func(target, ele);
            });
        }, function (target) {
            return target.innerHTML;
        });
    };

    // 映射$实例数据
    var mapClone = function mapClone(cloneEle, ele) {
        // 自定义数据
        cloneEle[XQUEKEY] = assign({}, getData(ele));

        // 自定义事件
        var eveData = getEventData(ele);
        var cloneEveData = getEventData(cloneEle);

        var _loop3 = function _loop3(eventName) {
            var eves = eveData[eventName];
            var cloneEves = cloneEveData[eventName] = [];

            _each(eves, function (eData) {
                var cloneEData = assign({}, eData);
                cloneEves.push(cloneEData);
                cloneEle.addEventListener(eventName, cloneEData.handle);
            });
        };

        for (var eventName in eveData) {
            _loop3(eventName);
        }
    };

    // 映射子元素
    var mapCloneToChilds = function mapCloneToChilds(cloneEle, ele) {
        var cloneChilds = Array.from(cloneEle.children);
        var childs = ele.children;

        _each(cloneChilds, function (cloneEle, i) {
            var ele = childs[i];
            mapClone(cloneEle, ele);

            // 递归
            mapCloneToChilds(cloneEle, ele);
        });
    };

    // 节点操控方法
    Object.assign(xQuePrototype, {
        append: function append(val) {
            return fixToEle(this, val, function (target, ele) {
                target.appendChild(ele);
            });
        },
        prepend: function prepend(val) {
            return fixToEle(this, val, function (target, ele) {
                target.insertBefore(ele, target.firstChild);
            });
        },
        before: function before(val) {
            return fixToEle(this, val, function (target, ele) {
                target.parentNode.insertBefore(ele, target);
            });
        },
        after: function after(val) {
            return fixToEle(this, val, function (target, ele) {
                var parnode = target.parentNode;
                if (parnode.lastChild === target) {
                    parnode.appendChild(ele);
                } else {
                    parnode.insertBefore(ele, target.nextSibling);
                }
            });
        },
        wrap: function wrap(val) {
            return fixToEle(this, val, function (target, ele) {
                target.parentNode.insertBefore(ele, target);
                ele.appendChild(target);
            });
        },
        unwrap: function unwrap() {
            var arr = [];
            _each(this, function (e) {
                var par = e.parentNode;
                par.parentNode.insertBefore(e, par);
                if (arr.indexOf(par) === -1) {
                    arr.push(par);
                }
            });
            $(arr).remove();
            return this;
        },
        wrapInner: function wrapInner(val) {
            return fixToEle(this, val, function (target, ele) {
                _each(makeArray(target.childNodes), function (e2) {
                    ele.appendChild(e2);
                });
                target.appendChild(ele);
            });
        },
        wrapAll: function wrapAll(val) {
            if (isString(val)) {
                val = parseDom(val);
            }
            var tar = this.eq(0);
            tar.before(val = $(val));
            _each(this, function (e) {
                return val.append(e);
            });
            return this;
        },
        replaceWith: function replaceWith(val) {
            return this.before(val).remove();
        },
        empty: function empty() {
            _each(this, function (e) {
                e.innerHTML = "";
            });
        },
        remove: function remove(expr) {
            _each(this, function (e) {
                if (expr) {
                    if (!meetsEle(e, expr)) return;
                }
                e.parentNode.removeChild(e);
            });
        },
        clone: function clone(withData, deepData) {
            return this.map(function (i, ele) {
                var cloneEle = ele.cloneNode(TRUE);

                // 深复制当前元素
                if (withData) {
                    mapClone(cloneEle, ele);
                }

                // 深复制子元素
                if (deepData) {
                    mapCloneToChilds(cloneEle, ele);
                }
                return cloneEle;
            });
        }
    });

    var dom_in_turn_Obj = {
        append: "appendTo",
        prepend: "prependTo",
        after: "insertAfter",
        before: "insertBefore",
        replaceWith: "replaceAll"
    };

    var _loop4 = function _loop4(k) {
        // 获取要定义的函数名
        var funcName = dom_in_turn_Obj[k];

        // 参数调转
        xQuePrototype[funcName] = function (content) {
            $(content)[k](this);
        };
    };

    for (var k in dom_in_turn_Obj) {
        _loop4(k);
    }

    // 盒模型相关方法
    // width height innerWidth innerHeight outerWidth outerHeight
    // 获取样式像素值
    var getStylePx = function getStylePx(target, styleName) {
        return parseFloat(getStyle(target)[styleName]);
    };

    _each([{
        'Width': ['left', 'right']
    }, {
        'Height': ['top', 'bottom']
    }], function (obj) {
        var _loop5 = function _loop5(fName) {
            // 小写名
            var lowCaseFName = fName.toLowerCase();

            // 设置小写值方法
            xQuePrototype[lowCaseFName] = function (value) {
                return singleIn(this, value, function (target, value) {
                    value = fixNumber(value);
                    target.style[lowCaseFName] = value;
                }, function (target) {
                    return getStylePx(target, lowCaseFName);
                }, 1);
            };

            // 获取目标关键词
            var keyArr = obj[fName];

            // 带关卡性的获取值
            // 原始值必带，首个参数是target，往后顺序是是否需要 padding border margin
            var getFunc = function getFunc(target, hasPadding, hasBorder, hasMargin) {
                // 原始值
                var oriVal = getStylePx(target, lowCaseFName);

                _each(keyArr, function (k) {
                    // padding
                    hasPadding && (oriVal += getStylePx(target, 'padding-' + k));

                    // border
                    hasBorder && (oriVal += getStylePx(target, 'border-' + k + "-width"));

                    // margin
                    hasMargin && (oriVal += getStylePx(target, 'margin-' + k));
                });

                return oriVal;
            };

            // 获取inner值方法
            var innerFunc = xQuePrototype['inner' + fName] = function () {
                return getFunc(this[0], 1);
            };

            xQuePrototype['outer' + fName] = function (bool) {
                return getFunc(this[0], 1, 1, bool);
            };
        };

        for (var fName in obj) {
            _loop5(fName);
        }
    });

    Object.assign(xQuePrototype, {
        // 已取消使用offset设定定位的方法，请用好的css布局来调整定位
        offset: function offset() {
            // 获取目标
            var tar = this[0];
            var top = 0,
                left = 0;
            do {
                top += tar.offsetTop;
                left += tar.offsetLeft;
                tar = tar.offsetParent;
            } while (tar);

            return {
                top: top,
                left: left
            };
        },
        position: function position() {
            var tar = this[0];
            return {
                top: tar.offsetTop,
                left: tar.offsetLeft
            };
        },
        scrollTop: function scrollTop(val) {
            return singleIn(this, val, function (target, value) {
                target.scrollTop = value;
            }, function (target) {
                return target.scrollTop;
            }, 1);
        },
        scrollLeft: function scrollLeft(val) {
            return singleIn(this, val, function (target, value) {
                target.scrollLeft = value;
            }, function (target) {
                return target.scrollLeft;
            }, 1);
        }
    });

    var filterBase = function filterBase(tars, val, meetcall, notmeetcall) {
        var arr = [];
        if (isString(val)) {
            _each(tars, function (ele) {
                if (meetsEle(ele, val)) {
                    meetcall && meetcall(arr, ele);
                } else {
                    notmeetcall && notmeetcall(arr, ele);
                }
            });
        } else if (isArrayLike(val)) {
            _each(tars, function (ele) {
                _each(val, function (val) {
                    if (ele === val) {
                        meetcall && meetcall(arr, ele);
                    } else {
                        notmeetcall && notmeetcall(arr, ele);
                    }
                });
            });
        } else if (isElement(val)) {
            _each(tars, function (ele) {
                if (val === ele) {
                    meetcall && meetcall(arr, ele);
                } else {
                    notmeetcall && notmeetcall(arr, ele);
                }
            });
        } else if (isFunction(val)) {
            _each(tars, function (ele, i) {
                if (val.call(ele, i, ele)) {
                    meetcall && meetcall(arr, ele);
                } else {
                    notmeetcall && notmeetcall(arr, ele);
                }
            });
        }
        return $(arr);
    };

    var propKey = function propKey(expr, key, tars) {
        var arr = [];
        _each(tars, function (tar) {
            tar = tar[key];
            if (!tar || arr.indexOf(tar) != -1 || expr && !meetsEle(tar, expr)) {
                return;
            }
            arr.push(tar);
        });
        return $(arr);
    };

    var nuExpr = function nuExpr(tars, key, filter, lastExpr) {
        var arr = [];
        var _getEle = function getEle(tar) {
            var nextEle = tar[key];
            if (nextEle) {
                if (lastExpr) {
                    if (getType(lastExpr) === STR_string && meetsEle(nextEle, lastExpr) || lastExpr === nextEle || lastExpr instanceof Array && lastExpr.indexOf(nextEle) > -1) {
                        return;
                    }
                }
                if ((!filter || meetsEle(nextEle, filter)) && arr.indexOf(nextEle) === -1) {
                    arr.push(nextEle);
                }
                _getEle(nextEle);
            }
        };
        _each(tars, function (tar) {
            _getEle(tar);
        });
        _getEle = null;
        return $(arr);
    };

    assign(xQuePrototype, {
        slice: function slice() {
            var _slice;

            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            var newArr = (_slice = [].slice).call.apply(_slice, [this].concat(args));
            return $(newArr);
        },
        eq: function eq(index) {
            return this.slice(index, parseInt(index) + 1 || undefined);
        },
        first: function first() {
            return this.eq(0);
        },
        last: function last() {
            return this.eq(-1);
        },
        get: function get(index) {
            if (isUndefined(index)) {
                return makeArray(this);
            } else {
                return this[index];
            }
        },
        hasClass: function hasClass(val) {
            // 默认没有
            var hasClass = !1;
            _each(this, function (e) {
                e.classList.contains(val) && (hasClass = !0);
            });
            return hasClass;
        },

        // 筛选器
        filter: function filter(val) {
            return filterBase(this, val, function (arr, ele) {
                return arr.push(ele);
            });
        },

        // 否定版的筛选器
        not: function not(val) {
            return filterBase(this, val, 0, function (arr, ele) {
                return arr.push(ele);
            });
        },

        // 是否存在表达式内的元素
        is: function is(val) {
            return 0 in this.filter(val);
        },
        map: function map(callback) {
            var arr = [];
            _each(this, function (e, i) {
                arr.push(callback(i, e));
            });
            return $(arr);
        },
        find: function find(expr) {
            return $(expr, this);
        },
        has: function has(expr) {
            var arr = [];
            _each(this, function (e) {
                0 in $(expr, e) && arr.push(e);
            });
            return $(arr);
        },
        children: function children(expr) {
            var eles = [];
            _each(this, function (e) {
                e.nodeType && _each(makeArray(e.children), function (e) {
                    if (expr) {
                        meetsEle(e, expr) && eles.push(e);
                    } else {
                        eles.push(e);
                    }
                });
            });
            return $(eles);
        },
        next: function next(expr) {
            return propKey(expr, "nextElementSibling", this);
        },
        prev: function prev(expr) {
            return propKey(expr, "previousElementSibling", this);
        },
        parent: function parent(expr) {
            return propKey(expr, "parentNode", this);
        },
        nextAll: function nextAll(filter) {
            return nuExpr(this, 'nextElementSibling', filter);
        },
        prevAll: function prevAll(filter) {
            return nuExpr(this, 'previousElementSibling', filter);
        },
        parents: function parents(filter) {
            return nuExpr(this, 'parentNode', filter, DOCUMENT);
        },
        nextUntil: function nextUntil(lastExpr, filter) {
            return nuExpr(this, 'nextElementSibling', filter, lastExpr);
        },
        prevUntil: function prevUntil(lastExpr, filter) {
            return nuExpr(this, 'previousElementSibling', filter, lastExpr);
        },
        parentsUntil: function parentsUntil(lastExpr, filter) {
            return nuExpr(this, 'parentNode', filter, lastExpr);
        },
        closest: function closest(selector) {
            var parentEles = $(selector).parent();
            return this.parentsUntil(parentEles, selector);
        },
        siblings: function siblings(expr) {
            var _this = this;
            return this.parent().children(expr).filter(function () {
                if (_this.indexOf(this) === -1) return true;
            });
        },
        offsetParent: function offsetParent() {
            var arr = [];
            _each(this, function (e) {
                arr.push(e.offsetParent || DOCUMENT.body);
            });
            return $(arr);
        }
    });

    // jQuery 专用 Event原型对象
    var eventPrototype = {
        preventDefault: function preventDefault() {
            this._pD();
        },
        isDefaultPrevented: function isDefaultPrevented() {
            return this.defaultPrevented;
        },
        stopPropagation: function stopPropagation() {
            this._sP();
        },
        isPropagationStopped: function isPropagationStopped() {
            return this.cancelBubble;
        },
        stopImmediatePropagation: function stopImmediatePropagation() {
            this.isImmediatePropagationStopped = function () {
                return TRUE;
            };
            this._sIP();
        },

        isImmediatePropagationStopped: function isImmediatePropagationStopped() {
            return FALSE;
        }
    };

    // 初始化Event成jQuery.Event那样
    var initEvent = function initEvent(event) {
        if (!event._pD) {
            Object.defineProperties(event, {
                _pD: {
                    value: event.preventDefault
                },
                _sP: {
                    value: event.stopPropagation
                },
                _sIP: {
                    value: event.stopImmediatePropagation
                }
            });
            Object.assign(event, eventPrototype);
        }
        return event;
    };

    var MOUSEEVENT = MouseEvent;
    var TOUCHEVENT = glo.TouchEvent || Event;
    // 修正 Event class 用的数据表
    var eventsMap = {
        click: MOUSEEVENT,
        mousedown: MOUSEEVENT,
        mouseup: MOUSEEVENT,
        mousemove: MOUSEEVENT,
        mouseenter: MOUSEEVENT,
        mouseleave: MOUSEEVENT,
        touchstart: TOUCHEVENT,
        touchend: TOUCHEVENT,
        touchmove: TOUCHEVENT
    };

    // 优先执行原生方法的方法名
    var realEvents = ['focus', 'blur'];

    // 生成Event
    var createEvent = $.Event = function (type, eventInit) {
        var TarEvent = eventsMap[type] || Event;
        return initEvent(new TarEvent(type, eventInit));
    };

    // 获取事件数据
    var getEventTypeData = function getEventTypeData(ele, type) {
        var data = getEventData(ele);
        return data[type] || (data[type] = []);
    };

    // 触发事件
    var _trigger = function _trigger(eles, type, data, isHandle) {
        _each(eles, function (ele) {
            if (isElement(ele)) {
                // 优先型的主动触发事件判断
                // 没有数据绑定
                if (!isHandle && !data && realEvents.indexOf(type) > -1 && isFunction(ele[type])) {
                    ele[type]();
                    return;
                }

                var event = void 0;
                if (type instanceof Event) {
                    event = type;
                } else {
                    // 获取事件对象
                    if (!isHandle) {
                        event = createEvent(type, {
                            bubbles: TRUE,
                            cancelable: TRUE
                        });
                    } else {
                        event = new Event(type, {
                            bubbles: FALSE,
                            cancelable: TRUE
                        });
                    }
                }

                data && defineProperty(event, '_argData', {
                    value: data
                });

                // 触发事件
                ele.dispatchEvent(event);
            } else {
                // 自定义数据
                // 获取事件对象
                var eveArr = getEventTypeData(ele, type);

                // 新的事件数组
                var newArr = [];

                var isBreak = 0;
                // 遍历事件数组
                _each(eveArr, function (fData) {
                    // 不是一次性的就加入
                    if (!fData.isOne) {
                        newArr.push(fData);
                    }

                    // 是否弹出
                    if (isBreak) {
                        return;
                    }

                    // 生成 event对象
                    var event = createEvent(type);

                    // 参数修正
                    var args = [event];
                    if (data) {
                        args.push(data);
                    }

                    // 判断是否有on上的data
                    var onData = fData.data;
                    if (!isUndefined(onData)) {
                        event.data = onData;
                    }

                    // 触发callback
                    fData.fn.apply(fData, args);

                    // 删除数据
                    delete event.data;

                    // 判断是否不用进行下去了
                    if (event.isImmediatePropagationStopped()) {
                        isBreak = 1;
                    }
                });

                // 重新设置事件对象数据
                var eventBase = getEventData(ele);
                eventBase[type] = newArr;
            }
        });
        return eles;
    };

    // 事件注册
    var _on = function _on(eles, events, selector, data, fn, isOne) {
        // 事件字符串拆分
        events = events.split(' ');

        // 修正变量
        if (isFunction(selector)) {
            fn = selector;
            selector = data = UNDEFINED;
        } else {
            // 判断selector是data还是selector
            if (isString(selector)) {
                // 是selector
                // 判断data是 fn 还是 data
                if (isFunction(data)) {
                    fn = data;
                    data = UNDEFINED;
                }
            } else {
                fn = data;
                data = selector;
                selector = UNDEFINED;
            }
        }

        // 没有注册函数就别瞎搅和了
        if (!fn) {
            console.error('no function =>', fn);
            return;
        }

        _each(eles, function (ele) {
            _each(events, function (eventName) {
                // 事件函数寄存对象
                var funcData = {
                    fn: fn,
                    isOne: isOne,
                    data: data,
                    selector: selector
                };

                // 属于事件元素
                if (isElement(ele)) {
                    var eventHandle = function eventHandle(e) {
                        // 初始化事件对象
                        initEvent(e);

                        // 自定义函数数据
                        !isUndefined(data) && (e.data = data);

                        // 原始数据
                        e.originalEvent = e;

                        var argData = e._argData;
                        if (argData && !isArrayLike(argData)) {
                            argData = [argData];
                        }

                        // 目标
                        var tar = this;

                        // 是否可以运行
                        var canRun = 1;

                        if (selector) {
                            var currentTarget = $(e.target).parents(selector);
                            if (0 in currentTarget) {
                                tar = currentTarget[0];
                            } else if (meetsEle(e.target, selector)) {
                                tar = e.target;
                            } else {
                                canRun = 0;
                            }
                        }

                        if (canRun) {
                            // 执行事件函数
                            if (argData) {
                                var _fn;

                                (_fn = fn).call.apply(_fn, [tar, e].concat(_toConsumableArray(argData)));
                            } else {
                                fn.call(tar, e);
                            }
                        }

                        // 删除事件实例上的自定义数据
                        delete e.data;
                        delete e.originalEvent;

                        // 判断是否一次性事件
                        if (isOne) {
                            ele.removeEventListener(eventName, eventHandle);
                        }
                    };

                    // 寄存eventHandle
                    funcData.handle = eventHandle;

                    ele.addEventListener(eventName, eventHandle);
                }

                // 获取事件数组对象
                var eventArr = getEventTypeData(ele, eventName);

                // 添加入事件数组
                eventArr.push(funcData);
            });
        });

        return eles;
    };

    var _off = function _off(eles, events, selector, fn) {
        if (events) {
            // 事件字符串拆分
            events = events.split(' ');

            // 判断 是不是selector
            if (!fn && isFunction(selector)) {
                fn = selector;
                selector = UNDEFINED;
            }
        }

        _each(eles, function (ele) {
            // eventBase
            var eventBase = getEventData(ele);

            if (!events) {
                if (isElement(ele)) {
                    var _loop6 = function _loop6(eventName) {
                        var eveArr = eventBase[eventName];
                        _each(eveArr, function (tar) {
                            ele.removeEventListener(eventName, tar.handle);
                        });
                    };

                    for (var eventName in eventBase) {
                        _loop6(eventName);
                    }
                }
                // 注销全部事件
                ele[XQUEEVENTKEY] = {};
                return;
            }

            _each(events, function (eventName) {
                var eveArr = getEventTypeData(ele, eventName);

                if (isElement(ele)) {
                    if (fn) {
                        var tar = eveArr.find(function (e) {
                            return e.fn === fn && e.selector === selector;
                        });

                        if (tar) {
                            // 注销事件并移除函数
                            ele.removeEventListener(eventName, tar.handle);
                            removeByArr(eveArr, tar);
                        }
                    } else {
                        // 注销所有事件
                        _each(eveArr, function (tar) {
                            ele.removeEventListener(eventName, tar.handle);
                        });
                        // 清空数组
                        eventBase[eventName] = [];
                    }
                } else {
                    if (fn) {
                        // 移除函数
                        removeByArr(eveArr, fn);
                    } else {
                        // 清空数组
                        eventBase[eventName] = [];
                    }
                }
            });
        });

        return eles;
    };

    Object.assign(xQuePrototype, {
        // 注册事件
        on: function on(events, selector, data, fn) {
            // 事件注册
            return _on(this, events, selector, data, fn);
        },
        one: function one(events, data, fn) {
            // 事件注册
            return _on(this, events, UNDEFINED, data, fn, 1);
        },
        off: function off(events, selector, fn) {
            return _off(this, events, selector, fn);
        },
        trigger: function trigger(type, data) {
            return _trigger(this, type, data);
        },
        triggerHandler: function triggerHandler(type, data) {
            return _trigger(this, type, data, 1);
        },
        bind: function bind(types, data, fn) {
            return this.on(types, data, fn);
        },
        unbind: function unbind(types, fn) {
            return this.off(types, fn);
        },
        hover: function hover(fnOver, fnOut) {
            return this.on('mouseenter', fnOver).on('mouseleave', fnOut || fnOver);
        }
    });

    // 一众事件
    _each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (eventName) {
        xQuePrototype[eventName] = function (callback) {
            callback ? this.on(eventName, callback) : this.trigger(eventName);
            return this;
        };
    });

    // 使用xhr和promise实现的ajax，和jQuery的ajax不一样，它是返回promise实例，但比fetch api多了pending状态监听
    var ajaxDefaults = {
        url: "",
        type: "GET",
        data: "",
        crossDomain: FALSE,
        dataType: "",
        headers: {},
        timeout: 100000,
        username: null,
        password: null,
        contentType: "json"
    };

    var ajax = function ajax(options) {
        var defaults = assign({}, ajaxDefaults);
        assign(defaults, options);

        // 转大写
        defaults.type = defaults.type.toUpperCase();

        var url = defaults.url,
            contentType = defaults.contentType,
            data = defaults.data;

        // 修正form数据类型

        if (data instanceof FormData) {
            contentType = "form";
        } else if (contentType.indexOf('form') > -1) {
            // 转换 object to Formdata
            var fdata = new FormData();
            for (var name in data) {
                fdata.append(name, data[name]);
            }
            data = fdata;
        }

        switch (defaults.type) {
            case "GET":
                // get是没有的
                contentType = "";
                // 转换数据
                var dataUrlencode = objectToUrlencode(data);
                url += (url.indexOf("?") > -1 ? url += "&" : "?") + dataUrlencode;
                data = null;
                break;
            case "POST":
                var charsetutf8 = '; charset=UTF-8';
                // 修正contentType
                // application/json; multipart/form-data; application/x-www-form-urlencoded; text/xml;
                if (contentType.indexOf('json') > -1) {
                    contentType = "application/json" + charsetutf8;
                    data = JSON.stringify(data);
                } else if (contentType.indexOf('urlencoded') > -1) {
                    contentType = "application/x-www-form-urlencoded" + charsetutf8;
                    data = objectToUrlencode(data);
                } else if (contentType.indexOf('form') > -1) {
                    contentType = "multipart/form-data" + charsetutf8;
                } else if (contentType.indexOf('xml') > -1) {
                    contentType = "text/xml" + charsetutf8;
                }
                break;
        }

        // 事件寄存对象
        var eveObj = $({});

        // 实例
        var oReq = new XMLHttpRequest();
        // 要返回回去的promise
        var reP = new Promise(function (res, rej) {
            // 设置请求
            oReq.open(defaults.type, url, TRUE, defaults.username, defaults.password);

            // 设置 header
            var headers = defaults.headers;

            for (var k in headers) {
                oReq.setRequestHeader(k, headers[k]);
            }

            // 设置contentType
            contentType && oReq.setRequestHeader("Content-Type", contentType);

            // 设置返回数据类型
            oReq.responseType = defaults.dataType;

            // 跨域是否带上cookie
            oReq.withCredentials = defaults.crossDomain;

            // 超时时间设定
            oReq.timeout = defaults.timeout;

            // 设置callback
            oReq.addEventListener('load', function (e) {
                var target = e.target;
                var response = e.target.response;

                // 修正返回数据类型

                var responseContentType = target.getResponseHeader('content-type');
                if (responseContentType && responseContentType.indexOf("application/json") > -1 && (typeof response === "undefined" ? "undefined" : _typeof(response)) != "object") {
                    response = JSON.parse(response);
                }
                res(response);
            }, FALSE);
            oReq.addEventListener('error', function (e) {
                rej();
            }, FALSE);
            oReq.addEventListener("progress", function (e) {
                eveObj.trigger('loading', e);
            }, FALSE);
            oReq.upload && oReq.upload.addEventListener("progress", function (e) {
                eveObj.trigger('uploading', e);
            }, FALSE);
        });

        assign(reP, {
            // 加载中
            loading: function loading(func) {
                eveObj.on('loading', function (e, data) {
                    return func(data);
                });
                return reP;
            },

            // 上传中
            uploading: function uploading(func) {
                eveObj.on('uploading', function (e, data) {
                    return func(data);
                });
                return reP;
            },

            // 发送前
            beforeSend: function beforeSend(func) {
                // 直接进去函数
                func(oReq);
                return reP;
            }
        });

        // 异步发送请求
        setTimeout(function () {
            data ? oReq.send(data) : oReq.send();
        }, 0);

        // 返回参数
        reP.options = defaults;

        return reP;
    };

    // 转换成urlencode
    var objectToUrlencode = function objectToUrlencode(obj) {
        var headerStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var isParam = arguments[2];

        var str = "";
        for (var k in obj) {
            var val = obj[k];
            if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
                if (headerStr) {
                    str += objectToUrlencode(val, headerStr + "[" + k + "]", isParam);
                } else {
                    str += objectToUrlencode(val, k, isParam);
                }
            } else {
                if (headerStr) {
                    if (obj instanceof Array) {
                        k = "";
                    }
                    k = headerStr + ("[" + k + "]");
                }
                if (!isParam) {
                    k = encodeURIComponent(k);
                    val = encodeURIComponent(val);
                }
                str += k + "=" + val + "&";
            }
        }

        if (!headerStr) {
            // 去掉最后的 &
            str = str.replace(/&$/g, "");
        }
        return str;
    };

    var ajaxSetup = function ajaxSetup(options) {
        assign(ajaxDefaults, options);
    };

    assign($, {
        ajax: ajax,
        ajaxSetup: ajaxSetup,
        param: function param(obj) {
            return objectToUrlencode(obj, "", 1);
        }
    });

    _each(['get', 'post'], function (name) {
        $[name] = function (url, data, dataType) {
            var options = {
                url: url,
                type: name.toUpperCase(),
                data: data
            };
            dataType && (options.dataType = dataType);
            return ajax(options);
        };
    });

    assign(xQuePrototype, {
        show: function show() {
            _each(this, function (ele) {
                ele.style.display = "";
            });
            return this;
        },
        hide: function hide() {
            _each(this, function (ele) {
                ele.style.display = "none";
            });
            return this;
        }
    });

    // 修正原型链
    $.prototype = $.fn = XQue.prototype = xQuePrototype;

    assign($, {
        extend: function extend() {
            if (arguments.length === 1) {
                var obj = arguments.length <= 0 ? undefined : arguments[0];
                if (getType(obj) == "object") {
                    assign($, obj);
                }
            } else {
                return assign.apply(undefined, arguments);
            }
        },

        merge: merge,
        type: getType
    });

    // 暴露到外部
    glo.Xque = glo.$ = $;
})(window);