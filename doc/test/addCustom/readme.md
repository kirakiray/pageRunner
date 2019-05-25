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
        <div p-page="1" p-target="safe" p-rely="customTest -r">
            <a href="https://kirakiray.com/pageCreator/">PageCreator官网</a>
        </div>
    </div>
```

关于三个属性的意义，看上面的备注；

当你需要在页面上定义表单，可以将表单元素写在相应的 `[p-page]` 的元素上，将提交表单的逻辑写在自定义的 `rely` 的 js文件 上；

打开 debug工具运行一下，效果更好；

[回到目录](../../)