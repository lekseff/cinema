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
    }
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
