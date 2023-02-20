import axios from "axios";

export const ageCategories = {
  state: () => ({
    ageCategories: []
  }),
  mutations: {
    setAgeCategories(state, payload) {
      state.ageCategories = payload
    }
  },
  actions: {
    setAgeCategories({commit}, payload) {
      commit('setAgeCategories', payload)
    },
    /**
     * Получает список возрастных категорий с сервера
     * @param dispatch
     * @returns {Promise<void>}
     */
    async loadAllAgeCategories({dispatch}) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/age-category`, {
          headers: {
            'Accept': 'application/json',
          }
        })
        dispatch('setAgeCategories', response.data.data)
      } catch (error) {
        console.log(error)
        dispatch('openSnackbar', {
          message: 'Ошибка загрузки возрастных категорий',
          color: 'error'
        })
      }
    }
  },
  getters: {
    getAgeCategories(state) {
      return state.ageCategories
    }
  }

}
