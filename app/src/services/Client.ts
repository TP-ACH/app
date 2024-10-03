import { AxiosRequestConfig } from 'axios'
import apiFacade from './apiFacade'
import {
  LoginRequest,
  LoginResponse,
  ErrorMessage,
  RegisterRequest,
  RegisterResponse,
  SensorRquest,
  SensorResponse,
} from './DataTypes'

apiFacade.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

const Client = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    return await apiFacade.get<T>(url, config)
  },

  post: async <T>(url: string, data: unknown, config?: AxiosRequestConfig) => {
    return await apiFacade.post<T>(url, data, config)
  },

  put: async <T>(url: string, data: unknown, config?: AxiosRequestConfig) => {
    return await apiFacade.put<T>(url, data, config)
  },

  login: async <T>(data: LoginRequest) => {
    const loginHeaders = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    return (await apiFacade.post<T>('auth/login', data, loginHeaders)) as unknown as Promise<
      LoginResponse | ErrorMessage
    >
  },

  register: async <T>(data: RegisterRequest) => {
    return (await apiFacade.post<T>('auth/register', data)) as unknown as Promise<
      RegisterResponse | ErrorMessage
    >
  },

  sensor: async <T>(data: SensorRquest) => {
    return (await apiFacade.get<T>(
      'sensors/' +
        data.device_id +
        '?sensor=' +
        data.sensor +
        '&start_date=' +
        data.start_date +
        '&end_date=' +
        data.end_date
    )) as unknown as Promise<SensorResponse | ErrorMessage>
  },
}

export default Client
