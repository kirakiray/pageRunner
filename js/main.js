(async () => {
    // 获取数据
    let data = await load("data -r");

    await load("xque");

    // 加载基础库
    let [addLength, transPos] = await load("util/addLength", "util/transPos", "common/data");
    addLength(data);
    transPos(data);

    // 渲染数据
    await load('task/renderPage').post({
        target: $(".main"),
        data
    });

    // 初始化页面效果控件
    await load("task/initPageSwiper").post({
        target: $(".main")
    });

    commonData.on("changePageStart", (e, data) => {
        console.log("changePageStart => ", data);
    });
    commonData.on("changePageEnd", (e, data) => {
        console.log("changePageEnd => ", data);
    });
})();