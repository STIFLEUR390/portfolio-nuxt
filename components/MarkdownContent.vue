<template>
  <div class="markdown-content">
    <MDC v-if="content" :value="content" />
      <div v-else class="loading-skeleton">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.markdown-content {
  @apply text-gray-700 dark:text-gray-300;
}

.markdown-content :deep(p) {
  @apply mb-4 leading-relaxed;
}

.markdown-content :deep(h1) {
  @apply text-3xl font-bold mb-6 mt-8;
}

.markdown-content :deep(h2) {
  @apply text-2xl font-bold mb-4 mt-6;
}

.markdown-content :deep(h3) {
  @apply text-xl font-bold mb-3 mt-5;
}

.markdown-content :deep(ul) {
  @apply list-disc list-inside mb-4;
}

.markdown-content :deep(ol) {
  @apply list-decimal list-inside mb-4;
}

.markdown-content :deep(li) {
  @apply mb-2;
}

.markdown-content :deep(a) {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.markdown-content :deep(blockquote) {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4;
}

.markdown-content :deep(code) {
  @apply bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm;
}

.markdown-content :deep(pre) {
  @apply bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto;
}

.markdown-content :deep(pre code) {
  @apply bg-transparent p-0;
}

.loading-skeleton {
  @apply space-y-4;
}

.skeleton-line {
  @apply h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse;
}
</style> 