import { defineStore } from 'pinia'
import type { Education, ApiResponse } from '~/types/experience'

interface EducationState {
  educations: Education[]
  loading: boolean
  error: string | null
}

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
        const response = await fetch(`${config.public.apiUrl}/education`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des formations')
        }

        const data = await response.json()
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