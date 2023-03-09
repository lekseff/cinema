// import axios from "axios";
import * as hall from '@/services/api/hall'

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
  },
  actions: {
    setHalls({commit}, payload) {
      commit('setHalls', payload)
    },
    setHall({commit}, payload) {
      commit('setHall', payload)
    },
    /**
     * Получает список всех залов с сервера
     * @param commit
     * @returns {Promise<void>}
     */
    async getHalls({commit}) {
      try {
        const response = await hall.getHalls()
        commit('setHalls', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Получает зал по id
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async loadHallById({commit}, payload) {
      try {
        const response = await hall.getHallsById(payload)
        commit('setHall', response.data)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Создает зал, метод POST
     * @param _
     * @param payload - данные нового зала
     * @returns {Promise<void>}
     */
    async createHall(_, payload) {
      try {
        return hall.createHall(payload)
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Удаление зала
     * @param dispatch
     * @param getters
     * @param id
     */
    async removeHall({dispatch, getters}, id) {
      hall.removeHall(id)
        .then(() => {
          const halls = getters.getAllHalls
          dispatch('setHalls', halls.filter(h => h.id !== id))
          dispatch('openSnackbar', {
            message: 'Зал успешно удален',
            color: 'success'
          })
        })
        .catch(error => {
          dispatch('openSnackbar', {
            message: `Ошибка удаления. [${error.response.statusText}]`,
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
      const {id, data} = payload
      hall.updateHall(id, data)
        .then(() => {
          dispatch('getHalls')
          dispatch('openSnackbar', {
            message: 'Изменения сохранены',
            color: 'success'
          })
        })
        .catch(error => {
          dispatch('openSnackbar', {
            message: error.response.data.message || 'Ошибка обновления элемента',
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
