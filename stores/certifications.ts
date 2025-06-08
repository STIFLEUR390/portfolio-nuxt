import { defineStore } from 'pinia'

interface Certification {
  id: number
  name: string
  issuer: string
  issue_date: string
  expiry_date: string | null
  credential_id: string
  credential_url: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

interface CertificationsState {
  certifications: Certification[]
  loading: boolean
  error: string | null
}

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
        const response = await fetch(`${config.public.apiUrl}/certifications`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des certifications')
        }

        const data = await response.json()
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