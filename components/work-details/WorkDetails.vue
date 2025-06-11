<script setup lang="ts">
import type { Project } from '~/types/shared'
import { computed } from '#imports'

const props = defineProps<{
  project: Project
}>()

const groupedGallery = computed(() => {
  const images = props.project.gallery || []
  const pairs = []
  for (let i = 0; i < images.length; i += 2) {
    pairs.push(images.slice(i, i + 2))
  }
  return pairs
})
</script>



<template>
  <!-- Breadcrumb -->
  <section class="breadcrumb-area">
    <div class="container">
      <div class="breadcrumb-content" data-aos="fade-up">
        <p>Projets - {{ project.service?.title }}</p>
        <h1 class="section-heading">
          <img src="~/assets/images/star-2.png" alt="Star"> {{ project.title }}
          <img src="~/assets/images/star-2.png" alt="Star">
        </h1>
      </div>
    </div>
  </section>

  <!-- Project Details -->
  <section class="project-details-wrap">
    <div class="project-details-img" data-aos="zoom-in">
      <img :src="project.cover_image" :alt="project.title">
    </div>

    <div class="container">
      <div data-aos="zoom-in">
        <div class="d-flex project-infos-wrap shadow-box mb-24">
          <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
          <img src="~/assets/images/icon2.png" alt="Icon">
          <div class="project-details-info flex-1">
            <h3>Le problème</h3>
            <markdown-content :content="project.problem" />
          </div>

          <div class="project-details-info flex-1">
            <h3>Approche</h3>
            <markdown-content :content="project.approach" />
          </div>
        </div>
      </div>

      <div v-for="(pair, index) in groupedGallery" :key="index" class="row mb-24">
        <div v-for="(image, imageIndex) in pair" :key="imageIndex" class="col-md-6" data-aos="zoom-in">
          <div class="project-details-3-img">
            <img :src="image" :alt="`Project image ${index * 2 + imageIndex + 1}`">
          </div>
        </div>
      </div>

      <div data-aos="zoom-in">
        <div class="project-about-2 d-flex shadow-box mb-24">
          <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
          <div class="left-details">
            <img src="~/assets/images/icon3.png" alt="Icon">
            <ul>
              <li>
                <p>Année</p>
                <h4>{{ new Date(project.created_at).getFullYear() }}</h4>
              </li>
              <li v-if="project.client">
                <p>Client</p>
                <h4>{{ project.client.name }}</h4>
              </li>
              <li v-if="project.service">
                <p>Services</p>
                <h4>{{ project.service.title }}</h4>
              </li>
              <li v-if="project.type">
                <p>Type</p>
                <h4>{{ project.type }}</h4>
              </li>
            </ul>
          </div>
          <div class="right-details">
            <h3>Solution</h3>
            <markdown-content :content="project.solution" />
          </div>
        </div>
      </div>
    </div>

    <div class="container d-flex align-items-center justify-content-center" data-aos="zoom-in">
      <NuxtLink to="/works" class="big-btn shadow-box">
        Retour aux projets
      </NuxtLink>
    </div>

  </section>
</template>

 