import { defineStore } from 'pinia'
import type { PostCategory, PostCategoryState, ApiResponse } from '~/types/shared'

export const usePostCategoryStore = defineStore('postCategory', {
  state: (): PostCategoryState => ({
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    getCategories: (state) => state.categories,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    async fetchCategories(params?: {
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
        const url = `${config.public.apiUrl}/postCategories${queryString ? `?${queryString}` : ''}`

        const data = await $fetch<ApiResponse<PostCategory>>(url, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.categories = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des catégories:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 