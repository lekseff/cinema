import api from './api'

const url = '/api/movies'

/**
 * Получает список всех фильмов
 * @returns {Promise<any>}
 */
export async function getMovies() {
  const response = await api.get(url)
  return response.data
}

/**
 * Создает фильм
 * @param data - данные нового фильма
 * @returns {Promise<any>}
 */
export async function createMovie(data) {
  return await api.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

/**
 * Удаляет фильм
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function removeMovie(id) {
  return await api.delete(`${url}/${id}`)
}
