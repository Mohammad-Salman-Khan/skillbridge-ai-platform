import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { useToast } from '@/contexts/ToastContext'
import { generateRoadmapPdf } from '@/lib/pdf/generateRoadmapPdf'
import type { GenerateRoadmapResponse } from '@/lib/api/roadmap'

interface ActionButtonsProps {
  roadmap: GenerateRoadmapResponse | null
  userName: string
  careerGoal: string
}

export default function ActionButtons({ roadmap, userName, careerGoal }: ActionButtonsProps) {
  const { addToast } = useToast()
  const [saved, setSaved] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleSaveRoadmap = () => {
    const data = localStorage.getItem('roadmap_data')
    if (!data) {
      addToast('No roadmap data to save.', 'error')
      return
    }
    setSaved(true)
    addToast('Roadmap saved successfully!', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDownloadPDF = useCallback(async () => {
    if (!roadmap) {
      addToast('No roadmap data available. Generate a roadmap first.', 'error')
      return
    }

    setDownloading(true)
    try {
      await generateRoadmapPdf({ roadmap, userName, careerGoal })
      addToast('PDF downloaded successfully!', 'success')
    } catch {
      addToast('Failed to generate PDF. Please try again.', 'error')
    } finally {
      setDownloading(false)
    }
  }, [roadmap, userName, careerGoal, addToast])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-wrap items-center gap-3"
      >
        <Button
          variant="primary"
          size="md"
          loading={downloading}
          disabled={!roadmap}
          icon={
            downloading ? undefined : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            )
          }
          onClick={handleDownloadPDF}
        >
          {downloading ? 'Downloading...' : 'Download PDF'}
        </Button>

        <Button
          variant="secondary"
          size="md"
          disabled={!roadmap}
          icon={
            saved ? (
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            )
          }
          onClick={handleSaveRoadmap}
        >
          {saved ? 'Saved!' : 'Save Roadmap'}
        </Button>
      </motion.div>
    </>
  )
}
