drill.define(async (load) => {
    let [getTransformStr, commonData] = await load("util/getTransformStr", "common/data");

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
            let activePage = $('.main .page[active="1"]');
            let activeId = activePage.index();

            // 获取下一页
            let nextPage = $('.main .page').eq(pageId);

            if (!nextPage.length || activeId == pageId) {
                return;
            }

            // 下一页设置状态修正
            nextPage.attr("active", 2);
            nextPage.css("transform", "");

            let transStr;
            if (activeId > pageId) {
                transStr = getTransformStr(activePage.prop("pageData").pos2.transform);
            } else {
                transStr = getTransformStr(activePage.prop("pageData").pos1.transform);
            }

            activePage.css("transform", transStr);

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
            let activePage = $('.main .page[active="1"]');

            this.toPage(activePage.index() + 1);
        },
        // 上一页
        toPrevPage() {
            // 获取激活中的页面
            let activePage = $('.main .page[active="1"]');

            let prevIndex = activePage.index() - 1;

            if (prevIndex >= 0) {
                this.toPage(prevIndex);
            }
        }
    };
    return util;
});