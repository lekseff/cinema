import axios from "axios";

export const slider = {
  state: () => ({
    slider: []
  }),
  mutations: {
    setSlides(state, payload) {
      state.slider = payload
    }
  },
  actions: {
    setSlides({commit}, payload) {
      commit('setSlides', payload)
    },
    /**
     * Получает элементы слайдера
     * @param dispatch
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async loadSlider({dispatch}) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.get(`${url}/api/slider`)
        dispatch('setSlides', response.data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * Создает слайд
     * @param _
     * @param payload
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async createSlider({dispatch}, payload) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.post(`${url}/api/slider`, payload, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        })
        // Информация
        dispatch('openSnackbar', {
          message: 'Слайд успешно добавлен',
          color: 'success'
        })
        return response
      } catch (error) {
        // Информация
        dispatch('openSnackbar', {
          message: error.response.data.message || 'Ошибка создания слайда',
          color: 'error'
        })
      }
    },
    /**
     * Удаляет слайд
     * @param dispatch
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async removeSlide({dispatch}, id) {
      const url = process.env.VUE_APP_API_URL
      try {
        const response = await axios.delete(`${url}/api/slider/${id}`)
        dispatch('openSnackbar', {
          message: 'Слайд успешно удален',
          color: 'success'
        })
        return response
      } catch (error) {
        dispatch('openSnackbar', {
          message: error.response.message || 'Ошибка удаления слайда',
          color: 'error'
        })
      }
    }
  },
  getters: {
    getSlides(state) {
      return state.slider
    }
  }
}
