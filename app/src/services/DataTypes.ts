export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface ErrorMessage {
  error: string
}

export interface Message {
  message: string
}

export interface RegisterRequest {
  user: {
    username: string
    first_name: string
    last_name: string
    password: string
  }
  access_token: string
}

export interface RegisterResponse {
  message: string
}

export interface User {
  username: string
  first_name: string
  last_name: string
  old_password?: string
  new_password?: string
}

export interface SensorRquest {
  device_id: string
  sensor: string
  start_date: string
  end_date: string
}

export interface Sensor {
  max: number
  min: number
  average: number
  data: {
    reading: number
    created_at: string
  }[]
}
export interface SensorResponse {
  ph: Sensor | null
  ec: Sensor | null
  temperature: Sensor | null
  humidity: Sensor | null
  floater: Sensor | null
}
export interface Rule {
  bound: number
  compare: string
  time: number
  enabled: boolean
  action: {
    type: string
    dest: string
  }
}
export interface LightHours {
  enabled: boolean
  start: string
  end: string
}
export interface SensorRule {
  sensor: string
  rules: Rule[]
}

export interface DeviceRules {
  device: string
  species?: string
  rules_by_sensor?: SensorRule[]
  light_hours?: LightHours
}

export interface SpeciesRules {
  species: string
  rules_by_sensor?: SensorRule[]
  light_hours?: LightHours
}

export type AlertType = 'ok' | 'action' | 'error' | 'warning'
export type AlertStatus = 'open' | 'pending' | 'closed'
export interface Alert {
  _id: string
  device_id: string
  type: AlertType
  status: AlertStatus
  topic: string
  title: string
  message: string
}
