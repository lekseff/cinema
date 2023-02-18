import axios from "axios";

export const halls = {
  state: () => ({
    halls: [],
    hall: {},
  }),
  mutations: {
    setHalls(state, payload) {
      state.halls = payload
    },
    setHall(state, payload) {
      state.hall = payload
    },
    // addHall(state, payload) {
    //   state.halls.push(payload)
    // }
  },
  actions: {
    setHalls({commit}, payload) {
      commit('setHalls', payload)
    },
    // /**
    //  * Добавляет зал в store
    //  * @param commit
    //  * @param payload
    //  */
    // addHall({commit}, payload) {
    //   commit('addHall', payload)
    // },
    /**
     * Получает список всех залов с сервера
     * @param commit
     * @returns {Promise<void>}
     */
    async getHalls({commit}) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/halls`)
        commit('setHalls', response.data.data)
      } catch (e) {
        console.log('ошибка загрузка залов', e)
      }
    },
    /**
     * Получает зал по id
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async getHallById({commit}, payload) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/halls/${payload}`)
        commit('setHall', response.data.data)
      } catch (e) {
        console.log('ошибка загрузка залов', e)
        // this.$router.push({name: 'not-found'})
      }
    },
    /**
     * Создает зал, метод POST
     * @param _
     * @param payload - данные нового зала
     * @returns {Promise<void>}
     */
    async createHall(_, payload) {
      const url = process.env.VUE_APP_API_URL
      await axios.post(`${url}/api/halls`, payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })
    },
    /**
     * Удаление зала
     * @param dispatch
     * @param getters
     * @param id
     */
    removeHall({dispatch, getters}, id) {
      const url = process.env.VUE_APP_API_URL
      axios.delete(`${url}/api/halls/${id}`, {
        headers: {
          'Accept': 'application/json',
        }
      }).then(() => {
        const halls = getters.getAllHalls
        dispatch('setHalls', halls.filter(h => h.id !== id))
        dispatch('openSnackbar', {
          message: 'Зал успешно удален',
          color: 'success'
        })
      })
        .catch(err => {
          dispatch('openSnackbar', {
            message: `Ошибка удаления. [${err.response.statusText}]`,
            color: 'error'
          })
        })
    }
  },
  getters: {
    getAllHalls(state) {
      return state.halls
    },
    getSortHalls(state) {
      // Сортировка по не активным залам. Не активные в конце списка
      if (!state.halls.length) return state.halls
      return state.halls.sort((a, b) => b.available - a.available)
    },
    getActiveHalls(state) {
      return state.halls.filter(h => h.available)
    },
    getHall(state) {
      return state.hall
    }
  }
}
