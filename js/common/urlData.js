drill.define(() => {
    // 链接字符串转换的数组
    let localArr = location.search.replace(/^\?/, "").split("&");

    // 生成对象
    let data = {};

    localArr.forEach(e => {
        let arr = e.split("=");
        if (arr.length === 2) {
            data[arr[0]] = arr[1];
        }
    });

    return data;
});