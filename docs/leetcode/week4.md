# 第4周：冲刺篇

<WeekProgress week="4" title="冲刺篇" color="#ef4444" />

> 本周重点：掌握设计问题、高级 DP、位运算、前缀树和并查集，为面试做最后冲刺。

## Day 22: 设计问题

### 146. LRU 缓存 <span class="difficulty-medium">中等</span> [146](https://leetcode.cn/problems/lru-cache/)
- **描述**：请你设计并实现一个满足 LRU (最近最少使用) 缓存约束的数据结构。实现 `LRUCache` 类：
  - `LRUCache(int capacity)` 以正整数作为容量 capacity 初始化 LRU 缓存
  - `int get(int key)` 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1
  - `void put(int key, int value)` 如果关键字 key 已经存在，则变更其数据值 value；如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，则应该逐出最久未使用的关键字。

### 460. LFU 缓存 <span class="difficulty-hard">困难</span> [460](https://leetcode.cn/problems/lfu-cache/)
- **描述**：请你为最不经常使用（LFU）缓存算法设计并实现数据结构。实现 `LFUCache` 类：
  - `LFUCache(int capacity)` 用数据结构的容量 capacity 初始化对象
  - `int get(int key)` 如果键 key 存在于缓存中，则获取键的值，否则返回 -1
  - `void put(int key, int value)` 如果键 key 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用的项。如果存在两个或更多个键具有相同的使用频率，则移除最久未使用的键。

### 380. O(1) 时间插入、删除和获取随机元素 <span class="difficulty-medium">中等</span> [380](https://leetcode.cn/problems/insert-delete-getrandom-o1/)
- **描述**：实现 `RandomizedSet` 类：
  - `RandomizedSet()` 初始化 RandomizedSet 对象
  - `bool insert(int val)` 当元素 val 不存在时，向集合中插入该项，并返回 true；否则，返回 false
  - `bool remove(int val)` 当元素 val 存在时，从集合中移除该项，并返回 true；否则，返回 false
  - `int getRandom()` 随机返回现有集合中的一项。每个元素应该有相同的概率被返回。

---

## Day 23: 高级 DP（编辑距离系列）

### 72. 编辑距离 <span class="difficulty-hard">困难</span> [72](https://leetcode.cn/problems/edit-distance/)
- **描述**：给你两个单词 `word1` 和 `word2`，请返回将 `word1` 转换成 `word2` 所使用的最少操作数。你可以对一个单词进行下列三种操作：
  - 插入一个字符
  - 删除一个字符
  - 替换一个字符

### 1143. 最长公共子序列 <span class="difficulty-medium">中等</span> [1143](https://leetcode.cn/problems/longest-common-subsequence/)
- **描述**：给定两个字符串 `text1` 和 `text2`，返回这两个字符串的最长公共子序列的长度。如果不存在公共子序列，返回 0。

### 115. 不同的子序列 <span class="difficulty-hard">困难</span> [115](https://leetcode.cn/problems/distinct-subsequences/)
- **描述**：给定一个字符串 `s` 和一个字符串 `t`，计算在 `s` 的子序列中 `t` 出现的个数。字符串的一个子序列是指通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。

### 583. 两个字符串的删除操作 <span class="difficulty-medium">中等</span> [583](https://leetcode.cn/problems/delete-operation-for-two-strings/)
- **描述**：给定两个单词 `word1` 和 `word2`，找到使得 `word1` 和 `word2` 相同所需的最小步数。每步可以删除任意一个字符串中的一个字符。

---

## Day 24: 位运算

### 136. 只出现一次的数字 <span class="difficulty-easy">简单</span> [136](https://leetcode.cn/problems/single-number/)
- **描述**：给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

### 137. 只出现一次的数字 II <span class="difficulty-medium">中等</span> [137](https://leetcode.cn/problems/single-number-ii/)
- **描述**：给你一个整数数组 `nums`，除某个元素仅出现一次外，其余每个元素都恰出现三次。请你找出并返回那个只出现了一次的元素。

### 260. 只出现一次的数字 III <span class="difficulty-medium">中等</span> [260](https://leetcode.cn/problems/single-number-iii/)
- **描述**：给定一个整数数组 `nums`，其中恰好有两个元素只出现一次，其余所有元素均出现两次。找出那两个只出现一次的元素。你可以按任意顺序返回答案。

---

## Day 25: 前缀树（Trie）

### 208. 实现 Trie (前缀树) <span class="difficulty-medium">中等</span> [208](https://leetcode.cn/problems/implement-trie-prefix-tree/)
- **描述**：Trie（发音类似 "try"）或者说 前缀树是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。Trie 可以用于最大限度地减少字符串比较，常用于搜索引擎系统的自动文本补全功能。实现 `Trie` 类：
  - `Trie()` 初始化前缀树对象
  - `void insert(String word)` 向前缀树中插入字符串 word
  - `boolean search(String word)` 如果字符串 word 在前缀树中，返回 true；否则返回 false
  - `boolean startsWith(String prefix)` 如果之前已经插入的字符串 word 的前缀之一为 prefix，返回 true；否则返回 false

### 211. 添加与搜索单词 - 数据结构设计 <span class="difficulty-medium">中等</span> [211](https://leetcode.cn/problems/design-add-and-search-words-data-structure/)
- **描述**：请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何之前添加的字符串匹配。实现词典类 `WordDictionary`：
  - `WordDictionary()` 初始化词典对象
  - `void addWord(word)` 将 word 添加到数据结构中，之后可以对它进行匹配
  - `bool search(word)` 如果数据结构中存在字符串与 word 匹配，则返回 true；否则返回 false。word 中可能包含一些 '.'，每个 . 可以表示任何一个字母

### 212. 单词搜索 II <span class="difficulty-hard">困难</span> [212](https://leetcode.cn/problems/word-search-ii/)
- **描述**：给定一个 `m x n` 二维字符网格 `board` 和一个单词（字符串）列表 `words`，返回所有二维网格上的单词。单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。

### 648. 单词替换 <span class="difficulty-medium">中等</span> [648](https://leetcode.cn/problems/replace-words/)
- **描述**：在英语中，有一个叫做词根(root) 的概念，它可以跟着其他一些词组成另一个较长的单词——我们称这个词为继承词(successor)。例如，词根 an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。现在，给定一个由许多词根组成的词典和一个句子，需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。

---

## Day 26: 并查集

### 547. 省份数量 <span class="difficulty-medium">中等</span> [547](https://leetcode.cn/problems/number-of-provinces/)
- **描述**：有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。省份是一组直接或间接相连的城市，组内不含其他没有相连的城市。给你一个 n x n 的矩阵 `isConnected`，其中 `isConnected[i][j] = 1` 表示第 i 个城市和第 j 个城市直接相连，而 `isConnected[i][j] = 0` 表示二者不直接相连。返回矩阵中省份的数量。

### 684. 冗余连接 <span class="difficulty-medium">中等</span> [684](https://leetcode.cn/problems/redundant-connection/)
- **描述**：树可以看成是一个连通且无环的无向图。给定连接一棵树的 n 个节点的 n-1 条边，求一条能删去使图变成树的边。

### 1319. 连通网络操作次数 <span class="difficulty-medium">中等</span> [1319](https://leetcode.cn/problems/number-of-operations-to-make-network-connected/)
- **描述**：用以太网线缆将 n 台计算机连接成网络，计算机编号从 0 到 n-1。用 cables 表示，其中 cables[i] = [a, b] 连接了计算机 a 和 b。网络中的任何一台计算机都可以通过网络直接或间接访问同一个网络中的其他任意一台计算机。给你计算机总数 n 和 cables 列表，返回使所有计算机连通所需的最少操作次数。如果不能连通，返回 -1。

---

## Day 27: 复习日

- 重做本周错题
- 总结设计问题的常见模式
- 总结高级 DP 题型

---

## Day 28: 总复习

- 重做所有错题
- 回顾各周重点算法
- 整理常见解题模板

---

## Day 29: 模拟面试

- 随机抽取 5-10 道题
- 限时完成
- 模拟面试环境

---

## Day 30: 最终冲刺

- 查漏补缺
- 回顾重点题目
- 准备面试

---

## 本周总结

- **设计问题**：LRU/LFU 缓存、O(1) 数据结构
- **高级 DP**：编辑距离、LCS、序列 DP
- **位运算**：异或性质、位计数技巧
- **Trie**：前缀匹配、自动补全
- **并查集**：连通性问题、动态连通

## 30天总结

恭喜完成 30 天 Hot 100 通关计划！你已经系统学习了：
- 数组、链表、哈希表
- 双指针、滑动窗口
- 二叉树、递归、回溯
- 动态规划（背包、编辑距离等）
- 图论（DFS、BFS、最短路径）
- 设计问题、位运算、Trie、并查集

继续刷题，保持手感，面试加油！🎉

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
