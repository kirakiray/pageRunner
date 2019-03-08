// 渲染数据到html
drill.init(async (load, d) => {
    let {
        target,
        data
    } = d;

    let [getTransformStr, viewUtil] = await load("util/getTransformStr", "util/viewUtil");

    // 获取激活的页面id
    let activeId = "";

    Array.from(data.mainPage).some((e, i) => {
        if (e.active) {
            activeId = i;
            return true;
        }
    });

    // 填充html
    Array.from(data.mainPage).forEach((p, pageId) => {
        let page = $(`
        <div class="page"></div>
        `);

        // 填充子元素
        Array.from(p).forEach(e => {
            let ele = $(`
            <div class="p_ele_outer" ver="${e.ver}" hor="${e.hor}">
                <div class="p_text p_ele">${e.intext}</div>
            </div>`);

            // 添加元素数据
            ele.prop("eleData", e);

            let tarEle = ele.find(".p_ele");

            // 设置元素宽高
            tarEle.css("width", e.w);

            // 添加元素
            page.append(ele);

            // 根据类型修正元素
            switch (e.tag) {
                case "text":
                    // 设置字体大小颜色什么的
                    ["fontWeight", "fontStyle", "color", "lineHeight"].forEach(k => {
                        e[k] && tarEle.css(k, e[k]);
                    });
                    break;
                case "pic":
                    break;
            }
        });

        // 设置样式
        let cssObj = {};
        ["background-color"].forEach(k => {
            p[k] && (cssObj[k] = p[k]);
        });
        page.css(cssObj);

        // 添加page数据
        page.prop("pageData", p);

        // 是否激活页面
        if (pageId == activeId) {
            // 清空transform
            page.css("transform", "");
        } else if (pageId < activeId) {
            page.css({
                "transform": getTransformStr(p.pos1.transform)
            });
        } else {
            page.css({
                "transform": getTransformStr(p.pos2.transform)
            });
        }
        page.attr("active", p.active || 0);

        // 添加page
        target.append(page);
    });

    // 所有页面刷新操作
    target.children().each((i, e) => {
        viewUtil.refreshView(e);
    });

    // 当页面大小改变时，修正元素大小
    let resizeTimer;
    $(window).on("resize", e => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            target.children().each((i, e) => {
                viewUtil.refreshView(e);
            });
        }, 300);
    });
});