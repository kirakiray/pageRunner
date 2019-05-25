drill.init(async (load, data) => {
    console.log('目标页元素加载完成后，加载的依赖js', data);

    $("#testTarget").click(e => {
        alert('点击了按钮');
    });
});