---
title: uniapp基础
author: 怡然
createTime: 2024/07/18 15:51:11
permalink: /uniapp/irrmwdto/
---

## 1. 开发环境和项目创建
- 推荐使用HBuilder编译器，和uniapp是同一家生态，无论是创建项目还是代码提示都比较友好。
- 如果是小程序开发，推荐安装微信开发者工具，便于调试。

## 2. 全局文件
### 2.1 `manifest.json`
- 配置打包上线的一些项目

### 2.2 `pages.json`
```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": { // 属性与下方全局属性的配置一致，在页面样式配置会覆盖全局的配置
				"navigationBarTitleText": "遗愿清单"
			}
		},
		{
			"path" : "pages/list/list",
			"style" : 
			{
				"navigationBarTitleText" : "我的清单"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black", // 导航栏标题颜色，仅支持black和white
		"navigationBarTitleText": "uni-app", // 导航栏标题文字内容，权重低于上面页面配置的权重
		"navigationBarBackgroundColor": "#F8F8F8", // 导航栏背景颜色 
		"enablePullDownRefresh": true, // 是否开启下拉刷新
		"backgroundColor": "#F8F8F8", // 下拉刷新的背景色
		"backgroundTextStyle": "dark", // 下拉刷新时三个点的颜色
		"onReachBottomDistance": 500, // 触底更新的距离，配合页面生命周期的onReachBottom使用
		"navigationStyle": "custom" // 导航栏样式，配置为custom以后上述对导航栏的设置会失效
	},
	"tabBar": { // 下方导航栏
		"color": "#494949", // 文字颜色
		"selectedColor": "#aa699f", // 选中文字颜色
		"backgroundColor": "#fff", // 底部导航背景颜色
		"borderStyle": "white", // 边框样式
		"position": "top", // 导航栏位置，默认在底部，top只有微信小程序支持
		"list": [ // 导航列表，数量最少两个最多五个
			{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "", // 默认情况下icon路径，需设置大小为81px，不支持网络图片
				"selectedIconPath": "" // 选中情况下icon路径
			},
			{
				"pagePath": "pages/list/list",
				"text":"清单"
			}
		]
	},
	"uniIdRouter": {}
}
```

## 3. 常用尺寸单位`rpx`
- rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算。

## 4. 全局Api
### 4.1 交互反馈`showToast`与`hideToast`
1. `showToast`
```js
uni.showToast({
  title:'成功', // 显示文字
  icon:'success', // 图标类型，设置为none时title的文字可以在小程序中换行显示
  image:'', // 不设置icon可以自己设置图片
  mask:true, // 是否显示透明蒙层，防止触摸穿透
  duration:2000, // 显示时间，单位ms
  success:function(res){ // 成功回调
    console.log(res)
  },
  fail:function(res){ // 失败回调
    console.log(res)
  },
  complete:function(res){ // 结束回调
  }
})
```
2. `hideToast`
```js
uni.hideToast() // 关闭提示框
```

### 4.2 `showLoading`与`hideLoading`
```js
uni.showLoading({
  title:'加载中...', // 显示文字
  mask:true, // 是否显示透明蒙层，防止触摸穿透
  success:function(res){ // 成功回调
    console.log(res)
  },
  fail:function(res){ // 失败回调
    console.log(res)
  },
  complete:function(res){ 
    // 结束回调
  }
})
```

### 4.3 `showModal`模态框
```js
uni.showModal({
  title:'是否删除', // 模态框标题
  content:'xxxxxxxx', // 详细描述
  showCancel:true, // 是否显示取消按钮
  cancelText:'取消', // 取消按钮文字
  cancelColor:'#000000', // 取消按钮文字颜色
  confirmText:'确定', // 确定按钮文字
  confirmColor:'#3CC51F', // 确定按钮文字颜色
  editable:true, // 是否显示输入框
  placeholderText:'请输入', // 输入框提示文字
  success:function(res){ // 成功回调
    console.log(res)
  },
  fail:function(res){ // 失败回调
  },
  complete:function(res){ // 结束回调
  }
})
```

### 4.4 `showActionSheet`
```js
uni.showActionSheet({
  title:'提示文字', // 非必填
  itemList:["本科"，"专科","中专","高中","初中","小学","幼儿园"],
  itemColor:'#333333', // 选项颜色
  success:function(res){ // 成功回调，其余的回调函数同上述
  },
})
```

## 5. 设置导航条
- 常用于详情页设置导航标题
```js
uni.setNavigationBarTitle({
  title:''
})
uni.setNavigationBarColor({
  // 设置页面导航条颜色。如果需要进入页面就设置颜色，请延迟执行，防止被框架内设置颜色逻辑覆盖
})
uni.showNavigationBarLoading({
  // 在当前页面显示导航条加载动画。
})
uni.hideNavigationBarLoading() // 在当前页面隐藏导航条加载动画。
uni.hideHomeButton() // 隐藏返回首页按钮。
```

## 6. 设置`tabBar`(参考官方文档)

## 7. 下拉刷新的api

## 8. 页面和路由

## 9. 数据缓存
### 9.1 `uni.setStorage`和`uni.getStorage`
- 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
```js
uni.setStorage({
	key: 'storage_key',
	data: 'hello',
	success: function () {
		console.log('success');
	}
});
```
- 从本地缓存中异步获取指定 key 对应的内容。
```js
uni.getStorage({
	key: 'storage_key',
	success: function (res) {
		console.log(res.data);
	}
});
```

### 9.2 `uni.setStorageSync`和`uni.getStorageSync`
- 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
```js
uni.setStorageSync('storage_key', 'hello');
```
- 从本地缓存中同步获取指定 key 对应的内容。
```js
const value = uni.getStorageSync('storage_key');
```

### 9.3 `uni.removeStorage`和`uni.removeStorageSync`
- 从本地缓存中异步移除指定 key。
```js
uni.removeStorage({
	key: 'storage_key',
	success: function (res) {
		console.log('success');
	}
});
```
- 从本地缓存中同步移除指定 key。
```js
uni.removeStorageSync('storage_key');
```

### 9.4 `uni.clearStorage`和`uni.clearStorageSync`
- 异步清理本地数据缓存。
```js
uni.clearStorage();
```
- 同步清理本地数据缓存。
```js
uni.clearStorageSync();
```

### 9.5 `uni.getStorageInfo`和`uni.getStorageInfoSync`
- 异步获取当前 storage 的相关信息。
```js
uni.getStorageInfo({
	success: function (res) {
		console.log(res.keys);
		console.log(res.currentSize);
		console.log(res.limitSize);
	}
});
```
- 同步获取当前 storage 的相关信息。
```js
const res = uni.getStorageInfoSync();
console.log(res.keys);
console.log(res.currentSize);
console.log(res.limitSize);
```

## 10. request数据请求
```js
const requestTask = uni.request({
	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
	data: {
        name: 'name',
        age: 18
	},
	success: function(res) {
		console.log(res.data);
	}
});
// 中断请求任务
requestTask.abort();
```
- 也可以写`.then()`或者`async await`
```js
const requestTask = uni.request({
	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
	data: {
        name: 'name',
        age: 18
	},
}).then(res=>{
	console.log(res.data);
})
```
```js
async function getData(){
	const res = await uni.request({
		url: 'URL_ADDRESS', //仅为示例，并非真实接口地址。
		data: {
			name: 'name',
			age: 18
		},
	});
	console.log(res.data);
}
```