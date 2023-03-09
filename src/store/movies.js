// import axios from "axios";
import * as movie from '@/services/api/movie'

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
      try {
        const response = await movie.getMovies()
        dispatch('setAllMovies', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Создает новый фильм
     * @returns {Promise<void>}
     */
    async createMovie({dispatch}, payload) {
      try {
        const response = await movie.createMovie(payload)
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
    removeMovie({dispatch, getters}, id) {
      movie.removeMovie(id)
        .then(() => {
          // Изменяем store
          const movies = getters.getAllMovies.filter(m => m.id !== id)
          dispatch('setAllMovies', movies)
          // Сообщение о удалении
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
