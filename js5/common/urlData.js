"use strict";

drill.define(function () {
    // 链接字符串转换的数组
    var localArr = location.search.replace(/^\?/, "").split("&");

    // 生成对象
    var data = {};

    localArr.forEach(function (e) {
        var arr = e.split("=");
        if (arr.length === 2) {
            data[arr[0]] = arr[1];
        }
    });

    return data;
});