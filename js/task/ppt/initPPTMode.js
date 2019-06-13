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

    // 所有元素的进场序列
    let sarr = [];

    // 添加相应的active
    $(".p_main > .page").each((pageId, e) => {
        let $page = $(e);

        if (initActiveId === pageId) {
            $page.attr("active", 1);
        } else {
            $page.attr("active", 0);
        }

        let pageData = e.pageData;

        // 添加队列
        sarr.push({
            type: "page",
            ele: e,
            data: pageData
        });

        // 提前设置样式
        if (pageId == initActiveId) {
            // 清空transform
            $page.css(animationCSSUtil.toCSSObj(pageData.pos1_after));
        } else if (pageId < initActiveId) {
            $page.css(animationCSSUtil.toCSSObj(pageData.pos2_after));
        } else {
            $page.css(animationCSSUtil.toCSSObj(pageData.pos1));
        }

        // 子数组对象
        let cKeysObj = {};
        let cKeys = new Set();

        // 子元素排序
        $page.children().each((i, e) => {
            let {
                eleData
            } = e;

            if (eleData) {
                // 添加key
                cKeys.add(eleData.animateInDelay);

                let tarGroupObj = cKeysObj[eleData.animateInDelay] || (cKeysObj[eleData.animateInDelay] = ({
                    type: "group",
                    arr: []
                }));

                tarGroupObj.arr.push({
                    type: "ele",
                    ele: e,
                    data: eleData
                });
            }
        });

        // 排序ckeys
        cKeys = Array.from(cKeys);
        cKeys.sort();

        // 转换排序数组
        cKeys.forEach(kid => {
            sarr.push(cKeysObj[kid]);
        });
    });

    // pageUtil.runPageAnime(pageFirst);
});