---
title: echarts实现3D饼图
author: 怡然
createTime: 2024/07/17 17:18:43
permalink: /article/tz5umm6a/
tags:
  - echarts
---

::: info
echarts本身是没有3D饼图的，需要借助echarts-gl插件实现。
:::

```vue
<template>
  <div class="water-eval-container">
    <div id="cityGreenLand-charts" class="cityGreenLand-charts">
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  name: 'CityGreenLand',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      // 配置饼图的颜色，也可以在下面配置项中配置
      itemStyleColor: [{ color: '#33AC76' }, { color: '#5FA3E4' }, { color: '#A7E3ED' }, { color: '#76EFE6' }, { color: '#E88C5D' }],
      optionData: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 将传入的数据进行处理
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].itemStyle = this.itemStyleColor[i];
        this.data[i].value = Number.parseInt(this.data[i].value)
      }
      this.optionData = this.data; // {itemStyle:{color: '#33AC76'},value:23123,name:'1天'}
      if (this.optionData.length == 0) return;
      this.option = this.getPie3D(this.optionData, 0.8);
      // 构建3d饼状图
      const myChart = echarts.init(document.getElementById('cityGreenLand-charts'));
      // 传入数据生成 option
      myChart.setOption(this.option);
      this.bindListen(myChart);
    },
    getPie3D(pieData, internalDiameterRatio) {
      // internalDiameterRatio:透明的空心占比
      const that = this;
      const series = []; // 饼图数据
      let sumValue = 0; // 饼图的总数值
      let startValue = 0; // 饼图的开始值
      let endValue = 0; // 饼图的结束值
      let legendData = []; // 图例数据
      let legendBfb = []; // 图例百分比
      const k = 1 - internalDiameterRatio; // 计算空心的半径
      // 对传入的数据进行排序
      pieData.sort((a, b) => {
        return (b.value - a.value);
      });
      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        const seriesItem = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name, // 系列名称
          type: 'surface', // 类型
          parametric: true, // 是否是参数曲面
          wireframe: {
            show: false // 是否显示网格线
          },
          pieData: pieData[i], // 饼图数据
          pieStatus: {
            selected: false, // 是否选中
            hovered: false, // 是否悬浮
            k: k // 空心的半径
          },
        };
        // 如果传入了 itemStyle，就使用传入的 itemStyle
        if (typeof pieData[i].itemStyle !== 'undefined') {
          const itemStyle = {};
          typeof pieData[i].itemStyle.color !== 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
          typeof pieData[i].itemStyle.opacity !== 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;
          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      legendData = [];
      legendBfb = [];
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value; // 计算扇形的结束值
        series[i].pieData.startRatio = startValue / sumValue; // 计算扇形的开始比率
        series[i].pieData.endRatio = endValue / sumValue; // 计算扇形的结束比率
        series[i].parametricEquation = this.getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio,
          false, false, k, series[i].pieData.value); // 生成参数方程。传参分别是开始比率、结束比率、是否选中、是否悬浮、空心的半径、扇形的数值。
        startValue = endValue; // 计算下一个扇形的开始值
        const bfb = that.fomatFloat(series[i].pieData.value / sumValue, 4); // 计算百分比，传参为扇形的数值除以总数值
        legendData.push({ // 图例数据
          name: series[i].name,
          value: bfb
        });
        legendBfb.push({ // 图例百分比
          name: series[i].name,
          value: bfb
        });
      }
      const boxHeight = this.getHeight3D(series, 16);// 通过传参设定3d饼/环的高度，16代表16px
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      const option = {
        legend: { // 图例
          data: legendData,
          orient: 'horizontal',
          left: 'right',
          top: 60,
          width:100,
          itemGap: 10,
          textStyle: {
            fontSize: '17px',
            color: '#A1E2FF'
          },
          show: true,
          icon: 'circle',
          formatter: function (param) {
            const item = legendBfb.filter(item => item.name === param)[0];
            const bfs = that.fomatFloat(item.value * 100, 2) + '%';
            return ` ${item.name} ${bfs}`;
          }
        },
        labelLine: { // 标签线
          show: true,
          lineStyle: {
            color: '#7BC0CB'
          }
        },
        label: { // 标签
          show: true,
          position: 'outside',
          rich: {
            b: {
              color: '#7BC0CB',
              fontSize: 17,
              lineHeight: 20
            },
            c: {
              color: '#8cefa3',
              fontSize: 17
            }
          },
          formatter: '{b|{b} \n}{c|{d}}{b|  %}'

        },
        tooltip: { // 提示框
          trigger: 'item',
          backgroundColor: '#001c38cf',
          borderColor: '#00B8FF',
          borderWidth: 2,
          borderRadius: 8,
          textStyle: {
            align: 'left',
            fontSize: 14,
            color: '#fff'
          },
          formatter: (params) => {
            if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
              const bfb = ((option.series[params.seriesIndex].pieData.endRatio - option.series[params.seriesIndex].pieData.startRatio) * 100).toFixed(2)
              return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` + `${params.seriesName}<br/>` + '数值：' + option.series[params.seriesIndex].pieData.value + '人<br/>' + '占比：' + `${bfb}%`
            }
          }
        },
        // x,y,z调整大小的，也可以更改饼图的形状
        xAxis3D: {
          min: -0.55,
          max: 0.55
        },
        yAxis3D: {
          min: -0.55,
          max: 0.55
        },
        zAxis3D: {
          min: -0.55,
          max: 0.55
        },
        grid3D: {
          show: false,
          boxHeight: boxHeight, // 圆环的高度
          viewControl: { // 3d效果可以放大、旋转等，请自己去查看官方配置
            alpha: 40, // 角度
            distance: 300, // 调整视角到主体的距离，类似调整zoom，调整饼图视觉上大小时调整这个值，值越小，饼图越大
            rotateSensitivity: 0, // 设置为0无法旋转
            zoomSensitivity: 0, // 设置为0无法缩放
            panSensitivity: 0, // 设置为0无法平移
            autoRotate: true // 自动旋转
          },
          top:'top', // 调整饼图的位置
          left:'left',
        },
        series: series
      };
      return option;
    },

    // 获取3d丙图的最高扇区的高度
    getHeight3D(series, height) {
      series.sort((a, b) => {
        return (b.pieData.value - a.pieData.value);
      })
      return height * 25 / series[0].pieData.value;
    },

    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      const midRatio = (startRatio + endRatio) / 2; // 计算扇形的中间比率
      const startRadian = startRatio * Math.PI * 2; // 计算扇形的开始弧度
      const endRadian = endRatio * Math.PI * 2; // 计算扇形的结束弧度
      const midRadian = midRatio * Math.PI * 2; // 计算扇形的中间弧度
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== 'undefined' ? k : 1 / 3;
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      const hoverRate = isHovered ? 1.05 : 1;
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
        },
        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        }
      };
    },
    // 这是一个自定义计算的方法
    fomatFloat(num, n) {
      var f = parseFloat(num); // 强制转换为浮点数
      if (isNaN(f)) {
        return false;
      }
      f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
      var s = f.toString();
      var rs = s.indexOf('.');
      // 判定如果是整数，增加小数点再补0
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + n) {
        s += '0';
      }
      return s;
    },

    bindListen(myChart) {
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      const that = this;
      let selectedIndex = '';
      let hoveredIndex = '';
      // 监听点击事件，实现选中效果（单选）
      myChart.on('click', function (params) {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        const isSelected = !that.option.series[params.seriesIndex].pieStatus.selected;
        const isHovered = that.option.series[params.seriesIndex].pieStatus.hovered;
        const k = that.option.series[params.seriesIndex].pieStatus.k;
        const startRatio = that.option.series[params.seriesIndex].pieData.startRatio;
        const endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
        // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
        if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
          that.option.series[selectedIndex].parametricEquation = that.getParametricEquation(that.option.series[
            selectedIndex].pieData
            .startRatio, that.option.series[selectedIndex].pieData.endRatio, false, false, k, that.option.series[
              selectedIndex].pieData
            .value);
          that.option.series[selectedIndex].pieStatus.selected = false;
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
        that.option.series[params.seriesIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio,
          isSelected,
          isHovered, k, that.option.series[params.seriesIndex].pieData.value);
        that.option.series[params.seriesIndex].pieStatus.selected = isSelected;
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        isSelected ? selectedIndex = params.seriesIndex : null;
        // 使用更新后的 option，渲染图表
        myChart.setOption(that.option);
      });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on('mouseover', function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return;
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = that.option.series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio = that.option.series[hoveredIndex].pieData.startRatio;
            endRatio = that.option.series[hoveredIndex].pieData.endRatio;
            k = that.option.series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            that.option.series[hoveredIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio,
              isSelected,
              isHovered, k, that.option.series[hoveredIndex].pieData.value);
            that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = '';
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = that.option.series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio = that.option.series[params.seriesIndex].pieData.startRatio;
            endRatio = that.option.series[params.seriesIndex].pieData.endRatio;
            k = that.option.series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            that.option.series[params.seriesIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio,
              isSelected, isHovered, k, that.option.series[params.seriesIndex].pieData.value + 5);
            that.option.series[params.seriesIndex].pieStatus.hovered = isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(that.option);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on('globalout', function () {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = that.option.series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = that.option.series[hoveredIndex].pieStatus.k;
          startRatio = that.option.series[hoveredIndex].pieData.startRatio;
          endRatio = that.option.series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          that.option.series[hoveredIndex].parametricEquation = that.getParametricEquation(startRatio, endRatio,
            isSelected,
            isHovered, k, that.option.series[hoveredIndex].pieData.value);
          that.option.series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = '';
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(that.option);
      });
    }
  }
}
</script>
<style>
.water-eval-container {
  width: 100%;
  height: 100%;
}

.cityGreenLand-charts {
  height: 280px;
  width: 100%;
}
</style>
```