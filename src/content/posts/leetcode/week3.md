---
title: "第3周：进阶算法篇"
published: 2026-03-04
description: "掌握动态规划（DP）的核心思想，学习背包问题、图论基础和最短路径算法"
tags: ["力扣", "动态规划", "图论", "最短路径"]
category: "力扣刷题"
image: ""
draft: false
---

<WeekProgress week="3" title="进阶算法篇" color="#f59e0b" />

> 本周重点：掌握动态规划（DP）的核心思想，学习背包问题、图论基础和最短路径算法。

## Day 15: 动态规划入门

### 70. 爬楼梯 <span class="difficulty-easy">简单</span> [70](https://leetcode.cn/problems/climbing-stairs/)
- **描述**：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

- **思路**：`f[n]`表示爬`n`阶的方法。不难得出：`f[i] = f[i - 1] + f[i - 2]`

代码：
```java
class Solution {
    public int climbStairs(int n) {
        int[] f = new int[n + 1];
        f[0] = f[1] = 1;
        for (int i = 2; i <= n; i ++) {
            f[i] = f[i - 1] + f[i - 2];
        }
        return f[n];
    }
}
```

### 322. 零钱兑换 <span class="difficulty-medium">中等</span> [322](https://leetcode.cn/problems/coin-change/)
- **描述**：给你一个整数数组 `coins`，表示不同面额的硬币；以及一个整数 `amount`，表示总金额。计算并返回可以凑成总金额所需的**最少的硬币个数**。如果没有任何一种硬币组合能组成总金额，返回 -1。

- **思路**：完全背包模型。[背包九讲模板博客](https://blog.csdn.net/ecjtu2020/article/details/121809362)

```java
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] f = new int[amount + 1];
        Arrays.fill(f, 1000000000);
        f[0] = 0;
        for (int x : coins) {
            for (int i = x; i <= amount; i ++) {
                f[i] = Math.min(f[i], f[i - x] + 1);
            }
        }
        return f[amount] == 1000000000 ? -1 : f[amount];
    }
}
```

### 300. 最长递增子序列 <span class="difficulty-medium">中等</span> [300](https://leetcode.cn/problems/longest-increasing-subsequence/)
- **描述**：给你一个整数数组 `nums`，找到其中最长严格递增子序列的长度。子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。

- **解题思路**：LCS模板。[LIS和LCS](https://blog.csdn.net/ecjtu2020/article/details/121788781)

代码：
```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] f = new int[n]; // f[i] 表示以 a[i] 结尾的LCS
        int ans = 0;
        for (int i = 0; i < n;i ++) {
            f[i] = 1;
            for (int j = 0; j < i; j ++) {
                if (nums[i] > nums[j]) {
                    f[i] = Math.max(f[i], f[j] + 1);
                }
            }
            ans = Math.max(ans, f[i]);
        }
        return ans;
    }
}
// nlogn 优化版本
class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] f = new int[n];
        Arrays.fill(f, 0x3f3f3f3f);
        for (int i = 0; i < n; i ++) {
            int x = nums[i];
            int pos = lowerBound(f, x);
            f[pos] = x;
        }
        int ans = 0;
        while (ans < n && f[ans] != 0x3f3f3f3f) ans ++;
        return ans;
    }
    private int lowerBound(int[] a, int x) {
        int l = 0, r = a.length - 1;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (a[mid] >= x) r = mid;
            else l = mid + 1;
        }
        return l;
    }
}
```

### 139. 单词拆分 <span class="difficulty-medium">中等</span> [139](https://leetcode.cn/problems/word-break/)
- **描述**：给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。请你判断是否可以利用字典中出现的单词拼接出 `s`。

- **思路**：同样的定义`f[i]`表示`1 - i`这个字符串能否被拼接出来。对于字符串判断可以用`Set`

代码：
```java
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] f = new boolean[n + 1];
        f[0] = true;
        for (int i = 1; i <= n; i ++) {
            for (int j = i - 1; j >= Math.max(i - n, 0); j --) {
                if (f[j] && words.contains(s.substring(j, i))) {
                    f[i] = true;
                    break;
                }
            }
        }
        return f[n];
    }
}
```

---

## Day 16: DP 进阶（打家劫舍系列）

### 198. 打家劫舍 <span class="difficulty-medium">中等</span> [198](https://leetcode.cn/problems/house-robber/)
- **描述**：你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统。**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。

### 213. 打家劫舍 II <span class="difficulty-medium">中等</span> [213](https://leetcode.cn/problems/house-robber-ii/)
- **描述**：房屋围成一圈，第一间和最后一间相邻。

### 337. 打家劫舍 III <span class="difficulty-medium">中等</span> [337](https://leetcode.cn/problems/house-robber-iii/)
- **描述**：房屋排成二叉树结构，直接相连的房屋不能同时被偷。

---

## Day 17: 背包问题

### 416. 分割等和子集 <span class="difficulty-medium">中等</span> [416](https://leetcode.cn/problems/partition-equal-subset-sum/)
- **描述**：给你一个只包含正整数的非空数组 `nums`。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

### 494. 目标和 <span class="difficulty-medium">中等</span> [494](https://leetcode.cn/problems/target-sum/)
- **描述**：给你一个整数数组 `nums` 和一个整数 `target`。向数组中的每个整数前添加 '+' 或 '-'，然后串联起所有整数，可以构造一个表达式。返回可以通过上述方法构造的、运算结果等于 `target` 的不同表达式的数目。

### 474. 一和零 <span class="difficulty-medium">中等</span> [474](https://leetcode.cn/problems/ones-and-zeroes/)
- **描述**：给你一个二进制字符串数组 `strs` 和两个整数 `m` 和 `n`。请你找出并返回 `strs` 的最大子集的长度，该子集中**最多**有 `m` 个 `0` 和 `n` 个 `1`。如果 `x` 的所有元素也是 `y` 的元素，集合 `x` 是集合 `y` 的子集。

### 1049. 最后一块石头的重量 II <span class="difficulty-medium">中等</span> [1049](https://leetcode.cn/problems/last-stone-weight-ii/)
- **描述**：有一堆石头，每块石头的重量都是正整数。每次选出两块石头，将它们一起粉碎。如果石头重量分别为 x 和 y，且 x <= y，则粉碎结果为：如果 x == y，两块石头完全粉碎；如果 x != y，重量为 x 的石头完全粉碎，重量为 y 的石头新重量为 y-x。最后，最多只会剩下一块石头。返回此石头最小的可能重量。

---

## Day 18: 图论基础

### 200. 岛屿数量 <span class="difficulty-medium">中等</span> [200](https://leetcode.cn/problems/number-of-islands/)
- **描述**：给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。此外，你可以假设该网格的四条边均被水包围。

### 207. 课程表 <span class="difficulty-medium">中等</span> [207](https://leetcode.cn/problems/course-schedule/)
- **描述**：你总共需要修 `numCourses` 门课，课程编号从 `0` 到 `numCourses-1`。在选修某些课程之前需要一些先修课程。先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]`，表示如果要学习课程 `ai` 则必须先学习课程 `bi`。请你判断是否可能完成所有课程的学习？

### 994. 腐烂的橘子 <span class="difficulty-medium">中等</span> [994](https://leetcode.cn/problems/rotting-oranges/)
- **描述**：在给定的 `m x n` 网格 `grid` 中，每个单元格可以有以下三个值之一：值 0 代表空单元格；值 1 代表新鲜橘子；值 2 代表腐烂的橘子。每分钟，腐烂的橘子周围 4 个方向上相邻的新鲜橘子都会腐烂。返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1。

---

## Day 19: 最短路径

### 743. 网络延迟时间 <span class="difficulty-medium">中等</span> [743](https://leetcode.cn/problems/network-delay-time/)
- **描述**：有 n 个网络节点，标记为 1 到 n。给你一个列表 `times`，表示信号经过有向边的传递时间。`times[i] = (u, v, w)`，其中 `u` 是源节点，`v` 是目标节点，`w` 是一个信号从源节点传递到目标节点的时间。现在，从某个节点 `K` 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1。

### 1514. 概率最大的路径 <span class="difficulty-medium">中等</span> [1514](https://leetcode.cn/problems/path-with-maximum-probability/)
- **描述**：给你一个由 n 个节点（下标从 0 开始）组成的无向加权图，该图由一个描述边的列表 `edges` 和一个实数数组 `succProb` 组成。找到从 `start` 到 `end` 概率最大的一条路径，并返回这个最大概率。如果不存在从 `start` 到 `end` 的路径，返回 0。

### 1631. 最小体力消耗路径 <span class="difficulty-medium">中等</span> [1631](https://leetcode.cn/problems/path-with-minimum-effort/)
- **描述**：你准备参加一场远足活动。给你一个二维 `rows x columns` 的地图 `heights`，其中 `heights[row][col]` 表示格子 `(row, col)` 的高度。一开始你在最左上角的格子 `(0, 0)`，且希望你去最右下角的格子 `(rows-1, columns-1)`（注意下标从 0 开始）。你每次可以往 上，下，左，右四个方向之一移动，你想要找到耗费体力最小的一条路径。一条路径耗费的体力值是路径上相邻格子之间高度差绝对值的最大值。请你返回从左上角走到右下角的最小体力消耗值。

### 778. 水位上升的泳池中游泳 <span class="difficulty-hard">困难</span> [778](https://leetcode.cn/problems/swim-in-rising-water/)
- **描述**：在一个 N x N 的坐标方格 grid 中，每一个方格的值 grid[i][j] 表示位置 (i,j) 的高度。现在从方格 (0, 0) 开始。每一步，你可以往上、下、左、右方向移动。你不能走到边界之外。你只能在水位高度严格大于你的当前高度时才能游泳。找到可以从左上角游到右下角的最短时间。

---

## Day 20: 复习日

- 重做本周错题
- 总结 DP 的常见状态转移方程
- 总结图论算法（DFS、BFS、Dijkstra、拓扑排序）

---

## Day 21: 缓冲/补题

- 补充未完成的题目
- 或提前休息

---

## 本周总结

- **DP 核心**：定义状态、状态转移方程、初始条件、遍历顺序
- **背包问题**：0-1 背包、完全背包、多维背包
- **图论基础**：DFS/BFS 遍历、拓扑排序、Dijkstra 最短路径
- **DP 题目特征**：求最值、计数、判断可行性

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
