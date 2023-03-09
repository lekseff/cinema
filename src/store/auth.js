// import axios from 'axios'
import {setCsrfCookie} from '@/services/api/auth/csrfCookie'
import {login} from '@/services/api/auth/login'
import {logout} from '@/services/api/auth/logout'

export const auth = {
  state: () => ({
    auth: !!localStorage.getItem('x-xsrf-token'),
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
      try {
        await setCsrfCookie()
        const response = await login(payload)
        const token = response.config.headers['X-XSRF-TOKEN'] // Получаем токен из запроса
        localStorage.setItem('x-xsrf-token', token) // Сохраняем токен в localstorage
        dispatch('setAuth', true) // Статус авторизации в store
        return response
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
      try {
        const response = await logout()
        if (response && (response.status >= 200 && response.status < 300)) {
          localStorage.removeItem('x-xsrf-token')
          dispatch('setAuth', false)
          return response
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    getAuthStatus(state) {
      return state.auth
    }
  }
}
