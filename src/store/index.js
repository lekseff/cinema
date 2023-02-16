import {createStore} from 'vuex'
import axios from "axios";
import {movies} from "@/store/movies"
import {dates} from "@/store/dates";
import {sessions} from "@/store/sessions";
import {loader} from "@/store/loader";

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
    loader,
  }
})
