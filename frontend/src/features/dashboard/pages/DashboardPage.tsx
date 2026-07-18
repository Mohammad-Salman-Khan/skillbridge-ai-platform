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
import StatsCards from '../components/StatsCards'
import { DashboardSkeleton } from '../components/SkeletonLoader'
import EmptyState from '../components/EmptyState'

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
    return <DashboardSkeleton />
  }

  const displayName = profile?.fullName || userData?.name || 'there'

  if (!hasRoadmap) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <WelcomeCard
          name={displayName}
          careerGoal={userData?.careerGoal || ''}
        />
        <div className="mt-6">
          <StatsCards
            roadmap={null}
            profileProgress={profileProgress}
            hasRoadmap={false}
          />
        </div>
        <EmptyState
          icon={
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          title="No Roadmap Found"
          description="Generate your AI-powered career roadmap from your profile page to see your personalized dashboard here."
          action={{
            label: 'Go to Profile',
            onClick: () => window.location.href = '/profile',
          }}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <WelcomeCard
          name={displayName}
          careerGoal={userData?.careerGoal || ''}
        />
      </div>

      <div className="mb-6">
        <StatsCards
          roadmap={roadmap}
          profileProgress={profileProgress}
          hasRoadmap={true}
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
