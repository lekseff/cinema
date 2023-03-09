import api from './api'

const url = '/api/slider'


/**
 * Получает данные слайдера
 * @returns {Promise<*>}
 */
export async function getSlider() {
  const response = await api.get(url)
  return response.data
}


/**
 * Создает слайд
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createSlider(data) {
  return await api.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}


/**
 * Удаляет слайд
 * @param id
 * @returns {Promise<void>}
 */
export async function removeSlider(id) {
  return await api.delete(`${url}/${id}`)
}
