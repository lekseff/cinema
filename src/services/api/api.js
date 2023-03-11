import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  timeout: 40000,
  headers: {
    'Accept': 'application/json'
  }
})

// Если токен не действителен возвращает на страницу авторизации
instance.interceptors.response.use({}, function (error) {
  const {status} = error.response
  if (status === 401 || status === 419) {
    const token = localStorage.getItem('x-xsrf-token')
    if (token) localStorage.removeItem('x-xsrf-token')
    window.location.replace( `${process.env.VUE_APP_URL}/login`)
  }
  return Promise.reject(error);
})

export default instance
