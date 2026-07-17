import { Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import ProfilePage from './features/profile/pages/ProfilePage'
import RoadmapPage from './features/roadmap/pages/RoadmapPage'
import SkillGapPage from './features/skill-gap/pages/SkillGapPage'
import ProjectsPage from './features/projects/pages/ProjectsPage'
import ResumePage from './features/resume/pages/ResumePage'
import InternshipsPage from './features/internships/pages/InternshipsPage'
import LandingPage from './features/landing/pages/LandingPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/skill-gap" element={<SkillGapPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/internships" element={<InternshipsPage />} />
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export default App
