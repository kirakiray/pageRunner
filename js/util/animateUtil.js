drill.define(async () => {
    let animationUtil = {
        // 主体animation
        animation: [],
        // 获取相应animation的提前设置样式对象
        // getInitCSS(animateName) {
        //     animationUtil.animation.forEach(e => {
        //         debugger
        //     });
        // },
        // 转换frame对象成样式字符串
        frameToStr(frame) {
            debugger
            let str = "";
            Object.keys(frame).forEach(k => {
                if (k === "transform") {
                    let transformStr = "transform:";
                    let transObj = frame[k];
                    Object.keys(transObj).forEach(k2 => {
                        let transVal = transObj[k2];
                        transformStr += `${k2}(${transVal}) `;
                    });
                    str += transformStr.slice(0, -1) + ";";
                } else {
                    let val = frame[k];
                    str += `${k}:${val};`;
                }
            });
            return str;
        },
        animationDataToStr(animation) {
            let str = "";
            Object.keys(animation).forEach((k) => {
                if (/\D/.test(k)) {
                    return;
                }
                let val = animation[k];
                let s = animationUtil.frameToStr(val);
                str += `${k}%{${s}}\n`;
            });
            return str;
        },
        // 获取animationIn的动画样式字符
        getAnimateIn(animateData) {
            // if (animateData.css) {
            //     debugger
            // }
            let frameStr;
            let str;
            if (animateData.frame) {
                frameStr = animationUtil.frameToStr(animateData.frame);
                str = `@keyframes ${animateData.name}{
                    0%{${frameStr}}
                    100%{transform:translate3d(0,0,0); opacity:1;}
                }
                `;
            } else {
                frameStr = animationUtil.animationDataToStr(animateData.animation);
                str = `@keyframes ${animateData.name}{
                    ${frameStr}
                }
                `;
            }
            return str;
        },
        getAnimateOut(animateData) {
            let frameStr;
            let str;
            if (animateData.frame) {
                frameStr = animationUtil.frameToStr(animateData.frame);
                str = `@keyframes ${animateData.name}{
                    0%{transform:translate3d(0,0,0); opacity:1;}
                    100%{${frameStr}}
                }
                `;
            } else {
                frameStr = animationUtil.animationDataToStr(animateData.animation);
                str = `@keyframes ${animateData.name}{
                    ${frameStr}
                }
                `;
            }
            return str;
        },
        // 获取整个animation转换的style字符串
        animationToStr(animation) {
            animation = animation || animationUtil.animation;
            let str = "";
            animation.forEach(e => {
                let frameStr;
                switch (e.type) {
                    case "animeIn":
                        frameStr = animationUtil.getAnimateIn(e);
                        break;
                    case "animeOut":
                        frameStr = animationUtil.getAnimateOut(e);
                        break;
                }
                str += frameStr;

                // 自带css
                let cssStr = '';

                if (e.css) {
                    debugger
                    Object.keys(e.css).forEach(k => {
                        let val = e.css[k];
                        cssStr += `${k}:${val};`;
                    });
                }

                // 添加生成class
                str += `.${e.name}{
                    ${cssStr}
                    -webkit-animation:${e.name} ease .5s;
                    animation:${e.name} ease .5s;
                }
                `;
            });

            return str;
        }
    };

    return animationUtil;
});