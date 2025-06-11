<script setup> 
useHead({
  title: "Blog - Portfolio",
  meta: [
    {
      name: 'description',
      content: 'Explorez mes articles sur le développement web, le design et les dernières tendances technologiques.'
    },
    {
      name: 'keywords',
      content: 'blog, articles, développement web, design, technologie'
    }
  ]
})

useSeoMeta({
  ogTitle: 'Blog - Portfolio',
  ogDescription: 'Explorez mes articles sur le développement web, le design et les dernières tendances technologiques.',
  ogType: 'website'
})
</script>

<template>
  <Blog />
</template>

