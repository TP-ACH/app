import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //console.warn('Interceptor on request')

    return config
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.warn('Interceptor on response', response)

    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401 && error.response.data.detail) {
      return {
        error: error.response.data.detail,
      }
    }

    return Promise.reject(error)
  }
)

export default instance
