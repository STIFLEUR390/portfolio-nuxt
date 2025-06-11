import { defineStore } from 'pinia'
import type { Post, PostState, ApiResponse } from '~/types/shared'

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    loading: false,
    error: null,
    pagination: null
  }),

  getters: {
    getPosts: (state) => state.posts,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    getPagination: (state) => state.pagination
  },

  actions: {
    async fetchPosts(params?: {
      per_page?: number
      page?: number
      includes?: string
      id?: number
      search?: string
      slug?: string
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
        if (params?.search) queryParams.append('search', params.search)
        if (params?.slug) queryParams.append('slug', params.slug)

        const queryString = queryParams.toString()
        const url = `${config.public.apiUrl}/posts${queryString ? `?${queryString}` : ''}`

        const data = await $fetch<ApiResponse<Post>>(url, {
          headers: {
            'Accept': 'application/json'
          }
        })
        this.posts = data.data
        this.pagination = {
          current_page: data.meta.current_page,
          last_page: data.meta.last_page,
          per_page: data.meta.per_page,
          total: data.meta.total
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des posts:', error)
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 