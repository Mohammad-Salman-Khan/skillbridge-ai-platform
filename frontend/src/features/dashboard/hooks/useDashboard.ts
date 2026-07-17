import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { roadmapApi, type GenerateRoadmapResponse, type RoadmapFromDB } from '@/lib/api/roadmap'

interface StoredUserData {
  name: string
  degree: string
  year: string
  skills: string[]
  careerGoal: string
}

interface ProfileData {
  fullName?: string
  college?: string
  degree?: string
  year?: string
  skills?: string[]
  careerGoal?: string
  interests?: string[]
  learningTime?: string
}

function mapDBToResponse(db: RoadmapFromDB): GenerateRoadmapResponse {
  return {
    career_summary: db.career_summary,
    skill_gap: db.skill_gap,
    six_month_roadmap: db.six_month_roadmap,
    recommended_projects: db.recommended_projects,
    interview_preparation_tips: db.interview_preparation_tips,
  }
}

export function useDashboard() {
  const { profile, isLoading: profileLoading } = useProfile()

  const { data: backendRoadmap, isLoading: roadmapLoading } = useQuery({
    queryKey: ['roadmap', 'me'],
    queryFn: async () => {
      try {
        const res = await roadmapApi.getMine()
        return { data: mapDBToResponse(res.data), id: res.data.id }
      } catch {
        return null
      }
    },
    staleTime: 60_000,
    retry: false,
  })

  const profileData = useMemo<ProfileData | null>(() => {
    if (!profile) return null
    return profile as ProfileData
  }, [profile])

  const localRoadmap = useMemo<GenerateRoadmapResponse | null>(() => {
    try {
      const raw = localStorage.getItem('roadmap_data')
      return raw ? JSON.parse(raw) as GenerateRoadmapResponse : null
    } catch {
      return null
    }
  }, [])

  const storedUserData = useMemo<StoredUserData | null>(() => {
    try {
      const raw = localStorage.getItem('roadmap_user_data')
      return raw ? JSON.parse(raw) as StoredUserData : null
    } catch {
      return null
    }
  }, [])

  const roadmap = backendRoadmap?.data ?? localRoadmap
  const roadmapId = backendRoadmap?.id ?? null
  const hasRoadmap = roadmap !== null

  const profileProgress = useMemo(() => {
    if (!profileData) return { completed: 0, total: 8, percentage: 0 }

    const fields = [
      profileData.fullName,
      profileData.college,
      profileData.degree,
      profileData.year,
      profileData.skills && profileData.skills.length > 0,
      profileData.careerGoal,
      profileData.interests && profileData.interests.length > 0,
      profileData.learningTime,
    ]
    const completed = fields.filter(Boolean).length
    return { completed, total: 8, percentage: Math.round((completed / 8) * 100) }
  }, [profileData])

  const totalMonths = roadmap ? Object.keys(roadmap.six_month_roadmap).length : 0

  return {
    profile: profileData,
    profileLoading,
    roadmap,
    roadmapId,
    userData: storedUserData,
    hasRoadmap,
    profileProgress,
    totalMonths,
    loading: profileLoading || roadmapLoading,
  }
}
