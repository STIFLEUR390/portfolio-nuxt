<script setup>
const route = useRoute()
const postStore = usePostStore()

// Récupérer les données au montage du composant
onMounted(async () => {
  await postStore.fetchPosts({ 
    includes: 'author,categories,tags',
    slug: route.params.slug 
  })
})

// Récupérer le post actuel
const currentPost = computed(() => postStore.getPosts[0])

// Mettre à jour les métadonnées dynamiquement
watchEffect(() => {
  if (currentPost.value) {
    useHead({
      title: `${currentPost.value.title} - Portfolio`,
      meta: [
        {
          name: 'description',
          content: currentPost.value.summary || 'Lisez l\'article complet avec des analyses détaillées et des insights sur le développement web et le design.'
        },
        {
          name: 'keywords',
          content: currentPost.value.tags?.map(tag => tag.name).join(', ') || 'article, blog, développement web, design, analyse'
        }
      ]
    })

    useSeoMeta({
      ogTitle: `${currentPost.value.title} - Portfolio`,
      ogDescription: currentPost.value.summary || 'Lisez l\'article complet avec des analyses détaillées et des insights sur le développement web et le design.',
      ogType: 'article',
      ogImage: currentPost.value.cover_image,
      articlePublishedTime: currentPost.value.created_at,
      articleModifiedTime: currentPost.value.updated_at,
      articleAuthor: currentPost.value.author?.name,
      articleTag: currentPost.value.tags?.map(tag => tag.name).join(', ')
    })
  }
})
</script>

<template>
  <BlogDetails :slug="route.params.slug" />
</template>

