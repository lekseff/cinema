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

/**
 * Создает новый жанр
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createGenre(data) {
  return await api.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

/**
 * Удаляет жанр
 * @param id - id жанра
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function removeGenre(id) {
  return await api.delete(`${url}/${id}`)
}
