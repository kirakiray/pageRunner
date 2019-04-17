drill.init(async (load, data) => {
    // 获取urlData
    let urlData = await load("common/urlData");

    // 判断是否有指定active page Id
    if ("active" in urlData && data.mainPage[urlData.active]) {
        data.mainPage[urlData.active].active = 1;
    } else {
        data.mainPage[0].active = 1;
    }
});