// 添加自定义的元素
drill.init(async (load) => {
    let commonData = await load("common/data");

    let customCon = $('[p-custom]');

    commonData.on('pageLoaded', (e, data) => {
        let tarPage = customCon.find(`[p-page="${data.pageId}"]`);

        if (tarPage.length) {
            tarPage.prop("eleData", {
                "target": tarPage.attr("p-target") || "safe",
                "hor": tarPage.attr("hor") || "center",
                "ver": tarPage.attr("ver") || "center",
                "x": "0",
                "y": "0",
                "w": "100%",
                "h": "100%",
            });

            data.page.append(tarPage);

            // 初始化
            load("util/viewUtil").then(viewUtil => {
                viewUtil.refreshView(tarPage[0]);
            });
        }
    });
});