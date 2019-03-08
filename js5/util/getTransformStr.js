"use strict";

drill.define(function () {
    return function (transform) {
        var transformStr = "";
        Object.keys(transform).forEach(function (k) {
            var val = transform[k];
            transformStr += k + "(" + val + ") ";
        });
        return transformStr;
    };
});