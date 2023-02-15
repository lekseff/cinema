export const dates = {
  state: () => ({
    dates: [],
    selectedDate: ''
  }),
  mutations: {
    setDates(state, payload) {
      state.dates = payload
    },
    setSelectedDate(state, payload) {
      state.selectedDate = payload
    },
  },
  actions: {
    setDates({commit}, payload) {
      commit('setDates', payload)
    },
    setSelectedDate({commit}, payload) {
      commit('setSelectedDate', payload)
    }
  },
  getters: {
    getDates(state) {
      return state.dates
    },
    getSelectedDate(state) {
      return state.selectedDate
    }
  }
}
