drill.define(async (load) => {
    let mainEle = $(".p_main");

    // 主体数据
    let commonData = $({});

    // 定义常规数据
    Object.defineProperties(commonData, {
        currentPage: {
            get() {
                return mainEle.find(`[active="1"]`);
            }
        },
        currentPageId: {
            get() {
                let {
                    currentPage
                } = this;

                return currentPage.length ? currentPage.index() : 0;
            }
        }
    });

    return commonData;
});