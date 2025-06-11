// Interfaces de base pour les réponses API
export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface ApiResponse<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
}

// Interfaces pour les entités
export interface Client {
  id: number
  name: string
  email: string
  phone: string
  address: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  costs: string | null
  created_at: string
  updated_at: string
}

export interface Skill {
  id: number
  title: string
  percentage_of_mastery: number
  icon: string | null
  type: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: number
  title: string
  slug: string
  cover_image: string
  summary: string
  description: string
  type?: string
  gallery?: string[]
  created_at: string
  updated_at: string
  client?: Client
  service?: Service
  skills?: Skill[]
}

export interface ProjectCategory {
  id: number
  title: string
  slug: string
  created_at: string
  updated_at: string
  projects?: Project[]
}

export interface Certification {
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

export interface ContactInfo {
  id: number
  email_one: string
  email_two: string
  phone_one: string
  phone_two: string
  location: string
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  school: string
  degree: string
  field_of_study: string
  start_date: string
  end_date: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface Experience {
  id: number
  company: string
  position: string
  start_date: string
  end_date: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: number
  name: string
  profession: string
  short_description: string
  description: string
  about_me: string
  years_experience: string
  customers_worldwide: string
  total_projects: string
  cv_url: string
  profile_picture: string
  created_at: string
  updated_at: string
}

export interface SocialMedia {
  id: number
  name: string
  icon: string
  url: string | null
  created_at: string
  updated_at: string
}

// Interfaces pour les états des stores
export interface BaseState {
  loading: boolean
  error: string | null
}

export interface ProjectState extends BaseState {
  categories: ProjectCategory[]
  projects: Project[]
  paginationCategories: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
  paginationProjects: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}

export interface CertificationsState extends BaseState {
  certifications: Certification[]
}

export interface ContactState extends BaseState {
  contactInfo: ContactInfo | null
}

export interface EducationState extends BaseState {
  educations: Education[]
}

export interface ExperienceState extends BaseState {
  experiences: Experience[]
}

export interface ProfileState extends BaseState {
  profile: Profile | null
}

export interface ServicesState extends BaseState {
  services: Service[]
}

export interface SkillsState extends BaseState {
  skills: Skill[]
}

export interface SocialMediaState extends BaseState {
  socialMedias: SocialMedia[]
}

export interface PostCategory {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
  posts?: Post[]
}

export interface Author {
  id: number
  name: string
  email: string
  avatar: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: number
  title: string
  slug: string
  cover_image: string
  summary: string
  content: string
  is_published: boolean
  author?: Author
  tags?: PostTag[]
  comments?: any[] // À typer plus précisément si nécessaire
  created_at: string
  updated_at: string
}

export interface PostState {
  posts: Post[]
  loading: boolean
  error: string | null
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  } | null
}

export interface PostCategoryState {
  categories: PostCategory[]
  loading: boolean
  error: string | null
}

export interface PostTag {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
  posts?: Post[]
}

export interface PostTagState {
  tags: PostTag[]
  loading: boolean
  error: string | null
} 