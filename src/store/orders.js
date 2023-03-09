// import axios from "axios";
import * as order from '@/services/api/order'

export const orders = {
  actions: {
    /**
     * Оправляет данные на сервер и получает qr код
     * @param _
     * @param payload
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    createOrder(_, payload) {
      try {
        return order.createOrder(payload)
      } catch (error) {
        console.log('Ошибка выполнения запроса', error)
      }
    }
  }
}
