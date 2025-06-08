export interface Experience {
  id: number
  start_date: string
  end_date: string | null
  is_active: boolean
  company: string
  job: string
  details: string
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  start_date: string
  end_date: string | null
  is_active: boolean
  school: string
  job: string | null
  details: string | null
  created_at: string
  updated_at: string
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  path: string
  per_page: number
  to: number
  total: number
}

export interface ApiResponse<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
} 