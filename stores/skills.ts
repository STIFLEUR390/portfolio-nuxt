import { defineStore } from 'pinia'
import type { Skill, SkillsState, ApiResponse } from '~/types/shared'

export const useSkillsStore = defineStore('skills', {
  state: (): SkillsState => ({
    skills: [],
    loading: false,
    error: null
  }),

  getters: {
    getSkills: (state) => state.skills,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchSkills() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const data = await $fetch<ApiResponse<Skill>>(`${config.public.apiUrl}/skills`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.skills = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des compétences:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 