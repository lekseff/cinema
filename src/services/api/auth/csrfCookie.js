import api from '../api'

const url = '/sanctum/csrf-cookie'

/**
 * Получает xsrf токен и устанавливает cookie
 * @returns {Promise<void>}
 */
export async function setCsrfCookie() {
  await api.get(url)
}
