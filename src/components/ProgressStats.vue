<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Stats {
  total: number
  done: number
  todo: number
  inProgress: number
  progress: number
}

const stats = ref<Stats>({ total: 30, done: 0, todo: 30, inProgress: 0, progress: 0 })

// 从全局获取统计数据
onMounted(() => {
  if (typeof window !== 'undefined' && (window as any).__leetcodeStats) {
    stats.value = (window as any).__leetcodeStats.value || stats.value
  }
})

const weekProgress = computed(() => {
  return [
    { week: 1, name: '基础篇', progress: 15 },
    { week: 2, name: '树与递归', progress: 0 },
    { week: 3, name: '进阶算法', progress: 0 },
    { week: 4, name: '冲刺篇', progress: 0 },
  ]
})
</script>

<template>
  <div class="progress-stats">
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

    <div class="week-progress">
      <h4>📅 各周进度</h4>
      <div class="week-item" v-for="week in weekProgress" :key="week.week">
        <span class="week-name">第{{ week.week }}周：{{ week.name }}</span>
        <div class="week-bar">
          <div class="week-fill" :style="{ width: week.progress + '%' }"></div>
        </div>
        <span class="week-percent">{{ week.progress }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-stats {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card.done {
  background: #d1fae5;
  border: 1px solid #10b981;
}

.stat-card.progress {
  background: #fef3c7;
  border: 1px solid #f59e0b;
}

.stat-card.todo {
  background: #fee2e2;
  border: 1px solid #ef4444;
}

.stat-card.total {
  background: #e0e7ff;
  border: 1px solid #6366f1;
}

.stat-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
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
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.7;
}

.week-progress h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.week-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.week-name {
  min-width: 120px;
  font-size: 0.9rem;
}

.week-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.week-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.week-percent {
  min-width: 40px;
  text-align: right;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
