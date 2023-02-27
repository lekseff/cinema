import axios from "axios";

export const orders = {
  actions: {
    /**
     * Оправляет данные на сервер и получает qr код
     * @param _
     * @param payload
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async confirmOrder(_, payload) {
      try {
        const url = process.env.VUE_APP_API_URL
        return await axios.post(`${url}/api/orders/confirm`, payload, {
          headers: {
            'Accept': 'application/json',
          }
        })
      } catch (error) {
        console.log('Ошибка выполнения запроса', error)
      }
    }
  }
}
