import { defineStore } from 'pinia'
import type { Certification, CertificationsState, ApiResponse } from '~/types/shared'

export const useCertificationsStore = defineStore('certifications', {
  state: (): CertificationsState => ({
    certifications: [],
    loading: false,
    error: null
  }),

  getters: {
    getCertifications: (state) => state.certifications,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    getActiveCertifications: (state) => {
      return state.certifications.filter(cert => cert.status === 'active')
    }
  },

  actions: {
    async fetchCertifications() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const data = await $fetch<ApiResponse<Certification>>(`${config.public.apiUrl}/certifications`, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.certifications = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 