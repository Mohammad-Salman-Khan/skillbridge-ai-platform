import { api } from './client'

export interface RegisterData {
  email: string
  password: string
  full_name: string
}

export interface LoginData {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  email: string
  full_name: string
  created_at: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export const authApi = {
  register: (data: RegisterData) =>
    api.post<UserResponse>('/auth/register', data).then(res => res.data),

  login: (data: LoginData) =>
    api.post<TokenResponse>('/auth/login', data).then(res => res.data),
}
