import axios from "axios";

export const sessions = {
  state: () => ({
    sessions: {}, // Все сеансы с определнной даты, которые показываются на сайте
    selectedSession: {} // Сеанс выбранный пользователем
  }),
  mutations: {
    setSessions(state, payload) {
      state.sessions = payload
    },
    setSelectedSession(state, payload) {
      state.selectedSession = payload
    }
  },
  actions: {
    setSessions({commit}, payload) {
      commit('setSessions', payload)
    },
    setSelectedSession({commit}, payload) {
      commit('setSelectedSession', payload)
    },
    /**
     * Создает сеанс
     * @param dispatch
     * @param payload
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async createSession({dispatch}, payload) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.post(`${url}/api/sessions`, payload, {
          headers: {
            'Accept': 'application/json',
          }
        })
        dispatch('openSnackbar', {
          message: 'Сеанс успешно добавлен',
          color: 'success'
        })
        return response
      } catch (error) {
        dispatch('openSnackbar', {
          message: 'Ошибка при создании сеанса',
          color: 'error'
        })
      }
    },
    async loadSessionById(_, id) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/sessions/${id}`)
        // console.log(response.data)
        // dispatch('setSelectedSession', response.data)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Получает сеансы для временной шкалы админки
     * @param dispatch
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async loadSessionsTimetable({dispatch}) {
      const url = process.env.VUE_APP_API_URL
      try {
        return axios.get(`${url}/api/sessions/timetable`)
      } catch (error) {
        console.log(error)
        dispatch('openSnackbar', {
          message: 'Ошибка загрузки сеансов',
          color: 'error'
        })
      }
    },
    /**
     * Удаление сеанса
     * @param dispatch
     * @param id
     * @returns {Promise<void>}
     */
    async removeSession({dispatch}, id) {
      try {
        const url = process.env.VUE_APP_API_URL
        await axios.delete(`${url}/api/sessions/${id}`)
        dispatch('openSnackbar', {
          message: 'Сеанс успешно удален',
          color: 'success'
        })
      } catch (error) {
        console.log(error)
        dispatch('openSnackbar', {
          message: 'Ошибка удаления сеанса',
          color: 'error'
        })
      }
    }
  },
  getters: {
    getSessions(state) {
      return state.sessions
    },
    getSelectedSession(state) {
      return state.selectedSession
    },
    /**
     * Получает сеансы на определенную дату
     * @param state
     * @param getters
     * @returns {function(*): *[]}
     */
    getSessionsWithDate: (state, getters) => (date) => {
      const result = []
      const sessions = getters.getSessions    // Все сеансы
      const moviesId = Object.keys(sessions)  // Ключи фильмов у которых сеансы
      moviesId.forEach(id => {
        const filtered = sessions[id].filter(s => s['calendarDate'] === date)
        if (filtered.length) {
          result.push({
            [id]: filtered
          })
        }
      })
      return result
    }
  }
}
