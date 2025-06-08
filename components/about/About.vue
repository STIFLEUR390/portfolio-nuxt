<template>
  <section class="about-area">
    <div class="container">
      <div class="d-flex about-me-wrap align-items-start gap-24">
        <div data-aos="zoom-in">
          <div class="about-image-box shadow-box">
            <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
            <div class="image-inner">
              <img v-if="profileStore.getProfile?.profile_picture" :src="profileStore.getProfile?.profile_picture" alt="About Me">
              <img v-else src="~/assets/images/me2.png" alt="About Me">
            </div>
          </div>
        </div>

        <div class="about-details" data-aos="zoom-in">
          <h1 class="section-heading" data-aos="fade-up">
            <img src="~/assets/images/star-2.png" alt="Star"> À propos de moi
            <img src="~/assets/images/star-2.png" alt="Star">
          </h1>
          <div class="about-details-inner shadow-box">
            <img src="~/assets/images/icon2.png" alt="Star">
            <h1>{{ profileStore.getProfile?.name || 'Chargement...' }}</h1>
            <p v-html="profileStore.getProfile?.about_me || ''"></p>
          </div>
        </div>
      </div>

      <div class="row mt-24">
        <div class="col-md-6" data-aos="zoom-in">
          <div class="about-edc-exp about-experience shadow-box">
            <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
            <h3>EXPÉRIENCE</h3>

            <ul v-if="!experienceStore.isLoading">
              <li v-for="experience in experienceStore.getExperiences" :key="experience.id">
                <p class="date">{{ formatDate(experience.start_date) }} - {{ experience.end_date ? formatDate(experience.end_date) : 'Présent' }}</p>
                <h2>{{ experience.job }}</h2>
                <p class="type">{{ experience.company }}</p>
                <p class="details" v-if="experience.details">{{ experience.details }}</p>
              </li>
            </ul>
            <div v-else class="loading-skeleton">
              <div v-for="i in 2" :key="i" class="skeleton-item">
                <div class="skeleton-date"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-subtitle"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6" data-aos="zoom-in">
          <div class="about-edc-exp about-education shadow-box">
            <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
            <h3>FORMATION</h3>

            <ul v-if="!educationStore.isLoading">
              <li v-for="education in educationStore.getEducations" :key="education.id">
                <p class="date">{{ formatDate(education.start_date) }} - {{ education.end_date ? formatDate(education.end_date) : 'Présent' }}</p>
                <h2>{{ education.school }}</h2>
                <p class="type" v-if="education.job">{{ education.job }}</p>
                <p class="details" v-if="education.details">{{ education.details }}</p>
              </li>
            </ul>
            <div v-else class="loading-skeleton">
              <div v-for="i in 2" :key="i" class="skeleton-item">
                <div class="skeleton-date"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-subtitle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-24">
        <div class="col-md-12">
          <div class="d-flex profile-contact-credentials-wrap gap-24">
            <div data-aos="zoom-in">
              <div class="about-profile-box info-box shadow-box h-full">
                <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
                <div class="inner-profile-icons shadow-box">
                  <a href="#">
                    <i class="iconoir-dribbble"></i>
                  </a>
                  <a href="#">
                    <i class="iconoir-twitter"></i>
                  </a>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="infos">
                    <h4>Restez connecté</h4>
                    <h1>Profils</h1>
                  </div>

                  <NuxtLink to="/contact" class="about-btn">
                    <img src="~/assets/images/icon.svg" alt="Button">
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div data-aos="zoom-in" class="flex-1">
              <div class="about-contact-box info-box shadow-box">
                <NuxtLink class="overlay-link" to="/contact"></NuxtLink>
                <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
                <img src="~/assets/images/icon2.png" alt="Icon" class="star-icon">
                <h1>Travaillons <br>ensemble <span>!</span></h1>
                <NuxtLink to="/contact" class="about-btn">
                  <img src="~/assets/images/icon.svg" alt="Button">
                </NuxtLink>
              </div>
            </div>

            <div data-aos="zoom-in" class="h-full">
              <div class="about-crenditials-box info-box shadow-box">
                <NuxtLink class="overlay-link" to="/credentials"></NuxtLink>
                <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
                <img src="~/assets/images/sign.png" alt="Sign">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="infos">
                    <h4>en savoir plus</h4>
                    <h1>Crédentials</h1>
                  </div>

                  <NuxtLink to="/credentials" class="about-btn">
                    <img src="~/assets/images/icon.svg" alt="Button">
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useExperienceStore } from '~/stores/experience'
import { useEducationStore } from '~/stores/education'
import { useProfileStore } from '~/stores/profile'

const experienceStore = useExperienceStore()
const educationStore = useEducationStore()
const profileStore = useProfileStore()

// Charger les données au montage du composant
onMounted(async () => {
  await Promise.all([
    experienceStore.fetchExperiences(),
    educationStore.fetchEducations(),
    profileStore.fetchProfile()
  ])
})

// Fonction pour formater les dates
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
}
</script>

<style scoped>
.loading-skeleton {
  padding: 20px;
}

.skeleton-item {
  margin-bottom: 20px;
}

.skeleton-date {
  height: 16px;
  width: 120px;
  background: #e0e0e0;
  margin-bottom: 8px;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-title {
  height: 24px;
  width: 80%;
  background: #e0e0e0;
  margin-bottom: 8px;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.skeleton-subtitle {
  height: 16px;
  width: 60%;
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}
</style>

 