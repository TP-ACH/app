import axios from 'axios'

const instance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:${import.meta.env.VITE_API_PORT}`,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    if (!response.data) {
      return {
        ok: true,
      }
    }

    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login'
      }

      const authError = {
        error: 'Unauthorized',
      }
      return authError
    }

    return Promise.reject(error)
  }
)

export default instance
