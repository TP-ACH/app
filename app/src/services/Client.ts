import { AxiosRequestConfig } from 'axios'
import apiFacade from './apiFacade'
import {
  LoginRequest,
  LoginResponse,
  ErrorMessage,
  RegisterRequest,
  RegisterResponse,
} from './DataTypes'

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
}

export default Client
