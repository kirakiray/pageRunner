(async () => {
    // 获取数据
    let data = await load("data -r");

    await load("xque");

    // 加载基础库
    let [dataUtil, animateUtil] = await load("util/dataUtil", "util/animateUtil");

    // 设置初始animation
    animateUtil.animation = data.animation;

    // 添加长度参数
    dataUtil.addLength(data);

    // 添加active
    await load("task/addActive").post(data);

    // 转换定位数据
    dataUtil.transPos(data);

    let mainEle = $(".main");

    // 渲染数据
    await load('task/h5/renderPage').post({
        target: mainEle,
        data
    });

    // 去除主的loading
    $('.mainLoading').remove();

    // 初始化页面切换效果控件
    await load("task/h5/initPageSwiper").post({
        target: mainEle
    });

    // 初始化页面元素的的动画交互
    await load("task/h5/initEleAnime");

    commonData.on("changePageStart", (e, data) => {
        console.log("changePageStart => ", data);
    });
    commonData.on("changePageEnd", (e, data) => {
        console.log("changePageEnd => ", data);
    });
})();