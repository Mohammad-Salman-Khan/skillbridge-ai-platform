import { api } from './client'

export interface GenerateRoadmapRequest {
  name: string
  degree: string
  year: string
  skills: string[]
  careerGoal: string
}

export interface MonthlyRoadmap {
  goal: string
  learning_focus: string
  resources: string
  [key: string]: string
}

export interface GenerateRoadmapResponse {
  career_summary: string
  skill_gap: string[]
  six_month_roadmap: Record<string, MonthlyRoadmap>
  recommended_projects: string[]
  interview_preparation_tips: string[]
}

export interface RoadmapSaveRequest {
  career_summary: string
  skill_gap: string[]
  six_month_roadmap: Record<string, MonthlyRoadmap>
  recommended_projects: string[]
  interview_preparation_tips: string[]
}

export interface RoadmapFromDB {
  id: string
  user_id: string
  career_summary: string
  skill_gap: string[]
  six_month_roadmap: Record<string, MonthlyRoadmap>
  recommended_projects: string[]
  interview_preparation_tips: string[]
  created_at: string
  updated_at: string
}

export const roadmapApi = {
  generate: (data: GenerateRoadmapRequest) =>
    api.post<GenerateRoadmapResponse>('/generate-roadmap', data),

  save: (data: RoadmapSaveRequest) =>
    api.post<RoadmapFromDB>('/roadmaps/save', data),

  getMine: () =>
    api.get<RoadmapFromDB>('/roadmaps/me'),
}
