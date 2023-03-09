// import axios from "axios";
import * as genre from '../services/api/genre'

export const genres = {
  state: () => ({
    genres: []
  }),
  mutations: {
    setGenres(state, payload) {
      state.genres = payload
    }
  },
  actions: {
    setGenres({commit}, payload) {
      commit('setGenres', payload)
    },
    /**
     * Получает список жанров с сервера
     * @param dispatch
     * @returns {Promise<void>}
     */
    async loadAllGenres({dispatch}) {
      try {
        const response = await genre.getGenres()
        dispatch('setGenres', response.data)
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.message || 'Ошибка загрузки жанров',
          color: 'error'
        })
      }
    }
  },
  getters: {
    getGenres(state) {
      return state.genres
    }
  }
}
