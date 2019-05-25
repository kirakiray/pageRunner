# pageRunner的二次开发

## 文件介绍

主体 `index.html` 入口文件介绍，代码如下：

```html
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>page runner</title>
    <link rel="stylesheet" href="css/index.css">
    <script src="start.js"></script>
</head>

<body>
    <div class="p_main"></div>
    <div class="mainLoading">
        <div class="loading_layer">
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"
                stroke="rgba(200,200,200,.5)">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18"></path>
                    </g>
                </g>
            </svg>
        </div>
    </div>
</body>
```

`.p_main` 元素是主体渲染元素，当 `start.js` 运行后，会将当前的 `pageRunner` 的主体代码渲染在这个元素里；在start.js没渲染后，会清空内部的所有元素；所以，计时你在 `index.html` 里放了什么代码，在渲染后都会被清空；这样就可以事先填充元素，做搜索引擎优化；

`start.js` 运行后，判断当前的运行环境，支持 `es7` 环境，会使用 `js/` 初始化逻辑；判断不支持 `es7`，会先载入`polyfill` 依赖，再用 `es5/`的逻辑；

`.mainLoading` 最初始的 `loading` 显示的元素，可以修改这个元素换成你想要的Loading图案；默认是一个旋转的svg动画；你也可以替换成gif，但请保持gif的大小，loading就是满网速的用户过渡，太大的loding图片会占用网速，会让过渡体验变差；所以尽量采用小图加css动画的模式制作loading；

项目使用的模块化框架是 [`drill.js`](https://github.com/kirakiray/drill.js)，具体可查看它的使用文档，平时其实也就用 `load` 方法即可；

## [添加自定义元素](test/addCustom/)

关于添加表单或标签之类的元素；