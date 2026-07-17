import { api } from './client'

export const profileApi = {
  get: () => api.get('/profile'),
  update: (data: Record<string, unknown>) => api.put('/profile', data),
}
