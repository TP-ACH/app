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
  start: string
  end: string
}
export interface DeviceRules {
  device: string
  rules_by_sensor: {
    sensor: string
    rules: Rule[]
  }[]
  light_hours?: LightHours
}

export interface SpeciesRules {
  species: string
  rules_by_sensor: {
    sensor: string
    rules: Rule[]
  }[]
  light_hours?: LightHours
}
