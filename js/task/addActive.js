drill.init(async (load, data) => {
    // 判断是否存在active，不存在就添加
    // let activeData = Array.from(data.mainPage).some(e => {
    //     return e.active;
    // });

    // 不存在就将第一个添加active
    // if (!activeData && data.mainPage[0]) {
    //     data.mainPage[0].active = 1;
    // }

    // 获取urlData
    let urlData = await load("common/urlData");

    // 判断是否有指定active page Id
    if ("active" in urlData && data.mainPage[urlData.active]) {
        data.mainPage[urlData.active].active = 1;
    }else{
        data.mainPage[0].active = 1;
    }
});