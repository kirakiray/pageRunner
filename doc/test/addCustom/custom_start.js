// 判断是否支持最新的环境，不支持的话进入polyfill环境
(function () {
    var isEs7;
    try {
        eval("let aaa = async function () {}");
        isEs7 = 1;
    } catch (e) {
        isEs7 = 0;
    }

    var loadScript = function (src, callback) {
        var scriptEle = document.createElement("script");
        scriptEle.src = src;
        scriptEle.addEventListener("load", function () {
            callback && callback();
        });
        document.head.appendChild(scriptEle);
    };

    // 判断当前的环境
    if (isEs7) {
        loadScript("../../js/drill.js", () => {
            // 设置根目录
            drill.config({
                baseUrl: "../../js/"
            });

            loadScript("../../js/main.js");
        });
    } else {
        loadScript("../../polyfill/polyfill.js", function () {
            loadScript("../../js5/drill.js", function () {
                // 设置根目录
                drill.config({
                    baseUrl: "../../js/"
                });

                loadScript("../../js5/main.js");
            });
        });
    }
})();