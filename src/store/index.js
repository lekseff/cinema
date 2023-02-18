import {createStore} from 'vuex'
import axios from 'axios'
import {movies} from '@/store/movies' // Фильмы
import {dates} from '@/store/dates' // Даты фильтра сеансов на главной странице
import {sessions} from '@/store/sessions' // Сеансы
import {halls} from '@/store/halls' // Залы
import {loader} from '@/store/loader' // Лоадер
import {modals} from '@/store/modals' // Модалки
import {snackbar} from "@/store/snackbar";  // Всплывающие уведомления


export default createStore({
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    /**
     * Главные данные сайта
     */
    getCinemaDates({dispatch}) {
      dispatch('setLoading')
      const url = process.env.VUE_APP_API_URL
      axios.get(`${url}/api/cinema`)
        .then((response) => {
          console.log('movie response', response.data)
          const {movies, dates, sessions} = response.data
          dispatch('setDates', dates)
          dispatch('setMovies', movies)
          dispatch('setSessions', sessions)
          dispatch('clearLoading')
        })
        .catch(error => {
          console.log('Ошибка загрузки getCinemaDates', error)
          dispatch('clearLoading')
        })
    }
  },
  modules: {
    movies,
    dates,
    sessions,
    halls,
    loader,
    modals,
    snackbar,
  }
})
