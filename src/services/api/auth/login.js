import api from '../api'

const url = '/login'

export async function login(data) {
  return await api.post(url, data, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
    }
  })
}
