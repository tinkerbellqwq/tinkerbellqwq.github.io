<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  level: string
}>()

const config = {
  '简单': { color: '#00b8a3', bg: '#e6fcfb' },
  '中等': { color: '#ffc01e', bg: '#fff9e6' },
  '困难': { color: '#ff375f', bg: '#ffe6ec' }
}

const style = computed(() => {
  const c = config[props.level as keyof typeof config] || config['简单']
  return {
    backgroundColor: c.bg,
    color: c.color,
    border: `1px solid ${c.color}`
  }
})
</script>

<template>
  <span class="difficulty-badge" :style="style">{{ level }}</span>
</template>

<style scoped>
.difficulty-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
}
</style>
