"use strict";

// 添加pos1和pos2
drill.define(function () {
    return function (data) {
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

            e.pos1 = pageInAnime.frame;
            e.pos2 = pageOutAnime.frame;

            // 设置子元素的动画
            Array.from(e).forEach(function (c) {
                var animateIn = c.animateIn,
                    animateOut = c.animateOut;

                // 将动画查找出来

                var eleAnimeIn = animateIn && animation.find(function (e) {
                    return e.name == animateIn;
                });
                var eleAnimeOut = animateOut && animation.find(function (e) {
                    return e.name == animateOut;
                });

                Object.assign(c, {
                    eleAnimeIn: eleAnimeIn,
                    eleAnimeOut: eleAnimeOut
                });
            });
        });
    };
});