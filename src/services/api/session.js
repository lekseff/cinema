import api from './api'

const url = '/api/sessions'


/**
 * Создает сеанс
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createSession(data) {
  return await api.post(url, data)
}


/**
 * Получает сеанс по id
 * @param id - id сеанса
 * @returns {Promise<any>}
 */
export async function getSessionById(id) {
  const response = await api.get(`${url}/${id}`)
  return response.data
}


/**
 * Удаляет сеанс
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function removeSession(id) {
  return await api.delete(`${url}/${id}`)
}
