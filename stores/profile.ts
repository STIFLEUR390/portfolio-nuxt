import { defineStore } from 'pinia'
import type { Profile, ProfileState, ApiResponse } from '~/types/shared'

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
        const data = await $fetch<ApiResponse<Profile>>(`${config.public.apiUrl}/profile`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.profile = data.data[0]
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération du profil:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 