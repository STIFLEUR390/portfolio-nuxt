<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const postStore = usePostStore()
const postCategoryStore = usePostCategoryStore()
const postTagStore = usePostTagStore()

// Récupérer les données au montage du composant
onMounted(async () => {
  await Promise.all([
    postStore.fetchPosts({ 
      includes: 'author,categories,tags,comments',
      slug: props.slug 
    }),
    postCategoryStore.fetchCategories(),
    postTagStore.fetchTags()
  ])
})

// Récupérer le post actuel
const currentPost = computed(() => postStore.getPosts[0])

// Fonction pour formater la date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fonction pour gérer l'envoi d'un commentaire
const handleCommentSubmit = async (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  // TODO: Implémenter l'envoi du commentaire
  console.log('Commentaire à envoyer:', {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
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
          <img src="~/assets/images/star-2.png" alt="Star"> Détails de l'article
          <img src="~/assets/images/star-2.png" alt="Star">
        </h1>
      </div>
    </div>
  </section>

  <!-- Blog Details -->
  <section class="blog-details-area">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div v-if="postStore.isLoading" class="text-center">
            <p>Chargement...</p>
          </div>
          <div v-else-if="postStore.hasError" class="text-center text-danger">
            <p>{{ postStore.error }}</p>
          </div>
          <div v-else-if="currentPost" class="blog-details-content">
            <div class="img-box">
              <img :src="currentPost.cover_image" :alt="currentPost.title">
            </div>
            <span class="meta">
              {{ formatDate(currentPost.created_at) }} - 
              Par {{ currentPost.author?.name || 'Anonyme' }} - 
              Commentaires ({{ currentPost.comments_count || 0 }})
            </span>
            <h1>{{ currentPost.title }}</h1>
            <div class="categories mb-4">
              <NuxtLink 
                v-for="category in currentPost.categories" 
                :key="category.id" 
                :to="`/blog?category=${category.slug}`" 
                class="me-2"
              >
                - {{ category.name }}
              </NuxtLink>
            </div>
            <div v-html="currentPost.content"></div>

            <div class="tags mt-4">
              <NuxtLink 
                v-for="tag in currentPost.tags" 
                :key="tag.id" 
                :to="`/blog?tag=${tag.slug}`" 
                class="theme-btn me-2"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>

            <div class="comments-and-form-wrap">
              <div class="comments-and-form-wrap-inner shadow-box">
                <h2>{{ currentPost.comments_count || 0 }} Commentaires</h2>

                <div v-if="currentPost.comments?.length" class="comments">
                  <div v-for="comment in currentPost.comments" :key="comment.id" class="comment-list">
                    <div class="comment-avatar">
                      <img :src="comment.user?.avatar || '/images/comment.png'" :alt="comment.user?.name || 'Anonyme'">
                    </div>
                    <div class="comment-body">
                      <span class="date">{{ formatDate(comment.created_at) }}</span>
                      <h3>{{ comment.user?.name || 'Anonyme' }}</h3>
                      <p>{{ comment.content }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <p>Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
                </div>

                <div class="comment-form">
                  <h2>Laisser un commentaire</h2>
                  <form @submit="handleCommentSubmit">
                    <div class="input-group">
                      <input type="text" name="name" placeholder="Nom*" required>
                    </div>
                    <div class="input-group">
                      <input type="email" name="email" placeholder="Email*" required>
                    </div>
                    <div class="input-group">
                      <textarea name="message" placeholder="Votre message*" required></textarea>
                    </div>
                    <div class="input-group">
                      <button class="theme-btn" type="submit">Envoyer</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="blog-sidebar">
            <div class="blog-sidebar-inner">
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

