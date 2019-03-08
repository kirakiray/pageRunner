drill.init(async (load, d) => {
    let {
        target
    } = d;

    const pageUtil = await load("util/page");

    let mainEle = $(".main");

    // 监听滚动
    mainEle.on("mousewheel", e => {
        // 禁用默认事件
        e.preventDefault();

        let {
            originalEvent
        } = e;

        let {
            wheelDeltaY,
            wheelDeltaX
        } = originalEvent;

        if (wheelDeltaY < -200) {
            pageUtil.toNextPage();
        } else if (wheelDeltaY > 200) {
            pageUtil.toPrevPage();
        }
    });

    // Firefox监听滚动
    mainEle.on("DOMMouseScroll", e => {
        // 禁用默认事件
        e.preventDefault();

        let {
            originalEvent
        } = e;

        let {
            detail
        } = originalEvent;

        if (detail > 6) {
            pageUtil.toNextPage();
        } else if (detail < -6) {
            pageUtil.toPrevPage();
        }
    });

    // 监听touch
    let startX, startY;
    mainEle.on("touchstart", e => {
        e.preventDefault();
        let point = e.originalEvent.changedTouches[0];

        startX = point.clientX;
        startY = point.clientY;
    });
    mainEle.on("touchmove", e => e.preventDefault());
    mainEle.on("touchend", e => {
        let point = e.originalEvent.changedTouches[0];

        let {
            clientX,
            clientY
        } = point;

        let diffX = clientX - startX;
        let diffY = clientY - startY;

        if (diffY < -60) {
            pageUtil.toNextPage();
        } else if (diffY > 60) {
            pageUtil.toPrevPage();
        }
    });
});