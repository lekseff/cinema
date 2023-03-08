import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  timeout: 40000,
  headers: {
    'Accept': 'application/json'
  }
})

export default instance
