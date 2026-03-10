<template>
  <div class="giscus-wrapper mt-6 rounded-xl onload-animation" ref="giscusContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const giscusContainer = ref<HTMLDivElement>()

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'tinkerbellqwq/tinkerbellqwq.github.io')
  script.setAttribute('data-repo-id', 'R_kgDOOj4jrw')
  script.setAttribute('data-category', 'General')
  script.setAttribute('data-category-id', 'DIC_kwDOOj4jr84C33Xf')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  giscusContainer.value?.appendChild(script)
})
</script>

<style scoped>
.giscus-wrapper {
  background: var(--card-bg);
  padding: 1.5rem;
}
</style>
