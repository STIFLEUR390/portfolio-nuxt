<script setup>
const postStore = usePostStore()
const postCategoryStore = usePostCategoryStore()
const postTagStore = usePostTagStore()
const searchQuery = ref('')
const route = useRoute()

// Récupérer les données au montage du composant
onMounted(async () => {
  const params = {
    per_page: 10,
    includes: 'author,categories,tags'
  }

  // Ajouter les filtres si présents dans l'URL
  if (route.query.category) {
    params.category = route.query.category
  }
  if (route.query.tag) {
    params.tag = route.query.tag
  }

  await Promise.all([
    postStore.fetchPosts(params),
    postCategoryStore.fetchCategories(),
    postTagStore.fetchTags()
  ])
})

// Fonction de recherche
const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    await postStore.fetchPosts({ 
      search: searchQuery.value.trim(),
      includes: 'author,categories,tags'
    })
  } else {
    await postStore.fetchPosts({ 
      per_page: 10,
      includes: 'author,categories,tags'
    })
  }
}

// Fonction pour formater la date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <!-- Breadcrumb -->
  <section class="breadcrumb-area">
    <div class="container">
      <div class="breadcrumb-content" data-aos="fade-up">
        <p>ACCUEIL - BLOG</p>
        <h1 class="section-heading">
          <img src="~/assets/images/star-2.png" alt="Star"> Blog 
          <img src="~/assets/images/star-2.png" alt="Star">
        </h1>
      </div>
    </div>
  </section>

  <!-- Blog Items -->
  <section class="blog-area">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="blog-items">
            <div v-if="postStore.isLoading" class="text-center">
              <p>Chargement...</p>
            </div>
            <div v-else-if="postStore.hasError" class="text-center text-danger">
              <p>{{ postStore.error }}</p>
            </div>
            <template v-else>
              <div v-for="post in postStore.getPosts" :key="post.id" class="blog-item" data-aos="zoom-in">
                <div class="img-box">
                  <img :src="post.cover_image" :alt="post.title">
                </div>
                <div class="content">
                  <span class="meta">
                    {{ formatDate(post.created_at) }} - 
                    Par {{ post.author.name }} - 
                    Commentaires ({{ post.comments_count }})
                  </span>
                  <h1><NuxtLink :to="`/blog-details/${post.slug}`">{{ post.title }}</NuxtLink></h1>
                  <p>{{ post.summary }}</p>
                  <NuxtLink :to="`/blog-details/${post.slug}`" class="theme-btn">Lire la suite</NuxtLink>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="col-md-4">
          <div class="blog-sidebar">
            <div class="blog-sidebar-inner">
              <div class="blog-sidebar-widget search-widget">
                <div class="blog-sidebar-widget-inner" data-aos="zoom-in">
                  <form class="shadow-box" @submit.prevent="handleSearch">
                    <input v-model="searchQuery" type="text" placeholder="Rechercher...">
                    <button class="theme-btn">Rechercher</button>
                  </form>
                </div>
              </div>

              <div class="blog-sidebar-widget recent-post-widget" data-aos="zoom-in">
                <div class="blog-sidebar-widget-inner shadow-box">
                  <h3>Articles récents</h3>
                  <ul>
                    <li v-for="post in postStore.getPosts.slice(0, 4)" :key="post.id">
                      <NuxtLink :to="`/blog-details/${post.slug}`">{{ post.title }}</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="blog-sidebar-widget categories-widget" data-aos="zoom-in">
                <div class="blog-sidebar-widget-inner shadow-box">
                  <h3>Catégories</h3>
                  <ul>
                    <li v-for="category in postCategoryStore.getCategories" :key="category.id">
                      <NuxtLink :to="`/blog?category=${category.slug}`">- {{ category.name }}</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="blog-sidebar-widget tags-widget" data-aos="zoom-in">
                <div class="blog-sidebar-widget-inner shadow-box">
                  <h3>Tags</h3>
                  <ul>
                    <li v-for="tag in postTagStore.getTags" :key="tag.id">
                      <NuxtLink class="theme-btn" :to="`/blog?tag=${tag.slug}`">{{ tag.name }}</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
