(async () => {
    // 获取数据
    let data = await load("data -r");

    await load("xque");

    let commonData = await load('common/data');

    if (window.beforeInit) {
        beforeInit(commonData, data);
    }

    // 加载基础库
    let [dataUtil, animateUtil] = await load("util/dataUtil", "util/animateUtil");

    // 自定义数据
    if ($('[p-custom]').length) {
        await load("task/initCustomEle");
    }

    // 设置初始animation
    animateUtil.animation = data.animation;

    // 添加长度参数
    dataUtil.addLength(data);

    // 修正activeId
    await load("task/fixActive").post(data);

    // 转换定位数据
    dataUtil.transPos(data);

    let mainEle = $(".p_main");

    // 渲染数据
    await load('task/renderPage').post({
        target: mainEle,
        data
    });

    // 去除主的loading
    // $('.mainLoading').addClass("eleFadeOut");
    // setTimeout(() => {
    $('.mainLoading').hide();
    // }, 300);

    let mainPage = data.mainPage;

    // 获取激活的页面id
    let initActiveId = 0;
    Array.from(mainPage).some((e, i) => {
        if (e.active) {
            initActiveId = i;
            return true;
        }
    });

    // 添加类型
    mainEle.attr('h5-mode', mainPage.type || "h5");

    // 根据type进行初始化类型
    switch (mainPage.type) {
        case "scroll":
            await load("task/scroll/initScrollMode").post({
                initActiveId
            });
            break;
        case "h5":
        default:
            // 默认走h5类型
            // 初始化节点信息
            await load("task/h5/initH5").post({
                initActiveId
            });
    }

    // commonData.on("changePageStart", (e, data) => {
    //     console.log("changePageStart => ", data);
    // });
    // commonData.on("changePageEnd", (e, data) => {
    //     console.log("changePageEnd => ", data);
    // });
})();