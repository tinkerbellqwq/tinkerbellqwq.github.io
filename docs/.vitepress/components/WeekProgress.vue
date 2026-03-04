<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface DayTask {
  day: number
  week: number
  title: string
  count: number
  isReview?: boolean
  isBuffer?: boolean
}

const props = defineProps<{
  week: number
  title: string
  color: string
}>()

// 该周的任务数据
const weekTasks: Record<number, DayTask[]> = {
  1: [
    { day: 1, week: 1, title: '哈希表入门', count: 3 },
    { day: 2, week: 1, title: '双指针基础', count: 4 },
    { day: 3, week: 1, title: '滑动窗口', count: 3 },
    { day: 4, week: 1, title: '链表基础', count: 4 },
    { day: 5, week: 1, title: '链表进阶', count: 3 },
    { day: 6, week: 1, title: '复习日', count: 0, isReview: true },
  ],
  2: [
    { day: 8, week: 2, title: '二叉树基础', count: 4 },
    { day: 9, week: 2, title: '二叉树进阶', count: 3 },
    { day: 10, week: 2, title: '二叉树路径', count: 4 },
    { day: 11, week: 2, title: '递归与回溯', count: 4 },
    { day: 12, week: 2, title: '二叉搜索树', count: 3 },
    { day: 13, week: 2, title: '复习日', count: 0, isReview: true },
  ],
  3: [
    { day: 15, week: 3, title: '动态规划入门', count: 4 },
    { day: 16, week: 3, title: 'DP进阶', count: 3 },
    { day: 17, week: 3, title: '背包问题', count: 4 },
    { day: 18, week: 3, title: '图论基础', count: 3 },
    { day: 19, week: 3, title: '最短路径', count: 4 },
    { day: 20, week: 3, title: '复习日', count: 0, isReview: true },
  ],
  4: [
    { day: 22, week: 4, title: '设计问题', count: 3 },
    { day: 23, week: 4, title: '高级DP', count: 4 },
    { day: 24, week: 4, title: '位运算', count: 3 },
    { day: 25, week: 4, title: '前缀树', count: 4 },
    { day: 26, week: 4, title: '并查集', count: 3 },
    { day: 27, week: 4, title: '复习日', count: 0, isReview: true },
  ],
}

type TaskStatus = 'done' | 'todo' | 'in-progress'

const loadStatus = (): Record<number, TaskStatus> => {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem('leetcode-hot100-progress')
  if (saved) return JSON.parse(saved)
  return {}
}

const taskStatus = ref<Record<number, TaskStatus>>(loadStatus())

const saveStatus = () => {
  if (typeof window === 'undefined') return
  localStorage.setItem('leetcode-hot100-progress', JSON.stringify(taskStatus.value))
}

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

const getStatus = (day: number): TaskStatus => {
  return taskStatus.value[day] || 'todo'
}

const tasks = computed(() => weekTasks[props.week] || [])

const stats = computed(() => {
  const done = tasks.value.filter(t => taskStatus.value[t.day] === 'done').length
  const inProgress = tasks.value.filter(t => taskStatus.value[t.day] === 'in-progress').length
  const progress = tasks.value.length > 0 ? Math.round((done / tasks.value.length) * 100) : 0
  return { done, inProgress, progress }
})

const statusConfig: Record<TaskStatus, { text: string; class: string; icon: string }> = {
  done: { text: '已通关', class: 'done', icon: '✓' },
  todo: { text: '待挑战', class: 'todo', icon: '×' },
  'in-progress': { text: '进行中', class: 'progress', icon: '⏳' },
}
</script>

<template>
  <div class="week-progress-card">
    <div class="card-header" :style="{ borderColor: color }">
      <h3>📅 第{{ week }}周：{{ title }}</h3>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: stats.progress + '%', backgroundColor: color }"></div>
      </div>
      <p class="progress-text">完成度：{{ stats.progress }}% ({{ stats.done }}/{{ tasks.length }} 天)</p>
    </div>

    <div class="tasks-list">
      <div v-for="task in tasks" :key="task.day" class="task-item">
        <div class="task-info">
          <span class="task-day">Day {{ task.day }}</span>
          <span class="task-title">{{ task.title }}</span>
        </div>
        <button
          class="status-btn"
          :class="statusConfig[getStatus(task.day)].class"
          @click="toggleStatus(task.day)"
        >
          <span class="status-icon">{{ statusConfig[getStatus(task.day)].icon }}</span>
          <span class="status-text">{{ statusConfig[getStatus(task.day)].text }}</span>
        </button>
      </div>
    </div>

    <div class="card-footer">
      <router-link to="/leetcode/hot100" class="back-link">← 返回总览</router-link>
    </div>
  </div>
</template>

<style scoped>
.week-progress-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding-bottom: 1rem;
  border-bottom: 3px solid;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
}

.progress-bar {
  background: #e5e7eb;
  border-radius: 10px;
  height: 12px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-text {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  background: white;
  border-radius: 10px;
  transition: transform 0.2s;
}

.task-item:hover {
  transform: translateX(4px);
}

.task-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.task-day {
  background: #e0e7ff;
  color: #6366f1;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 55px;
  text-align: center;
}

.task-title {
  font-weight: 500;
}

.status-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
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

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #4f46e5;
}
</style>
