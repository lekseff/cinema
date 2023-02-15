export const movies = {
  state: () => ({
    movies: [],
  }),
  mutations: {
    setMovies(state, payload) {
      state.movies = payload
    },
  },
  actions: {
    setMovies({commit}, payload) {
      commit('setMovies', payload)
    },
  },
  getters: {
    getMovies(state) {
      return state.movies
    },
    getMovieById: (state, getters) => (id) => {
      return getters.getMovies.find(movie => movie.id === id)
    }
  }
}
