<script setup>
import { useProfileStore } from '~/stores/profile'
import { SkeletonLoader } from 'vue3-loading-skeleton'
import 'vue3-loading-skeleton/dist/style.css'

const profileStore = useProfileStore()

// Charger les données au montage du composant
onMounted(() => {
  profileStore.fetchProfile()
})
</script>

<template>
  <section class="about-area">
    <div class="container">
      <div class="row">
        <div class="col-md-6" data-aos="zoom-in">
          <div class="about-me-box shadow-box">
            <NuxtLink class="overlay-link" to="/about"> </NuxtLink>
            <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
            <div class="img-box">
              <ClientOnly>
                <template v-if="profileStore.isLoading">
                  <SkeletonLoader :size="200" circle />
                </template>
                <template v-else-if="profileStore.profile">
                  <img :src="profileStore.profile.profile_picture" alt="À propos de moi" />
                </template>
              </ClientOnly>
            </div>
            <div class="infos">
              <ClientOnly>
                <template v-if="profileStore.isLoading">
                  <SkeletonLoader height="24" class="mb-2" />
                  <SkeletonLoader height="40" class="mb-2" />
                  <SkeletonLoader height="20" />
                </template>
                <template v-else-if="profileStore.profile">
                  <h4>{{ profileStore.profile.profession }}</h4>
                  <h1>{{ profileStore.profile.name }}</h1>
                  <p>{{ profileStore.profile.short_description }}</p>
                  <NuxtLink :href="profileStore.profile.cv_url" class="about-btn" target="_blank">
                    <img src="~/assets/images/icon.svg" alt="Bouton" />
                  </NuxtLink>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="about-credentials-wrap">
            <div data-aos="zoom-in">
              <div class="banner shadow-box">
                <div class="marquee">
                  <div>
                    <span
                      >DERNIERS TRAVAUX ET <b>PROJETS</b> <img src="~/assets/images/star1.svg" alt="Étoile" /> DERNIERS TRAVAUX ET <b>PROJETS</b> <img src="~/assets/images/star1.svg" alt="Étoile" /> DERNIERS TRAVAUX ET <b>PROJETS</b> <img src="~/assets/images/star1.svg" alt="Étoile" /> DERNIERS TRAVAUX ET
                      <b>PROJETS</b> DERNIERS TRAVAUX ET <img src="~/assets/images/star1.svg" alt="Étoile" /> DERNIERS TRAVAUX ET <b>PROJETS</b> DERNIERS TRAVAUX ET <img src="~/assets/images/star1.svg" alt="Étoile"
                    /></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="gx-row d-flex gap-24">
              <div data-aos="zoom-in">
                <div class="about-crenditials-box info-box shadow-box h-full">
                  <NuxtLink class="overlay-link" to="/credentials"></NuxtLink>
                  <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
                  <img src="~/assets/images/sign.png" alt="Signature" />
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="infos">
                      <h4>en savoir plus sur moi</h4>
                      <h1>Compétences</h1>
                    </div>

                    <NuxtLink to="/credentials" class="about-btn">
                      <img src="~/assets/images/icon.svg" alt="Bouton" />
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <div data-aos="zoom-in">
                <div class="about-project-box info-box shadow-box h-full">
                  <NuxtLink class="overlay-link" to="/works"></NuxtLink>
                  <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
                  <img src="~/assets/images/my-works.png" alt="Mes Projets" />
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="infos">
                      <h4>PORTFOLIO</h4>
                      <h1>Projets</h1>
                    </div>

                    <NuxtLink to="#" class="about-btn">
                      <img src="~/assets/images/icon.svg" alt="Bouton" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-24">
        <div class="col-md-12">
          <div class="blog-service-profile-wrap d-flex gap-24">
            <div data-aos="zoom-in">
              <div class="about-blog-box info-box shadow-box h-full">
                <NuxtLink to="/blog" class="overlay-link"></NuxtLink>
                <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
                <img src="~/assets/images/gfonts.png" alt="GFonts" />
                <div class="d-flex align-items-center justify-content-between">
                  <div class="infos">
                    <h4>Blog</h4>
                    <h1>Articles</h1>
                  </div>

                  <NuxtLink to="/blog" class="about-btn">
                    <img src="~/assets/images/icon.svg" alt="Bouton" />
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div data-aos="zoom-in" class="flex-1">
              <div class="about-services-box info-box shadow-box h-full">
                <NuxtLink to="/service" class="overlay-link"></NuxtLink>
                <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
                <div class="icon-boxes">
                  <i class="iconoir-camera"></i>
                  <i class="iconoir-design-pencil"></i>
                  <i class="iconoir-color-filter"></i>
                  <i class="iconoir-dev-mode-phone"></i>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="infos">
                    <h4>spécialisation</h4>
                    <h1>Services Proposés</h1>
                  </div>

                  <NuxtLink to="/service" class="about-btn">
                    <img src="~/assets/images/icon.svg" alt="Bouton" />
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div data-aos="zoom-in">
              <div class="about-profile-box info-box shadow-box h-full">
                <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
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
                    <h1>Réseaux Sociaux</h1>
                  </div>

                  <NuxtLink to="/contact" class="about-btn">
                    <img src="~/assets/images/icon.svg" alt="Bouton" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-24">
        <div class="col-md-6" data-aos="zoom-in">
          <div class="about-client-box info-box shadow-box">
            <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
            <div class="clients d-flex align-items-start gap-24 justify-content-center">
              <template v-if="profileStore.isLoading">
                <div class="client-item" v-for="i in 3" :key="i">
                  <SkeletonLoader height="40" class="mb-2" />
                  <SkeletonLoader height="20" />
                </div>
              </template>
              <template v-else-if="profileStore.profile">
                <div class="client-item">
                  <h1>{{ profileStore.profile.years_experience }}</h1>
                  <p>Années <br />d'Expérience</p>
                </div>

                <div class="client-item">
                  <h1>{{ profileStore.profile.customers_worldwide }}</h1>
                  <p>CLIENTS <br />MONDIALEMENT</p>
                </div>

                <div class="client-item">
                  <h1>{{ profileStore.profile.total_projects }}</h1>
                  <p>Projets <br />Réalisés</p>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-6" data-aos="zoom-in">
          <div class="about-contact-box info-box shadow-box">
            <NuxtLink class="overlay-link" to="/contact"></NuxtLink>
            <img src="~/assets/images/bg1.png" alt="Arrière-plan" class="bg-img" />
            <img src="~/assets/images/icon2.png" alt="Icône" class="star-icon" />
            <h1>Travaillons <br />ensemble.</h1>
            <a href="#" class="about-btn">
              <img src="~/assets/images/icon.svg" alt="Bouton" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
