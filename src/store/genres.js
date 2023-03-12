// import axios from "axios";
import * as genre from '../services/api/genre'

export const genres = {
  state: () => ({
    genres: []
  }),
  mutations: {
    setGenres(state, payload) {
      state.genres = payload
    },
    addGenre(state, payload) {
      state.genres = [...state.genres, payload]
    },
    removeGenre(state, payload) {
      state.genres = state.genres.filter(g => g.id !== payload)
    }
  },
  actions: {
    setGenres({commit}, payload) {
      commit('setGenres', payload)
    },
    addGenre({commit}, payload) {
      commit('addGenre', payload)
    },
    /**
     * Получает список жанров
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
    },
    /**
     * Создает жанр
     * @param dispatch
     * @param payload
     * @returns {Promise<*>}
     */
    async createGenre({dispatch}, payload) {
      try {
        const response = await genre.createGenre(payload)
        dispatch('openSnackbar', {
          message: 'Жанр успешно добавлен',
          color: 'success'
        })
        dispatch('addGenre', response.data.data)
        return response.data.data
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка создания жанра',
          color: 'error'
        })
      }
    },
    /**
     * Удаляет жанр
     * @param commit
     * @param dispatch
     * @param payload
     * @returns {Promise<void>}
     */
    async removeGenre({commit, dispatch}, payload) {
      try {
        await genre.removeGenre(payload)
        commit('removeGenre', payload)
        dispatch('openSnackbar', {
          message: 'Успешно удалено',
          color: 'success'
        })
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка удаления',
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
