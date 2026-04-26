'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileDown, Mail, MapPin, GraduationCap } from 'lucide-react'

export function Profile() {
  const [nameText, setNameText] = useState('')
  const [bioText, setBioText] = useState('')
  const [showBio, setShowBio] = useState(false)

  const name = 'SUJAY TULADHAR'
  const bio = 'Computer Science & Data Science student at Augustana College with hands-on experience in full-stack development, AI/ML workflows, and building responsive web applications. Passionate about creating innovative solutions and learning new technologies.'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < name.length) {
        setNameText(name.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setShowBio(true)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!showBio) return
    let index = 0
    const interval = setInterval(() => {
      if (index < bio.length) {
        setBioText(bio.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 15)
    return () => clearInterval(interval)
  }, [showBio])

  return (
    <div className="flex h-full flex-col gap-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/30 pb-4">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent">
          &gt; PLAYER_PROFILE
        </span>
        <div className="flex-1 border-t border-dashed border-hud-accent/30" />
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
          ID: 001
        </span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Player Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative shrink-0"
        >
          <div className="pixel-border-accent relative h-48 w-48 overflow-hidden bg-hud-bg-secondary lg:h-56 lg:w-56">
            {/* Avatar placeholder with scan effect */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-hud-accent/20 to-hud-bg-secondary">
              <span className="font-[family-name:var(--font-pixel)] text-4xl text-hud-accent">
                ST
              </span>
            </div>
            {/* Scan line effect */}
            <motion.div
              className="absolute inset-x-0 h-1 bg-gradient-to-b from-hud-accent/50 to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          {/* Status indicator */}
          <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-hud-bg px-2 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
            <span className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-accent">
              ONLINE
            </span>
          </div>
        </motion.div>

        {/* Player Info */}
        <div className="flex-1 space-y-6">
          {/* Name with typewriter */}
          <div>
            <div className="font-[family-name:var(--font-pixel)] text-xs text-hud-text-dim">
              CODENAME:
            </div>
            <h1 className="font-[family-name:var(--font-pixel)] text-2xl text-hud-accent neon-glow lg:text-3xl">
              {nameText}
              {nameText.length < name.length && <span className="animate-pulse">█</span>}
            </h1>
          </div>

          {/* Title */}
          <div>
            <div className="font-[family-name:var(--font-pixel)] text-xs text-hud-text-dim">
              CLASS:
            </div>
            <div className="font-[family-name:var(--font-terminal)] text-xl text-hud-text">
              Full-Stack Developer & AI Enthusiast
            </div>
          </div>

          {/* Location & Education */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-hud-text-dim">
              <MapPin size={14} className="text-hud-accent" />
              <span className="font-[family-name:var(--font-terminal)] text-sm">Rock Island, IL</span>
            </div>
            <div className="flex items-center gap-2 text-hud-text-dim">
              <GraduationCap size={14} className="text-hud-accent" />
              <span className="font-[family-name:var(--font-terminal)] text-sm">Augustana College &apos;27</span>
            </div>
          </div>

          {/* Bio with typewriter */}
          <div className="pixel-border bg-hud-bg-secondary/50 p-4">
            <div className="mb-2 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
              BIO_DATA:
            </div>
            <p className="min-h-[80px] font-[family-name:var(--font-terminal)] text-lg leading-relaxed text-hud-text">
              {bioText}
              {showBio && bioText.length < bio.length && (
                <span className="animate-pulse text-hud-accent">█</span>
              )}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'DEGREE', value: 'CS/DS' },
              { label: 'EXP', value: '3+YRS' },
              { label: 'STATUS', value: 'ACTIVE' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pixel-border bg-hud-bg-secondary/50 p-3 text-center"
              >
                <div className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
                  {stat.label}
                </div>
                <div className="font-[family-name:var(--font-terminal)] text-xl text-hud-accent">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-wrap gap-3 border-t border-hud-accent/30 pt-6">
        {[
          { icon: <Github size={18} />, label: 'GITHUB', href: 'https://github.com/Zuri-1' },
          { icon: <Linkedin size={18} />, label: 'LINKEDIN', href: 'https://www.linkedin.com/in/sujay-tuladhar-1557793' },
          { icon: <Mail size={18} />, label: 'CONTACT', href: 'mailto:sujaytuladhar23@augustana.edu' },
          { icon: <FileDown size={18} />, label: 'RESUME', href: '#' },
        ].map((action) => (
          <motion.a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="focus-hud flex items-center gap-2 border border-hud-accent/50 bg-hud-bg-secondary px-4 py-2 font-[family-name:var(--font-terminal)] text-sm text-hud-accent transition-all hover:border-hud-accent hover:bg-hud-accent/10 hover:shadow-[0_0_10px_rgba(0,255,65,0.3)]"
          >
            {action.icon}
            {action.label}
          </motion.a>
        ))}
      </div>
    </div>
  )
}
