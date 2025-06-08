import { defineStore } from 'pinia'
import type { Experience, ApiResponse } from '~/types/experience'

interface ExperienceState {
  experiences: Experience[]
  loading: boolean
  error: string | null
}

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
        const response = await fetch(`${config.public.apiUrl}/experiences`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des expériences')
        }

        const data = await response.json()
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