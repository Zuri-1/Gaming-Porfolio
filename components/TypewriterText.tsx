'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
  showCursor?: boolean
}

export function TypewriterText({ 
  text, 
  delay = 50, 
  className = '', 
  onComplete,
  showCursor = true 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && <span className="typewriter-cursor" />}
    </span>
  )
}
