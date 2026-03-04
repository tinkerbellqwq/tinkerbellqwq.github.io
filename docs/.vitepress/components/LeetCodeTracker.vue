<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// 每天的任务数据
const dailyTasks = [
  // 第1周
  { day: 1, week: 1, title: '哈希表入门', count: 3, problems: ['1. 两数之和', '49. 字母异位词分组', '128. 最长连续序列'] },
  { day: 2, week: 1, title: '双指针基础', count: 4, problems: ['283. 移动零', '11. 盛水容器', '15. 三数之和', '42. 接雨水'] },
  { day: 3, week: 1, title: '滑动窗口', count: 3, problems: ['3. 无重复字符', '438. 字母异位词', '560. 和为 K 子数组'] },
  { day: 4, week: 1, title: '链表基础', count: 4, problems: ['21. 合并链表', '141. 环形链表', '142. 环形链表 II', '160. 相交链表'] },
  { day: 5, week: 1, title: '链表进阶', count: 3, problems: ['2. 两数相加', '19. 删除倒数第 N 个', '23. 合并 K 个链表'] },
  { day: 6, week: 1, title: '复习日', count: 0, isReview: true, problems: [] },
  { day: 7, week: 1, title: '缓冲/补题', count: -1, isBuffer: true, problems: [] },
  // 第2周
  { day: 8, week: 2, title: '二叉树基础', count: 4, problems: ['104. 二叉树最大深度', '101. 对称二叉树', '102. 层序遍历', '108. 转换有序数组'] },
  { day: 9, week: 2, title: '二叉树进阶', count: 3, problems: ['98. 验证二叉搜索树', '230. 二叉搜索树中第 K 小', '236. 最近公共祖先'] },
  { day: 10, week: 2, title: '二叉树路径', count: 4, problems: ['112. 路径总和', '113. 路径总和 II', '437. 路径总和 III', '124. 二叉树最大路径和'] },
  { day: 11, week: 2, title: '递归与回溯', count: 4, problems: ['22. 括号生成', '78. 子集', '46. 全排列', '77. 组合'] },
  { day: 12, week: 2, title: '二叉搜索树', count: 3, problems: ['450. 删除节点', '701. 插入操作', '700. 二叉搜索树搜索'] },
  { day: 13, week: 2, title: '复习日', count: 0, isReview: true, problems: [] },
  { day: 14, week: 2, title: '缓冲/补题', count: -1, isBuffer: true, problems: [] },
  // 第3周
  { day: 15, week: 3, title: '动态规划入门', count: 4, problems: ['70. 爬楼梯', '322. 零钱兑换', '300. 最长递增子序列', '139. 单词拆分'] },
  { day: 16, week: 3, title: 'DP进阶', count: 3, problems: ['198. 打家劫舍', '213. 打家劫舍 II', '337. 打家劫舍 III'] },
  { day: 17, week: 3, title: '背包问题', count: 4, problems: ['416. 分割等和子集', '494. 目标和', '474. 一和零', '1049. 最后一块石头的重量 II'] },
  { day: 18, week: 3, title: '图论基础', count: 3, problems: ['200. 岛屿数量', '207. 课程表', '994. 腐烂的橘子'] },
  { day: 19, week: 3, title: '最短路径', count: 4, problems: ['743. 网络延迟时间', '1514. 概率最大路径', '1631. 最小体力消耗路径', '778. 水位上升的泳池'] },
  { day: 20, week: 3, title: '复习日', count: 0, isReview: true, problems: [] },
  { day: 21, week: 3, title: '缓冲/补题', count: -1, isBuffer: true, problems: [] },
  // 第4周
  { day: 22, week: 4, title: '设计问题', count: 3, problems: ['146. LRU 缓存', '460. LFU 缓存', '380. O(1) 时间插入删除'] },
  { day: 23, week: 4, title: '高级DP', count: 4, problems: ['72. 编辑距离', '1143. 最长公共子序列', '115. 不同的子序列', '583. 两个字符串的删除操作'] },
  { day: 24, week: 4, title: '位运算', count: 3, problems: ['136. 只出现一次的数字', '137. 只出现一次的数字 II', '260. 只出现一次的数字 III'] },
  { day: 25, week: 4, title: '前缀树', count: 4, problems: ['208. 实现 Trie', '211. 添加与搜索单词', '212. 单词搜索 II', '648. 单词替换'] },
  { day: 26, week: 4, title: '并查集', count: 3, problems: ['547. 省份数量', '684. 冗余连接', '1319. 连通网络操作次数'] },
  { day: 27, week: 4, title: '复习日', count: 0, isReview: true, problems: [] },
  { day: 28, week: 4, title: '总复习①', count: 0, isReview: true, problems: [] },
  { day: 29, week: 4, title: '模拟面试', count: -2, isBuffer: true, problems: [] },
  { day: 30, week: 4, title: '最终冲刺', count: -1, isBuffer: true, problems: [] },
]

// 从 localStorage 加载状态
const loadStatus = () => {
  const saved = localStorage.getItem('leetcode-progress')
  if (saved) {
    return JSON.parse(saved)
  }
  // 默认第一天已完成
  return { 1: 'done', 2: 'todo' }
}

const taskStatus = ref<Record<number, 'done' | 'todo' | 'in-progress'>>(loadStatus())

// 保存状态到 localStorage
const saveStatus = () => {
  localStorage.setItem('leetcode-progress', JSON.stringify(taskStatus.value))
}

// 监听状态变化
watch(taskStatus, saveStatus, { deep: true })

// 切换状态
const toggleStatus = (day: number) => {
  const current = taskStatus.value[day]
  if (current === 'done') {
    taskStatus.value[day] = 'todo'
  } else if (current === 'todo') {
    taskStatus.value[day] = 'in-progress'
  } else {
    taskStatus.value[day] = 'done'
  }
}

// 获取状态
const getStatus = (day: number) => {
  return taskStatus.value[day] || 'pending'
}

// 计算统计数据
const stats = computed(() => {
  const total = dailyTasks.filter(t => t.count > 0).length
  const done = Object.values(taskStatus.value).filter(s => s === 'done').length
  const todo = Object.values(taskStatus.value).filter(s => s === 'todo').length
  const inProgress = Object.values(taskStatus.value).filter(s => s === 'in-progress').length
  const progress = total > 0 ? Math.round((done / total) * 100) : 0

  return { total, done, todo, inProgress, progress }
})

// 暴露给全局使用
if (typeof window !== 'undefined') {
  (window as any).__leetcodeStats = stats
  (window as any).__leetcodeGetStatus = getStatus
  (window as any).__leetcodeToggleStatus = toggleStatus
}
</script>

<template>
  <div class="leetcode-tracker">
    <div class="overview-card">
      <h2>🎯 30天 Hot 100 通关计划</h2>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: stats.progress + '%' }"></div>
      </div>
      <p class="progress-text">完成进度：{{ stats.progress }}% ({{ stats.done }}/{{ stats.total }} 天)</p>
    </div>
  </div>
</template>

<style scoped>
.leetcode-tracker {
  margin-bottom: 2rem;
}

.overview-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.overview-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.progress-bar {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  background: #10b981;
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 10px;
}

.progress-text {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}
</style>
