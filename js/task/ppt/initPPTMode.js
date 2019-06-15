drill.task(async (load, data) => {
    let {
        initActiveId
    } = data;

    const [commonData, animationCSSUtil, pageUtil, rData] = await load("common/data", "util/animationCSSUtil", "util/pageUtil", "data -r");
    const h5Util = await load("../h5/h5Util");

    // 初始化页面元素的的动画样式
    animationCSSUtil.initAnimation(rData.animation);

    // 直接开始加载第一个
    let mainEle = $(".p_main");

    let pageFirst = mainEle.children().eq(initActiveId);
    let pageData = pageFirst.prop("pageData");

    commonData.on("pageLoaded", (e, d) => {
        // 清空内元素进行动画
        pageUtil.clearPageAnime(d.page);
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

        Array.from(pageData).forEach(eleData => {
            if (eleData && eleData.animateIn) {
                // 添加key
                cKeys.add(eleData.animateInDelay);

                let tarGroupObj = cKeysObj[eleData.animateInDelay] || (cKeysObj[eleData.animateInDelay] = ({
                    type: "group",
                    arr: []
                }));

                tarGroupObj.arr.push({
                    type: "ele",
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

    console.log(sarr, commonData);

    let arrId = 0;

    mainEle.on("click", e => {
        runAnime();
    });

    let runAnime = () => {
        // 递增序号
        arrId++;

        let tarObj = sarr[arrId];

        if (tarObj) {
            switch (tarObj.type) {
                case "group":
                    tarObj.arr.forEach(e => {
                        pageUtil.runEleAnime($(`[outer-id="${e.data.outerId}"] .p_ele`), e.data, {
                            noDelay: 1
                        });
                    });
                    break;
                case "page":
                    h5Util.toNextPage();
                    break;
            }
        } else {
            console.log('最后一页了');
        }

    }

    // pageUtil.runPageAnime(pageFirst);
});