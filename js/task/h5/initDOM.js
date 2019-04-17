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
});