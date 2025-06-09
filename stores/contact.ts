import { defineStore } from 'pinia'
import type { ContactInfo, ContactState, ApiResponse } from '~/types/shared'

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
        const data = await $fetch<ApiResponse<ContactInfo>>(`${config.public.apiUrl}/contactInfos`, {
          headers: {
            'Accept': 'application/json'
          }
        })
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