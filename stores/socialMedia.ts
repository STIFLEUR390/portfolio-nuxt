import { defineStore } from 'pinia'

interface SocialMedia {
  id: number
  name: string
  icon: string
  url: string | null
  created_at: string
  updated_at: string
}

interface SocialMediaState {
  socialMedias: SocialMedia[]
  loading: boolean
  error: string | null
}

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
        const response = await fetch(`${config.public.apiUrl}/socialMedia`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des médias sociaux')
        }

        const data = await response.json()
        this.socialMedias = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 