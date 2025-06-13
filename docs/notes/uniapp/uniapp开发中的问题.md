---
title: uniapp开发中的问题
author: 怡然
createTime: 2025/06/06 16:56:12
permalink: /uniapp/vxya3zp9/
---

::: info 
最近用uniapp开发安卓应用，遇到了很多之前没接触过的问题，基本出现在H5和APP开发中，做一下记录。
:::

## 1. 打开文件管理器

::: info
uniapp内置的api方法只能在H5页面中访问文件管理，在app中只能访问到相册，但是项目需求需要从文件管理器中上传一特定格式的文件，所以需要获取手机的文件管理权限。以下是解决方案：
:::

- 本组件
:::details
```vue
<template>
<view class="form-area-item" :key="timeStamp">
  <text class="form-area-item-text">选择您的形象</text>
  <button @click="chooseFile" class="cu-btn bg-red">选择文件</button>
  <text class="file-name" v-if="fileInfo.name">{{fileInfo.name}}</text>
  <text class="none-file" v-if="!showPerson">未选择文件</text>
</view>
</template>
<script>
export default{
  onShow() {
    this.timeStamp = new Date().getTime()
    this.fileInfo.path = uni.getStorageSync('filePath');
    this.fileInfo.name = uni.getStorageSync('fileName');
    if (this.fileInfo.name) this.showPerson = true
  },
  methods:{
    chooseFile() {
      uni.navigateTo({
        url: "/pages/root-filelist/root-filelist",
      });
    },
  }
}
</script>
```
:::
- 跳转后的页面
:::details
```vue
<template>
	<view>
		<view v-if="stack.length > 1" class="file-item" @click="openParent(stackLast)">
			<view>
				<image src="../../static/phone.png" class="icon" mode="widthFix"></image>
			</view>
			<view class="item-content"><text>...上一层</text></view>
		</view>
		<view v-for="(item, index) in fileList" :key="index" @click="onFileSelected(item)" class="file-item">
			<view>
				<image v-if="item.type === 'file'" :src="fileType(item.name)" class="icon" mode="widthFix"></image>
				<image v-else src="../../static/phone.png" class="icon" mode="widthFix"></image>
			</view>
			<view class="item-content">
				<text>{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>
<script>
import pdf from '../../static/icon_pdf.png';
import word from '../../static/icon_word.png';

// 导入 java.io.File 类 这一步最重要
const File = plus.android.importClass('java.io.File');

export default {
  data() {
    return {
      fileList: [],
      stack: [],
      pdf,
      word,
      fileInfo: {}
    };
  },
  computed: {
    stackLast() {
      return {
        type: 'dir',
        path: this.stack[this.stack.length - 2]
      };
    }
  },
  methods: {
    fileType(type) {
      return /.docx$/.test(type) ? this.word : this.pdf;
    },
    openParent(item) {
      this.stack = this.stack.slice(0, this.stack.length - 1);
      this.fileList = [];
      this.getPrivateDir(item.path);
    },
    onFileSelected(item) {
      if (item.type === 'dir') {
        this.stack.push(item.path);
        this.fileList = [];
        this.getPrivateDir(item.path);
      } else {
        console.log('选中的文件', item);
        this.fileInfo.name = item.name
        this.fileInfo.path = item.path
        uni.setStorageSync('filePath', item.path); // 由于路由跳转到tabBar页面不可携带参数，所以采用storage的方式缓存数据
        uni.setStorageSync('fileName', item.name);
        uni.switchTab({
          url: "/pages/index",
        });
      }
    },
    getPrivateDir(dirPath) {
      uni.showLoading({
        title: '加载中'
      });

      let dir = new File(dirPath);
      if (!dir.exists()) {
        console.log('目录不存在');
        uni.hideLoading();
        return;
      }

      const files = dir.listFiles();
      if (files == null) {
        uni.hideLoading();
        return;
      }

      const lists = [];

      for (let i = 0; i < files.length; i++) {
        let json = {
          name: '',
          type: '',
          time: '',
          size: '',
          path: ''
        };
        let file = files[i];

        if (file.isDirectory()) {
          let dirName = file.getName();
          let dirPath = file.getAbsolutePath();

          if (/^\./.test(dirName)) continue;

          json.type = 'dir';
          json.path = dirPath;
          json.name = dirName;
          lists.push(json);
        } else {
          let fileName = file.getName();
          let fileSize = file.length();
          let filePath = file.getAbsolutePath();

          if (/^\./.test(fileName)) continue;

          json.type = 'file';
          json.name = fileName;
          json.size = fileSize;
          json.path = filePath;
          json.time = file.lastModified();
          lists.push(json);
        }
      }

      this.fileList = lists;
      uni.hideLoading();
    }
  },
  mounted() {
    const dirPath = '/storage/emulated/0/';
    this.stack.push(dirPath);
    this.getPrivateDir(dirPath);
  }
};
</script>
```
:::

## 2. 录音功能实现
::: info 
实现录音功能不难，主要是之前没有接触过调用手机麦克风权限的录音功能，小记一下。
:::

:::details
```vue
<template>
<view>
  <view class="form-area-item" v-if="current=='record'">
    <button @click="toggleRecording">{{ isRecording ? '停止录音' : '开始录音' }}</button>
  </view>
  <audio v-if="audioPath" class="audio-bar" :src="audioPath" name="语音试听" poster="../static/images/xijiao/avator.png"
    :action="audioAction" controls></audio>
  </view>
</template>
<script>
const recorderManager = uni.getRecorderManager(); //  获取全局唯一的录音管理器 recorderManager。
const innerAudioContext = uni.createInnerAudioContext(); // 创建并返回内部 audio 上下文 innerAudioContext 对象。
innerAudioContext.autoplay = true;
export default{
  data(){
    return{
      isRecording: false,
      audioPath: null,
      recorderManager: null,
      innerAudioContext: null,
    }
  },
  onLoad() {
    this.recorderManager = uni.getRecorderManager();
    this.innerAudioContext = uni.createInnerAudioContext();

    // 监听录音停止
    this.recorderManager.onStop((res) => {
      console.log('录音结束，临时路径：', res.tempFilePath);
      this.audioPath = res.tempFilePath; // 替换为新录音路径
      this.isRecording = false;
    });

    // 监听录音错误
    this.recorderManager.onError((err) => {
      uni.showToast({
        title: '录音出错',
        icon: 'none'
      });
      console.error('录音错误：', err);
    });
  },
  methods:{
    radioChange(evt) {
      for (let i = 0; i < this.videoContent.length; i++) {
        if (this.videoContent[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    },

    toggleRecording() {
      if (this.isRecording) {
        this.recorderManager.stop();
      } else {
        // 开始录音前，如果已有录音则清空
        if (this.audioPath) {
          this.audioPath = null;
        }
        // 开始录音
        this.recorderManager.start({
          duration: 600000, // 最大录音时间（毫秒）
          sampleRate: 44100,
          numberOfChannels: 1,
          encodeBitRate: 192000,
          format: 'mp3',
          frameSize: 50
        });
        this.isRecording = true;
      }
    },
  }
}
</script>
```
:::

## 3. 分享功能
- 生成视频支持分享到微信登平台，app只支持分享到新浪微博和微信，微信支持分享到聊天界面、朋友圈和微信收藏功能。
  
:::details
```vue
<template>
  <view>
    <uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
			<view class="popup-content">
				<text class="text">分享到</text>
				<view class="app-icon">
					<view class="app-icon-item" @click="shareWeibo">
						<image class="app-icon-img" src="@/static/images/xijiao/weibo.png"></image>
						<view class="app-icon-text">
							新浪微博
						</view>
					</view>
					<view class="app-icon-item" @click="shareWechat">
						<image class="app-icon-img" src="@/static/images/xijiao/WeChat.png"></image>
						<view class="app-icon-text">
							微信
						</view>
					</view>
					<view class="app-icon-item" @click="shareTimeline">
						<image class="app-icon-img" src="@/static/images/xijiao/timeline.png"></image>
						<view class="app-icon-text">
							朋友圈
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
  </view>
</template>
<script>
export default{
  methods:{
    shareWeibo() {
      uni.share({
        provider: "sinaweibo", // 分享到的app
        type: 4, // 分享的媒体类型，具体参数见官网，4是视频分享
        mediaUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4",
        success: function(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function(err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    },
    shareWechat() {
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",  // 只有分享到微信有scene这个属性，具体值见官网
        type: 4,
        mediaUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4",
        success: function(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function(err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    },
    shareTimeline() {
      uni.share({
        provider: "weixin",
        scene: "WXSceneTimeline",
        type: 4,
        mediaUrl: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4",
        success: function(res) {
          console.log("success:" + JSON.stringify(res));
        },
        fail: function(err) {
          console.log("fail:" + JSON.stringify(err));
        }
      });
    }
  }
}
</script>
```
:::

## 4. 下载文件到手机
:::details
```vue
<template>
  <view class="icon-area">
    <uni-icons type="download-filled" size="30" color="#BD3124" @click="downloadVideo"></uni-icons>
  </view>
</template>
<script>
export default{
  methods:{
    downloadVideo() {
      uni.showToast({
        title: "下载中",
        icon: "loading",
        duration:100000
      })
      uni.downloadFile({
        url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', 
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功');
            uni.hideToast()
            uni.saveVideoToPhotosAlbum({  // 保存文件至本地相册
              filePath: res.tempFilePath
            })
            uni.showToast({
              title: "下载成功",
              icon: "success"
            })
          }else{
            uni.showToast({
              title: "下载失败",
              icon: "error"
            })
          }
        }
      });
    },
  }
}
</script>
```
:::

## 5. uniapp中路由跳转的传参问题解决
- 通常情况下，`uniapp`跳转到非`tabBar`页面可以在`url`后面拼接参数传参，如：`'path?key=value&key2=value2'`。
- 但是使用`uni.switchTab`跳转到`tabBar`页面，如上面所示的选择文件后跳转回工作台页面，需要携带文件的名称和路径回到主页面并且显示，因为不能携带参数，所以采用`storage`的方式存储数据，方法如下所示：

```js
// 文件目录
onFileSelected(item) {
  if (item.type === 'dir') {
    this.stack.push(item.path);
    this.fileList = [];
    this.getPrivateDir(item.path);
  } else {
    this.fileInfo.name = item.name
    this.fileInfo.path = item.path
    uni.setStorageSync('filePath', item.path);
    uni.setStorageSync('fileName', item.name);
    uni.switchTab({
      url: "/pages/index",
    });
  }
}

// 跳转回的页面，并且获取所传参数
onShow() {
  this.timeStamp = new Date().getTime()
  this.fileInfo.path = uni.getStorageSync('filePath');
  this.fileInfo.name = uni.getStorageSync('fileName');
  if (this.fileInfo.name) this.showPerson = true
}
```

- 这样存在另一个问题，存在缓存中的数据会在下次app打开时仍然回显，除非是在应用管理中清除了app本身的数据，这显然不是我们需要的操作，因为每次进入app都是需要重新选择相应的文件来进行下一步操作的，最初我尝试过在`onHide`中清除缓存，但是这样会引发另一个问题，及我在选择其他文件确定后再跳转回本页面，由于`onHide`的操作，会导致之前选择的文件丢失，经过分析uniapp中生命周期和钩子函数的调用时刻，最终选择在app启动时调用的钩子函数`onLaunch`中清除已有的缓存。方法如下：
```js
onLaunch: function() {
  uni.removeStorageSync('filePath');
  uni.removeStorageSync('fileName');
  this.initApp()
}
```

## 6. 