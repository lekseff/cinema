import axios from 'axios'

export const auth = {
  state: () => ({
    auth: false,
    token: localStorage.getItem('x-xsrf-token') || '',
    user: {}
  }),
  mutations: {
    setAuth(state, payload) {
      state.auth = payload
    }
  },
  actions: {
    setAuth({commit}, payload) {
      commit('setAuth', payload)
    },
    /**
     * Логин
     * @param dispatch
     * @param payload
     * @returns {Promise<void>}
     */
    async login({dispatch}, payload) {
      const url = process.env.VUE_APP_API_URL
      axios.defaults.withCredentials = true
      try {
        //   Запрос на получение cookie и токена
        await axios(`${url}/sanctum/csrf-cookie`,
          {
            headers: {
              'Accept': 'application/json',
            },
          })
        // Логин
        return await axios.post(`${url}/login`,
          payload,
          {
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then(response => {
            const token = response.config.headers['X-XSRF-TOKEN']
            console.log(token)
            localStorage.setItem('x-xsrf-token', token) // Сохраняем токен в localstorage
            dispatch('setAuth', true) // Статус авторизации в store
            return response
          })
      } catch (error) {
        console.log('login error', error)
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка авторизации',
          color: 'error'
        })
      }
    },
    /**
     * Выход
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async logout({dispatch}) {
      const url = process.env.VUE_APP_API_URL
      axios.defaults.withCredentials = true
      try {
        const response = await axios.post(`${url}/logout`)
        if (response && (response.status >= 200 && response.status < 300)) {
          localStorage.removeItem('x-xsrf-token')
          dispatch('setAuth', false)
          return response
        }
      } catch (e) {
        console.log('logout', e)
      }
    }
  },
  getters: {
    getAuthStatus(state) {
      return state.auth
    }
  }
}
