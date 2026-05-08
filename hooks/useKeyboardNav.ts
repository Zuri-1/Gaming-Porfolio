'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Section } from '@/components/NavbarHUD'

const sections: Section[] = ['profile', 'projects', 'skills', 'experience', 'activities', 'stats']

interface UseKeyboardNavProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  enabled?: boolean
}

export function useKeyboardNav({ activeSection, onSectionChange, enabled = true }: UseKeyboardNavProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(() => sections.indexOf(activeSection))

  // Latest-ref: keep a ref in sync so the stable event handler can read current values
  const stateRef = useRef({ highlightedIndex, onSectionChange, enabled })
  stateRef.current = { highlightedIndex, onSectionChange, enabled }

  // Sync cursor when active section changes from outside (click, number key)
  useEffect(() => {
    setHighlightedIndex(sections.indexOf(activeSection))
  }, [activeSection])

  // Empty deps — handler is created once; reads live values via stateRef
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { enabled, onSectionChange, highlightedIndex } = stateRef.current
    if (!enabled) return

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault()
        setHighlightedIndex(prev => Math.max(0, prev - 1))
        break

      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault()
        setHighlightedIndex(prev => Math.min(sections.length - 1, prev + 1))
        break

      case 'Enter':
        event.preventDefault()
        onSectionChange(sections[highlightedIndex])
        break

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6': {
        event.preventDefault()
        const numIndex = parseInt(event.key) - 1
        if (numIndex >= 0 && numIndex < sections.length) {
          onSectionChange(sections[numIndex])
        }
        break
      }

      default:
        break
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { sections, highlightedSection: sections[highlightedIndex] }
}
