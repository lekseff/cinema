import api from '../api'

const url = '/logout'

/**
 * Выход из админки
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function logout() {
  return await api.post(url)
}
