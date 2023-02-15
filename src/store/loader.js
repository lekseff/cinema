export const loader = {
  state: () => ({
    loading: true
  }),
  mutations: {
    setLoading(state) {
      state.loading = true
    },
    clearLoading(state) {
      state.loading = false
    }
  },
  actions: {
    setLoading({commit}) {
      commit('setLoading')
    },
    clearLoading({commit}) {
      commit('clearLoading')
    }
  },
  getters: {
    getLoading(state) {
      return state.loading
    }
  }
}
