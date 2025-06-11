import { defineStore } from 'pinia'
import type { SocialMedia, SocialMediaState, ApiResponse } from '~/types/shared'

export const useSocialMediaStore = defineStore('socialMedia', {
  state: (): SocialMediaState => ({
    socialMedias: [],
    loading: false,
    error: null
  }),

  getters: {
    getSocialMedias: (state) => state.socialMedias,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchSocialMedias() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null

      try {
        const data = await $fetch<ApiResponse<SocialMedia>>(`${config.public.apiUrl}/socialMedia`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.socialMedias = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des réseaux sociaux:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 