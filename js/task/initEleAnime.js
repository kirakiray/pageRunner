drill.define(async (load) => {
    let [commonData, animateUtil] = await load("common/data", "util/animateUtil");

    // 添加animation style
    let animateCSSStr = animateUtil.animationToStr();

    // 添加style
    $('head').append(`
    <style>${animateCSSStr}</style>
    `);

    // 给pageData添加清空和进行动画的函数
    $(".main").children().each((i, e) => {
        let {
            pageData
        } = e;

        let $page = $(e);

        // 清空动画
        pageData.clearPageAnime = () => {
            // 下一页的动画元素都先隐藏
            let childs = $page.children();
            childs.each((i, e) => {
                let ele = $(e).find(".p_ele_inner");

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

        // 进行动画
        pageData.runPageAnime = () => {
            // 判断页面是否当前页，不是的话就别比比了
            if (commonData.currentPageId != i) {
                return;
            }

            let childs = $page.children();
            childs.each((i, e) => {
                let ele = $(e).find(".p_ele_inner");

                if (!ele.length) {
                    return;
                }

                // 获取元素定义的数据
                let {
                    eleData
                } = e;

                // 判断是否有animateIn
                if (eleData.animateIn) {
                    // 添加动画class
                    ele.addClass(eleData.animateIn);

                    // 设置动画
                    ele.css({
                        "animation-duration": eleData.animateInTime + "s",
                        "animation-delay": `${eleData.animateInDelay}s`,
                        "animation-fill-mode": "both"
                    });

                    // 去掉透明度
                    ele.css("opacity", "");
                }
            });
        }
    });

    commonData.on("changePageStart", (e, data) => {
        let {
            activePage,
            nextPage
        } = data;

        nextPage[0].pageData.clearPageAnime();
    });

    commonData.on("changePageEnd", (e, data) => {
        let {
            activePage,
            oldPage
        } = data;

        activePage[0].pageData.runPageAnime();
    });
});