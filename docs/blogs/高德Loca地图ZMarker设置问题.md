---
title: 高德Loca地图ZMarker设置问题
author: 怡然
createTime: 2024/05/30 17:41:31
permalink: /article/7xma419g/
tags:
  - 高德Loca地图
  - 构造函数
---
:::info
2021-2023年所做的一个可视化大屏的项目，因为所有的组件都是可以由用户自己动手配置的，就会导致在高德Loca地图ZMarker图层当中设置`content`时出现问题。`content`是一个可以由用户自己写HTML语句设置图层样式的属性，我们在配置时为用户提供了一个代码编辑器进行输入，但是在处理数据时，由于拿到的值是一个字符串类型的数据，用户在写HTML配置的时候，还需传入 `i`，`feat`两个参数，在`content`属性中直接`return`是无法处理这段代码的，使用了`eval()`方法，行不通，因为`eval()`方法无法解析传入的参数，于是换了另一个方法进行处理，该方法是`new Function()`。
:::

### 1. 问题与解决
> 高德Loca地图ZMarker图层设置，文档内容示例如下：
```js
// 文字主体图层
var zMarker = new Loca.ZMarkerLayer({
    loca: loca,
    zIndex: 120,
    depth: false,
});
zMarker.setSource(geo);
zMarker.setStyle({
    content: (i, feat) => {
        var props = feat.properties;
        var leftColor = props.price < 60000 ? 'rgba(0, 28, 52, 0.6)' : 'rgba(33,33,33,0.6)';
        var rightColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 0.3)';
        var borderColor = props.price < 60000 ? '#038684' : 'rgba(172, 137, 51, 1)';
        return (
            '<div style="width: 490px; height: 228px; padding: 0 0;">' +
            '<p style="display: block; height:80px; line-height:80px;font-size:40px;background-image: linear-gradient(to right, '
            + leftColor + ',' + leftColor + ',' + rightColor + ',rgba(0,0,0,0.4)); border:4px solid '
            + borderColor + '; color:#fff; border-radius: 15px; text-align:center; margin:0; padding:5px;">' +
            props['name'] +
            ': ' +
            (props['price'] / 10000) +
            '</p><span style="width: 130px; height: 130px; margin: 0 auto; display: block; background: url(https://a.amap.com/Loca/static/loca-v2/demos/images/prism_'
            + (props['price'] < 60000 ? 'blue' : 'yellow') + '.png);"></span></div>'
        );
    },
    unit: 'meter',
    rotation: 0,
    alwaysFront: true,
    size: [490/2, 222/2],
    altitude: 0,
});
```
> 解决方案：
```js
// layerConfig.js内：this.content = "'<div style=\"width: 120px; height: 120px;\">${title}</div>'"
let content = layerConfig.content; // layerConfig为组件的配置项数组
content = content.replaceAll('${',"'+ feat.properties.");  // 为了便于书写，隐藏feat属性，直接使用数据中的属性书写
content = content.replaceAll('}'," +'"); // 在加载地图图层时，将代码内的数据转为feat.properties.xxx
let zMarkerContent=new Function(['i','feat'],`return ${content}`)
let style = {
    unit: layerConfig.unit,
    rotation: layerConfig.rotation,
    alwaysFront: layerConfig.alwaysFront,
    size: layerConfig.size,
    altitude: layerConfig.altitude,
    content:zMarkerContent
};
```

### 2. `new Function()`构造函数
:::tip
一般不推荐使用 Function 构造函数创建函数，因为它需要的函数体作为字符串可能会阻止一些 JS 引擎优化，也会引起其他问题。但是特殊情况下，比如各种低代码项目例如我们的可视化大屏项目这种、`eval()`无法使用的特殊环境还是有用的。
:::

#### 2.1 语法
```js
new Function (arg1, arg2, ... argN, functionBody) 
```
- `arg1, arg2, ... argN`：函数使用零个或多个名称作为正式的参数名称。每一个必须是一个符合有效的 `JavaScript` 标识符规则的字符串或用逗号分隔的字符串列表。
- `functionBody`：一个构成的函数定义的，包含 `JavaScript` 声明语句的字符串。

#### 2.2 作用域
```js
let a = 1
let fn = function(){
  let a = 2
  let result1 = new Function('console.log(a)')
  let result2 = function(){
    console.log(a)
  }
  result1() //打印出1，访问的是全局变量a
  result2() //打印出2
}
fn()
// new Function这样的函数不能访问外部变量，只能访问全局变量
// 虽然这段代码可以在浏览器中正常运行，但在 Node.js 中，result1() 执行会报错，因为找不到变量 a。
// 这是因为，在 Node 中，顶级作用域不是全局作用域，而 a 其实是在模块的作用域之中。
```
- 通过函数表达式定义的函数和通过函数声明定义的函数只会被解析一次，而 `Function` 构造函数定义的函数却不同。也就是说，每次构造函数被调用，传递给 `Function` 构造函数的函数体字符串都要被解析一次。虽然函数表达式每次都创建了一个闭包，但函数体不会被重复解析，因此函数表达式仍然要快于"`new Function(...)`"。