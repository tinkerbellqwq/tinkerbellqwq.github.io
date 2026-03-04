# 第2周：树与递归

<WeekProgress week="2" title="树与递归" color="#10b981" />

> 本周重点：掌握二叉树的遍历、属性判断、路径问题，以及递归与回溯算法。

## Day 8: 二叉树基础

### 104. 二叉树的最大深度 <span class="difficulty-easy">简单</span> [104](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
- **描述**：给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

### 101. 对称二叉树 <span class="difficulty-easy">简单</span> [101](https://leetcode.cn/problems/symmetric-tree/)
- **描述**：给你一个二叉树的根节点 `root`，检查它是否轴对称。

### 102. 二叉树的层序遍历 <span class="difficulty-medium">中等</span> [102](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
- **描述**：给你二叉树的根节点 `root`，返回其节点值的层序遍历。（即逐层地，从左到右访问所有节点）。

### 108. 将有序数组转换为二叉搜索树 <span class="difficulty-easy">简单</span> [108](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)
- **描述**：给你一个整数数组 `nums`，其中元素已经按升序排列，请你将其转换为一棵高度平衡二叉搜索树。

---

## Day 9: 二叉树进阶

### 98. 验证二叉搜索树 <span class="difficulty-medium">中等</span> [98](https://leetcode.cn/problems/validate-binary-search-tree/)
- **描述**：给你一个二叉树的根节点 `root`，判断其是否是一个有效的二叉搜索树。

### 230. 二叉搜索树中第K小的元素 <span class="difficulty-medium">中等</span> [230](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)
- **描述**：给定一个二叉搜索树的根节点 `root`，和一个整数 `k`，请你设计一个算法查找其中第 `k` 小的元素（从 1 开始计数）。

### 236. 二叉树的最近公共祖先 <span class="difficulty-medium">中等</span> [236](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)
- **描述**：给定一个二叉树，找到该树中两个指定节点 `p` 和 `q` 的最近公共祖先。

---

## Day 10: 二叉树路径

### 112. 路径总和 <span class="difficulty-easy">简单</span> [112](https://leetcode.cn/problems/path-sum/)
- **描述**：给你二叉树的根节点 `root` 和一个表示目标和的整数 `targetSum`。判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和 `targetSum`。

### 113. 路径总和 II <span class="difficulty-medium">中等</span> [113](https://leetcode.cn/problems/path-sum-ii/)
- **描述**：给你二叉树的根节点 `root` 和一个整数目标和 `targetSum`，找出所有从根节点到叶子节点路径总和等于给定目标和的路径。

### 437. 路径总和 III <span class="difficulty-medium">中等</span> [437](https://leetcode.cn/problems/path-sum-iii/)
- **描述**：给定一个二叉树的根节点 `root`，和一个整数 `targetSum`，求该二叉树里节点值之和等于 `targetSum` 的路径的数目。路径不需要从根节点开始，也不需要在叶子节点结束，但路径方向必须是向下的（只能从父节点到子节点）。

### 124. 二叉树中的最大路径和 <span class="difficulty-hard">困难</span> [124](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)
- **描述**：二叉树中的路径被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中至多出现一次。该路径至少包含一个节点，且不一定经过根节点。路径和是路径中各节点值的总和。给你一个二叉树的根节点 `root`，返回其最大路径和。

---

## Day 11: 递归与回溯

### 22. 括号生成 <span class="difficulty-medium">中等</span> [22](https://leetcode.cn/problems/generate-parentheses/)
- **描述**：数字 `n` 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且有效的括号组合。

### 78. 子集 <span class="difficulty-medium">中等</span> [78](https://leetcode.cn/problems/subsets/)
- **描述**：给你一个整数数组 `nums`，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。解集不能包含重复的子集。

### 46. 全排列 <span class="difficulty-medium">中等</span> [46](https://leetcode.cn/problems/permutations/)
- **描述**：给定一个不含重复数字的数组 `nums`，返回其所有可能的全排列。你可以按任意顺序返回答案。

### 77. 组合 <span class="difficulty-medium">中等</span> [77](https://leetcode.cn/problems/combinations/)
- **描述**：给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

---

## Day 12: 二叉搜索树

### 450. 删除二叉搜索树中的节点 <span class="difficulty-medium">中等</span> [450](https://leetcode.cn/problems/delete-node-in-a-bst/)
- **描述**：给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。

### 701. 二叉搜索树中的插入操作 <span class="difficulty-medium">中等</span> [701](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)
- **描述**：给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。返回插入后二叉搜索树的根节点。

### 700. 二叉搜索树中的搜索 <span class="difficulty-easy">简单</span> [700](https://leetcode.cn/problems/search-in-a-binary-search-tree/)
- **描述**：给定二叉搜索树（BST）的根节点和一个值。你需要在 BST 中找到节点值等于给定值的节点。返回以该节点为根的子树。如果节点不存在，则返回 NULL。

---

## Day 13: 复习日

- 重做本周错题
- 总结二叉树的遍历模板（前序、中序、后序、层序）
- 总结递归和回溯的套路

---

## Day 14: 缓冲/补题

- 补充未完成的题目
- 或提前休息

---

## 本周总结

- **二叉树遍历**：前中后序（DFS）、层序（BFS）
- **BST 特性**：左 < 根 < 右，中序遍历有序
- **递归三要素**：终止条件、递归过程、返回值
- **回溯模板**：做选择 → 递归 → 撤销选择

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
