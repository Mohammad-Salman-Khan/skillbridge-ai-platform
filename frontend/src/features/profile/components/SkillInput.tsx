import { useState, useRef, KeyboardEvent } from "react"
import { AnimatePresence } from "framer-motion"
import Chip from "@/components/ui/Chip"

const SUGGESTED_SKILLS = [
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Java",
  "C++",
  "SQL",
  "HTML/CSS",
  "TypeScript",
  "Git",
  "Docker",
  "AWS",
]

interface SkillInputProps {
  skills: string[]
  onAdd: (skill: string) => void
  onRemove: (skill: string) => void
  error?: string
}

export default function SkillInput({ skills, onAdd, onRemove, error }: SkillInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addSkill()
    }
  }

  function addSkill() {
    const trimmed = inputValue.trim()
    if (trimmed && !skills.includes(trimmed) && skills.length < 15) {
      onAdd(trimmed)
    }
    setInputValue("")
  }

  function handleSuggestionClick(skill: string) {
    if (!skills.includes(skill) && skills.length < 15) {
      onAdd(skill)
    }
    inputRef.current?.focus()
  }

  const visibleSuggestions = SUGGESTED_SKILLS.filter(
    (s) => !skills.includes(s)
  ).slice(0, 6)

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
      <div
        className={`flex min-h-[44px] flex-wrap gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-offset-0 ${
          error
            ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-200"
            : "border-gray-300 focus-within:border-brand-500 focus-within:ring-brand-200 dark:border-gray-600 dark:bg-gray-800 dark:focus-within:border-brand-400 dark:focus-within:ring-brand-700"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => (
            <Chip key={skill} label={skill} onRemove={() => onRemove(skill)} variant="brand" />
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (inputValue.trim()) addSkill() }}
          placeholder={skills.length === 0 ? "Type a skill and press Enter" : "Add more..."}
          className="min-w-[120px] flex-1 border-0 bg-transparent py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {visibleSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Suggestions:</span>
          {visibleSuggestions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleSuggestionClick(skill)}
              className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            >
              + {skill}
            </button>
          ))}
        </div>
      )}

      {skills.length >= 15 && (
        <p className="text-xs text-amber-600 dark:text-amber-400">Maximum 15 skills reached</p>
      )}

      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
}
