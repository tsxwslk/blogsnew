---
title: 动态合并table单元格
author: 怡然
createTime: 2024/07/17 14:59:18
permalink: /article/ghlsxnja/
tags:
  - element-ui
---

::: info
工作中遇到需要将表格数据中同一列中相同的内容合并为同一单元格的需求，因为数据是动态的，所以需要在拿到数据以后进行遍历比较，得出正确的需要合并的单元格的位置和数量。
:::

```html
<el-table :data="tableDataList" style="width: 100%" :span-method="getSpanMethod">
  <el-table-column label="测试属性1" prop="demo1" />
  <el-table-column label="测试属性2" prop="demo2" />
  <el-table-column label="测试属性3" prop="demo3" />
  <el-table-column label="测试属性4" prop="demo4" />
  <el-table-column label="测试属性5" prop="demo5" />
  <el-table-column label="测试属性6" prop="demo6" />
  <el-table-column label="测试属性7">
    <el-table-column label="测试属性8" prop="demo7" />
    <el-table-column label="测试属性9" prop="demo8" />
    <el-table-column label="测试属性10" prop="demo9" />
    <el-table-column label="测试属性11" prop="demo10" />
    <el-table-column label="测试属性12" prop="demo11" />
    <el-table-column label="测试属性13" prop="demo12" />
  </el-table-column>
</el-table>
```

```js
// 获取数据
data(){
  return{
    tableDataList:[],
    total:0,
    spanArr:[], // 用于存放合并单元格的二维数组
    position:0 // 初始单元格的index
  }
},
methods:{
  getDemoData() {
    getDemoData(this.parmas).then(res => {
      if (res.code == 200) {
        this.tableDataList = res.data.records;
        this.total = res.data.total;
        this.rowspan(4, 'campsegSubTheme'); // 这里需要写明需要合并列的属性名，便于后面遍历数据
        this.rowspan(5, 'startMon');
      }
    })
  },
  rowspan(idx, prop) {
    this.spanArr[idx] = []; 
    this.position = 0;
    this.tableDataList.forEach((item, index) => {
      if (index === 0) { // 第一行数据一定是合并单元格的起始
        this.spanArr[idx].push(1);
        this.position = 0;
      } else { // 如果不是第一行的数据则判断是否和上一行相同
        // 如果表格下一行的数据与上一行相同
        if (this.tableDataList[index][prop] === this.tableDataList[index - 1][prop]) {
          this.spanArr[idx][this.position] += 1; // 合并单元格的数量+1
          this.spanArr[idx].push(0); 
        } else { // 如果表格下一行的数据与上一行不同
          this.spanArr[idx].push(1); // 则该位置不合并，单独为一个单元格
          this.position = index; // 记录当前位置
        }
      }
    })
  },
  //表格单元格合并
  getSpanMethod({ row, column, rowIndex, columnIndex }) {
    for (let i = 4; i < 6; i++) { 
      // 遍历spanArr数组，找到需要合并的列的属性名，此处两列为连续的两列，如果不连续，比如是第三列和第六列，则写为[2,5]，用foreach遍历即可
      if (columnIndex === i) {
        const spanRow = this.spanArr[i][rowIndex]; // 找到当前行需要合并的单元格的数量
        const spanCol = spanRow > 0 ? 1 : 0; // 如果需要合并，则为1，否则为0
        return {
          rowspan: spanRow, // 合并的单元格的数量
          colspan: spanCol // 合并的单元格的宽度
        }
      }
    }
  },
}
```