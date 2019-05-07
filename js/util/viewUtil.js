drill.define(() => {
    // 获取单位
    const getUnit = val => {
        let arr = /[\d\.]+(.+)/.exec(val);
        return arr ? arr[1] : "";
    };

    let mainEle = $(".p_main");

    // 刷新视图的宽高定位
    const refreshView = (ele) => {
        let {
            pageData,
            eleData
        } = ele;

        let $ele = $(ele);

        if (pageData) {
            // 子元素渲染
            $ele.children().each((i, e) => {
                refreshView(e);
            });
        } else if (eleData) {
            let $pele = $ele.find(".p_ele");

            // 获取当前页的宽高
            let p_width = mainEle.width();
            let p_height = mainEle.height();

            // 计算并重新设置盒模型的值
            let {
                w,
                h,
                hor,
                ver,
                x,
                y,
            } = eleData;

            let width, height, left, bottom;

            // 宽度单位
            let unit_w = getUnit(w);
            switch (unit_w) {
                case "px":
                    // 不用操作
                    width = parseFloat(w);
                    break;
                case "%":
                    // 转换数值
                    width = parseFloat(w) / 100 * p_width;
                    break;
            }

            // 计算bw的像素值
            let bwPx = width / 100;

            // 高度单位
            let unit_h = getUnit(h);
            switch (unit_h) {
                case "px":
                    // 不用操作
                    height = parseFloat(h);
                    break;
                case "%":
                    height = parseFloat(h) / 100 * p_height;
                    break;
                case "bw":
                    height = parseFloat(h) * bwPx;
                    break;
            }

            // 根据定位值计算x
            switch (hor) {
                case "start":
                    left = 0;
                    break;
                case "center":
                    left = (p_width - width) / 2;
                    break;
                case "end":
                    left = p_width - width
                    break;
            }

            let unit_x = getUnit(x);
            switch (unit_x) {
                case "px":
                    left += parseFloat(x);
                    break;
                case "%":
                    left += parseFloat(x) / 100 * p_width;
                    break;
                case "bw":
                    left += parseFloat(x) * bwPx;
                    break;
            }

            // 根据定位值计算y
            switch (ver) {
                case "start":
                    bottom = p_height - height;
                    break;
                case "center":
                    bottom = (p_height - height) / 2;
                    break;
                case "end":
                    bottom = 0;
                    break;
            }

            let unit_y = getUnit(y);
            switch (unit_y) {
                case "px":
                    bottom += parseFloat(y);
                    break;
                case "%":
                    bottom += parseFloat(y) / 100 * p_height;
                    break;
                case "bw":
                    bottom += parseFloat(y) * bwPx;
                    break;
            }

            // 添加px
            width += "px";
            height += "px";
            left += "px";
            bottom += "px";

            // 设置定位
            $pele.css({
                width,
                height,
                left,
                bottom
            });

            // 设置并修正各个值
            [
                ["letterSpacing", "letterSpacing"],
                ["fontSize", "fontSize"]
            ].forEach(e => {
                let [skey, k] = e;

                let val = eleData[k];

                // 判断是否需要转换bw单位
                let unit = getUnit(val);

                if (unit == "bw") {
                    // 转换像素
                    val = (parseFloat(val) * bwPx).toFixed(3) + "px";
                }

                // 设置元素
                $pele.css(skey, val);
            });

            // 其他属性直接设置
            ["textAlign"].forEach(k => {
                let val = eleData[k];
                $pele.css(k, val);
            });
        }
    }

    let util = {
        // getBwPx,
        refreshView
    };

    return util;
});