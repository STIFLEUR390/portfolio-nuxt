import { defineStore } from 'pinia'

interface Skill {
  id: number
  title: string
  percentage_of_mastery: number
  icon: string | null
  type: string
  description: string | null
  created_at: string
  updated_at: string
}

interface SkillsState {
  skills: Skill[]
  loading: boolean
  error: string | null
}

export const useSkillsStore = defineStore('skills', {
  state: (): SkillsState => ({
    skills: [],
    loading: false,
    error: null
  }),

  getters: {
    getSkills: (state) => state.skills,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error !== null,
    getSkillsByType: (state) => (type: string) => {
      return state.skills.filter(skill => skill.type === type)
    }
  },

  actions: {
    async fetchSkills() {
      const config = useRuntimeConfig()
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`${config.public.apiUrl}/skills`, {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des compétences')
        }

        const data = await response.json()
        this.skills = data.data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    }
  },

  persist: true
}) 