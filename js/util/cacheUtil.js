drill.define(async (load) => {

    // 加载图片进缓存
    const loadImg = (src, callback, count = 4) => {
        // 获取图片数量
        let img = new Image();

        img.onload = () => {
            callback();
        }

        img.onerror = () => {
            if (count <= 0) {
                console.error("img cache error => ", src);
                // 没办法了，加载失败也执行
                callback();
            } else {
                loadImg(src, callback, --count);
            }
        }

        // 设置图片地址
        img.src = src;
    }

    // 缓存图片
    const cacheImg = (imgs) => new Promise(res => {
        // 所有待加载图片数量
        let len = imgs.length;

        if (!len) {
            res("no imgs");
            return;
        }

        imgs.forEach(src => {
            // 加载图片
            loadImg(src, () => {
                // 图片加载完成，递减
                len--;

                if (!len) {
                    res('imgs loaded');
                }
            });
        });
    });

    let cacheUtil = {
        loadImg,
        cacheImg
    };

    return cacheUtil;
});