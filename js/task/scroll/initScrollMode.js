drill.init(async (load, {
    initActiveId
}) => {
    const [commonData, dataUtil, pageUtil] = await load("common/data", "util/dataUtil", "util/pageUtil");

    // 初始化动画样式
    pageUtil.initAnimeStyle();

    // 直接开始加载第一个
    let mainEle = $(".p_main");

    let pageFirst = mainEle.children().eq(initActiveId);
    let pageData = pageFirst.prop("pageData");

    // runnerAnime记录
    let runAnimeSetter = new Set();

    // 添加初始那个
    runAnimeSetter.add(initActiveId);

    // 注册隐藏
    commonData.on("pageLoaded", (e, d) => {
        // 比initActiveId大的都要清除
        if (d.pageId >= initActiveId) {
            // 清空内元素进行动画
            pageUtil.clearPageAnime(d.page);
        } else {
            runAnimeSetter.add(d.pageId);
        }
    });

    // 滚动监听
    let mEle = mainEle[0];

    // 点火第一个
    await pageData.startLoad();

    // 滚动到第一个页面的位置
    mEle.scrollTop = mEle.offsetHeight * initActiveId;

    // 等待300毫秒，等元素内Loading动画结束
    await new Promise(res => setTimeout(res, 300));

    // 进行动画
    pageUtil.runPageAnime(pageFirst);

    let mTimer = 0;
    mEle.addEventListener("scroll", e => {
        if (mTimer) {
            return;
        }
        mTimer = 1;
        setTimeout(() => {
            mTimer = 0;
        }, 200);
        let {
            scrollTop,
            offsetWidth,
            offsetHeight
        } = mEle;

        // 当scrollTop达到相应高度时，进行动画设定
        let snum = Math.floor((scrollTop + (scrollTop / 4)) / offsetHeight);

        // 判断是否存在，不存在进行动画
        if (!runAnimeSetter.has(snum)) {
            runAnimeSetter.add(snum);
            pageUtil.runPageAnime(mainEle.children().eq(snum));
        }
    });
});