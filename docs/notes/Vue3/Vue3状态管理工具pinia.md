---
title: Vue3状态管理工具pinia
author: 怡然
createTime: 2024/06/19 17:30:54
permalink: /Vue3/zz93q7u2/
---

## 1. 搭建`pinia`环境
- 第一步，创建
  ```powershell
  npm install pinia
  ```
- 在 `main.ts` 中引入
  ```ts
  import {createPinia} from 'pinia'
  const pinia=createPinia()
  app.use(pinia)
  ```

## 2. 存储+读取数据
- 在 `src` 中新建一个 `store` 文件夹，里面新建相关的store
  ```ts
  import {defineStore} from 'pinia'
  export const useCountStore = defineStore('count',{
    state(){
      return {
        sum:6,
        school:'firstSchool',
        address:'GaoxinStreet'
      }
    },
    actions:{ // 放置方法，用于相应组件中的动作
      increment(value:number){
        if(this.sum<10){
          this.sum += value // this表示useCountStore
        }
      },
    },
    getters:{  // 类似与计算属性,可以用state也可以用this
      bigSum(state){
        return state.sum*10
      },
      // 也可以写为：
      // bigSum:state=>state.sum*10  // 注意箭头函数不可以用this
      upperSchool():string{
        return this.school.toUpperCase
      }
    }
  })
  ```
- 在组件中使用
  ```ts
  import { storeToRefs } from "pinia"
  import {useCountStore} from '@/store/count.ts'
  const countStore = useCountStore()
  console.log(countStore.sum) //6
  console.log(countStore.$state.sum) //6
  // 如需解构赋值，使用storeToRefs只关注pinia里的数据
  const {sum,school,address,bigSum,upperSchool} = storeToRefs(countStore)
  ```

## 3. 修改数据
1. 直接修改
  ```ts
  function add(){
    countStore.sum+=1
  }
  ```
2. 批量修改
  ```ts
  function add(){
    countStore.$patch({
      sum:sum+1,
      school:'第一中学',
      address:'高新大道'
    })
  }
  ```
3. `action` 修改
  ```ts
  let n = ref(3)
  function add(){
    countStore.increment(n.value)
  }
  ```

## 4. `$subscribe` 订阅
```ts
countStore.$subscribe((mutate,state)=>{
  console.log(mutate,state) 
})
```
:::tip
该方法类似于watch方法，监听store里数据的变化，可以在数据变化时执行一些操作
:::

## 5. `pinia` 的组合式写法
```ts
import {defineStore} from 'pinia'
import axios from 'axios'
import {nanoid} from 'nanoid' // 随机生成不唯一ID的插件
import {reactive} from 'vue'

export const useTalkStore = defineStore('talk',()=>{
  // talkList就是state
  const talkList = reactive(
    JSON.parse(localStorage.getItem('talkList') as string) || []
  )

  // getATalk函数相当于action
  async function getATalk(){
    let {data:{content:title}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
    let obj = {id:nanoid(),title}
    talkList.unshift(obj)
  }
  return {talkList,getATalk}
})
```