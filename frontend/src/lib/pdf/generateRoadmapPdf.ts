import jsPDF from 'jspdf'
import type { GenerateRoadmapResponse } from '@/lib/api/roadmap'
import { toTitleCase } from '@/lib/utils/helpers'

const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN = 22
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const FONT_SIZE = 10
const LINE_HEIGHT = 5

const COLORS = {
  brand: [37, 99, 235] as [number, number, number],
  brandDark: [30, 64, 175] as [number, number, number],
  brandLight: [219, 234, 254] as [number, number, number],
  text: [55, 65, 81] as [number, number, number],
  textMuted: [107, 114, 128] as [number, number, number],
  border: [229, 231, 235] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
}

function checkPageBreak(
  doc: jsPDF,
  y: number,
  needed: number,
): number {
  if (y + needed > PAGE_HEIGHT - MARGIN) {
    doc.addPage()
    return MARGIN
  }
  return y
}

function addSectionDivider(doc: jsPDF, y: number): number {
  y += 4
  doc.setDrawColor(...COLORS.border)
  doc.setLineWidth(0.5)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 8
  return y
}

function addBulletList(
  doc: jsPDF,
  y: number,
  items: string[],
  indent = 8,
): number {
  doc.setFontSize(FONT_SIZE)
  for (const item of items) {
    y = checkPageBreak(doc, y, LINE_HEIGHT)
    doc.setTextColor(...COLORS.brand)
    doc.circle(MARGIN + indent + 1.5, y + 1.5, 1.2, 'F')
    doc.setTextColor(...COLORS.text)
    const lines = doc.splitTextToSize(item, CONTENT_WIDTH - indent - 8)
    doc.text(lines, MARGIN + indent + 6, y)
    y += lines.length * LINE_HEIGHT + 2
  }
  return y
}

function addNumberedList(
  doc: jsPDF,
  y: number,
  items: string[],
): number {
  doc.setFontSize(FONT_SIZE)
  for (let i = 0; i < items.length; i++) {
    const text = `${i + 1}.  ${items[i]}`
    y = checkPageBreak(doc, y, LINE_HEIGHT)
    doc.setTextColor(...COLORS.text)
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH)
    doc.text(lines, MARGIN, y)
    y += lines.length * LINE_HEIGHT + 2
  }
  return y
}

function addSectionTitle(doc: jsPDF, y: number, title: string): number {
  y = checkPageBreak(doc, y, 12)
  doc.setFontSize(13)
  doc.setTextColor(...COLORS.brandDark)
  doc.setFont(undefined, 'bold')
  doc.text(title, MARGIN, y)
  doc.setFont(undefined, 'normal')
  y += 10
  return y
}

interface PDFInput {
  roadmap: GenerateRoadmapResponse
  userName: string
  careerGoal: string
}

export function generateRoadmapPdf({ roadmap, userName, careerGoal }: PDFInput): void {
  const doc = new jsPDF('p', 'mm', 'a4')
  let y = MARGIN

  // ── Header ──
  doc.setFillColor(...COLORS.brand)
  doc.rect(0, 0, PAGE_WIDTH, 48, 'F')

  doc.setTextColor(...COLORS.white)
  doc.setFontSize(22)
  doc.setFont(undefined, 'bold')
  doc.text('SkillBridge AI', MARGIN, 24)

  doc.setFontSize(11)
  doc.setFont(undefined, 'normal')
  doc.text('Personalized Career Roadmap', MARGIN, 36)

  y = 62

  // ── User Information ──
  y = addSectionTitle(doc, y, 'User Information')

  doc.setFillColor(249, 250, 251)
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 30, 3, 3, 'F')

  doc.setFontSize(FONT_SIZE)
  doc.setTextColor(...COLORS.text)
  doc.setFont(undefined, 'bold')
  doc.text('Name:', MARGIN + 6, y + 8)
  doc.setFont(undefined, 'normal')
  doc.text(userName || '—', MARGIN + 32, y + 8)

  doc.setFont(undefined, 'bold')
  doc.text('Career Goal:', MARGIN + 6, y + 18)
  doc.setFont(undefined, 'normal')
  doc.text(careerGoal || '—', MARGIN + 32, y + 18)

  doc.setFont(undefined, 'bold')
  doc.text('Date:', MARGIN + 6, y + 28)
  doc.setFont(undefined, 'normal')
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), MARGIN + 32, y + 28)

  y += 40

  // ── Career Summary ──
  y = addSectionDivider(doc, y)
  y = addSectionTitle(doc, y, 'Career Summary')

  doc.setFontSize(FONT_SIZE)
  doc.setTextColor(...COLORS.text)
  const summaryLines = doc.splitTextToSize(roadmap.career_summary || 'No career summary available.', CONTENT_WIDTH)
  y = checkPageBreak(doc, y, summaryLines.length * LINE_HEIGHT + 4)
  doc.text(summaryLines, MARGIN, y)
  y += summaryLines.length * LINE_HEIGHT + 6

  // ── Skill Gap ──
  y = addSectionDivider(doc, y)
  y = addSectionTitle(doc, y, 'Skill Gap')

  if (roadmap.skill_gap && roadmap.skill_gap.length > 0) {
    y = addBulletList(doc, y, roadmap.skill_gap)
    y += 2
  } else {
    doc.setFontSize(FONT_SIZE)
    doc.setTextColor(...COLORS.textMuted)
    doc.text('No skill gap data available.', MARGIN, y)
    y += LINE_HEIGHT + 4
  }

  // ── 6-Month Roadmap ──
  y = addSectionDivider(doc, y)
  y = addSectionTitle(doc, y, '6-Month Career Roadmap')

  if (roadmap.six_month_roadmap) {
    const months = Object.entries(roadmap.six_month_roadmap)
    for (const [month, details] of months) {
      const estimatedHeight = 20 + Object.keys(details).length * (LINE_HEIGHT + 2)
      y = checkPageBreak(doc, y, estimatedHeight)

      // Month header
      doc.setFillColor(...COLORS.brandLight)
      doc.roundedRect(MARGIN, y, CONTENT_WIDTH, 8, 2, 2, 'F')
      doc.setFontSize(10)
      doc.setTextColor(...COLORS.brandDark)
      doc.setFont(undefined, 'bold')
      doc.text(month, MARGIN + 4, y + 5.5)
      y += 14

      // Month details
      doc.setFont(undefined, 'normal')
      doc.setFontSize(FONT_SIZE)
      for (const [field, value] of Object.entries(details)) {
        const label = toTitleCase(field)
        const text = `${label}:  ${value}`
        doc.setTextColor(...COLORS.text)
        const lines = doc.splitTextToSize(text, CONTENT_WIDTH - 4)
        y = checkPageBreak(doc, y, lines.length * LINE_HEIGHT + 1)
        doc.text(lines, MARGIN + 4, y)
        y += lines.length * LINE_HEIGHT + 1
      }
      y += 6
    }
  } else {
    doc.setFontSize(FONT_SIZE)
    doc.setTextColor(...COLORS.textMuted)
    doc.text('No roadmap data available.', MARGIN, y)
    y += LINE_HEIGHT + 4
  }

  // ── Recommended Projects ──
  y = addSectionDivider(doc, y)
  y = addSectionTitle(doc, y, 'Recommended Projects')

  if (roadmap.recommended_projects && roadmap.recommended_projects.length > 0) {
    y = addBulletList(doc, y, roadmap.recommended_projects)
    y += 2
  } else {
    doc.setFontSize(FONT_SIZE)
    doc.setTextColor(...COLORS.textMuted)
    doc.text('No recommended projects available.', MARGIN, y)
    y += LINE_HEIGHT + 4
  }

  // ── Interview Preparation Tips ──
  y = addSectionDivider(doc, y)
  y = addSectionTitle(doc, y, 'Interview Preparation Tips')

  if (roadmap.interview_preparation_tips && roadmap.interview_preparation_tips.length > 0) {
    y = addNumberedList(doc, y, roadmap.interview_preparation_tips)
    y += 2
  } else {
    doc.setFontSize(FONT_SIZE)
    doc.setTextColor(...COLORS.textMuted)
    doc.text('No interview tips available.', MARGIN, y)
    y += LINE_HEIGHT + 4
  }

  // ── Footer ──
  y = PAGE_HEIGHT - 14
  doc.setDrawColor(...COLORS.border)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 6
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.textMuted)
  doc.text('Generated by SkillBridge AI', MARGIN, y)

  // ── Save ──
  const sanitizedName = (userName || 'User').replace(/[^a-zA-Z0-9_-]/g, '_')
  doc.save(`SkillBridgeAI_Roadmap_${sanitizedName}.pdf`)
}
