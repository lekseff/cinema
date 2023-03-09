import * as country from '@/services/api/country'

export const countries = {
  state: () => ({
    countries: []
  }),
  mutations: {
    setCountries(state, payload) {
      state.countries = payload
    }
  },
  actions: {
    setCountries({commit}, payload) {
      commit('setCountries', payload)
    },
    /**
     * Получает список стран с сервера
     * @param dispatch
     * @returns {Promise<void>}
     */
    async loadAllCountries({dispatch}) {
      try {
        const response = await country.getCounties()
        dispatch('setCountries', response.data)
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка загрузки стран',
          color: 'error'
        })
      }
    }
  },
  getters: {
    getCountries(state) {
      return state.countries
    }
  }

}
