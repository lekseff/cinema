import axios from "axios";

export const movies = {
  state: () => ({
    movies: [],
    allMovies: [],
  }),
  mutations: {
    setMovies(state, payload) {
      state.movies = payload
    },
    setAllMovies(state, payload) {
      state.allMovies = payload
    }
  },
  actions: {
    setMovies({commit}, payload) {
      commit('setMovies', payload)
    },
    setAllMovies({commit}, payload) {
      commit('setAllMovies', payload)
    },
    async loadAllMovies({dispatch}) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/movies`)
        dispatch('setAllMovies', response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    getMovies(state) {
      return state.movies
    },
    getAllMovies(state) {
      return state.allMovies
    },
    getMovieById: (state, getters) => (id) => {
      return getters.getMovies.find(movie => movie.id === id)
    }
  }
}
