import { defineStore } from 'pinia'

interface Service {
  id: number
  title: string
  description: string
  icon: string
  costs: string | null
  created_at: string
  updated_at: string
}

interface ServicesState {
  services: Service[]
  loading: boolean
  error: string | null
}

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
        const response = await fetch(`${config.public.apiUrl}/services`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des services')
        }
        const data = await response.json()
        this.services = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 