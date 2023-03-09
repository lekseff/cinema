import api from './api'

const url = '/api/countries'

/**
 * Получает категории с сервера
 * @returns {Promise<any>}
 */
export async function getCounties() {
  const response = await api.get(url)
  return response.data
}
