'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootScreenProps {
  onComplete: () => void
}

const bootMessages = [
  'INITIALIZING SYSTEM...',
  'LOADING PORTFOLIO MODULE...',
  'CALIBRATING HUD INTERFACE...',
  'AUTHENTICATION SUCCESSFUL...',
  'ACCESS GRANTED',
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
    }, 30)

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
              setTimeout(onComplete, 500)
            }, 800)
          }
        }, 400)
      })
      return cleanup
    }
  }, [currentLine, typeText, onComplete])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-hud-bg"
        >
          <div className="w-full max-w-2xl px-8">
            {/* Terminal Header */}
            <div className="mb-4 flex items-center gap-2 border-b border-hud-accent/30 pb-2">
              <div className="h-3 w-3 rounded-full bg-hud-danger" />
              <div className="h-3 w-3 rounded-full bg-hud-warning" />
              <div className="h-3 w-3 rounded-full bg-hud-accent" />
              <span className="ml-4 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
                SYSTEM_BOOT.exe
              </span>
            </div>

            {/* Boot Messages */}
            <div className="space-y-2 font-[family-name:var(--font-terminal)] text-xl">
              {bootMessages.slice(0, currentLine).map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 ${
                    msg === 'ACCESS GRANTED' ? 'text-hud-accent neon-glow' : 'text-hud-text-dim'
                  }`}
                >
                  <span className="text-hud-accent">&gt;</span>
                  <span>{msg}</span>
                  <span className="text-hud-accent">[OK]</span>
                </motion.div>
              ))}
              
              {/* Current typing line */}
              {currentLine < bootMessages.length && (
                <div className={`flex items-center gap-2 ${
                  bootMessages[currentLine] === 'ACCESS GRANTED' 
                    ? 'text-hud-accent neon-glow' 
                    : 'text-hud-text'
                }`}>
                  <span className="text-hud-accent">&gt;</span>
                  <span>{displayedText}</span>
                  {showCursor && <span className="text-hud-accent">█</span>}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="h-2 w-full overflow-hidden border border-hud-accent/30 bg-hud-bg-secondary">
                <motion.div
                  className="h-full bg-hud-accent"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentLine + 1) / bootMessages.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-2 flex justify-between font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
                <span>LOADING</span>
                <span>{Math.round(((currentLine + 1) / bootMessages.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
