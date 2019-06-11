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

    // 点火第一个
    await pageData.startLoad();

    // commonData.on("pageLoaded", (e, d) => {
    //     // 清空内元素进行动画
    //     pageUtil.clearPageAnime(d.page);
    // });
});