import api from './api'

const url = 'api/halls'

/**
 * Получает список залов
 * @returns {Promise<any>}
 */
export async function getHalls() {
  const response = await api.get(url)
  return response.data
}

/**
 * Получает зал по id
 * @param id - id зала
 * @returns {Promise<any>}
 */
export async function getHallsById(id) {
  const response = await api.get(`${url}/${id}`)
  return response.data
}

/**
 * Создает зал
 * @param data - данные зала
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createHall(data) {
  return await api.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

/**
 * Удаляет зал
 * @param id - id зала
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function removeHall(id) {
  return await api.delete(`${url}/${id}`)
}

/**
 * Обновляет информацию о зале
 * @param id
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function updateHall(id, data) {
  return await api.put(`${url}/${id}`, data)
}


