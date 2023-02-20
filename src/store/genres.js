import axios from "axios";

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
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/genres`, {
          headers: {
            'Accept': 'application/json',
          }
        })
        dispatch('setGenres', response.data.data)
      } catch (error) {
        console.log(error)
        dispatch('openSnackbar', {
          message: 'Ошибка загрузки жанров',
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
