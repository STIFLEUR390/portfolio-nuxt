export const useDateFormat = () => {
  const formatYear = (dateString: string | null) => {
    if (!dateString) return 'Present'
    return new Date(dateString).getFullYear()
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present'
    return new Date(dateString).toLocaleDateString()
  }

  return {
    formatYear,
    formatDate
  }
} 