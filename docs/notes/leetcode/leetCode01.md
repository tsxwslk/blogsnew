---
title: leetCode01
author: 怡然
createTime: 2024/08/27 09:30:43
permalink: /leetcode/f6f7gxi2/
---

## 1. 两数之和
> 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
> 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
> 你可以按任意顺序返回答案。

- 方法一，暴力破解，双重循环，耗时长
```js
var twoSum = function(nums, target) {
    let res=[]
    for(let i=0;i<nums.length;i++){
      for(let j=i+1;j<nums.length;j++){
        if(nums[i]+nums[j]===target){
          res=[i,j]
        }
      }
    }
    return res
};
```

- 方法二：一次循环，通过存储遍历过的元素和对应索引，在每次遍历中查找是否满足目标的数字
```js
var twoSum = function(nums, target) {
    const preNums = {}
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]
      const preNum = target - num
      if (preNums[preNum] != undefined) {
        return [preNums[preNum], i]
      }else{
        preNums[num]=i
      }
    }
};
```

## 2. 两数相加
> 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
> 请你将两个数相加，并以相同形式返回一个表示和的链表。
> 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
:::info
链表不是数组，不能直接遍历，也不能使用数组的方法，一开始看到这个题用了数组的方法，在之前的开发和学习中没有接触过链表相关的知识，所以一开始没有理解题目意思，后续针对链表进行相关学习。
:::

```js
// 定义链表节点 JS本身没有提供链表的相关方法，需要自己实现
class ListNode {
    constructor(val) {
        this.val = val;        // 节点的值
        this.next = null;   // 指向下一个节点的引用，初始为 null
    }
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    let head = new ListNode(0); // 创建一个虚拟头节点
    let current = head; // 当前节点指针
    let carry = 0;  // 进位
    while (l1 || l2 || carry) { // 遍历两个链表 需要注意 当l1 l2 都为空时 也需要判断carry是否为0
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry; // 计算当前节点的值
        carry = Math.floor(sum / 10); // 计算进位
        current.next = new ListNode(sum % 10);  // 创建新节点
        current = current.next; // 移动指针
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return head.next;
};
```
- 需要注意的是，本地测试需要自建链表测试
```js
const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

console.log(addTwoNumbers(l1, l2))
```

## 3. 返回字符串中最长不重复字符串的长度
> 示例：字符串为`"abcbabbbc"`，最长不重复字符串为`"abc"`，返回3
- 个人解法
```js
var lengthOfLongestSubstring = function (s) {
    // let str = ""
    // let num = 0
    // for (let i = 0; i < s.length; i++) {
    //     let index = str.indexOf(s[i])
    //     if (index == -1) {
    //         str += s[i]            
    //         num = num > str.length ? num : str.length
    //     } else {
    //         str = str.slice(index + 1)+s[i]
    //         num = num > str.length ? num : str.length            
    //     }
    // }
    // return num
    let str = ""
    let num = 0
    for (let i=0; i<s.length; i++){
      let index = str.indexOf(s[i])
      str = index=== -1 ? str + s[i] : str.slice(index+1)+s[i]
      num = num > str.length ? num : str.length
    }
    return num 
}
lengthOfLongestSubstring('dvdgerg')
```

- 官方解法，滑动窗口
```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        console.log(occ)
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};

// 作者：力扣官方题解
// 链接：https://leetcode.cn/problems/longest-substring-without-repeating-characters/solutions/227999/wu-zhong-fu-zi-fu-de-zui-chang-zi-chuan-by-leetc-2/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 4. 寻找两个正序数组的中位数
> 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
> 算法的时间复杂度应该为 O(log (m+n)) 。

> 示例一：
> 输入：nums1 = [1,3], nums2 = [2]
> 输出：2.00000
> 解释：合并数组 = [1,2,3] ，中位数 2

> 示例 2：
> 输入：nums1 = [1,2], nums2 = [3,4]
> 输出：2.50000
> 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

- 个人解法
```js
var findMedianSortedArrays = function(nums1, nums2) {
    let newArr=[...nums1,...nums2].sort((a,b)=>a-b)
    if(newArr.length%2==0){
      return ((newArr[newArr.length/2-1]+newArr[newArr.length/2])/2)
    }else{
      return newArr[(newArr.length-1)/2]
    }
};
```