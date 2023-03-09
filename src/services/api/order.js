import api from './api'

const url = 'api/orders'

/**
 * Создает заказ
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export async function createOrder(data) {
  return await api.post(`${url}/confirm`, data)
}
