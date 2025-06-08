<template>
  <section class="service-area">
    <div class="container">
      <h1 class="section-heading" data-aos="fade-up">
        <img src="~/assets/images/star-2.png" alt="Star"> Mes Services
        <img src="~/assets/images/star-2.png" alt="Star"></h1>

      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-4">
          <div class="service-sidebar" data-aos="fade-right">
            <div class="service-sidebar-inner shadow-box">
              <ul>
                <template v-if="servicesStore.isLoading">
                  <li v-for="n in 4" :key="n">
                    <div class="shadow-box skeleton" style="width: 32px; height: 32px;"></div>
                    <span class="skeleton" style="width: 80px; height: 18px; display: inline-block; margin-left: 8px;"></span>
                  </li>
                </template>
                <template v-else>
                  <li v-for="service in servicesStore.getServices" :key="service.id">
                    <i :class="service.icon + ' icon'" />
                    {{ service.title }}
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="col-md-8">
          <h1 class="section-heading" data-aos="fade-up"><img src="~/assets/images/star-2.png" alt="Star"> Mes Services
            <img src="~/assets/images/star-2.png" alt="Star"></h1>

          <div class="service-content-wrap" data-aos="zoom-in">
            <div class="service-content-inner shadow-box">
              <div class="service-items">
                <template v-if="servicesStore.isLoading">
                  <div v-for="n in 4" :key="n" class="service-item">
                    <h3 class="skeleton" style="width: 120px; height: 24px;"></h3>
                    <p class="skeleton" style="width: 100%; height: 40px;"></p>
                  </div>
                </template>
                <template v-else>
                  <div v-for="service in servicesStore.getServices" :key="service.id" class="service-item">
                    <h3><i :class="service.icon + ' icon'" style="margin-right:8px;" />{{ service.title }}</h3>
                    <p>{{ service.description }}</p>
                  </div>
                </template>
                <div v-if="servicesStore.hasError" class="alert alert-danger mt-2">
                  {{ servicesStore.error }}
                </div>
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
                    <h4>Stay with me</h4>
                    <h1>Profiles</h1>
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
                <h1>Let's <br>work <span>together.</span></h1>
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
                    <h4>more about me</h4>
                    <h1>Credentials</h1>
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
import { useServicesStore } from '~/stores/services'
import { onMounted } from 'vue'

const servicesStore = useServicesStore()

onMounted(() => {
  servicesStore.fetchServices()
})
</script>

