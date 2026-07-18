import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  isUser: boolean
}

const quickQuestions: { question: string; answer: string }[] = [
  {
    question: 'What is SkillBridge AI?',
    answer: 'SkillBridge AI is an AI-powered career guidance platform that helps students identify skill gaps, generate personalized learning roadmaps, receive project recommendations, and prepare for interviews based on their career goals.',
  },
  {
    question: 'How does SkillBridge AI create my roadmap?',
    answer: 'SkillBridge AI analyzes your education, current skills, experience, and career goals using AI. It then generates a personalized step-by-step roadmap with recommended technologies, projects, certifications, and interview preparation tailored to your profile.',
  },
  {
    question: 'What features does SkillBridge AI provide?',
    answer: 'SkillBridge AI provides personalized career roadmaps, skill gap analysis, project recommendations, interview preparation guidance, career summaries, progress visualization through charts, and AI-powered career assistance.',
  },
  {
    question: 'Who can use SkillBridge AI?',
    answer: 'SkillBridge AI is designed for students, fresh graduates, job seekers, and anyone looking to build technical skills, switch careers, or prepare for software and AI-related roles.',
  },
  {
    question: 'How can SkillBridge AI help me get a job?',
    answer: 'SkillBridge AI helps you identify missing skills, suggests a structured learning path, recommends practical projects, improves interview readiness, and guides you toward becoming industry-ready for your target role.',
  },
]

const faqs: { question: string; answer: string }[] = [
  {
    question: 'What is SkillBridge AI?',
    answer: 'SkillBridge AI is an AI-powered career mentor that helps students and professionals bridge the gap between their current skills and their dream career. It generates personalized learning roadmaps, identifies skill gaps, recommends projects, and provides interview preparation tips — all tailored to your specific career goals.',
  },
  {
    question: 'How does SkillBridge AI work?',
    answer: 'Simply create your profile with your current skills, education, and career goal. Our AI analyzes your profile, identifies gaps between your current skills and your target role, then generates a comprehensive 6-month learning roadmap with monthly goals, learning resources, project recommendations, and interview tips.',
  },
  {
    question: 'How do I generate a roadmap?',
    answer: 'First, complete your profile on the Profile page with your details, skills, and career goal. Then click "Generate Roadmap" and our AI will create a personalized 6-month learning plan. You can view and track your progress on the Dashboard.',
  },
  {
    question: 'What is Skill Gap Analysis?',
    answer: 'Skill Gap Analysis identifies the difference between your current skills and the skills required for your target career. The AI analyzes your profile and highlights specific skills you need to develop, helping you focus your learning efforts efficiently.',
  },
  {
    question: 'How can I improve my resume?',
    answer: 'SkillBridge AI provides resume suggestions based on your career goal and current profile. It recommends projects to add, skills to highlight, and certifications to pursue. You can also download your roadmap as a PDF to reference when updating your resume.',
  },
  {
    question: 'How do internship recommendations work?',
    answer: 'Based on your career goal, skills, and learning progress, the AI suggests relevant internship opportunities and areas to focus on. It helps you prepare by identifying the skills and projects that will make you a strong candidate.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. Your data is encrypted and stored securely using Supabase. We use JWT-based authentication and follow industry best practices for data protection. Your personal information is never shared with third parties.',
  },
  {
    question: 'Contact support',
    answer: 'Need help? Reach out to our support team at support@skillbridge.ai or visit our help center. We typically respond within 24 hours. For urgent issues, you can also use the in-app feedback feature.',
  },
]

function generateId() {
  return crypto.randomUUID()
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      text: 'Hi! I\'m your SkillBridge AI assistant. How can I help you today?',
      isUser: false,
    },
  ])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const addMessage = (text: string, isUser: boolean) => {
    setMessages((prev) => [...prev, { id: generateId(), text, isUser }])
  }

  const handleSuggestionClick = (question: string) => {
    setShowSuggestions(false)
    addMessage(question, true)

    const faq = faqs.find(
      (f) => f.question.toLowerCase() === question.toLowerCase()
    )
    if (faq) {
      setTimeout(() => {
        addMessage(faq.answer, false)
        setTimeout(() => setShowSuggestions(true), 500)
      }, 400)
    }
  }

  const handleQuickQuestionClick = (q: { question: string; answer: string }) => {
    addMessage(q.question, true)
    setTimeout(() => {
      addMessage(q.answer, false)
    }, 300)
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30 transition-all hover:shadow-xl hover:shadow-brand-600/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        aria-label="Open AI Assistant"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-brand-600 to-brand-500 px-5 py-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                    <p className="text-[11px] text-white/80">Here to help you</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                  aria-label="Close assistant"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={msg.isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </motion.div>
                  ))}

                  <AnimatePresence>
                    {showSuggestions && messages.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-wrap gap-2 pt-2"
                      >
                        {faqs.map((faq) => (
                          <motion.button
                            key={faq.question}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSuggestionClick(faq.question)}
                            className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-medium text-gray-600 shadow-sm transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-brand-800 dark:hover:bg-brand-950/50 dark:hover:text-brand-300"
                          >
                            {faq.question}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-100 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-thin">
                  {quickQuestions.map((q) => (
                    <motion.button
                      key={q.question}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleQuickQuestionClick(q)}
                      className="shrink-0 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-600 shadow-sm transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-brand-800 dark:hover:bg-brand-950/50 dark:hover:text-brand-300"
                    >
                      {q.question}
                    </motion.button>
                  ))}
                </div>
                <div className="border-t border-gray-100 px-4 py-2.5 dark:border-gray-700">
                  <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
                    Ask me anything about SkillBridge AI
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
