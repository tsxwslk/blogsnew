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
:::info
这种解法不满足时间复杂度，题目要求是O(log(m+n))。
:::

- 二分查找，符合时间复杂度
```js
var findMedianSortedArrays = (nums1, nums2) => {
    let len1 = nums1.length, len2 = nums2.length
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1)//对nums1和nums2中长度较小的二分
    let len = len1 + len2//总长    
    let start = 0, end = len1 //进行二分的开始和结束位置  
    let partLen1, partLen2
    while (start <= end) {     
      partLen1 = (start + end) >> 1//nums1二分的位置                        
      partLen2 = ((len + 1) >> 1) - partLen1//nums2二分的位置               

      //L1:nums1二分之后左边的位置，L2，nums1二分之后右边的位置
      //R1:nums2二分之后左边的位置，R2，nums2二分之后右边的位置

      //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums1二分的位置左边一个
      let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1]
      //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums2二分的位置左边一个
      let L2 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1]
      //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
      let R1 = partLen1 === len1 ? Infinity : nums1[partLen1]
      //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
      let R2 = partLen2 === len2 ? Infinity : nums2[partLen2]

      if (L1 > R2) {//不符合交叉小于等于 继续二分         
        end = partLen1 - 1
      } else if (L2 > R1) {//不符合交叉小于等于 继续二分               
        start = partLen1 + 1                               
      } else { // L1 <= R2 && L2 <= R1 符合交叉小于等于
        return len % 2 === 0 ?
          (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : //长度为偶数返回作左侧较大者和右边较小者和的一半
          Math.max(L1, L2)	//长度为奇数返回作左侧较大者
      }
    }
}
```

## 5. 最长回文子串
> 示例：
> 输入：s = "babad" 
> 输出："bab" 
> 解释："aba" 同样是符合题意的答案。 

> 示例  
> 输入：s = "cbbd" 
> 输出："bb" 


```js
var longestPalindrome = function(s) {
		let max = ''
    for(let i=0; i< s.length; i++) {
        // 分奇偶， 一次遍历，每个字符位置都可能存在奇数或偶数回文
        center(i, i)  // 如果是奇数回文串，为中心对称，中心点是i
        center(i, i+1) // 如果是奇数回文串，为轴对称，那对称轴是i和i+1的中间，且i和i+1相等
    }
    function center(l, r) {
        // 定义左右双指针
        while(l>=0 && r< s.length && s[l] === s[r]) { // 如果s[l] === s[r]，则继续扩散
            l--   // 扩散时，左边界向左平移，右边界向右平移
            r++         
				}
				// 当跳出循环时，说明此时s[l]!==s[r]，也就是说形成回文字符串的是上一次循环，那么界限分别为l+1和r-1
				// 截取字符串的索引为l+1到(r-1+1)，slice截取时不包括右边索引
        const maxStr = s.slice(l + 1, r);
        // 取最大长度的回文字符
        if (maxStr.length > max.length) max = maxStr
    }
    return max
};
```