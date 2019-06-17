"use strict";

drill.define(function (load) {
    // 添加长度单位
    var addLength = function addLength(data) {
        // 是对象才继续
        if (!(data instanceof Object)) {
            return;
        }

        var len = 0;

        // 添加length属性
        Object.keys(data).forEach(function (k) {
            // 如果是数字，添加记录器
            if (!/\D/.test(k)) {
                // 转换数字
                var nlen = parseInt(k) + 1;

                // 大于len就添加
                if (nlen > len) {
                    len = nlen;
                }
            }

            // 递归
            addLength(data[k]);
        });

        if (len) {
            data.length = len;
        }
    };

    var getTransformStr = function getTransformStr(transform) {
        var transformStr = "";
        Object.keys(transform).forEach(function (k) {
            var val = transform[k];
            transformStr += k + "(" + val + ") ";
        });
        return transformStr;
    };

    var transPos = function transPos(data) {
        var mainPage = data.mainPage,
            animation = data.animation;


        Array.from(mainPage).forEach(function (e) {
            var pageIn = e.pageIn,
                pageOut = e.pageOut;


            var pageInAnime = animation.find(function (e) {
                return e.name == pageIn;
            });
            var pageOutAnime = animation.find(function (e) {
                return e.name == pageOut;
            });

            if (!pageInAnime) {
                // 不存在就报错
                throw "has not this pageIn anime => " + pageIn;
            }
            if (!pageOutAnime) {
                // 不存在就报错
                throw "has not this pageOut anime => " + pageOut;
            }

            e.pos1 = Object.assign({}, pageInAnime.animation.from || pageInAnime.animation[0]);
            e.pos1_after = Object.assign({}, pageInAnime.animation.to || pageInAnime.animation[100]);
            e.pos2 = Object.assign({}, pageOutAnime.animation.from || pageOutAnime.animation[0]);
            e.pos2_after = Object.assign({}, pageOutAnime.animation.to || pageOutAnime.animation[100]);

            // 判断是否去除透明度
            if (e.removeInOpa) {
                e.pos1.opacity = 1;
            }
            if (e.removeOutOpa) {
                e.pos2_after.opacity = 1;
            }

            // 设置子元素的动画
            Array.from(e).forEach(function (c) {
                var animateIn = c.animateIn,
                    animateOut = c.animateOut;

                // 将动画查找出来

                var eleAnimeInCSS = animateIn && animation.find(function (e) {
                    return e.name == animateIn;
                });
                var eleAnimeOutCSS = animateOut && animation.find(function (e) {
                    return e.name == animateOut;
                });

                Object.assign(c, {
                    eleAnimeInCSS: eleAnimeInCSS,
                    eleAnimeOutCSS: eleAnimeOutCSS
                });
            });
        });
    };

    var dataUtil = {
        // 数据转Array
        addLength: addLength,
        // 转换transform对象成字符串
        getTransformStr: getTransformStr,
        // 添加pos1和pos2
        transPos: transPos
    };

    return dataUtil;
});