---
title: "第1周：基础篇（数组+链表+哈希）"
published: 2026-03-04
description: "掌握数组、链表和哈希表的基础算法，为后续学习打下坚实基础"
tags: ["力扣", "数组", "链表", "哈希表"]
category: "力扣刷题"
image: ""
draft: false
---

<WeekProgress week="1" title="基础篇" color="#8b5cf6" />

> 本周重点：掌握数组、链表和哈希表的基础算法，为后续学习打下坚实基础。

## Day 1: 哈希表入门

### 1. 两数之和 <span class="difficulty-easy">简单</span> [1](https://leetcode.cn/problems/two-sum/)
- **描述**：给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值 `target` 的那两个整数，并返回它们的数组下标。

- **思路**：用一个哈希表记录出现过的数。遍历序列，每次找一下 `target - nums[i]` 是否出现过即可。

参考代码：

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> mp = new HashMap<Integer, Integer>(); // 定义哈希表
        for (int i = 0; i < nums.length; i ++) { // 遍历序列
            if (mp.containsKey(target - nums[i])) { // 查看是否存在
                return new int[]{mp.get(target - nums[i]), i}; // 返回答案
            }
            mp.put(nums[i], i); // 记录出现过的数
        }
        return new int[0]; // 无解
    }
}
```

### 49. 字母异位词分组 <span class="difficulty-medium">中等</span> [49](https://leetcode.cn/problems/group-anagrams/)
- **描述**：给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。

- **思路**：用哈希表分组，把排序后的字符串当作$key$，排序前加到$key$的$Array$中

代码：

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> m = new HashMap<>(); // 声明一个哈希表
        for (String s : strs) { 
            char[] sortedS = s.toCharArray();
            Arrays.sort(sortedS); // 先排序
            /**
            排序后相同的字符串分到同一组
            computeIfAbsent：如果 key 不在哈希表中，则插入一个新的 ArrayList
            **/
            m.computeIfAbsent(new String(sortedS), _ -> new ArrayList<>()).add(s); 
        }
        return new ArrayList<List<String>>(m.values()); // 返回哈希表的值（values)
    }
}
```

### 128. 最长连续序列 <span class="difficulty-medium">中等</span> [128](https://leetcode.cn/problems/longest-consecutive-sequence/)
- **描述**：给定一个未排序的整数数组 `nums`，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

- **思路**: 先把所有的数放到$Set$中，然后我们遍历这个$Set$集合（不能遍历原数组），如果存在[1, 1, ..., 4, 5, ...] 一半的1，那就会退化到$O(n^2)$，所以一定是遍历$Set$集合。然后我们每次以当前数为起点去找最长，这个时候有一个关键的点就是，我们要从$x$去找$x+1，x+2，...$ 这很简单，关键是理解如果$x-1$存在，那么这个肯定不能当起点，因为$x - 1, x, x + 1 ...$ 一定会比当前的长的！

代码：
```java
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> st = new HashSet<>(); // 定义Set
        for (int x : nums) { // 把所有数都放进去
            st.add(x);
        }
        int ans = 0;
        for (int x : st) { // 遍历Set集合（！！！）
            if (st.contains(x - 1)) { // 如果存在 x - 1 直接跳过
                continue;
            }
            int y = x + 1;
            while (st.contains(y)) { // 找答案
                y ++;
            }
            ans = Math.max(ans, y - x); // 取最优
        }
        return ans;
    }
}
```

---

## Day 2: 双指针基础

### 283. 移动零 <span class="difficulty-easy">简单</span> [283](https://leetcode.cn/problems/move-zeroes/)
- **描述**：给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

- **解题思路**：题目要求：`请注意 ，必须在不复制数组的情况下原地对数组进行操作。`。所以我们只能做一些原地的操作，例如交换数组中两个数。遍历序列，用$j = 0$表示最左边非零序列的位置，遍历到非零数直接和`num[ij]`交换，然后$j ++$

代码：
```java
class Solution {
    public void moveZeroes(int[] nums) {
        int j = 0; // 最左边放非零的位置
        for (int i = 0; i < nums.length; i ++) {
            if (nums[i] != 0) { // 满足放过去。
                int tmp = nums[i];
                nums[i] = nums[j];
                nums[j] = tmp;
                j ++; // 向右移动一位
            }
        }
    }
}
``

### 11. 盛水容器 <span class="difficulty-medium">中等</span> [11](https://leetcode.cn/problems/container-with-most-water/)
- **描述**：给定一个长度为 `n` 的整数数组 `height`。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])`。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

- **思路**：长是越长越好，所以一开始一定是`height.length`，即$l=0$和$r=height.length-1$，然后高就是两个的最小值了。减少了长，那肯定要增加高，所以要移动较矮（小）的一方。双指针枚举答案即可。

代码：
```java
class Solution {
    public int maxArea(int[] height) {
        int ans = 0;
        int l = 0, r = height.length - 1; // 一开始是最大的长
        while (l < r) {
            int area = (r - l) * Math.min(height[l], height[r]); // 计算局部答案
            ans = Math.max(ans, area);
            if (height[l] < height[r]) { // 短的不要
                l ++;
            } else {
                r --;
            }
        }
        return ans;
    }
}
```

### 15. 三数之和 <span class="difficulty-medium">中等</span> [15](https://leetcode.cn/problems/3sum/)
- **描述**：给你一个整数数组 `nums`，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k`，同时还满足 `nums[i] + nums[j] + nums[k] == 0`。

- **解题思路**: 转换一下题目，求`-nums[i] = nums[j] + nums[k]`，可以枚举`nums[i]`，然后怎么满足呢？可以把原序列排个序，双指针找即可。

代码：
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); // 先排序
        List<List<Integer>> ans = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 2; i ++) { // 枚举nums[i]
            int x = nums[i];
            if (i > 0 && x == nums[i - 1]) continue; // 优化1： 上一个是一样的在上一轮算过了。
            if (x + nums[i + 1] + nums[i + 2] > 0) break; // 优化2： 最小的都大于0了，因为排过序了后面的肯定都大于零了。
            if (x + nums[n - 2] + nums[n - 1] < 0) continue; // 优化3：加两个最大的都小于0，直接跳过。
            int j = i + 1;
            int k = n - 1;
            while (j < k) {
                int s = x + nums[j] + nums[k];
                if (s > 0) {
                    k --;
                } else if (s < 0) {
                    j ++;
                } else {
                    ans.add(List.of(x, nums[j], nums[k]));
                    for (j ++; j < k && nums[j] == nums[j - 1]; j ++); // 去重
                    for (k --; k > j && nums[k] == nums[k + 1]; k --); // 去重
                }
            }
        }
        return ans;
    }
}
```


### 42. 接雨水 <span class="difficulty-hard">困难</span> [42](https://leetcode.cn/problems/trapping-rain-water/)
- **描述**：给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

- **思路**：此题解法很多，先给一个双指针。考虑当前$i$的能接多少，根据水往低处流的道理，我们比较一下最左边和最右边的最大值，取最小的然后相减就是答案。操作之前要先更新左右两边的最大值。

代码：
```java
class Solution {
    public int trap(int[] height) {
        int ans = 0;
        int l = 0, r = height.length - 1; // 双指针
        int leftMax = 0, rightMax = 0; // 记录左右两侧的最大值
        while (l < r) { 
          // 先更新最大值
            leftMax = Math.max(leftMax, height[l]);
            rightMax = Math.max(rightMax, height[r]);
            if (leftMax < rightMax) { // 然后看水往哪边流
                ans += leftMax - height[l];
                l ++;
            } else {
                ans += rightMax - height[r];
                r --;
            }
        }
        return ans;
    }
}
```

---

## Day 3: 滑动窗口

### 3. 无重复字符的最长子串 <span class="difficulty-medium">中等</span> [3](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
- **描述**：给定一个字符串 `s`，请你找出其中不含有重复字符的最长子串的长度。

- **解题思路**：维护一个滑动窗口，保证窗口内是符合条件的子串。记$left=0$，然后遍历整个字符串，查看当前窗口内是否符合条件，不符合说明当前字符与前面存在重复了，移动$left$。

代码：
```java
class Solution {
    public int lengthOfLongestSubstring(String S) {
        char[] s = S.toCharArray();
        int n = s.length;
        int ans = 0, left = 0;
        int[] cnt = new int[128];
        for (int r = 0; r < n; r ++) { // 遍历字符串
            char c = s[r];
            cnt[c] ++; // 记录当前状态
            while (cnt[c] > 1) { // 查看是否有重复的
                cnt[s[left]] --; // 移动left
                left ++;
            }
            ans = Math.max(ans, r - left + 1); // 更新答案
        }
        return ans;
    }
}
```

### 438. 找到字符串中所有字母异位词 <span class="difficulty-medium">中等</span> [438](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)
- **描述**：给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的异位词的子串，返回这些子串的起始索引。

### 560. 和为 K 的子数组 <span class="difficulty-medium">中等</span> [560](https://leetcode.cn/problems/subarray-sum-equals-k/)
- **描述**：给你一个整数数组 `nums` 和一个整数 `k`，请你统计并返回该数组中和为 `k` 的连续子数组的个数。

---

## Day 4: 链表基础

### 21. 合并两个有序链表 <span class="difficulty-easy">简单</span> [21](https://leetcode.cn/problems/merge-two-sorted-lists/)
- **描述**：将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

### 141. 环形链表 <span class="difficulty-easy">简单</span> [141](https://leetcode.cn/problems/linked-list-cycle/)
- **描述**：给你一个链表的头节点 `head`，判断链表中是否有环。

### 142. 环形链表 II <span class="difficulty-medium">中等</span> [142](https://leetcode.cn/problems/linked-list-cycle-ii/)
- **描述**：给定一个链表的头节点 `head`，返回链表开始入环的第一个节点。如果链表无环，则返回 `null`。

### 160. 相交链表 <span class="difficulty-easy">简单</span> [160](https://leetcode.cn/problems/intersection-of-two-linked-lists/)
- **描述**：给你两个单链表的头节点 `headA` 和 `headB`，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 `null`。

---

## Day 5: 链表进阶

### 2. 两数相加 <span class="difficulty-medium">中等</span> [2](https://leetcode.cn/problems/add-two-numbers/)
- **描述**：给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。

### 19. 删除链表的倒数第 N 个结点 <span class="difficulty-medium">中等</span> [19](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)
- **描述**：给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

### 23. 合并 K 个升序链表 <span class="difficulty-hard">困难</span> [23](https://leetcode.cn/problems/merge-k-sorted-lists/)
- **描述**：给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。

---

## Day 6: 复习日

- 重做本周错题
- 总结哈希表、双指针、链表的常见模板
- 整理时间复杂度和空间复杂度

---

## Day 7: 缓冲/补题

- 补充未完成的题目
- 或提前休息，为下一周做准备

---

## 本周总结

- **哈希表**：O(1) 查找，适合快速判断元素是否存在
- **双指针**：优化时间复杂度，减少嵌套循环
- **滑动窗口**：处理子数组/子串问题的利器
- **链表**：注意指针操作和边界条件

<style>
.difficulty-easy {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background-color: #e6fcfb;
  color: #00b8a3;
  border: 1px solid #00b8a3;
}
.difficulty-medium {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background-color: #fff9e6;
  color: #ffc01e;
  border: 1px solid #ffc01e;
}
.difficulty-hard {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  background-color: #ffe6ec;
  color: #ff375f;
  border: 1px solid #ff375f;
}
</style>
