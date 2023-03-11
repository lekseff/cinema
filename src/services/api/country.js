import api from './api'

const url = '/api/countries'

/**
 * Получает список стран
 * @returns {Promise<any>}
 */
export async function getCounties() {
  const response = await api.get(url)
  return response.data
}

/**
 * Создает страну
 * @param data - название страны
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createCountry(data) {
  return await api.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

/**
 * Удаляет страну
 * @param id - id страны
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function removeCountry(id) {
  return await api.delete(`${url}/${id}`)
}
