---
title: cesium基础
author: 怡然
createTime: 2025/06/16 14:52:40
permalink: /cesium/9zfnyfpf/
---

## 1. `vue3`项目中引入`cesium`及`cesium`基础设置
- `npm install cesium`
- 在`node modules`中找到`cesium`文件夹下的`build/cesium/`，把`assets``thirdparty``widgets``workers`四个文件夹复制到`public`，再把`widgets`复制到`src`下。
- `vite.config.js`中
```js
export default defineConfig({
  ...
  // 设置cesium静态资源路径
  define: {
    CESIUM_BASE_URL: JSON.stringify("/")
  }
})
```
- 页面文件中这样引入和使用：
```vue
<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import "./Widgets/widgets.css"
import { onMounted } from 'vue'
// 设置cesium的token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzMxYjQ2Mi00MzE5LTQwYzItODIzZC04NTAzMTJiZGRiNmMiLCJpZCI6MzA4NjU0LCJpYXQiOjE3NDg5MjE1NDR9.c2kMuu6glG1ACmtAeSMXwlzFpKjwsREkZR9WGqB6gHw'
// 设置cesium默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  89.5,  // 西方经度
  20.4,  // 南方维度
  110.4,  // 东方经度
  61.2   // 北方维度   这里设置的经纬度范围是中国区域大致的经纬度范围
)
onMounted(() => {
  let viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false, // 设置信息框为false，因为使用iframe加载会报错
  })
  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'
})
</script>

<style>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
```

## 2. `viewer`查看器设置
```js
onMounted(() => {
  let viewer = new Cesium.Viewer("cesiumContainer", {
    // 是否显示信息窗口
    infoBox: false, 
    // 是否显示搜索框
    geocoder:false,
    // 是否显示切换到home视角
    homeButton:false,
    // 3D,2D,2.5D模式切换
    sceneModePicker:false,
    // 切换地图样式图层选择器
    baseLayerPicker:false,
    // 帮助按钮
    navigationHelpButton:false,
    // 是否播放动画
    animation:false,
    // 是否显示时间轴
    timeline:false,
    // 是否显示全屏按钮
    fullscreenButton:false,
    // 设置天空盒 可以设置为false，也可以使用贴图
    skyBox:new Cesium.SkyBox({
      sources:{
        positiveX:'./Widgets/skybox/px.jpg',
        negativeX:'./Widgets/skybox/nx.jpg',
        positiveY:'./Widgets/skybox/py.jpg',
        negativeY:'./Widgets/skybox/ny.jpg',
        positiveZ:'./Widgets/skybox/pz.jpg',
        negativeZ:'./Widgets/skybox/nz.jpg',
      }
    }),
    // 使用地图图层设置
    baseLayer: new Cesium.ImageryLayer(
      new Cesium.WebMapTileServiceImageryProvider({
        url: 'https://t0.tianditu.gov.cn/img_w/wmts?tk=b56ba38de42200f6893248d569845a43', // 天地图影像图层
        layer: 'img',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'w',
        credit: new Cesium.Credit('Tianditu'),
      })
    ),
    // 设置地形（高低起伏，使用本身提供的地形数据）
    terrain: Cesium.Terrain.fromWorldTerrain({
      // requestWaterMask: true, // 请求水体效果(水纹)
      requestVertexNormals: true // 请求地形照明数据
    }),
    // 使用自己提供的地形数据
    terrain: new Cesium.Terrain(
      Cesium.CesiumTerrainProvider.fromUrl("https://myTestTerrain.com")
    )
  })

  // 如需多地图图层叠加
  let imageryLayers = viewer.imageryLayers
  let layer = imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: 'https://t0.tianditu.gov.cn/cva_w/wmts?tk=b56ba38de42200f6893248d569845a43',
      layer: 'cva',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'w',
      credit: new Cesium.Credit('Tianditu'),
    })
  )
  // 设置图层透明度，否则无法显示两个图层
  layer.alpha = 0.5
})
```

## 3. 地形数据设置
```js
onMounted(async () => {
  try {
    let viewer = new Cesium.Viewer("cesiumContainer", {
      // 是否显示信息窗口
      infoBox: false,
      // 设置地形（高低起伏，使用本身提供的地形数据）方法一
      terrainProvider: await Cesium.createWorldTerrainAsync({
        requestWaterMask: true,
        requestVertexNormals: true
      })
      // 设置地形（高低起伏，使用本身提供的地形数据）方法二
      // terrain: Cesium.Terrain.fromWorldTerrain({
      //   // requestWaterMask: true, // 请求水体效果(水纹)
      //   requestVertexNormals: true // 请求地形照明数据
      // }),
      // 使用自己提供的地形数据 方法三
      // terrain: new Cesium.Terrain(
      //   Cesium.CesiumTerrainProvider.fromUrl("https://myTestTerrain.com")
      // )
    })
  } catch (e) {
    console.error("初始化Cesium Viewer失败:", e);
  }
})
```