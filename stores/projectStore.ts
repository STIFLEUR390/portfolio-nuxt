import { defineStore } from 'pinia'
import type {
  Project,
  ProjectCategory,
  ProjectState,
  ApiResponse,
  PaginationMeta,
  PaginationLinks
} from '~/types/shared'

// --- INTERFACES ---
interface Client {
  id: number
  name: string
  email: string
  phone: string
  address: string
  created_at: string
  updated_at: string
}

interface Service {
  id: number
  title: string
  description: string
  icon: string
  costs: string | null
  created_at: string
  updated_at: string
}

interface Skill {
  id: number
  name: string
  level?: string
  created_at: string
  updated_at: string
}

interface ApiResponseCategory {
  data: ProjectCategory[]
  links: PaginationLinks
  meta: PaginationMeta
}

interface ApiResponseProject {
  data: Project[]
  links: PaginationLinks
  meta: PaginationMeta
}

// --- STORE ---
export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    categories: [],
    projects: [],
    loading: false,
    error: null,
    paginationCategories: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0
    },
    paginationProjects: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      total: 0
    }
  }),

  getters: {
    getCategories: (state) => state.categories,
    getProjects: (state) => state.projects,
    getCategoryById: (state) => (id: number) => 
      state.categories.find(category => category.id === id),
    getCategoryBySlug: (state) => (slug: string) =>
      state.categories.find(category => category.slug === slug),
    getProjectById: (state) => (id: number) =>
      state.projects.find(project => project.id === id),
    getProjectBySlug: (state) => (slug: string) =>
      state.projects.find(project => project.slug === slug),
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null
  },

  actions: {
    // --- CATEGORIES ---
    async fetchCategories(params: {
      page?: number
      per_page?: number
      includes?: string
      id?: number
    } = {}) {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<ApiResponse<ProjectCategory>>(`${config.public.apiUrl}/projectCategories`, {
          params: {
            page: params.page || 1,
            per_page: params.per_page || 10,
            includes: params.includes,
            id: params.id
          },
          headers: {
            'Accept': 'application/json'
          }
        })
        this.categories = data.data
        this.paginationCategories = {
          currentPage: data.meta.current_page,
          lastPage: data.meta.last_page,
          perPage: data.meta.per_page,
          total: data.meta.total
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des catégories:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchCategoryById(id: number, includes?: string) {
      return this.fetchCategories({ id, includes })
    },
    async fetchCategoryBySlug(slug: string, includes?: string) {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<ApiResponse<ProjectCategory>>(`${config.public.apiUrl}/projectCategories`, {
          params: {
            slug,
            includes
          },
          headers: {
            'Accept': 'application/json'
          }
        })
        if (data.data.length > 0) {
          this.categories = data.data
          return data.data[0]
        }
        return null
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération de la catégorie:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    // --- PROJETS ---
    async fetchProjects(params: {
      page?: number
      per_page?: number
      includes?: string
      id?: number
    } = {}) {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<ApiResponse<Project>>(`${config.public.apiUrl}/projects`, {
          params: {
            page: params.page || 1,
            per_page: params.per_page || 10,
            includes: params.includes,
            id: params.id
          },
          headers: {
            'Accept': 'application/json'
          }
        })
        this.projects = data.data
        this.paginationProjects = {
          currentPage: data.meta.current_page,
          lastPage: data.meta.last_page,
          perPage: data.meta.per_page,
          total: data.meta.total
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération des projets:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchProjectById(id: number, includes?: string) {
      await this.fetchProjects({ id, includes })
      return this.projects.find(p => p.id === id) || null
    },
    async fetchProjectBySlug(slug: string, includes?: string) {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      try {
        const data = await $fetch<ApiResponse<Project>>(`${config.public.apiUrl}/projects`, {
          params: {
            slug,
            includes
          },
          headers: {
            'Accept': 'application/json'
          }
        })
        if (data.data.length > 0) {
          this.projects = data.data
          return data.data[0]
        }
        return null
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error('Erreur lors de la récupération du projet:', error)
        return null
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 