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
  script.setAttribute('data-repo-id', 'R_kgDONQ3F6g')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDONQ3F6s4Cj6k3')
  script.setAttribute('data-mapping', 'title')
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
