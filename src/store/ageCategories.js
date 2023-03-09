import * as ageCategory from '@/services/api/ageCategory'

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
      try {
        const response = await ageCategory.getAgeCategories()
        dispatch('setAgeCategories', response.data)
      } catch (error) {
          dispatch('openSnackbar', {
            message: error.response.data.message || 'Ошибка загрузки возрастных категорий',
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
