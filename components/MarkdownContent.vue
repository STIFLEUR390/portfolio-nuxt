<template>
  <div class="markdown-content">
    <VMarkdownView
      v-if="content.length > 0"
      :mode="mode"
      :content="content"
    ></VMarkdownView>
    <div v-else class="loading-skeleton">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const VMarkdownView = defineAsyncComponent(() => 
  import('vue3-markdown').then(mod => mod.VMarkdownView)
)

const mode = ref('dark')
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style>
.markdown-content {
  width: 100%;
}

.loading-skeleton {
  padding: 1rem;
}

.skeleton-line {
  height: 1rem;
  background: #e0e0e0;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}
.markdown-body[data-theme=dark] {
  background-color: #1f1f1f !important;
}
</style>