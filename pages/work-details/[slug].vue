<script setup lang="ts">
const route = useRoute()
const projectStore = useProjectStore()

// Récupérer le projet par son slug
const project = await projectStore.fetchProjectBySlug(route.params.slug as string, 'client,service,skills')

useHead({
  title: project ? `${project.title} - Portfolio` : "Détails du Projet - Portfolio",
  meta: [
    {
      name: 'description',
      content: project?.summary || 'Découvrez les détails de ce projet'
    },
    {
      name: 'keywords',
      content: project ? `${project.title}, ${project.service?.title}, projet, portfolio, développement web, design` : 'projet, portfolio, développement web, design'
    }
  ]
})

useSeoMeta({
  ogTitle: project ? `${project.title} - Portfolio` : "Détails du Projet - Portfolio",
  ogDescription: project?.summary || 'Découvrez les détails de ce projet',
  ogType: 'article',
  ogImage: project?.cover_image
})
</script>

<template>
  <WorkDetails v-if="project" :project="project" />
  <div v-else class="container text-center py-5">
    <h1>Projet non trouvé</h1>
    <NuxtLink to="/works" class="btn btn-primary mt-3">Retour aux projets</NuxtLink>
  </div>
</template>

