// 渲染数据到html
drill.init(async (load, d) => {
    let {
        target,
        data
    } = d;

    let [viewUtil, cacheUtil, commonData] = await load("util/viewUtil", "util/cacheUtil", "common/data");

    // 设置通用css
    const setEleCSS = (tarEle, data) => {
        let cssObj = {};
        let bgimg = data["background-image"];
        if (bgimg) {
            cssObj["background-image"] = `url(${bgimg})`;
        }
        ["background-color", "background-repeat", "background-size", "background-position"].forEach(k => {
            data[k] && (cssObj[k] = data[k]);
        });
        tarEle.css(cssObj);
    }

    // 填充子元素
    const addEles = (page, p) => {
        Array.from(p).forEach(e => {
            let ele = $(`
            <div class="p_ele_outer" style="opacity:0;" ver="${e.ver}" hor="${e.hor}">
                <div class="p_ele"></div>
            </div>`);

            // 让元素进场不显得那么突兀
            setTimeout(() => {
                ele.css("opacity", "");
            }, 50);

            // 添加元素数据
            ele.prop("eleData", e);

            // 主体元素
            let tarEle = ele.find(".p_ele");

            // 设置元素宽高
            tarEle.css("width", e.w);

            // 添加元素
            page.append(ele);

            // 根据类型修正元素
            switch (e.tag) {
                case "text":
                    // 添加class
                    tarEle.addClass('p_text');
                    tarEle.html(e.intext.replace(/\n/g, "<br>"));

                    // 设置字体大小颜色什么的
                    ["fontWeight", "fontStyle", "color", "lineHeight"].forEach(k => {
                        e[k] && tarEle.css(k, e[k]);
                    });
                    break;
                case "pic":
                    // 添加class
                    tarEle.addClass('p_pic');

                    // 设置图片属性
                    tarEle.append(`<img src="${e.picUrl}" />`);
                    break;
            }

            // 背景元素等属性修正
            setEleCSS(tarEle, e);
        });
    }

    // loading元素的替换
    let mainLoading = $('.mainLoading');

    if (mainLoading.length) {
        mainLoading = mainLoading.html();
    } else {
        mainLoading = `
        <div class="loading_layer">
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="rgba(200,200,200,.5)">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18"></path>
                    </g>
                </g>
            </svg>
        </div>
        `;
    }

    // 填充html
    Array.from(data.mainPage).forEach((p, pageId) => {
        let page = $(`
        <div class="page">
            ${mainLoading}
        </div>
        `);

        // 设置样式
        setEleCSS(page, p);

        // 添加page数据
        page.prop("pageData", p);

        // 添加页面加载器
        p.startLoad = async () => {
            // 判断已经加载完成
            if (p.loaded) {
                return p.loaded;
            }

            // 触发开始load事件
            commonData.trigger("pageStartLoad", {
                page,
                pageId
            });

            // 设置加载中
            p.loaded = 2;

            // 总结出所有图片元素
            let imgarr = [];
            Array.from(p).forEach(e => {
                if (e.tag == "pic") {
                    imgarr.push(e.picUrl);
                }

                // 查看是否有bgimg
                if (e["background-image"]) {
                    imgarr.push(e["background-image"]);
                }
            });

            // 缓存元素内的所有图片
            await cacheUtil.cacheImg(imgarr);

            // 添加元素进去
            // 填充子元素
            addEles(page, p);

            // 去掉loading_layer
            page.find(".loading_layer").remove();

            // 设置加载完成
            p.loaded = 1;

            // 初次刷新大小
            viewUtil.refreshView(page[0]);

            // 触发loadend事件
            commonData.trigger("pageLoaded", {
                page,
                pageId
            });

            p.checkPrevAndNext();

            return 1;
        }

        // 查看上下页面并执行缓存的方法
        p.checkPrevAndNext = () => {
            // 当前页的上下页都进行缓存
            let prevPage = page.prev();
            let nextPage = page.next();

            if (prevPage.length) {
                prevPage[0].pageData.startLoad();
            }

            if (nextPage.length) {
                nextPage[0].pageData.startLoad();
            }
        }

        // 初始状态没加载完成
        p.loaded = 0;

        // 添加page
        target.append(page);

        // 当前页渐进
        if (commonData.currentPageId == page.index()) {
            page.addClass('eleFadeIn');
            setTimeout(() => {
                page.removeClass('eleFadeIn');
            }, 300);
        }
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