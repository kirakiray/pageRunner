drill.define(() => {
    let addLength = (data) => {
        // 是对象才继续
        if (!(data instanceof Object)) {
            return;
        }

        let len = 0;

        // 添加length属性
        Object.keys(data).forEach(k => {
            // 如果是数字，添加记录器
            if (!/\D/.test(k)) {
                // 转换数字
                let nlen = parseInt(k) + 1;

                // 大于len就添加
                if (nlen > len) {
                    len = nlen;
                }
            }

            // 递归
            addLength(data[k]);
        });

        if (len) {
            data.length = len;
        }
    }

    return addLength;
});