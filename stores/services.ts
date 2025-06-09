import { defineStore } from 'pinia'
import type { Service, ServicesState, ApiResponse } from '~/types/shared'

export const useServicesStore = defineStore('services', {
  state: (): ServicesState => ({
    services: [],
    loading: false,
    error: null
  }),

  getters: {
    getServices: (state) => state.services,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchServices() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const data = await $fetch<ApiResponse<Service>>(`${config.public.apiUrl}/services`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.services = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des services:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 