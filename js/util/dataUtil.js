drill.define((load) => {
    // 添加长度单位
    const addLength = (data) => {
        // 是对象才继续
        if (!(data instanceof Object)) {
            return;
        }

        let len = 0;

        // 添加length属性
        Object.keys(data).forEach(k => {
            // 如果是数字，添加记录器
            if (!/\D/.test(k)) {
                // 转换数字
                let nlen = parseInt(k) + 1;

                // 大于len就添加
                if (nlen > len) {
                    len = nlen;
                }
            }

            // 递归
            addLength(data[k]);
        });

        if (len) {
            data.length = len;
        }
    }

    const getTransformStr = (transform) => {
        let transformStr = "";
        Object.keys(transform).forEach(k => {
            let val = transform[k];
            transformStr += `${k}(${val}) `;
        });
        return transformStr;
    }

    const transPos = (data) => {
        let {
            mainPage,
            animation
        } = data;

        Array.from(mainPage).forEach(e => {
            let {
                pageIn,
                pageOut
            } = e;

            let pageInAnime = animation.find(e => e.name == pageIn);
            let pageOutAnime = animation.find(e => e.name == pageOut);

            if (!pageInAnime) {
                // 不存在就报错
                throw "has not this pageIn anime => " + pageIn;
            }
            if (!pageOutAnime) {
                // 不存在就报错
                throw "has not this pageOut anime => " + pageOut;
            }

            e.pos1 = pageInAnime.frame;
            e.pos2 = pageOutAnime.frame;

            // 设置子元素的动画
            Array.from(e).forEach(c => {
                let {
                    animateIn,
                    animateOut
                } = c;

                // 将动画查找出来
                let eleAnimeInCSS = animateIn && animation.find(e => e.name == animateIn);
                let eleAnimeOutCSS = animateOut && animation.find(e => e.name == animateOut);

                Object.assign(c, {
                    eleAnimeInCSS,
                    eleAnimeOutCSS
                });
            });
        });
    }

    let dataUtil = {
        // 数据转Array
        addLength,
        // 转换transform对象成字符串
        getTransformStr,
        // 添加pos1和pos2
        transPos
    };

    return dataUtil;
});