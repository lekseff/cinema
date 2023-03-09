import api from './api'

const  url = '/api/age-category'

/**
 * Получает возрастные категории
 * @returns {Promise<any>}
 */
export async function getAgeCategories() {
  const response = await api.get(url)
  return response.data
}
