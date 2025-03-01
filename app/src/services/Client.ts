import { AxiosRequestConfig } from 'axios'
import apiFacade from './apiFacade'
import {
  LoginRequest,
  LoginResponse,
  ErrorMessage,
  Message,
  RegisterRequest,
  RegisterResponse,
  User,
  SensorRquest,
  SensorResponse,
  SpeciesRules,
  DeviceRules,
  AlertStatus,
  Alert,
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

  user: async <T>() => {
    return (await apiFacade.get<T>('users/me')) as unknown as Promise<User | ErrorMessage>
  },

  updateUser: async <T>(data: User) => {
    return (await apiFacade.put<T>('users/update', data)) as unknown as Promise<User | ErrorMessage>
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

  getDefaultRules: async <T>(species: string) => {
    return (await apiFacade.get<T>('rules/default/' + '?species=' + species)) as unknown as Promise<
      SpeciesRules | ErrorMessage
    >
  },

  getDeviceRules: async <T>(device_id: string) => {
    return (await apiFacade.get<T>(
      'rules/device/' + '?device_id=' + device_id
    )) as unknown as Promise<DeviceRules | ErrorMessage>
  },

  putDeviceRules: async <T>(rules: DeviceRules) => {
    return (await apiFacade.put<T>('rules/device/', rules)) as unknown as Promise<
      Message | ErrorMessage
    >
  },

  getDevices: async <T>() => {
    return (await apiFacade.get<T>('sensors/devices')) as unknown as Promise<
      string[] | ErrorMessage
    >
  },

  getSpecies: async <T>() => {
    return (await apiFacade.get<T>('rules/species')) as unknown as Promise<
      { species: string[] } | ErrorMessage
    >
  },

  getAlerts: async <T>(device_id: string, status: AlertStatus) => {
    return (await apiFacade.get<T>(
      'alerts' + '?device_id=' + device_id + '&status=' + status
    )) as unknown as Promise<Alert[] | ErrorMessage>
  },

  putAlerts: async <T>(id: string, status: AlertStatus) => {
    return (await apiFacade.put<T>(
      'alerts/?id=' + id + '&new_status=' + status
    )) as unknown as Promise<Message | ErrorMessage>
  },
}

export default Client
