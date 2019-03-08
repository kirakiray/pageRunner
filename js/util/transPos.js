// 添加pos1和pos2
drill.define(() => (data) => {
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
            let eleAnimeIn = animateIn && animation.find(e => e.name == animateIn);
            let eleAnimeOut = animateOut && animation.find(e => e.name == animateOut);

            Object.assign(c, {
                eleAnimeIn,
                eleAnimeOut
            });

        });
    });
});