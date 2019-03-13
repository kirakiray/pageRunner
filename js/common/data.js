drill.define(() => {
    let mainEle = $(".main");

    // 主体数据
    let data = $({});

    // 定义常规数据
    Object.defineProperties(data, {
        currentPageId: {
            get() {
                let {
                    currentPage
                } = this;
                return currentPage.length ? currentPage.index() : undefined;
            }
        },
        currentPage: {
            get() {
                return mainEle.find(`[active="1"]`);
            }
        }
    });

    window.commonData = data;

    return data;
});