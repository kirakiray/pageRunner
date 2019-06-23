drill.define(async (load) => {
    let util = {
        runEleAnime(ele, eleData, options = {}) {
            // 判断是否有animateIn
            if (eleData.animateIn) {
                // 添加动画class
                ele.addClass(eleData.animateIn);

                let {
                    animateInTime,
                    animateInDelay
                } = eleData;

                if (options.noDelay) {
                    animateInDelay = 0;
                }

                if (!options.noAnime) {
                    // 设置动画
                    ele.css({
                        "animation-duration": `${animateInTime}s`,
                        "animation-delay": `${animateInDelay}s`,
                    });
                } else {
                    ele.css({
                        "animation-duration": "0s"
                    });
                }

                // 去掉透明度
                ele.css("opacity", "");
            }
        },
        // 运行页面动画
        runPageAnime($page) {
            // 判断页面是否当前页，不是的话就别比比了
            // if (commonData.currentPageId != $page.index()) {
            //     return;
            // }

            let childs = $page.children();
            childs.each((i, e) => {
                let ele = $(e).find(".p_ele");

                if (!ele.length) {
                    return;
                }

                // 获取元素定义的数据
                let {
                    eleData
                } = e;

                util.runEleAnime(ele, eleData);
            });
        },
        // 去除页面动画元素的终结状态
        clearPageAnime($page) {
            // 下一页的动画元素都先隐藏
            let childs = $page.children();
            childs.each((i, e) => {
                let ele = $(e).find(".p_ele");

                if (!ele.length) {
                    return;
                }

                // 获取元素定义的数据
                let {
                    eleData
                } = e;

                // 判断是否有animateIn
                if (eleData.animateIn) {
                    // 去除动画class
                    ele.removeClass(eleData.animateIn);

                    // 清空动画样式
                    ele.css({
                        "animation-duration": "",
                        "animation-delay": ``,
                        "animation-fill-mode": ""
                    });

                    // 提前透明度
                    ele.css("opacity", "0");
                }
            });
        }
    };
    return util;
});