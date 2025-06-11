<script setup>
const projectStore = useProjectStore()

// Récupérer tous les projets avec leurs relations
await projectStore.fetchProjects({
  includes: 'client,service,skills',
  per_page: 10,
  page: 1
})

useHead({
  title: "Projets - Portfolio",
  meta: [
    {
      name: 'description',
      content: 'Découvrez notre portfolio de projets en développement web, design et plus encore.'
    }
  ]
})
</script>

<template>
  <Works :projects="projectStore.getProjects" :loading="projectStore.isLoading" />
</template>

