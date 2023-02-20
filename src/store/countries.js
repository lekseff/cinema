import axios from "axios";

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
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/countries`, {
          headers: {
            'Accept': 'application/json',
          }
        })
        dispatch('setCountries', response.data.data)
      } catch (error) {
        console.log(error)
        dispatch('openSnackbar', {
          message: 'Ошибка загрузки стран',
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
