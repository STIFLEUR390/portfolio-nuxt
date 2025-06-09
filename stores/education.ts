import { defineStore } from 'pinia'
import type { Education, EducationState, ApiResponse } from '~/types/shared'

export const useEducationStore = defineStore('education', {
  state: (): EducationState => ({
    educations: [],
    loading: false,
    error: null
  }),

  getters: {
    getEducations: (state) => state.educations,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchEducations() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const data = await $fetch<ApiResponse<Education>>(`${config.public.apiUrl}/education`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.educations = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des formations:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 