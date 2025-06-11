import { defineStore } from 'pinia'
import type { Experience, ExperienceState, ApiResponse } from '~/types/shared'

export const useExperienceStore = defineStore('experience', {
  state: (): ExperienceState => ({
    experiences: [],
    loading: false,
    error: null
  }),

  getters: {
    getExperiences: (state) => state.experiences,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchExperiences() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null

      try {
        const data = await $fetch<ApiResponse<Experience>>(`${config.public.apiUrl}/experiences`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.experiences = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des expériences:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 