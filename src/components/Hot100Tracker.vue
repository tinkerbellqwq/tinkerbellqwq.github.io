<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface DayTask {
  day: number
  week: number
  title: string
  count: number
  isReview?: boolean
  isBuffer?: boolean
  problems: string[]
}

// 每周标题配置
const weekConfigs = [
  { week: 1, title: '基础篇（数组+链表+哈希）', color: '#8b5cf6' },
  { week: 2, title: '树与递归', color: '#10b981' },
  { week: 3, title: '进阶算法篇', color: '#f59e0b' },
  { week: 4, title: '冲刺篇', color: '#ef4444' },
]

// 所有任务数据
const allTasks: DayTask[] = [
  // 第1周
  { day: 1, week: 1, title: '哈希表入门', count: 3, problems: ['1. 两数之和', '49. 字母异位词分组', '128. 最长连续序列'] },
  { day: 2, week: 1, title: '双指针基础', count: 4, problems: ['283. 移动零', '11. 盛水容器', '15. 三数之和', '42. 接雨水'] },
  { day: 3, week: 1, title: '滑动窗口', count: 3, problems: ['3. 无重复字符', '438. 找到字符串中所有字母异位词', '560. 和为 K 的子数组'] },
  { day: 4, week: 1, title: '链表基础', count: 4, problems: ['21. 合并两个有序链表', '141. 环形链表', '142. 环形链表 II', '160. 相交链表'] },
  { day: 5, week: 1, title: '链表进阶', count: 3, problems: ['2. 两数相加', '19. 删除链表的倒数第 N 个结点', '23. 合并 K 个升序链表'] },
  { day: 6, week: 1, title: '复习日', count: 0, isReview: true, problems: ['重做本周错题，总结模板'] },
  { day: 7, week: 1, title: '缓冲/补题', count: -1, isBuffer: true, problems: ['补未完成题目或提前休息'] },
  // 第2周
  { day: 8, week: 2, title: '二叉树基础', count: 4, problems: ['104. 二叉树的最大深度', '101. 对称二叉树', '102. 二叉树的层序遍历', '108. 将有序数组转换为二叉搜索树'] },
  { day: 9, week: 2, title: '二叉树进阶', count: 3, problems: ['98. 验证二叉搜索树', '230. 二叉搜索树中第K小的元素', '236. 二叉树的最近公共祖先'] },
  { day: 10, week: 2, title: '二叉树路径', count: 4, problems: ['112. 路径总和', '113. 路径总和 II', '437. 路径总和 III', '124. 二叉树中的最大路径和'] },
  { day: 11, week: 2, title: '递归与回溯', count: 4, problems: ['22. 括号生成', '78. 子集', '46. 全排列', '77. 组合'] },
  { day: 12, week: 2, title: '二叉搜索树', count: 3, problems: ['450. 删除二叉搜索树中的节点', '701. 二叉搜索树中的插入操作', '700. 二叉搜索树中的搜索'] },
  { day: 13, week: 2, title: '复习日', count: 0, isReview: true, problems: ['重做本周错题，总结模板'] },
  { day: 14, week: 2, title: '缓冲/补题', count: -1, isBuffer: true, problems: ['补未完成题目或提前休息'] },
  // 第3周
  { day: 15, week: 3, title: '动态规划入门', count: 4, problems: ['70. 爬楼梯', '322. 零钱兑换', '300. 最长递增子序列', '139. 单词拆分'] },
  { day: 16, week: 3, title: 'DP进阶', count: 3, problems: ['198. 打家劫舍', '213. 打家劫舍 II', '337. 打家劫舍 III'] },
  { day: 17, week: 3, title: '背包问题', count: 4, problems: ['416. 分割等和子集', '494. 目标和', '474. 一和零', '1049. 最后一块石头的重量 II'] },
  { day: 18, week: 3, title: '图论基础', count: 3, problems: ['200. 岛屿数量', '207. 课程表', '994. 腐烂的橘子'] },
  { day: 19, week: 3, title: '最短路径', count: 4, problems: ['743. 网络延迟时间', '1514. 概率最大的路径', '1631. 最小体力消耗路径', '778. 水位上升的泳池中'] },
  { day: 20, week: 3, title: '复习日', count: 0, isReview: true, problems: ['重做本周错题，总结模板'] },
  { day: 21, week: 3, title: '缓冲/补题', count: -1, isBuffer: true, problems: ['补未完成题目或提前休息'] },
  // 第4周
  { day: 22, week: 4, title: '设计问题', count: 3, problems: ['146. LRU 缓存', '460. LFU 缓存', '380. O(1) 时间插入、删除和获取随机元素'] },
  { day: 23, week: 4, title: '高级DP', count: 4, problems: ['72. 编辑距离', '1143. 最长公共子序列', '115. 不同的子序列', '583. 两个字符串的删除操作'] },
  { day: 24, week: 4, title: '位运算', count: 3, problems: ['136. 只出现一次的数字', '137. 只出现一次的数字 II', '260. 只出现一次的数字 III'] },
  { day: 25, week: 4, title: '前缀树', count: 4, problems: ['208. 实现 Trie (前缀树)', '211. 添加与搜索单词', '212. 单词搜索 II', '648. 单词替换'] },
  { day: 26, week: 4, title: '并查集', count: 3, problems: ['547. 省份数量', '684. 冗余连接', '1319. 连通网络操作次数'] },
  { day: 27, week: 4, title: '复习日', count: 0, isReview: true, problems: ['重做本周错题，总结模板'] },
  { day: 28, week: 4, title: '总复习①', count: 0, isReview: true, problems: ['重做所有错题'] },
  { day: 29, week: 4, title: '模拟面试', count: -2, isBuffer: true, problems: ['模拟面试随机抽题'] },
  { day: 30, week: 4, title: '最终冲刺', count: -1, isBuffer: true, problems: ['查漏补缺，准备面试'] },
]

// 状态类型
type TaskStatus = 'done' | 'todo' | 'in-progress'

// 从 localStorage 加载状态
const loadStatus = (): Record<number, TaskStatus> => {
  const saved = localStorage.getItem('leetcode-hot100-progress')
  if (saved) {
    return JSON.parse(saved)
  }
  return {}
}

const taskStatus = ref<Record<number, TaskStatus>>(loadStatus())

// 保存状态到 localStorage
const saveStatus = () => {
  localStorage.setItem('leetcode-hot100-progress', JSON.stringify(taskStatus.value))
  updateStats()
}

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
  saveStatus()
}

// 获取状态
const getStatus = (day: number): TaskStatus => {
  return taskStatus.value[day] || 'todo'
}

// 状态配置
const statusConfig: Record<TaskStatus, { text: string; class: string; icon: string }> = {
  done: { text: '已通关', class: 'done', icon: '✓' },
  todo: { text: '待挑战', class: 'todo', icon: '×' },
  'in-progress': { text: '进行中', class: 'progress', icon: '⏳' },
}

// 统计数据
const stats = ref({
  total: 0,
  done: 0,
  todo: 0,
  inProgress: 0,
  progress: 0
})

const updateStats = () => {
  const validTasks = allTasks.filter(t => t.count >= 0)
  const total = validTasks.length
  const done = Object.values(taskStatus.value).filter(s => s === 'done').length
  const inProgress = Object.values(taskStatus.value).filter(s => s === 'in-progress').length
  const todo = total - done - inProgress
  const progress = total > 0 ? Math.round((done / total) * 100) : 0

  stats.value = { total, done, todo, inProgress, progress }
}

// 计算每周进度
const getWeekProgress = (weekNum: number) => {
  const weekTasks = allTasks.filter(t => t.week === weekNum && t.count >= 0)
  const done = weekTasks.filter(t => taskStatus.value[t.day] === 'done').length
  return weekTasks.length > 0 ? Math.round((done / weekTasks.length) * 100) : 0
}

onMounted(() => {
  updateStats()
})

// 暴露给父组件
defineExpose({
  stats,
  getStatus,
  toggleStatus
})
</script>

<template>
  <div class="hot100-tracker">
    <!-- 进度概览卡片 -->
    <div class="overview-card">
      <h2>🎯 30天 Hot 100 通关计划</h2>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: stats.progress + '%' }"></div>
      </div>
      <div class="progress-info">
        <span class="progress-text">完成进度：{{ stats.progress }}%</span>
        <span class="progress-detail">({{ stats.done }}/{{ stats.total }} 天)</span>
      </div>
    </div>

    <!-- 各周进度 -->
    <div class="week-progress-section">
      <h4>📅 各周进度</h4>
      <div class="week-progress-list">
        <div v-for="config in weekConfigs" :key="config.week" class="week-progress-item">
          <span class="week-name" :style="{ color: config.color }">第{{ config.week }}周：{{ config.title }}</span>
          <div class="week-bar">
            <div class="week-fill" :style="{ width: getWeekProgress(config.week) + '%', backgroundColor: config.color }"></div>
          </div>
          <span class="week-percent">{{ getWeekProgress(config.week) }}%</span>
        </div>
      </div>
    </div>

    <!-- 每周表格 -->
    <div v-for="config in weekConfigs" :key="config.week" class="week-section">
      <h3 class="week-title" :style="{ color: config.color, borderColor: config.color }">
        第{{ config.week }}周：{{ config.title }}
      </h3>
      <div class="table-container">
        <table class="schedule-table">
          <thead>
            <tr>
              <th width="12%">天数</th>
              <th width="20%">内容</th>
              <th width="12%">题目数</th>
              <th width="41%">具体安排</th>
              <th width="15%">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in allTasks.filter(t => t.week === config.week)" :key="task.day">
              <td>
                <span v-if="task.isReview || task.day === 1 || task.day === 28 || task.day === 30" class="day-highlight">
                  <strong>Day {{ task.day }}</strong>
                </span>
                <span v-else>Day {{ task.day }}</span>
              </td>
              <td>
                <span v-if="task.isReview" class="review-tag">复习日</span>
                <strong v-else>{{ task.title }}</strong>
              </td>
              <td>
                <span v-if="task.count === 0">复习</span>
                <span v-else-if="task.count < 0">-</span>
                <span v-else>{{ task.count }}题</span>
              </td>
              <td class="problems-cell">
                <div v-for="(problem, idx) in task.problems" :key="idx" class="problem-item">
                  {{ problem }}
                </div>
              </td>
              <td>
                <button
                  class="status-btn"
                  :class="statusConfig[getStatus(task.day)].class"
                  @click="toggleStatus(task.day)"
                >
                  <span class="status-icon">{{ statusConfig[getStatus(task.day)].icon }}</span>
                  <span class="status-text">{{ statusConfig[getStatus(task.day)].text }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card done">
        <div class="stat-icon">✓</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.done }}</div>
          <div class="stat-label">已完成</div>
        </div>
      </div>
      <div class="stat-card progress">
        <div class="stat-icon">⏳</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.inProgress }}</div>
          <div class="stat-label">进行中</div>
        </div>
      </div>
      <div class="stat-card todo">
        <div class="stat-icon">×</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.todo }}</div>
          <div class="stat-label">待挑战</div>
        </div>
      </div>
      <div class="stat-card total">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-value">{{ stats.progress }}%</div>
          <div class="stat-label">总进度</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hot100-tracker {
  margin-bottom: 2rem;
}

/* 概览卡片 */
.overview-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  margin-bottom: 2rem;
}

.overview-card h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-bar {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  height: 16px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 12px;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-text {
  font-size: 1.1rem;
  font-weight: 600;
}

.progress-detail {
  font-size: 0.95rem;
  opacity: 0.9;
}

/* 各周进度 */
.week-progress-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.week-progress-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.week-progress-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.week-progress-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.week-name {
  min-width: 160px;
  font-size: 0.9rem;
  font-weight: 500;
}

.week-bar {
  flex: 1;
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
}

.week-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.week-percent {
  min-width: 45px;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
}

/* 每周部分 */
.week-section {
  margin-bottom: 2.5rem;
}

.week-title {
  font-size: 1.4rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid;
  margin-bottom: 1rem;
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.schedule-table thead {
  background: #fff2cc;
}

.schedule-table th {
  padding: 1rem 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #ff6666;
}

.schedule-table td {
  padding: 0.875rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.schedule-table tbody tr:hover {
  background: #f9fafb;
}

.schedule-table tbody tr:last-child td {
  border-bottom: none;
}

.day-highlight {
  color: #8b5cf6;
}

.review-tag {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.problems-cell {
  font-size: 0.875rem;
  color: #4b5563;
}

.problem-item {
  padding: 0.25rem 0;
  line-height: 1.5;
}

/* 状态按钮 */
.status-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.status-btn:hover {
  transform: scale(1.05);
}

.status-btn.done {
  background: #d1fae5;
  color: #065f46;
  border-color: #10b981;
}

.status-btn.todo {
  background: #fee2e2;
  color: #991b1b;
  border-color: #ef4444;
}

.status-btn.progress {
  background: #fef3c7;
  color: #92400e;
  border-color: #f59e0b;
}

.status-icon {
  font-size: 1rem;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.stat-card.done {
  background: #d1fae5;
  border: 2px solid #10b981;
}

.stat-card.progress {
  background: #fef3c7;
  border: 2px solid #f59e0b;
}

.stat-card.todo {
  background: #fee2e2;
  border: 2px solid #ef4444;
}

.stat-card.total {
  background: #e0e7ff;
  border: 2px solid #6366f1;
}

.stat-icon {
  font-size: 1.75rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.stat-card.done .stat-icon { background: #10b981; color: white; }
.stat-card.progress .stat-icon { background: #f59e0b; color: white; }
.stat-card.todo .stat-icon { background: #ef4444; color: white; }
.stat-card.total .stat-icon { background: #6366f1; color: white; }

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .overview-card {
    padding: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .schedule-table th,
  .schedule-table td {
    padding: 0.625rem 0.5rem;
    font-size: 0.8rem;
  }

  .week-progress-item {
    flex-wrap: wrap;
  }

  .week-name {
    min-width: 100%;
  }
}
</style>
