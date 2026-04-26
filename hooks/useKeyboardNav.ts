'use client'

import { useCallback, useEffect } from 'react'
import type { Section } from '@/components/NavbarHUD'

const sections: Section[] = ['profile', 'projects', 'skills', 'experience', 'activities', 'stats']

interface UseKeyboardNavProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  enabled?: boolean
}

export function useKeyboardNav({ activeSection, onSectionChange, enabled = true }: UseKeyboardNavProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const currentIndex = sections.indexOf(activeSection)

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault()
          if (currentIndex > 0) {
            onSectionChange(sections[currentIndex - 1])
          }
          break

        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault()
          if (currentIndex < sections.length - 1) {
            onSectionChange(sections[currentIndex + 1])
          }
          break

        case 'Enter':
          event.preventDefault()
          // Already on the section, could trigger an action
          break

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          event.preventDefault()
          const numIndex = parseInt(event.key) - 1
          if (numIndex >= 0 && numIndex < sections.length) {
            onSectionChange(sections[numIndex])
          }
          break

        default:
          break
      }
    },
    [activeSection, onSectionChange, enabled]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { sections }
}
