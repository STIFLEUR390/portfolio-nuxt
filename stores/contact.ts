import { defineStore } from 'pinia'

interface ContactInfo {
  id: number
  email_one: string
  email_two: string
  phone_one: string
  phone_two: string
  location: string
  created_at: string
  updated_at: string
}

interface ContactState {
  contactInfo: ContactInfo | null
  loading: boolean
  error: string | null
}

export const useContactStore = defineStore('contact', {
  state: (): ContactState => ({
    contactInfo: null,
    loading: false,
    error: null
  }),

  getters: {
    getContactInfo: (state) => state.contactInfo,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchContactInfo() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`${config.public.apiUrl}/contactInfos`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations de contact')
        }

        const data = await response.json()
        this.contactInfo = data.data[0] // On prend le premier contact car il n'y en a qu'un seul
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 