<template>
  <!-- Credentials -->
  <section class="credential-area">
    <div class="container">
      <div class="gx-row d-flex">
        <!-- Sidebar -->
        <div class="credential-sidebar-wrap" data-aos="zoom-in">
          <div class="credential-sidebar text-center">
            <div class="shadow-box">
              <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
              <div class="img-box">
                <template v-if="profileStore.isLoading">
                  <SkeletonLoader :size="150" circle />
                </template>
                <img v-else-if="profileStore.profile?.profile_picture" :src="profileStore.profile.profile_picture" alt="About Me">
                <img v-else src="~/assets/images/me.png" alt="About Me">
              </div>
              <template v-if="profileStore.isLoading">
                <SkeletonLoader width="200" />
                <SkeletonLoader width="150" />
              </template>
              <template v-else>
                <h2>{{ profileStore.profile?.name }}</h2>
                <p>{{ profileStore.profile?.profession }}</p>
              </template>

              <ul class="social-links d-flex justify-content-center">
                <template v-if="socialMediaStore.isLoading">
                  <li v-for="n in 4" :key="n">
                    <div class="shadow-box skeleton" style="width: 40px; height: 40px;"></div>
                  </li>
                </template>
                <template v-else>
                  <li v-for="social in socialMediaStore.getSocialMedias" :key="social.id">
                    <NuxtLink 
                      v-if="social.url" 
                      :to="social.url" 
                      target="_blank"
                    >
                      <i :class="social.icon"></i>
                    </NuxtLink>
                  </li>
                </template>
              </ul>

              <NuxtLink to="/contact" class="theme-btn">Contact Me</NuxtLink>
            </div>
          </div>
        </div>

        <div class="credential-content flex-1">
          <!-- About Me -->
          <div class="credential-about" data-aos="zoom-in">
            <h2>À Propos</h2>
            <template v-if="profileStore.isLoading">
              <SkeletonLoader v-for="i in 3" :key="i" />
            </template>
            <template v-else>
              <markdown-content :content="profileStore.profile?.about_me" />
            </template>
          </div>

          <!-- Experience -->
          <div class="credential-edc-exp credential-experience">
            <h2 data-aos="fade-up">Expérience</h2>
            <template v-if="experienceStore.isLoading">
              <div v-for="i in 2" :key="i" class="credential-edc-exp-item" data-aos="zoom-in">
                <SkeletonLoader width="150" />
                <SkeletonLoader width="250" />
                <SkeletonLoader width="200" />
                <SkeletonLoader v-for="j in 2" :key="j" />
              </div>
            </template>
            <template v-else>
              <div v-for="exp in experienceStore.getExperiences" :key="exp.id" class="credential-edc-exp-item" data-aos="zoom-in">
                <h4>{{ formatYear(exp.start_date) }} - {{ formatYear(exp.end_date) }}</h4>
                <h3>{{ exp.job }}</h3>
                <h5>{{ exp.company }}</h5>
                <p v-html="exp.details"></p>
              </div>
            </template>
          </div>

          <!-- Education -->
          <div class="credential-edc-exp credential-education">
            <h2 data-aos="fade-up">Formation</h2>
            <template v-if="educationStore.isLoading">
              <div v-for="i in 2" :key="i" class="credential-edc-exp-item" data-aos="zoom-in">
                <SkeletonLoader width="150" />
                <SkeletonLoader width="250" />
                <SkeletonLoader width="200" />
                <SkeletonLoader v-for="j in 2" :key="j" />
              </div>
            </template>
            <template v-else>
              <div v-for="edu in educationStore.getEducations" :key="edu.id" class="credential-edc-exp-item" data-aos="zoom-in">
                <h4>{{ formatYear(edu.start_date) }} - {{ formatYear(edu.end_date) }}</h4>
                <h3>{{ edu.job }}</h3>
                <h5>{{ edu.school }}</h5>
                <p v-html="edu.details"></p>
              </div>
            </template>
          </div>

          <!-- Skills -->
          <div class="skills-wrap">
            <h2 data-aos="fade-up">Compétences</h2>
            <template v-if="skillsStore.isLoading">
              <div class="d-grid skill-items gap-24 flex-wrap">
                <div v-for="i in 6" :key="i" class="skill-item" data-aos="zoom-in">
                  <SkeletonLoader width="80" />
                  <SkeletonLoader width="120" />
                  <SkeletonLoader width="150" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="d-grid skill-items gap-24 flex-wrap">
                <div v-for="skill in skillsStore.getSkills" :key="skill.id" class="skill-item" data-aos="zoom-in">
                  <span class="percent">{{ skill.percentage_of_mastery }}%</span>
                  <h3 class="name">{{ skill.title }}</h3>
                  <p>{{ skill.description || '' }}</p>
                </div>
              </div>
            </template>
          </div>

          <!-- Certifications -->
          <div class="skills-wrap awards-wrap">
            <h2 data-aos="fade-up">Certifications</h2>
            <template v-if="certificationsStore.isLoading">
              <div class="d-grid skill-items gap-24 flex-wrap">
                <div v-for="i in 2" :key="i" class="skill-item" data-aos="zoom-in">
                  <SkeletonLoader width="150" />
                  <SkeletonLoader width="200" />
                  <SkeletonLoader width="180" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="d-grid skill-items gap-24 flex-wrap">
                <div v-for="cert in certificationsStore.getActiveCertifications" :key="cert.id" class="skill-item" data-aos="zoom-in">
                  <span class="percent">{{ formatDate(cert.issue_date) }}</span>
                  <h3 class="name">{{ cert.name }}</h3>
                  <p>{{ cert.issuer }}</p>
                  <a v-if="cert.credential_url" :href="cert.credential_url" target="_blank" class="credential-link">
                    Voir la certification
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { SkeletonLoader } from 'vue3-loading-skeleton'
import 'vue3-loading-skeleton/dist/style.css'

const profileStore = useProfileStore()
const experienceStore = useExperienceStore()
const educationStore = useEducationStore()
const skillsStore = useSkillsStore()
const certificationsStore = useCertificationsStore()
const socialMediaStore = useSocialMediaStore()
const { formatYear, formatDate } = useDateFormat()

// Charger toutes les données au montage du composant
onMounted(async () => {
  await Promise.all([
    profileStore.fetchProfile(),
    experienceStore.fetchExperiences(),
    educationStore.fetchEducations(),
    skillsStore.fetchSkills(),
    certificationsStore.fetchCertifications(),
    socialMediaStore.fetchSocialMedias()
  ])
})
</script>

<style scoped>
.credential-link {
  display: inline-block;
  margin-top: 10px;
  color: var(--primary-color);
  text-decoration: none;
}

.credential-link:hover {
  text-decoration: underline;
}
</style>
