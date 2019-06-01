define(async (load) => {
    // 主体动画style
    let animationStyle = document.createElement('style');

    let animationCSSUtil = {
        // 转换成cssObject
        toCSSObj(frameobj) {
            let cssObj = {};
            Object.keys(frameobj).forEach(k => {
                let val = frameobj[k];
                if (k === "transform" && (typeof val == "object")) {
                    let aStr = "";
                    Object.keys(val).forEach(k => {
                        let d = val[k];
                        aStr += `${k}(${d}) `;
                    });
                    val = aStr.slice(0, -1);
                }

                cssObj[k] = val;
            });
            return cssObj;
        },
        // 转换单帧样式
        transFrame(frameObj) {
            let str = "";
            Object.keys(frameObj).forEach(k => {
                let val = frameObj[k];

                if (k === "transform" && (typeof val == "object")) {
                    let aStr = "";
                    Object.keys(val).forEach(k => {
                        let d = val[k];
                        aStr += `${k}(${d}) `;
                    });
                    val = aStr.slice(0, -1);
                }

                str += `${k}:${(val==="")? '\"\"' : val};`;
            });
            return str;
        },
        // 转换 animation 对象为字符串
        transAnimation(animation, name) {
            let str = "";
            let {
                from,
                to,
            } = animation;

            if (from) {
                str += `from{
                    ${animationCSSUtil.transFrame(from)}
                }
                to{
                    ${animationCSSUtil.transFrame(to)}
                }
                `;
            } else {
                Object.keys(animation).forEach(p => {
                    let val = animation[p];
                    str += `${p}%{
                        ${animationCSSUtil.transFrame(val)}
                    }
                    `;
                });
            }
            return `@keyframes ${name}{
                ${str}
            }`;
        },
        // 转化所有animation对象为字符串
        initAnimation(arr) {
            let str = "";

            arr.forEach(e => {
                // 获取keyframes
                let keyframes = animationCSSUtil.transAnimation(e.animation, e.animateId);
                str += keyframes;
                str += `
                .${e.animateId}{
                    animation:${e.animateId} ease-in-out .5s;
                    animation-fill-mode: forwards;
                }
                `;
            });

            // 主体style
            animationStyle.innerHTML = str;

            // 添加到head
            document.head.appendChild(animationStyle);
        }
    };

    return animationCSSUtil;
});