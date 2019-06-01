drill.define(async (load) => {
    let [dataUtil, commonData, animationCSSUtil] = await load("util/dataUtil", "common/data", "util/animationCSSUtil");

    let isRunAnime = 0;

    let util = {
        get isRunAnime() {
            return isRunAnime;
        },
        // 去到某页
        toPage(pageId) {
            if (isRunAnime) {
                // 运行中就别插队
                return;
            }

            // 获取激活中的页面
            let activePage = $('.p_main .page[active="1"]');
            let activeId = activePage.index();

            // 获取下一页
            let nextPage = $('.p_main .page').eq(pageId);

            if (!nextPage.length || activeId == pageId) {
                return;
            }

            let activePageData = activePage.prop("pageData");
            let nextPageData = nextPage.prop("pageData");

            // 下一页设置状态修正
            nextPage.attr("active", 2);

            if (activeId > pageId) {
                // 是返回操作
                activePage.css(animationCSSUtil.toCSSObj(activePageData.pos1));
                nextPage.css(animationCSSUtil.toCSSObj(nextPageData.pos2));

            } else {
                // 是前进操作
                activePage.css(animationCSSUtil.toCSSObj(activePageData.pos2_after));
                nextPage.css(animationCSSUtil.toCSSObj(nextPageData.pos1_after));
            }

            isRunAnime = 1;

            // 触发切换页面事件
            commonData.trigger("changePageStart", {
                activePage,
                activeId,
                nextPage,
                nextId: pageId
            });

            // 计时后还原
            setTimeout(() => {
                isRunAnime = 0;
                activePage.attr("active", 0);
                nextPage.attr("active", 1);

                // 触发切换页面事件
                commonData.trigger("changePageEnd", {
                    activePage: nextPage,
                    activeId: pageId,
                    oldPage: activePage,
                    oldId: activeId
                });
            }, 500);
        },
        // 下一页
        toNextPage() {
            // 获取激活中的页面
            let activePage = $('.p_main .page[active="1"]');

            this.toPage(activePage.index() + 1);
        },
        // 上一页
        toPrevPage() {
            // 获取激活中的页面
            let activePage = $('.p_main .page[active="1"]');

            let prevIndex = activePage.index() - 1;

            if (prevIndex >= 0) {
                this.toPage(prevIndex);
            }
        }
    };
    return util;
});