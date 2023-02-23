import axios from "axios";

export const sessions = {
  state: () => ({
    sessions: {},
  }),
  mutations: {
    setSessions(state, payload) {
      state.sessions = payload
    }
  },
  actions: {
    setSessions({commit}, payload) {
      commit('setSessions', payload)
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
  },
  getters: {
    getSessions(state) {
      return state.sessions
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
