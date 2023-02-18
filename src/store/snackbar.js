export const snackbar = {
  state: () => ({
    show: false,
    message: '',
    color: ''
  }),
  mutations: {
    openSnackbar(state, payload) {
      state.show = true
      state.message = payload.message
      state.color = payload.color
    },
    closeSnackbar(state) {
      state.show = false
      state.message = ''
      state.color = ''
    }
  },
  actions: {
    openSnackbar({commit}, payload) {
      if(payload.message && payload.color) {
        commit('openSnackbar', payload)
      }
    },
    closeSnackbar({commit}) {
      commit('closeSnackbar')
    }
  },
  getters: {
    getSnackbar(state) {
      return state
    }
  }
}

