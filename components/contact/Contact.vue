<template>
  <!-- Contact -->
  <section class="contact-area">
    <div class="container">
      <div class="gx-row d-flex justify-content-between gap-24">
        <div class="contact-infos">
          <h3 data-aos="fade-up">Informations de Contact</h3>
          <ul class="contact-details">
            <li class="d-flex align-items-center" data-aos="zoom-in">
              <div class="icon-box shadow-box">
                <i class="iconoir-mail"></i>
              </div>
              <div class="right">
                <span>Envoyez-nous un mail</span>
                <template v-if="contactStore.isLoading">
                  <SkeletonLoader width="200" />
                  <SkeletonLoader width="200" />
                </template>
                <template v-else>
                  <h4>{{ contactStore.getContactInfo?.email_one }}</h4>
                  <h4>{{ contactStore.getContactInfo?.email_two }}</h4>
                </template>
              </div>
            </li>

            <li class="d-flex align-items-center" data-aos="zoom-in">
              <div class="icon-box shadow-box">
                <i class="iconoir-phone"></i>
              </div>
              <div class="right">
                <span>Contactez-nous</span>
                <template v-if="contactStore.isLoading">
                  <SkeletonLoader width="150" />
                  <SkeletonLoader width="150" />
                </template>
                <template v-else>
                  <h4>{{ contactStore.getContactInfo?.phone_one }}</h4>
                  <h4>{{ contactStore.getContactInfo?.phone_two }}</h4>
                </template>
              </div>
            </li>

            <li class="d-flex align-items-center" data-aos="zoom-in">
              <div class="icon-box shadow-box">
                <i class="iconoir-pin-alt"></i>
              </div>
              <div class="right">
                <span>Localisation</span>
                <template v-if="contactStore.isLoading">
                  <SkeletonLoader width="200" />
                </template>
                <template v-else>
                  <h4>{{ contactStore.getContactInfo?.location }}</h4>
                </template>
              </div>
            </li>
          </ul>

          <h3 data-aos="fade-up">Réseaux Sociaux</h3>
          <ul class="social-links d-flex align-center" data-aos="zoom-in">
            <template v-if="socialMediaStore.isLoading">
              <li v-for="n in 3" :key="n">
                <div class="shadow-box skeleton" style="width: 40px; height: 40px;"></div>
              </li>
            </template>
            <template v-else>
              <li v-for="social in socialMediaStore.getSocialMedias" :key="social.id">
                <NuxtLink 
                  v-if="social.url" 
                  class="shadow-box" 
                  :to="social.url" 
                  target="_blank"
                >
                  <i :class="social.icon"></i>
                </NuxtLink>
              </li>
            </template>
          </ul>
        </div>

        <div data-aos="zoom-in" class="contact-form">
          <div class="shadow-box">
            <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
            <img src="~/assets/images/icon3.png" alt="Icon">
            <h1>Travaillons <span>ensemble.</span></h1>
            <form @submit.prevent="handleSubmit">
              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div class="input-group">
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  v-model="formData.name"
                  :class="{ 'is-invalid': errors.name }"
                  placeholder="Nom *"
                >
                <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
              </div>
              <div class="input-group">
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  v-model="formData.email"
                  :class="{ 'is-invalid': errors.email }"
                  placeholder="Email *"
                >
                <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
              </div>
              <div class="input-group">
                <input 
                  type="text" 
                  name="subject" 
                  id="subject" 
                  v-model="formData.subject"
                  :class="{ 'is-invalid': errors.subject }"
                  placeholder="Sujet *"
                >
                <div v-if="errors.subject" class="invalid-feedback">{{ errors.subject }}</div>
              </div>
              <div class="input-group">
                <textarea 
                  name="message" 
                  id="message" 
                  v-model="formData.message"
                  :class="{ 'is-invalid': errors.message }"
                  placeholder="Votre Message *"
                ></textarea>
                <div v-if="errors.message" class="invalid-feedback">{{ errors.message }}</div>
              </div>
              <div class="input-group">
                <button 
                  class="theme-btn submit-btn" 
                  name="submit" 
                  type="submit"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { SkeletonLoader } from 'vue3-loading-skeleton'
import 'vue3-loading-skeleton/dist/style.css'

const contactStore = useContactStore()
const socialMediaStore = useSocialMediaStore()
const config = useRuntimeConfig()
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (!formData.name.trim()) {
    errors.name = 'Le nom est requis'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Format d\'email invalide'
    isValid = false
  }

  if (!formData.subject.trim()) {
    errors.subject = 'Le sujet est requis'
    isValid = false
  }

  if (!formData.message.trim()) {
    errors.message = 'Le message est requis'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  // Réinitialiser les erreurs
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  try {
    const response = await $fetch(`${config.public.apiUrl}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: formData
    })

    successMessage.value = 'Votre message a été envoyé avec succès.'
    // Réinitialiser le formulaire
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
  } catch (error) {
    if (error.response?.status === 422 && error.response?._data?.errors) {
      // Gérer les erreurs de validation
      error.response._data.errors.forEach((err) => {
        const field = err.source.pointer.replace('/', '')
        if (field in errors) {
          errors[field] = err.detail
        }
      })
      errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire.'
    } else {
      errorMessage.value = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
      console.error('Erreur lors de l\'envoi du message:', error)
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    contactStore.fetchContactInfo(),
    socialMediaStore.fetchSocialMedias()
  ])
})
</script>

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

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

