drill.init(async (load, {
    initActiveId
}) => {
    const [commonData, dataUtil, pageUtil, animationCSSUtil, rData] = await load("common/data", "util/dataUtil", "util/pageUtil", "util/animationCSSUtil", "data -r");

    // 添加相应的active
    $(".p_main > .page").each((pageId, e) => {
        let $page = $(e);

        if (initActiveId === pageId) {
            $page.attr("active", 1);
        } else {
            $page.attr("active", 0);
        }

        let pageData = e.pageData;

        // 提前设置样式
        if (pageId == initActiveId) {
            // 清空transform
            $page.css(animationCSSUtil.toCSSObj(pageData.pos1_after));
        } else if (pageId < initActiveId) {
            $page.css(animationCSSUtil.toCSSObj(pageData.pos1));
        } else {
            $page.css(animationCSSUtil.toCSSObj(pageData.pos2_after));
        }
    });

    // 初始化页面切换效果控件
    await load("task/h5/initPageSwiper");

    // 初始化页面元素的的动画样式
    animationCSSUtil.initAnimation(rData.animation);

    commonData.on("changePageStart", (e, data) => {
        let {
            activePage,
            nextPage
        } = data;

        pageUtil.clearPageAnime(nextPage);
    });

    commonData.on("changePageEnd", (e, data) => {
        let {
            activePage,
            oldPage
        } = data;

        pageUtil.runPageAnime(activePage);
    });

    // 获取初始页
    let tarPage = $(".p_main > .page").eq(initActiveId);
    let targetPageData = tarPage.prop("pageData");

    // 根据initActiveId点火
    await targetPageData.startLoad();

    // 清空状态
    pageUtil.clearPageAnime(tarPage);

    // 等待200毫秒，page上的loading消失
    await new Promise(res => setTimeout(() => res(), 200));

    // 加载完成后进行初始动画
    pageUtil.runPageAnime(tarPage);
});