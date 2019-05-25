# 添加自定义元素

在 `body` 下建立一个 `div[p-custom]`元素，内部对应的 `[p-page]` 元素就是相对页面的容器元素；

```html
    <div p-custom>
        <!--
        p-page 目标页id 从0开始数起,0是相对第一页
        p-target 相对区域
        p-rely 当该元素添加成功后，执行依赖js文件，可以是 drill.js 模块依赖规范； 
        当前元素会变成区域元素
        -->
        <div p-page="1" p-target="safe" p-rely="">
            <a href="https://kirakiray.com/pageCreator/">PageCreator官网</a>
            <br>
        </div>
    </div>
```

比如运行一下试试看，更清楚效果；

[回到目录](../../)