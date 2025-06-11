<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  parentCommentId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['reply-to-comment'])
const replyToCommentId = ref(null)

const postStore = usePostStore()
const postCategoryStore = usePostCategoryStore()
const postTagStore = usePostTagStore()
const config = useRuntimeConfig()

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formData = reactive({
  name: '',
  email: '',
  content: '',
  img: '',
  parent_id: 0,
  post_id: 0
})

const errors = reactive({
  name: '',
  email: '',
  content: ''
})

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.content = ''

  // Validation du nom
  if (!formData.name.trim()) {
    errors.name = 'Le nom est requis'
    isValid = false
  } else if (formData.name.length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères'
    isValid = false
  } else if (formData.name.length > 50) {
    errors.name = 'Le nom ne doit pas dépasser 50 caractères'
    isValid = false
  }

  // Validation de l'email
  if (!formData.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Format d\'email invalide'
      isValid = false
    } else if (formData.email.length > 100) {
      errors.email = 'L\'email ne doit pas dépasser 100 caractères'
      isValid = false
    }
  }

  // Validation du contenu
  if (!formData.content.trim()) {
    errors.content = 'Le message est requis'
    isValid = false
  } else if (formData.content.length < 10) {
    errors.content = 'Le message doit contenir au moins 10 caractères'
    isValid = false
  } else if (formData.content.length > 1000) {
    errors.content = 'Le message ne doit pas dépasser 1000 caractères'
    isValid = false
  }

  return isValid
}

// Fonction pour nettoyer les données avant l'envoi
const sanitizeFormData = () => {
  const data = {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    content: formData.content.trim(),
    img: formData.img || '',
    post_id: currentPost.value.id
  }

  // N'ajouter parent_id que si c'est une réponse à un commentaire
  if (replyToCommentId.value) {
    data.parent_id = replyToCommentId.value
  }

  return data
}

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
  
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  // Réinitialiser les erreurs
  errors.name = ''
  errors.email = ''
  errors.content = ''

  try {
    const sanitizedData = sanitizeFormData()
    
    const response = await $fetch(`${config.public.apiUrl}/comments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: sanitizedData
    })

    successMessage.value = 'Votre commentaire a été envoyé avec succès.'
    // Réinitialiser le formulaire
    formData.name = ''
    formData.email = ''
    formData.content = ''
    formData.img = ''
    
    // Rafraîchir les commentaires
    await postStore.fetchPosts({ 
      includes: 'author,categories,tags,comments',
      slug: props.slug 
    })
  } catch (error) {
    if (error.response?.status === 422 && error.response?._data?.errors) {
      // Gérer les erreurs de validation du serveur
      error.response._data.errors.forEach((err) => {
        const field = err.source.pointer.replace('/', '')
        if (field in errors) {
          errors[field] = err.detail
        }
      })
      errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire.'
    } else {
      errorMessage.value = 'Une erreur est survenue lors de l\'envoi du commentaire. Veuillez réessayer.'
      console.error('Erreur lors de l\'envoi du commentaire:', error)
    }
  } finally {
    isSubmitting.value = false
  }
}

const handleReply = (commentId) => {
  replyToCommentId.value = commentId
  // Faire défiler jusqu'au formulaire de commentaire
  nextTick(() => {
    const form = document.querySelector('.comment-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

const cancelReply = () => {
  replyToCommentId.value = null
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

            <markdown-content :content="currentPost.content" />

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
                <h2>{{ currentPost.comments_count }} Commentaires</h2>

                <div class="comments">
                  <!-- Commentaires parents -->
                  <div v-for="comment in currentPost.comments" :key="comment.id" class="comment-list">
                    <div class="comment-avatar">
                      <img src="~/assets/images/comment.png" :alt="comment.name || 'Anonyme'">
                    </div>
                    <div class="comment-body">
                      <div class="comment-meta">
                        <h4>{{ comment.name }}</h4>
                        <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
                      </div>
                      <p>{{ comment.content }}</p>
                    </div>
                  </div>
                </div>

                <div class="comment-form">
                  <h2>{{ replyToCommentId ? 'Répondre au commentaire' : 'Laisser un commentaire' }}</h2>
                  <form @submit="handleCommentSubmit">
                    <div v-if="successMessage" class="alert alert-success" role="alert">
                      {{ successMessage }}
                    </div>
                    <div v-if="errorMessage" class="alert alert-danger" role="alert">
                      {{ errorMessage }}
                    </div>

                    <div class="input-group">
                      <input 
                        type="text" 
                        v-model="formData.name" 
                        :class="{ 'is-invalid': errors.name }"
                        placeholder="Nom*"
                      >
                      <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                    </div>

                    <div class="input-group">
                      <input 
                        type="email" 
                        v-model="formData.email" 
                        :class="{ 'is-invalid': errors.email }"
                        placeholder="Email*"
                      >
                      <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                    </div>

                    <div class="input-group">
                      <textarea 
                        v-model="formData.content" 
                        :class="{ 'is-invalid': errors.content }"
                        placeholder="Votre message*"
                      ></textarea>
                      <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
                    </div>

                    <div class="form-group">
                      <button type="submit" class="theme-btn" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Envoi en cours...' : (replyToCommentId ? 'Envoyer la réponse' : 'Envoyer le commentaire') }}
                      </button>
                      <button 
                        v-if="replyToCommentId" 
                        type="button" 
                        @click="cancelReply" 
                        class="theme-btn theme-btn-outline"
                      >
                        Annuler la réponse
                      </button>
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

<style scoped>
.alert {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.alert-success {
  background-color: var(--primary-color);
  color: white;
}

.alert-danger {
  background-color: #dc3545;
  color: white;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.theme-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.reply-btn {
  margin-top: 10px;
  padding: 5px 15px;
  font-size: 0.9em;
}

.theme-btn-outline {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  margin-left: 10px;
}

.theme-btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.comments-and-form-wrap {
  margin-top: 40px;
}

.comments-and-form-wrap-inner {
  padding: 30px;
  border-radius: 10px;
}

.comment-list {
  display: flex;
  margin-bottom: 30px;
}

.comment-avatar {
  margin-right: 20px;
}

.comment-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-body {
  flex: 1;
}

.comment-meta {
  margin-bottom: 10px;
}

.comment-meta h4 {
  margin: 0;
  font-size: 1.1em;
  color: var(--primary-color);
}

.comment-date {
  font-size: 0.9em;
  color: #666;
  margin-left: 10px;
}

.children {
  padding: 0 10rem;
}

.input-group {
  margin-bottom: 20px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-group textarea {
  min-height: 150px;
  resize: vertical;
}
</style>

