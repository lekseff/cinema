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
    setHall({commit}, payload) {
      commit('setHall', payload)
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
    async loadHallById({commit}, payload) {
      const url = process.env.VUE_APP_API_URL
      await axios.get(`${url}/api/halls/${payload}`)
        .then((response) => {
          commit('setHall', response.data.data)
        })
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
    },
    /**
     * Обновления информации о зале
     * @param dispatch
     * @param getters
     * @param payload - {id: id, data: {}}
     */
    updateHall({dispatch}, payload) {
      const url = process.env.VUE_APP_API_URL
      const {id, data} = payload
      axios.put(`${url}/api/halls/${id}`, data, {
        headers: {
          'Accept': 'application/json',
        }
      }).then(() => {
        dispatch('getHalls')
        // :FIXME Попробовать убрать запрос на получение по id. Можно взять из store после getHalls
        dispatch('loadHallById', id)  // Для обновления выбранного после изменения параметров
        dispatch('openSnackbar', {
          message: 'Изменения сохранены',
          color: 'success'
        })
      }).catch(err => {
        dispatch('openSnackbar', {
          message: err.response.data.message || 'Ошибка обновления элемента',
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
    },
    getHallById: (state) => (id) => {
      return state.halls.find(h => h.id === id)
    }
  }
}
