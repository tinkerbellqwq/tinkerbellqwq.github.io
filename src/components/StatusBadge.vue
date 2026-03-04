<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: 'done' | 'todo' | 'in-progress' | 'pending'
}>()

const statusConfig = computed(() => {
  switch (props.status) {
    case 'done':
      return { text: '✓ 已通关', class: 'status-done', bgColor: '#d1fae5', textColor: '#065f46' }
    case 'todo':
      return { text: '× 待挑战', class: 'status-todo', bgColor: '#fee2e2', textColor: '#991b1b' }
    case 'in-progress':
      return { text: '⏳ 进行中', class: 'status-progress', bgColor: '#fef3c7', textColor: '#92400e' }
    default:
      return { text: '', class: 'status-pending', bgColor: '#f3f4f6', textColor: '#6b7280' }
  }
})

// 尝试从全局获取状态（用于表格中的动态状态）
const dynamicStatus = computed(() => {
  if (typeof window !== 'undefined' && (window as any).__leetcodeGetStatus) {
    const day = parseInt(props.status as any)
    if (!isNaN(day)) {
      return (window as any).__leetcodeGetStatus(day)
    }
  }
  return props.status
})
</script>

<template>
  <span
    class="status-badge"
    :class="statusConfig.class"
    :style="{ backgroundColor: statusConfig.bgColor, color: statusConfig.textColor }"
  >
    {{ statusConfig.text }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

.status-done {
  border: 1px solid #10b981;
}

.status-todo {
  border: 1px solid #ef4444;
}

.status-progress {
  border: 1px solid #f59e0b;
}
</style>
