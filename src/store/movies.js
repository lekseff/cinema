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
    /**
     * Получает список всех фильмов
     * @param dispatch
     * @returns {Promise<void>}
     */
    async loadAllMovies({dispatch}) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/movies`)
        dispatch('setAllMovies', response.data.data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Создает новый фильм
     * @returns {Promise<void>}
     */
    async createMovie({dispatch}, payload) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.post(`${url}/api/movies`, payload, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })
        dispatch('openSnackbar', {
          message: 'Фильм успешно создан',
          color: 'success'
        })
        return response
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка создания фильма',
          color: 'error'
        })
      }
    },
    /**
     * Удаляет фильм
     * @param dispatch
     * @param getters
     * @param id
     */
    async removeMovie({dispatch, getters}, id) {
      const url = process.env.VUE_APP_API_URL
      await axios.delete(`${url}/api/movies/${id}`, {
        headers: {
          'Accept': 'application/json',
        }
      })
        .then(() => {
          // Изменяем store
          const movies = getters.getAllMovies.filter(m => m.id !== id)
          dispatch('setAllMovies', movies)
          // Сообщение удалении
          dispatch('openSnackbar', {
            message: 'Фильм успешно удален',
            color: 'success'
          })
        })
        .catch(error => {
          dispatch('openSnackbar', {
            message: error.message || 'Ошибка удаления фильма',
            color: 'error'
          })
        })
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
