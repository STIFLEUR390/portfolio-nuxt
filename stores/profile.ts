import { defineStore } from 'pinia'

interface Profile {
  id: number
  name: string
  profession: string
  short_description: string
  description: string
  about_me: string
  years_experience: string
  customers_worldwide: string
  total_projects: string
  cv_url: string
  profile_picture: string
  created_at: string
  updated_at: string
}

interface ProfileState {
  profile: Profile | null
  loading: boolean
  error: string | null
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    profile: null,
    loading: false,
    error: null
  }),

  getters: {
    getProfile: (state) => state.profile,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchProfile() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`${config.public.apiUrl}/profiles`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du profil')
        }

        const data = await response.json()
        this.profile = data.data[0] // On prend le premier profil car il n'y en a qu'un seul
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 