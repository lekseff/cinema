import * as country from '@/services/api/country'

export const countries = {
  state: () => ({
    countries: []
  }),
  mutations: {
    setCountries(state, payload) {
      state.countries = payload
    },
    addCountry(state, payload) {
      state.countries = [...state.countries, payload]
    },
    removeCountry(state, payload) {
      state.countries = state.countries.filter(c => c.id !== payload)
    }
  },
  actions: {
    setCountries({commit}, payload) {
      commit('setCountries', payload)
    },
    addCountry({commit}, payload) {
      commit('addCountry', payload)
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
    },
    /**
     * Создает страну
     * @param dispatch
     * @param data
     * @returns {Promise<*>}
     */
    async createCountry({dispatch}, data) {
      try {
        const response = await country.createCountry(data)
        dispatch('addCountry', response.data.data)
        dispatch('openSnackbar', {
          message: 'Страна успешно добавлена',
          color: 'success'
        })
        return response.data.data
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка при сохранении',
          color: 'error'
        })
      }
    },
    /**
     * Удаляет страну
     * @param commit
     * @param dispatch
     * @param id
     * @returns {Promise<void>}
     */
    async removeCountry({commit, dispatch}, id) {
      try {
        await country.removeCountry(id)
        commit('removeCountry', id)
        dispatch('openSnackbar', {
          message: 'Успешно удалено',
          color: 'success'
        })
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка при удалении',
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
