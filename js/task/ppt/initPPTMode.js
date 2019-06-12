drill.task(async (load, data) => {
    let {
        initActiveId
    } = data;

    const [commonData, animationCSSUtil, pageUtil, rData] = await load("common/data", "util/animationCSSUtil", "util/pageUtil", "data -r");

    // 初始化页面元素的的动画样式
    animationCSSUtil.initAnimation(rData.animation);

    // 直接开始加载第一个
    let mainEle = $(".p_main");

    let pageFirst = mainEle.children().eq(initActiveId);
    let pageData = pageFirst.prop("pageData");

    commonData.on("pageLoaded", (e, d) => {
        // 清空内元素进行动画
        pageUtil.clearPageAnime(d.page);

        console.log(d);
    });

    // 点火第一个
    await pageData.startLoad();

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
            $page.css(animationCSSUtil.toCSSObj(pageData.pos2_after));
        } else {
            $page.css(animationCSSUtil.toCSSObj(pageData.pos1));
        }
    });


    pageUtil.runPageAnime(pageFirst);
});