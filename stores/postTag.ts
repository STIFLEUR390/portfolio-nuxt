import { defineStore } from 'pinia'
import type { PostTag, PostTagState, ApiResponse } from '~/types/shared'

export const usePostTagStore = defineStore('postTag', {
  state: (): PostTagState => ({
    tags: [],
    loading: false,
    error: null
  }),

  getters: {
    getTags: (state) => state.tags,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchTags(params?: {
      per_page?: number
      page?: number
      includes?: string
      id?: number
    }) {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const queryParams = new URLSearchParams()
        if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.includes) queryParams.append('includes', params.includes)
        if (params?.id) queryParams.append('id', params.id.toString())

        const queryString = queryParams.toString()
        const url = `${config.public.apiUrl}/postTags${queryString ? `?${queryString}` : ''}`

        const data = await $fetch<ApiResponse<PostTag>>(url, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.tags = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des tags:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 