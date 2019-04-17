drill.init(async (load, {
    initActiveId
}) => {
    const dataUtil = await load("util/dataUtil");

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
            $page.css("transform", "");
        } else if (pageId < initActiveId) {
            $page.css({
                "transform": dataUtil.getTransformStr(pageData.pos1.transform)
            });
        } else {
            $page.css({
                "transform": dataUtil.getTransformStr(pageData.pos2.transform)
            });
        }
    });

    // 初始化页面切换效果控件
    await load("task/h5/initPageSwiper");

    // 初始化页面元素的的动画交互
    await load("task/h5/initEleAnime");

    // 获取初始页
    let targetPageData = $(".p_main > .page").eq(initActiveId).prop("pageData");

    // 根据initActiveId点火
    await targetPageData.startLoad();

    // 清空状态
    targetPageData.clearPageAnime();

    // 等待300毫秒，page上的loading消失
    await new Promise(res => setTimeout(() => res(), 200));

    // 加载完成后进行初始动画
    targetPageData.runPageAnime();
});