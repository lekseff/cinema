import axios from "axios";

axios.defaults.withCredentials = true
import * as slider from '@/services/api/slider'

export const sliders = {
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
      try {
        const response = await slider.getSlider()
        dispatch('setSlides', response.data)
        return response.data
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
      try {
        const response = await slider.createSlider(payload)
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
     * @returns
     */
    async removeSlide({dispatch}, id) {
      try {
        const response = await slider.removeSlider(id)
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
