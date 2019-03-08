((glo) => {
    "use strict";

    // 全局存在 jQuery 的情况下，就不瞎折腾了
    if (glo.$) {
        return;
    }

    // COMMON
    const DOCUMENT = document;
    const STR_string = "string";
    const STR_array = "array";

    const FALSE = !1;
    const TRUE = !0;
    const UNDEFINED = undefined;

    // function
    // 获取类型
    let objToString = Object.prototype.toString;
    const getType = value => objToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');

    // 是否函数(包括异步函数)
    const isFunction = v => getType(v).search('function') > -1;

    const isString = v => getType(v) === "string";

    // 是否 undefined
    const isUndefined = v => v === undefined;

    // 是否像数组（包括数组）
    const isArrayLike = obj => !isUndefined(obj) && getType(obj.length) === "number" && obj.length >= 0 && !isFunction(obj) && !isString(obj);

    const isElement = obj => obj instanceof Element || obj == glo;

    const {
        defineProperty,
        assign
    } = Object;

    // 生成数组
    const makeArray = arr => Array.from(arr);

    // 获得随机id
    const getRandomId = () => Math.random().toString(32).substr(2);

    // 合并数组
    const merge = (mainArr, arr2) => mainArr.splice(mainArr.length, 0, ...arr2);

    // 删除数组内的某项
    const removeByArr = (arr, tar) => {
        let id = arr.indexOf(tar);
        if (id > -1) {
            arr.splice(id, 1);
        }
    }

    // 遍历
    const each = (arr, func) => arr.some((e, i) => func(e, i) === FALSE);

    // 获取样式
    const getStyle = getComputedStyle;

    // 拆分空格参数
    const splitSpace = (value, func) => {
        let vArr = value.split(' ');
        each(vArr, e => func(e));
    }

    // 关键key
    const XQUEKEY = "XQUE_" + getRandomId();
    const XQUEEVENTKEY = XQUEKEY + "_event";

    // 单个参数的拆分固定式
    // getFunc 非必须
    // isReturnGetFunc 是否返回 getFunc 函数
    const singleIn = (targets, value, func, getFunc, isReturnGetFunc) => {
        // 获取值的类型
        let v_isFunc = isFunction(value);

        if (!isUndefined(value)) {
            // 遍历对象
            each(targets, (e, i) => {
                // 获取值
                let before_val;
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
    }

    // 两个参数的拆分固定式
    const pairIn = (targets, args, setCall, getCall) => {
        // 获取两个参数
        let [arg1, arg2] = args;

        // 获取第一个参数的类型
        let a1Type = getType(arg1);

        if (a1Type == "object") {
            // 对象类型，遍历代入
            for (let i in arg1) {
                each(targets, e => {
                    setCall(e, i, arg1[i]);
                });
            }
        } else if (isFunction(arg2)) {
            // 如果参数2是函数
            each(targets, (e, i) => {
                arg2.call(e, i, getCall(e, arg1));
            });
        } else if (isUndefined(arg2)) {
            // 不存在第二个参数，属于返回值
            return getCall(targets[0], arg1);
        } else {
            //普通类型，直接代入
            each(targets, e => {
                setCall(e, ...args);
            });
        }

        // 返回targets
        return targets;
    }

    // 修正数字类型变成像素字符串
    const fixNumber = value => (getType(value) == "number") ? (value + "px") : value;

    // main function
    // 查找元素
    const findElement = (selector, context = DOCUMENT) => makeArray(context.querySelectorAll(selector));

    // 转换元素
    const parseDom = (str) => {
        let par = DOCUMENT.createElement('div');
        par.innerHTML = str;
        let childs = makeArray(par.childNodes);
        return childs.filter(function (e) {
            let isInText = e instanceof Text;
            if (!isInText || (e.textContent && e.textContent.trim())) {
                return e;
            }
        });
    };

    // 判断元素是否符合条件
    const meetsEle = (ele, expr) => {
        if (ele === expr) {
            return !0;
        }
        let fadeParent = DOCUMENT.createElement('div');
        if (ele === DOCUMENT) {
            return false;
        }
        fadeParent.appendChild(ele.cloneNode(false));
        return 0 in findElement(expr, fadeParent) ? true : false;
    }

    // 获取元素的数据
    const getData = ele => ele[XQUEKEY] || (ele[XQUEKEY] = {});

    // 获取事件数据对象
    const getEventData = ele => ele[XQUEEVENTKEY] || (ele[XQUEEVENTKEY] = {});

    // main
    // 主体class
    // 只接受数组
    function XQue(elems = []) {
        merge(this, elems);
    }

    // 从属数组类型
    let xQuePrototype = Object.create(Array.prototype);

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
        attr(...args) {
            return pairIn(this, args, (target, key, value) => {
                target.setAttribute(key, value);
            }, (target, key) => target.getAttribute(key));
        },
        removeAttr(val) {
            return singleIn(this, val, (target, value) => {
                splitSpace(value, value => {
                    target.removeAttribute(value);
                });
            });
        },
        prop(...args) {
            return pairIn(this, args, (target, key, value) => {
                target[key] = value;
            }, (target, key) => target[key]);
        },
        removeProp(val) {
            return singleIn(this, val, (target, value) => {
                splitSpace(value, value => {
                    delete target[value];
                });
            });
        },
        data(...args) {
            return pairIn(this, args, (target, key, value) => {
                getData(target)[key] = value;
            }, (target, key) => {
                let data = {};
                assign(data, target.dataset);
                assign(data, getData(target));
                return data[key];
            });
        },
        removeData(val) {
            return singleIn(this, val, (target, value) => {
                splitSpace(value, value => {
                    delete getData(target)[value];
                });
            });
        },
        css(...args) {
            return pairIn(this, args, (target, key, value) => {
                if (String(getStyle(target)[key]).indexOf('px') > -1) {
                    value = fixNumber(value);
                }
                target.style[key] = value;
            }, (target, key) => getStyle(target)[key]);
        },
        text(val) {
            return singleIn(this, val, (target, value) => {
                target.textContent = value;
            }, target => target.textContent, 1);
        },
        html(val) {
            return singleIn(this, val, (target, value) => {
                target.innerHTML = value;
            }, target => target.innerHTML, 1);
        },
        val(val) {
            // let r = singleIn(this, val, (target, value) => {
            //     target.value = value;
            // }, (target) => {
            //     return target.value
            // }, 1);
            // return r;
            return singleIn(this, val, (target, value) => {
                target.value = value;
            }, target => target.value, 1);
        },
        each(callback) {
            each(this, (e, i) => {
                callback.call(e, i, e);
            });
            return this;
        },
        index(ele) {
            let owner, tar;
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
        extend(obj) {
            assign(xQuePrototype, obj);
        }
    });

    // class操作
    let classControlObj = {
        addClass(target, value) {
            target.classList.add(value);
        },
        removeClass(target, value) {
            target.classList.remove(value);
        },
        toggleClass(target, value) {
            target.classList.toggle(value);
        }
    };

    for (let funcName in classControlObj) {
        // 获取函数
        let func = classControlObj[funcName];

        // 初始化操作
        xQuePrototype[funcName] = function (val) {
            return singleIn(this, val, (target, value) => {
                splitSpace(value, value => {
                    func(target, value);
                });
            }, target => target.classList.value);
        };
    }

    const eachContext = (context, callback) => {
        if (isArrayLike(context)) {
            each(makeArray(context), ele => {
                callback(ele);
            });
        } else {
            callback(context);
        }
    }

    // 外部方法
    let $ = function (selector, context) {
        // 获取type
        let type = getType(selector);

        // 元素
        let elems = [];

        // 针对不同类型做处理
        switch (type) {
            case STR_string:
                if (selector.search('<') > -1) {
                    elems = parseDom(selector);
                } else {
                    eachContext(context, ele => {
                        let eles = findElement(selector, ele);
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
                        selector($)
                    } else {
                        DOCUMENT.addEventListener('DOMContentLoaded', function () {
                            selector($)
                        }, false);
                    }
                    elems = [DOCUMENT];
                } else if (selector) {
                    if (context && isElement(selector)) {
                        eachContext(context, ele => {
                            let selectorTagName = selector.tagName.toLowerCase();
                            let findEles = findElement(selectorTagName, ele);
                            each(findEles, e => {
                                (selector === e) && (elems.push(e));
                            });
                        });
                    } else {
                        // 其他类型
                        elems = [selector];
                    }
                }
        }

        return new XQue(elems);
    }

    // 修正为元素
const fixToEle = (tars, val, func) => {
    // 获取需要添加目标元素的长度
    let tarLen = tars.length;

    return singleIn(tars, val, (target, value) => {
        // 获取 value 类型
        let valueType = getType(value);

        // 减去长度计量器
        tarLen--;

        // 最后要添加进去的类型
        let eles = value;

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
            eles = [].map.call(eles, e => e.cloneNode(true));
        }

        // 全部添加进去
        each(eles, ele => {
            func(target, ele);
        });
    }, target => target.innerHTML);
}

// 映射$实例数据
const mapClone = (cloneEle, ele) => {
    // 自定义数据
    cloneEle[XQUEKEY] = assign({}, getData(ele));

    // 自定义事件
    let eveData = getEventData(ele);
    let cloneEveData = getEventData(cloneEle);

    for (let eventName in eveData) {
        let eves = eveData[eventName];
        let cloneEves = cloneEveData[eventName] = [];

        each(eves, eData => {
            let cloneEData = assign({}, eData);
            cloneEves.push(cloneEData);
            cloneEle.addEventListener(eventName, cloneEData.handle);
        });
    }
}

// 映射子元素
const mapCloneToChilds = (cloneEle, ele) => {
    let cloneChilds = Array.from(cloneEle.children);
    let childs = ele.children;

    each(cloneChilds, (cloneEle, i) => {
        let ele = childs[i];
        mapClone(cloneEle, ele);

        // 递归
        mapCloneToChilds(cloneEle, ele);
    });

}

// 节点操控方法
Object.assign(xQuePrototype, {
    append(val) {
        return fixToEle(this, val, (target, ele) => {
            target.appendChild(ele);
        });
    },
    prepend(val) {
        return fixToEle(this, val, (target, ele) => {
            target.insertBefore(ele, target.firstChild);
        });
    },
    before(val) {
        return fixToEle(this, val, (target, ele) => {
            target.parentNode.insertBefore(ele, target);
        });
    },
    after(val) {
        return fixToEle(this, val, (target, ele) => {
            var parnode = target.parentNode;
            if (parnode.lastChild === target) {
                parnode.appendChild(ele);
            } else {
                parnode.insertBefore(ele, target.nextSibling);
            }
        });
    },
    wrap(val) {
        return fixToEle(this, val, (target, ele) => {
            target.parentNode.insertBefore(ele, target);
            ele.appendChild(target);
        });
    },
    unwrap() {
        var arr = [];
        each(this, function (e) {
            var par = e.parentNode;
            par.parentNode.insertBefore(e, par);
            if (arr.indexOf(par) === -1) {
                arr.push(par);
            }
        });
        $(arr).remove();
        return this;
    },
    wrapInner(val) {
        return fixToEle(this, val, (target, ele) => {
            each(makeArray(target.childNodes), function (e2) {
                ele.appendChild(e2);
            });
            target.appendChild(ele);
        });
    },
    wrapAll(val) {
        if (isString(val)) {
            val = parseDom(val);
        }
        let tar = this.eq(0);
        tar.before(val = $(val));
        each(this, e => val.append(e));
        return this;
    },
    replaceWith(val) {
        return this.before(val).remove();
    },
    empty() {
        each(this, e => {
            e.innerHTML = "";
        });
    },
    remove(expr) {
        each(this, e => {
            if (expr) {
                if (!meetsEle(e, expr)) return;
            }
            e.parentNode.removeChild(e);
        });
    },
    clone(withData, deepData) {
        return this.map((i, ele) => {
            let cloneEle = ele.cloneNode(TRUE);

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

let dom_in_turn_Obj = {
    append: "appendTo",
    prepend: "prependTo",
    after: "insertAfter",
    before: "insertBefore",
    replaceWith: "replaceAll"
};

for (let k in dom_in_turn_Obj) {
    // 获取要定义的函数名
    let funcName = dom_in_turn_Obj[k];

    // 参数调转
    xQuePrototype[funcName] = function (content) {
        $(content)[k](this);
    }
}

    // 盒模型相关方法
// width height innerWidth innerHeight outerWidth outerHeight
// 获取样式像素值
const getStylePx = (target, styleName) => parseFloat(getStyle(target)[styleName]);

each([{
    'Width': ['left', 'right']
}, {
    'Height': ['top', 'bottom']
}], obj => {
    for (let fName in obj) {
        // 小写名
        let lowCaseFName = fName.toLowerCase();

        // 设置小写值方法
        xQuePrototype[lowCaseFName] = function (value) {
            return singleIn(this, value, (target, value) => {
                value = fixNumber(value);
                target.style[lowCaseFName] = value;
            }, target => getStylePx(target, lowCaseFName), 1);
        }

        // 获取目标关键词
        let keyArr = obj[fName];

        // 带关卡性的获取值
        // 原始值必带，首个参数是target，往后顺序是是否需要 padding border margin
        let getFunc = (target, hasPadding, hasBorder, hasMargin) => {
            // 原始值
            let oriVal = getStylePx(target, lowCaseFName);

            each(keyArr, k => {
                // padding
                hasPadding && (oriVal += getStylePx(target, 'padding-' + k));

                // border
                hasBorder && (oriVal += getStylePx(target, 'border-' + k + "-width"));

                // margin
                hasMargin && (oriVal += getStylePx(target, 'margin-' + k));
            });

            return oriVal;
        }

        // 获取inner值方法
        let innerFunc = xQuePrototype['inner' + fName] = function () {
            return getFunc(this[0], 1);
        }

        xQuePrototype['outer' + fName] = function (bool) {
            return getFunc(this[0], 1, 1, bool);
        }
    }
});

Object.assign(xQuePrototype, {
    // 已取消使用offset设定定位的方法，请用好的css布局来调整定位
    offset() {
        // 获取目标
        let tar = this[0];
        let top = 0,
            left = 0;
        do {
            top += tar.offsetTop;
            left += tar.offsetLeft;
            tar = tar.offsetParent;
        } while (tar)

        return {
            top,
            left
        };
    },
    position() {
        let tar = this[0];
        return {
            top: tar.offsetTop,
            left: tar.offsetLeft
        };
    },
    scrollTop(val) {
        return singleIn(this, val, (target, value) => {
            target.scrollTop = value;
        }, target => target.scrollTop, 1);
    },
    scrollLeft(val) {
        return singleIn(this, val, (target, value) => {
            target.scrollLeft = value;
        }, target => target.scrollLeft, 1);
    }
});

    const filterBase = (tars, val, meetcall, notmeetcall) => {
    let arr = [];
    if (isString(val)) {
        each(tars, ele => {
            if (meetsEle(ele, val)) {
                meetcall && meetcall(arr, ele);
            } else {
                notmeetcall && notmeetcall(arr, ele);
            }
        });
    } else if (isArrayLike(val)) {
        each(tars, ele => {
            each(val, val => {
                if (ele === val) {
                    meetcall && meetcall(arr, ele);
                } else {
                    notmeetcall && notmeetcall(arr, ele);
                }
            });
        });
    } else if (isElement(val)) {
        each(tars, ele => {
            if (val === ele) {
                meetcall && meetcall(arr, ele);
            } else {
                notmeetcall && notmeetcall(arr, ele);
            }
        });
    } else if (isFunction(val)) {
        each(tars, (ele, i) => {
            if (val.call(ele, i, ele)) {
                meetcall && meetcall(arr, ele);
            } else {
                notmeetcall && notmeetcall(arr, ele);
            }
        });
    }
    return $(arr);
}

const propKey = (expr, key, tars) => {
    let arr = [];
    each(tars, tar => {
        tar = tar[key];
        if (!tar || arr.indexOf(tar) != -1 || (expr && !meetsEle(tar, expr))) {
            return;
        }
        arr.push(tar);
    });
    return $(arr);
}

const nuExpr = (tars, key, filter, lastExpr) => {
    let arr = [];
    let getEle = tar => {
        let nextEle = tar[key];
        if (nextEle) {
            if (lastExpr) {
                if ((getType(lastExpr) === STR_string && meetsEle(nextEle, lastExpr)) || lastExpr === nextEle || (lastExpr instanceof Array && lastExpr.indexOf(nextEle) > -1)) {
                    return;
                }
            }
            if ((!filter || meetsEle(nextEle, filter)) && arr.indexOf(nextEle) === -1) {
                arr.push(nextEle);
            }
            getEle(nextEle);
        }
    };
    each(tars, tar => {
        getEle(tar);
    });
    getEle = null;
    return $(arr);
};

assign(xQuePrototype, {
    slice(...args) {
        let newArr = [].slice.call(this, ...args);
        return $(newArr);
    },
    eq(index) {
        return this.slice(index, parseInt(index) + 1 || undefined);
    },
    first() {
        return this.eq(0);
    },
    last() {
        return this.eq(-1);
    },
    get(index) {
        if (isUndefined(index)) {
            return makeArray(this);
        } else {
            return this[index];
        }
    },
    hasClass(val) {
        // 默认没有
        let hasClass = !1;
        each(this, e => {
            e.classList.contains(val) && (hasClass = !0);
        });
        return hasClass;
    },
    // 筛选器
    filter(val) {
        return filterBase(this, val, (arr, ele) => arr.push(ele));
    },
    // 否定版的筛选器
    not(val) {
        return filterBase(this, val, 0, (arr, ele) => arr.push(ele));
    },
    // 是否存在表达式内的元素
    is(val) {
        return 0 in this.filter(val);
    },
    map(callback) {
        let arr = [];
        each(this, (e, i) => {
            arr.push(callback(i, e));
        });
        return $(arr);
    },
    find(expr) {
        return $(expr, this);
    },
    has(expr) {
        let arr = [];
        each(this, e => {
            (0 in $(expr, e)) && (arr.push(e));
        });
        return $(arr);
    },
    children(expr) {
        let eles = [];
        each(this, e => {
            e.nodeType && each(makeArray(e.children), e => {
                if (expr) {
                    meetsEle(e, expr) && eles.push(e);
                } else {
                    eles.push(e);
                }
            });
        });
        return $(eles);
    },
    next(expr) {
        return propKey(expr, "nextElementSibling", this);
    },
    prev(expr) {
        return propKey(expr, "previousElementSibling", this);
    },
    parent(expr) {
        return propKey(expr, "parentNode", this);
    },
    nextAll(filter) {
        return nuExpr(this, 'nextElementSibling', filter);
    },
    prevAll(filter) {
        return nuExpr(this, 'previousElementSibling', filter);
    },
    parents(filter) {
        return nuExpr(this, 'parentNode', filter, DOCUMENT);
    },
    nextUntil(lastExpr, filter) {
        return nuExpr(this, 'nextElementSibling', filter, lastExpr);
    },
    prevUntil(lastExpr, filter) {
        return nuExpr(this, 'previousElementSibling', filter, lastExpr);
    },
    parentsUntil(lastExpr, filter) {
        return nuExpr(this, 'parentNode', filter, lastExpr);
    },
    closest(selector) {
        var parentEles = $(selector).parent();
        return this.parentsUntil(parentEles, selector);
    },
    siblings(expr) {
        let _this = this;
        return this.parent().children(expr).filter(function () {
            if (_this.indexOf(this) === -1) return true;
        });
    },
    offsetParent() {
        let arr = [];
        each(this, e => {
            arr.push(e.offsetParent || DOCUMENT.body);
        });
        return $(arr);
    }
});

    // jQuery 专用 Event原型对象
let eventPrototype = {
    preventDefault() {
        this._pD();
    },
    isDefaultPrevented() {
        return this.defaultPrevented;
    },
    stopPropagation() {
        this._sP();
    },
    isPropagationStopped() {
        return this.cancelBubble;
    },
    stopImmediatePropagation() {
        this.isImmediatePropagationStopped = () => TRUE;
        this._sIP();
    },
    isImmediatePropagationStopped: () => FALSE
};

// 初始化Event成jQuery.Event那样
const initEvent = event => {
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
}

let MOUSEEVENT = MouseEvent;
let TOUCHEVENT = glo.TouchEvent || Event;
// 修正 Event class 用的数据表
let eventsMap = {
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
let realEvents = ['focus', 'blur'];

// 生成Event
let createEvent = $.Event = (type, eventInit) => {
    let TarEvent = eventsMap[type] || Event;
    return initEvent(new TarEvent(type, eventInit));
};

// 获取事件数据
const getEventTypeData = (ele, type) => {
    let data = getEventData(ele);
    return data[type] || (data[type] = []);
};

// 触发事件
const trigger = (eles, type, data, isHandle) => {
    each(eles, ele => {
        if (isElement(ele)) {
            // 优先型的主动触发事件判断
            // 没有数据绑定
            if (!isHandle && !data && realEvents.indexOf(type) > -1 && isFunction(ele[type])) {
                ele[type]();
                return;
            }

            let event;
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
            let eveArr = getEventTypeData(ele, type);

            // 新的事件数组
            let newArr = [];

            let isBreak = 0;
            // 遍历事件数组
            each(eveArr, fData => {
                // 不是一次性的就加入
                if (!fData.isOne) {
                    newArr.push(fData);
                }

                // 是否弹出
                if (isBreak) {
                    return;
                }

                // 生成 event对象
                let event = createEvent(type);

                // 参数修正
                let args = [event];
                if (data) {
                    args.push(data);
                }

                // 判断是否有on上的data
                let onData = fData.data;
                if (!isUndefined(onData)) {
                    event.data = onData;
                }

                // 触发callback
                fData.fn(...args);

                // 删除数据
                delete event.data;

                // 判断是否不用进行下去了
                if (event.isImmediatePropagationStopped()) {
                    isBreak = 1;
                }
            });

            // 重新设置事件对象数据
            let eventBase = getEventData(ele);
            eventBase[type] = newArr;
        }
    });
    return eles;
};

// 事件注册
const on = (eles, events, selector, data, fn, isOne) => {
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

    each(eles, ele => {
        each(events, eventName => {
            // 事件函数寄存对象
            let funcData = {
                fn,
                isOne,
                data,
                selector
            };

            // 属于事件元素
            if (isElement(ele)) {
                let eventHandle = function (e) {
                    // 初始化事件对象
                    initEvent(e);

                    // 自定义函数数据
                    !isUndefined(data) && (e.data = data);

                    // 原始数据
                    e.originalEvent = e;

                    let argData = e._argData;
                    if (argData && !isArrayLike(argData)) {
                        argData = [argData];
                    }

                    // 目标
                    let tar = this;

                    // 是否可以运行
                    let canRun = 1;

                    if (selector) {
                        let currentTarget = $(e.target).parents(selector);
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
                            fn.call(tar, e, ...argData);
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
                }

                // 寄存eventHandle
                funcData.handle = eventHandle;

                ele.addEventListener(eventName, eventHandle);
            }

            // 获取事件数组对象
            let eventArr = getEventTypeData(ele, eventName);

            // 添加入事件数组
            eventArr.push(funcData);
        });
    });

    return eles;
}

const off = (eles, events, selector, fn) => {
    if (events) {
        // 事件字符串拆分
        events = events.split(' ');

        // 判断 是不是selector
        if (!fn && isFunction(selector)) {
            fn = selector;
            selector = UNDEFINED;
        }
    }

    each(eles, ele => {
        // eventBase
        let eventBase = getEventData(ele);

        if (!events) {
            if (isElement(ele)) {
                for (let eventName in eventBase) {
                    let eveArr = eventBase[eventName];
                    each(eveArr, tar => {
                        ele.removeEventListener(eventName, tar.handle);
                    });
                }
            }
            // 注销全部事件
            ele[XQUEEVENTKEY] = {};
            return;
        }

        each(events, eventName => {
            let eveArr = getEventTypeData(ele, eventName);

            if (isElement(ele)) {
                if (fn) {
                    let tar = eveArr.find(function (e) {
                        return e.fn === fn && e.selector === selector;
                    });

                    if (tar) {
                        // 注销事件并移除函数
                        ele.removeEventListener(eventName, tar.handle);
                        removeByArr(eveArr, tar);
                    }
                } else {
                    // 注销所有事件
                    each(eveArr, tar => {
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
}

Object.assign(xQuePrototype, {
    // 注册事件
    on(events, selector, data, fn) {
        // 事件注册
        return on(this, events, selector, data, fn);
    },
    one(events, data, fn) {
        // 事件注册
        return on(this, events, UNDEFINED, data, fn, 1);
    },
    off(events, selector, fn) {
        return off(this, events, selector, fn);
    },
    trigger(type, data) {
        return trigger(this, type, data);
    },
    triggerHandler(type, data) {
        return trigger(this, type, data, 1);
    },
    bind(types, data, fn) {
        return this.on(types, data, fn);
    },
    unbind(types, fn) {
        return this.off(types, fn);
    },
    hover(fnOver, fnOut) {
        return this.on('mouseenter', fnOver).on('mouseleave', fnOut || fnOver);
    }
});

// 一众事件
each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (eventName) {
    xQuePrototype[eventName] = function (callback) {
        callback ? this.on(eventName, callback) : this.trigger(eventName);
        return this;
    }
});

    // 使用xhr和promise实现的ajax，和jQuery的ajax不一样，它是返回promise实例，但比fetch api多了pending状态监听
let ajaxDefaults = {
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

const ajax = (options) => {
    let defaults = assign({}, ajaxDefaults);
    assign(defaults, options);

    // 转大写
    defaults.type = defaults.type.toUpperCase();

    let {
        url,
        contentType,
        data
    } = defaults;

    // 修正form数据类型
    if (data instanceof FormData) {
        contentType = "form";
    } else if (contentType.indexOf('form') > -1) {
        // 转换 object to Formdata
        let fdata = new FormData();
        for (let name in data) {
            fdata.append(name, data[name]);
        }
        data = fdata;
    }

    switch (defaults.type) {
        case "GET":
            // get是没有的
            contentType = "";
            // 转换数据
            let dataUrlencode = objectToUrlencode(data);
            url += (url.indexOf("?") > -1 ? url += "&" : "?") + dataUrlencode;
            data = null;
            break;
        case "POST":
            let charsetutf8 = '; charset=UTF-8';
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
    let eveObj = $({});

    // 实例
    var oReq = new XMLHttpRequest();
    // 要返回回去的promise
    let reP = new Promise((res, rej) => {
        // 设置请求
        oReq.open(defaults.type, url, TRUE, defaults.username, defaults.password);

        // 设置 header
        let {
            headers
        } = defaults;
        for (let k in headers) {
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
        oReq.addEventListener('load', e => {
            let {
                target
            } = e;

            let {
                response
            } = e.target;

            // 修正返回数据类型
            let responseContentType = target.getResponseHeader('content-type');
            if (responseContentType && responseContentType.indexOf("application/json") > -1 && typeof response != "object") {
                response = JSON.parse(response);
            }
            res(response);
        }, FALSE);
        oReq.addEventListener('error', e => {
            rej();
        }, FALSE);
        oReq.addEventListener("progress", e => {
            eveObj.trigger('loading', e);
        }, FALSE);
        oReq.upload && oReq.upload.addEventListener("progress", e => {
            eveObj.trigger('uploading', e);
        }, FALSE);
    });

    assign(reP, {
        // 加载中
        loading(func) {
            eveObj.on('loading', (e, data) => func(data));
            return reP;
        },
        // 上传中
        uploading(func) {
            eveObj.on('uploading', (e, data) => func(data));
            return reP;
        },
        // 发送前
        beforeSend(func) {
            // 直接进去函数
            func(oReq);
            return reP;
        }
    });

    // 异步发送请求
    setTimeout(() => {
        data ? oReq.send(data) : oReq.send();
    }, 0);

    // 返回参数
    reP.options = defaults;

    return reP;
}

// 转换成urlencode
const objectToUrlencode = (obj, headerStr = "", isParam) => {
    let str = "";
    for (let k in obj) {
        let val = obj[k];
        if (typeof val === "object") {
            if (headerStr) {
                str += objectToUrlencode(val, `${headerStr}[${k}]`, isParam);
            } else {
                str += objectToUrlencode(val, k, isParam);
            }
        } else {
            if (headerStr) {
                if (obj instanceof Array) {
                    k = "";
                }
                k = headerStr + `[${k}]`;
            }
            if (!isParam) {
                k = encodeURIComponent(k);
                val = encodeURIComponent(val);
            }
            str += `${k}=${val}&`;
        }
    }

    if (!headerStr) {
        // 去掉最后的 &
        str = str.replace(/&$/g, "");
    }
    return str;
}

const ajaxSetup = (options) => {
    assign(ajaxDefaults, options);
}

assign($, {
    ajax,
    ajaxSetup,
    param(obj) {
        return objectToUrlencode(obj, "", 1)
    }
});

each(['get', 'post'], name => {
    $[name] = (url, data, dataType) => {
        let options = {
            url,
            type: name.toUpperCase(),
            data
        }
        dataType && (options.dataType = dataType);
        return ajax(options);
    }
});

    assign(xQuePrototype, {
    show() {
        each(this, ele => {
            ele.style.display = "";
        });
        return this;
    },
    hide() {
        each(this, ele => {
            ele.style.display = "none";
        });
        return this;
    }
});

    // 修正原型链
    $.prototype = $.fn = XQue.prototype = xQuePrototype;

    assign($, {
        extend(...args) {
            if (args.length === 1) {
                let obj = args[0];
                if (getType(obj) == "object") {
                    assign($, obj);
                }
            } else {
                return assign(...args);
            }
        },
        merge,
        type: getType
    });

    // 暴露到外部
    glo.Xque = glo.$ = $;
})(window);