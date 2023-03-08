import api from './api'

const url = '/api/genres'

/**
 * Получает список жанров
 * @returns {Promise<any>}
 */
export async function getGenres() {
  const response = await api.get(url)
  return response.data
}
