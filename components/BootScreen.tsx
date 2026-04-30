'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootScreenProps {
  onComplete: () => void
}

const bootMessages = [
  'Initializing system...',
  'Loading portfolio modules...',
  'Establishing connection...',
  'Authentication verified',
  'Welcome, Commander',
]

export function BootScreen({ onComplete }: BootScreenProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isBooting, setIsBooting] = useState(true)

  const typeText = useCallback((text: string, onDone: () => void) => {
    let index = 0
    setDisplayedText('')
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        onDone()
      }
    }, 25)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const cleanup = typeText(bootMessages[currentLine], () => {
        setTimeout(() => {
          if (currentLine < bootMessages.length - 1) {
            setCurrentLine(prev => prev + 1)
          } else {
            setTimeout(() => {
              setIsBooting(false)
              setTimeout(onComplete, 400)
            }, 600)
          }
        }, 300)
      })
      return cleanup
    }
  }, [currentLine, typeText, onComplete])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-hud-bg"
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-hud-bg via-hud-bg to-hud-bg-secondary" />
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-hud-accent/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-hud-blue/5 blur-3xl" />
          
          <div className="relative w-full max-w-xl px-8">
            {/* Terminal Window */}
            <div className="modern-card overflow-hidden rounded-lg">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 border-b border-hud-border bg-hud-bg-secondary/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-hud-danger/80" />
                <div className="h-3 w-3 rounded-full bg-hud-warning/80" />
                <div className="h-3 w-3 rounded-full bg-hud-accent/80" />
                <span className="ml-3 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                  portfolio_init.sh
                </span>
              </div>

              {/* Terminal Content */}
              <div className="space-y-3 p-6 font-[family-name:var(--font-terminal)] text-base">
                {bootMessages.slice(0, currentLine).map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-hud-accent">$</span>
                    <span className={
                      msg === 'Welcome, Commander' 
                        ? 'text-hud-accent glow-text' 
                        : 'text-hud-text-dim'
                    }>{msg}</span>
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-xs text-hud-accent/60"
                    >
                      done
                    </motion.span>
                  </motion.div>
                ))}
                
                {/* Current typing line */}
                {currentLine < bootMessages.length && (
                  <div className="flex items-center gap-3">
                    <span className="text-hud-accent">$</span>
                    <span className={
                      bootMessages[currentLine] === 'Welcome, Commander' 
                        ? 'text-hud-accent glow-text' 
                        : 'text-hud-text'
                    }>
                      {displayedText}
                      {showCursor && <span className="ml-0.5 text-hud-accent">|</span>}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-1 w-full overflow-hidden rounded-full bg-hud-border">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-hud-accent via-hud-blue to-hud-accent"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentLine + 1) / bootMessages.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="mt-2 flex justify-between font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                <span>Loading</span>
                <span>{Math.round(((currentLine + 1) / bootMessages.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
