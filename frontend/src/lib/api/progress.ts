import { api } from './client'

export interface ProgressEntry {
  month_name: string
  completed: boolean
  completed_at: string | null
}

export interface ProgressSummary {
  entries: ProgressEntry[]
  total_months: number
  completed_months: number
  remaining_months: number
  percentage: number
}

export interface ProgressUpdateResponse {
  id: string
  user_id: string
  roadmap_id: string
  month_name: string
  completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

export const progressApi = {
  getByRoadmap: (roadmapId: string) =>
    api.get<ProgressSummary>('/progress', { params: { roadmap_id: roadmapId } }),

  update: (data: { roadmap_id: string; month_name: string; completed: boolean }) =>
    api.post<ProgressUpdateResponse>('/progress/update', data),
}
