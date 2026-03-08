---
title: "Java 基础学习"
published: 2026-01-10
description: "Java 语言基础知识学习笔记，涵盖语法、面向对象、集合框架、异常处理等核心内容"
tags: ["Java", "基础"]
category: "力扣刷题"
image: ""
draft: false
---

> Java 基础知识整理，为算法刷题打下语言基础。

## 一、数据类型与变量

### 基本数据类型

| 类型 | 大小 | 范围 | 默认值 |
|------|------|------|--------|
| `byte` | 1 字节 | -128 ~ 127 | 0 |
| `short` | 2 字节 | -32768 ~ 32767 | 0 |
| `int` | 4 字节 | -2^31 ~ 2^31-1 | 0 |
| `long` | 8 字节 | -2^63 ~ 2^63-1 | 0L |
| `float` | 4 字节 | IEEE 754 | 0.0f |
| `double` | 8 字节 | IEEE 754 | 0.0d |
| `char` | 2 字节 | 0 ~ 65535 | '\u0000' |
| `boolean` | - | true / false | false |

### 类型转换

```java
// 自动类型转换（小 → 大）
int a = 10;
double b = a; // int → double

// 强制类型转换（大 → 小）
double c = 3.14;
int d = (int) c; // 3，截断小数部分
```

---

## 二、字符串

### String 常用方法

```java
String s = "Hello World";

s.length();           // 11
s.charAt(0);          // 'H'
s.substring(0, 5);    // "Hello"
s.indexOf("World");   // 6
s.contains("Hello");  // true
s.equals("hello");    // false（区分大小写）
s.equalsIgnoreCase("hello world"); // true
s.toCharArray();      // char[] {'H','e','l','l','o',...}
s.split(" ");         // String[] {"Hello", "World"}
s.trim();             // 去除首尾空格
s.replace('l', 'L');  // "HeLLo WorLd"
```

### StringBuilder（可变字符串，刷题常用）

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
sb.reverse();         // "dlroW olleH"
sb.toString();        // 转为 String
sb.length();          // 长度
sb.deleteCharAt(0);   // 删除指定位置字符
```

---

## 三、数组

### 声明与初始化

```java
int[] arr = new int[5];             // 默认值为 0
int[] arr2 = {1, 2, 3, 4, 5};
int[][] matrix = new int[3][4];     // 二维数组
```

### 常用操作

```java
Arrays.sort(arr);                    // 排序
Arrays.fill(arr, -1);               // 填充
Arrays.copyOf(arr, 10);             // 复制（扩容）
Arrays.equals(arr, arr2);           // 比较
Arrays.toString(arr);               // 打印 "[1, 2, 3, 4, 5]"
```

---

## 四、集合框架

### List

```java
// ArrayList（动态数组，随机访问快）
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.get(0);          // 1
list.set(0, 10);      // 修改
list.remove(0);       // 按索引删除
list.size();          // 长度
list.contains(2);     // 是否包含
list.isEmpty();       // 是否为空

// LinkedList（双向链表，增删快）
List<Integer> linked = new LinkedList<>();
```

### Map

```java
// HashMap（哈希表，刷题最常用）
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.get("a");                        // 1
map.getOrDefault("b", 0);           // 0（不存在时返回默认值）
map.containsKey("a");               // true
map.containsValue(1);               // true
map.remove("a");                    // 删除
map.size();                         // 大小
map.keySet();                       // 所有 key
map.values();                       // 所有 value
map.entrySet();                     // 所有键值对

// 遍历
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    String key = entry.getKey();
    int value = entry.getValue();
}

// merge 和 computeIfAbsent（进阶用法）
map.merge("a", 1, Integer::sum);    // 存在则累加，不存在则设为 1
map.computeIfAbsent("b", k -> 0);  // 不存在则用函数计算默认值
```

### Set

```java
// HashSet（无序，不重复）
Set<Integer> set = new HashSet<>();
set.add(1);
set.contains(1);     // true
set.remove(1);

// TreeSet（有序）
Set<Integer> treeSet = new TreeSet<>();
```

### Queue / Deque / Stack

```java
// 队列
Queue<Integer> queue = new LinkedList<>();
queue.offer(1);       // 入队
queue.poll();         // 出队
queue.peek();         // 查看队首

// 双端队列（可当栈使用）
Deque<Integer> deque = new ArrayDeque<>();
deque.offerFirst(1);  // 队首入队
deque.offerLast(2);   // 队尾入队
deque.pollFirst();    // 队首出队
deque.pollLast();     // 队尾出队

// 优先队列（最小堆）
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3);
pq.offer(1);
pq.poll();            // 1（最小值）

// 最大堆
PriorityQueue<Integer> maxPq = new PriorityQueue<>((a, b) -> b - a);
```

---

## 五、常用算法技巧

### 排序

```java
int[] arr = {3, 1, 4, 1, 5};
Arrays.sort(arr);                    // 升序

// 对象数组自定义排序
Integer[] arr2 = {3, 1, 4, 1, 5};
Arrays.sort(arr2, (a, b) -> b - a); // 降序

// List 排序
List<int[]> list = new ArrayList<>();
list.sort((a, b) -> a[0] - b[0]);   // 按第一个元素升序
```

### 二分查找

```java
int[] arr = {1, 2, 3, 4, 5};
int idx = Arrays.binarySearch(arr, 3); // 返回索引 2
```

### Math 常用方法

```java
Math.max(a, b);       // 最大值
Math.min(a, b);       // 最小值
Math.abs(a);          // 绝对值
Math.pow(2, 10);      // 2^10 = 1024.0
Math.sqrt(16);        // 4.0
Math.ceil(3.2);       // 4.0（向上取整）
Math.floor(3.8);      // 3.0（向下取整）
```

---

## 六、输入输出

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
int n = sc.nextInt();         // 读整数
long l = sc.nextLong();       // 读长整数
double d = sc.nextDouble();   // 读浮点数
String s = sc.next();         // 读单词
String line = sc.nextLine();  // 读一行
```

---

## 七、经典算法模板

### 1. 二分查找

#### 标准二分

```java
// 在有序数组中查找 target，返回索引，不存在返回 -1
int binarySearch(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2; // 防溢出
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}
```

#### 左边界（第一个 >= target 的位置）

```java
int lowerBound(int[] nums, int target) {
    int l = 0, r = nums.length; // 注意：r 是 length 不是 length - 1
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] < target) l = mid + 1;
        else r = mid;
    }
    return l;
}
```

#### 右边界（最后一个 <= target 的位置）

```java
int upperBound(int[] nums, int target) {
    int l = 0, r = nums.length;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] <= target) l = mid + 1;
        else r = mid;
    }
    return l - 1;
}
```

---

### 2. 回溯

#### 子集

```java
// nums = [1,2,3] → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
List<List<Integer>> ans = new ArrayList<>();

void subsets(int[] nums) {
    dfs(nums, 0, new ArrayList<>());
}

void dfs(int[] nums, int start, List<Integer> path) {
    ans.add(new ArrayList<>(path)); // 每个节点都是答案
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);
        dfs(nums, i + 1, path);
        path.remove(path.size() - 1); // 撤销选择
    }
}
```

#### 排列

```java
// nums = [1,2,3] → [[1,2,3], [1,3,2], [2,1,3], ...]
List<List<Integer>> ans = new ArrayList<>();

void permute(int[] nums) {
    dfs(nums, new boolean[nums.length], new ArrayList<>());
}

void dfs(int[] nums, boolean[] used, List<Integer> path) {
    if (path.size() == nums.length) {
        ans.add(new ArrayList<>(path));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        path.add(nums[i]);
        dfs(nums, used, path);
        path.remove(path.size() - 1); // 撤销选择
        used[i] = false;
    }
}
```

#### 组合

```java
// 从 [1, n] 中选 k 个数的所有组合
List<List<Integer>> ans = new ArrayList<>();

void combine(int n, int k) {
    dfs(n, k, 1, new ArrayList<>());
}

void dfs(int n, int k, int start, List<Integer> path) {
    if (path.size() == k) {
        ans.add(new ArrayList<>(path));
        return;
    }
    for (int i = start; i <= n - (k - path.size()) + 1; i++) { // 剪枝
        path.add(i);
        dfs(n, k, i + 1, path);
        path.remove(path.size() - 1);
    }
}
```

---

### 3. BFS / DFS

#### BFS（层序遍历 / 最短路径）

```java
// 二叉树层序遍历
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();
    if (root == null) return ans;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) { // 逐层处理
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        ans.add(level);
    }
    return ans;
}
```

#### 网格 BFS（最短路径）

```java
int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}}; // 四个方向

int bfs(int[][] grid, int startX, int startY) {
    int m = grid.length, n = grid[0].length;
    boolean[][] visited = new boolean[m][n];
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{startX, startY});
    visited[startX][startY] = true;
    int step = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            int[] cur = queue.poll();
            // 到达终点则返回 step
            for (int[] d : dirs) {
                int nx = cur[0] + d[0], ny = cur[1] + d[1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n
                    && !visited[nx][ny] && grid[nx][ny] == 0) {
                    visited[nx][ny] = true;
                    queue.offer(new int[]{nx, ny});
                }
            }
        }
        step++;
    }
    return -1;
}
```

#### DFS（二叉树递归）

```java
// 二叉树最大深度
int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// 网格 DFS（岛屿问题）
void dfs(int[][] grid, int i, int j) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0) return;
    grid[i][j] = 0; // 标记已访问
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}
```

---

### 4. 并查集

```java
class UnionFind {
    int[] parent;
    int[] rank; // 按秩合并

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) { // 路径压缩
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    void union(int x, int y) { // 按秩合并
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rank[px] < rank[py]) { int tmp = px; px = py; py = tmp; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
    }

    boolean connected(int x, int y) {
        return find(x) == find(y);
    }
}
```

---

### 5. 前缀和 / 差分

#### 一维前缀和

```java
// preSum[i] 表示 nums[0..i-1] 的和
int[] preSum = new int[nums.length + 1];
for (int i = 0; i < nums.length; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
}
// 区间 [l, r] 的和 = preSum[r + 1] - preSum[l]
```

#### 二维前缀和

```java
int[][] preSum = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1]
                      - preSum[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
}
// 子矩阵 (r1,c1) 到 (r2,c2) 的和：
// preSum[r2+1][c2+1] - preSum[r1][c2+1] - preSum[r2+1][c1] + preSum[r1][c1]
```

#### 一维差分

```java
// 对区间 [l, r] 整体加 val
int[] diff = new int[n + 1];
diff[l] += val;
if (r + 1 < n) diff[r + 1] -= val;

// 还原数组
int[] result = new int[n];
result[0] = diff[0];
for (int i = 1; i < n; i++) {
    result[i] = result[i - 1] + diff[i];
}
```

---

### 6. 单调栈

```java
// 求每个元素右边第一个比它大的元素（下一个更大元素）
int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] ans = new int[n];
    Arrays.fill(ans, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // 存索引
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            ans[stack.pop()] = nums[i]; // 栈顶元素的答案就是 nums[i]
        }
        stack.push(i);
    }
    return ans;
}
```

---

### 7. 拓扑排序

```java
// 判断有向图是否有环 / 求拓扑序（BFS - Kahn 算法）
List<Integer> topoSort(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] inDegree = new int[n];
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    for (int[] e : edges) {
        graph.get(e[0]).add(e[1]);
        inDegree[e[1]]++;
    }

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) queue.offer(i); // 入度为 0 的先入队
    }

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int cur = queue.poll();
        order.add(cur);
        for (int next : graph.get(cur)) {
            if (--inDegree[next] == 0) queue.offer(next);
        }
    }
    // order.size() == n 说明无环
    return order;
}
```

---

### 8. 动态规划常见模型

#### 0-1 背包

```java
// n 个物品，容量为 W，weight[i] 和 value[i] 分别为重量和价值
int knapsack(int n, int W, int[] weight, int[] value) {
    int[] dp = new int[W + 1]; // 一维优化
    for (int i = 0; i < n; i++) {
        for (int j = W; j >= weight[i]; j--) { // 倒序遍历！
            dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
    }
    return dp[W];
}
```

#### 完全背包

```java
// 每个物品可以选无限次
int completePack(int n, int W, int[] weight, int[] value) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < n; i++) {
        for (int j = weight[i]; j <= W; j++) { // 正序遍历！
            dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
    }
    return dp[W];
}
```

#### 最长递增子序列 (LIS)

```java
// O(n log n) 解法
int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int pos = Collections.binarySearch(tails, x);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(x);
        else tails.set(pos, x);
    }
    return tails.size();
}
```

#### 最长公共子序列 (LCS)

```java
int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
```

---

## 八、常见坑点

1. **Integer 比较**：`==` 比较的是引用，应使用 `.equals()` 或 `intValue()`
2. **数组越界**：注意 `length - 1`
3. **int 溢出**：两个 int 相乘可能溢出，需要转 `long`
4. **String 不可变**：频繁拼接用 `StringBuilder`
5. **HashMap 的 key**：自定义对象需重写 `hashCode()` 和 `equals()`

<style>
table {
  width: 100%;
}
</style>
