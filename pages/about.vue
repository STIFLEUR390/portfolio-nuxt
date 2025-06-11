<script setup>
useHead({
  title: "À propos - Portfolio",
  meta: [
    {
      name: 'description',
      content: 'Découvrez mon parcours professionnel, mes compétences et mon expérience dans le développement web et le design.'
    },
    {
      name: 'keywords',
      content: 'développeur web, portfolio, à propos, compétences, expérience'
    }
  ]
})

useSeoMeta({
  ogTitle: 'À propos - Portfolio',
  ogDescription: 'Découvrez mon parcours professionnel, mes compétences et mon expérience dans le développement web et le design.',
  ogType: 'website'
})
</script>

<template>
  <About />
</template>

