"use strict";

drill.define(function () {
    var mainEle = $(".main");

    // 主体数据
    var data = $({});

    // 定义常规数据
    Object.defineProperties(data, {
        currentPageId: {
            get: function get() {
                return this.currentPage.index();
            }
        },
        currentPage: {
            get: function get() {
                return mainEle.find("[active=\"1\"]");
            }
        }
    });

    window.commonData = data;

    return data;
});