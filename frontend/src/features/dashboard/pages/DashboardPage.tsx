import { motion } from 'framer-motion'
import { useDashboard } from '../hooks/useDashboard'
import { useProgress } from '../hooks/useProgress'
import WelcomeCard from '../components/WelcomeCard'
import CareerGoalCard from '../components/CareerGoalCard'
import SkillGapCard from '../components/SkillGapCard'
import ProgressCard from '../components/ProgressCard'
import RoadmapTimeline from '../components/RoadmapTimeline'
import RecommendedProjects from '../components/RecommendedProjects'
import InterviewTips from '../components/InterviewTips'
import ActionButtons from '../components/ActionButtons'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export default function DashboardPage() {
  const { profile, loading, roadmap, roadmapId, userData, hasRoadmap, profileProgress, totalMonths } = useDashboard()

  const { summary: roadmapProgress, toggleMonth } = useProgress({
    roadmapId,
    totalMonths,
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    )
  }

  if (!hasRoadmap) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">No Roadmap Found</h2>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Generate your AI-powered career roadmap from your profile page to see your personalized dashboard here.
        </p>
      </div>
    )
  }

  const displayName = profile?.fullName || userData?.name || 'there'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-12"
    >
      <div className="mb-6">
        <WelcomeCard
          name={displayName}
          careerGoal={userData?.careerGoal || ''}
        />
      </div>

      <div className="mb-6">
        <ActionButtons
          roadmap={roadmap}
          userName={displayName}
          careerGoal={userData?.careerGoal || ''}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RoadmapTimeline
            roadmap={roadmap!.six_month_roadmap}
            progress={roadmapProgress}
            onToggleMonth={toggleMonth}
          />
          <RecommendedProjects projects={roadmap!.recommended_projects} />
        </div>
        <div className="space-y-6">
          <CareerGoalCard
            careerGoal={userData?.careerGoal || ''}
            careerSummary={roadmap!.career_summary}
          />
          <SkillGapCard skillGaps={roadmap!.skill_gap} />
          <ProgressCard
            completed={profileProgress.completed}
            total={profileProgress.total}
            percentage={profileProgress.percentage}
          />
          <InterviewTips tips={roadmap!.interview_preparation_tips} />
        </div>
      </div>
    </motion.div>
  )
}
