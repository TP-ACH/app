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

export interface RegisterRequest {
  user: {
    username: string
    first_name: string
    last_name: string
    password: string
  }
  device_id: string
}

export interface RegisterResponse {
  message: string
}
