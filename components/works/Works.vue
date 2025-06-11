<script setup lang="ts">
import type { Project } from '~/types/shared'

defineProps<{
  projects: Project[]
  loading: boolean
}>()
</script>

<template>
  <!-- Projects -->
  <section class="projects-area">
    <div class="container">
      <h1 class="section-heading" data-aos="fade-up">
        <img src="~/assets/images/star-2.png" alt="Star"> Tous les Projets
        <img src="~/assets/images/star-2.png" alt="Star">
      </h1>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <div v-else class="row">
        <div v-for="project in projects" :key="project.id" class="col-md-4 mb-4">
          <div data-aos="zoom-in">
            <div class="project-item shadow-box">
              <NuxtLink class="overlay-link" :to="`/work-details/${project.slug}`"></NuxtLink>
              <img src="~/assets/images/bg1.png" alt="BG" class="bg-img">
              <div class="project-img">
                <img :src="project.cover_image" :alt="project.title">
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="project-info">
                  <p>{{ project.service?.title || 'PROJET' }}</p>
                  <h1>{{ project.title }}</h1>
                </div>
                <NuxtLink :to="`/work-details/${project.slug}`" class="project-btn">
                  <img src="~/assets/images/icon.svg" alt="Button">
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

 

