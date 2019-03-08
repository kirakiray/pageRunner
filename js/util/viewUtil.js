drill.define(() => {
    // 获取单位
    const getUnit = val => {
        let arr = /[\d\.]+(.+)/.exec(val);
        return arr ? arr[1] : "";
    };

    const getBwPx = (ele) => {
        let {
            eleData
        } = ele;

        let width;

        // 获取单位
        let wUnit = getUnit(eleData.w);

        switch (wUnit) {
            case "%":
                let mainWidth = $(ele).parent().parent().width();
                width = mainWidth * (parseFloat(eleData.w) / 100);
                break
            case "px":
                width = parseFloat(eleData.w);
                break;
        }

        return width / 100;
    }

    const refreshView = (ele) => {
        let {
            pageData,
            eleData
        } = ele;

        let $ele = $(ele);

        let $pele = $ele.find(".p_ele");

        if (pageData) {
            // 子元素渲染
            $ele.children().each((i, e) => {
                refreshView(e);
            });
        } else if (eleData) {
            // 计算bw的单个px值
            let bwpx = getBwPx(ele);

            // 设置并修正各个值
            let sKeys = ["letterSpacing", "fontSize", "height", "left", "bottom"];
            ["letterSpacing", "fontSize", "h", "x", "y"].forEach((k, i) => {
                let val = eleData[k];

                // 判断是否需要转换bw单位
                let unit = getUnit(val);

                if (unit == "bw") {
                    // 转换像素
                    val = (parseFloat(val) * bwpx).toFixed(3) + "px";
                }

                // 设置元素
                $pele.css(sKeys[i], val);
            });
        }
    }

    let util = {
        // getBwPx,
        refreshView
    };

    return util;
});