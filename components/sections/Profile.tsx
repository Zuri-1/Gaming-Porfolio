'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileDown, Mail, MapPin, GraduationCap } from 'lucide-react'

export function Profile() {
  const [nameText, setNameText] = useState('')
  const [bioText, setBioText] = useState('')
  const [showBio, setShowBio] = useState(false)

  const name = 'Sujay Tuladhar'
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
    }, 60)
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
    }, 12)
    return () => clearInterval(interval)
  }, [showBio])

  return (
    <div className="flex h-full flex-col gap-6 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-hud-border pb-4">
        <span className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
          About Me
        </span>
        <div className="flex-1 border-t border-hud-border" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative shrink-0"
        >
          <div className="modern-card-accent relative h-48 w-48 overflow-hidden rounded-xl lg:h-56 lg:w-56">
            {/* Avatar placeholder */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-hud-accent/10 to-hud-bg-secondary">
              <span className="font-[family-name:var(--font-terminal)] text-5xl font-light text-hud-accent">
                ST
              </span>
            </div>
          </div>
          {/* Status indicator */}
          <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full bg-hud-bg-secondary border border-hud-border px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
            <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-accent">
              Available
            </span>
          </div>
        </motion.div>

        {/* Player Info */}
        <div className="flex-1 space-y-5">
          {/* Name with typewriter */}
          <div>
            <h1 className="font-[family-name:var(--font-terminal)] text-3xl font-medium text-hud-text lg:text-4xl">
              {nameText}
              {nameText.length < name.length && <span className="text-hud-accent animate-pulse">|</span>}
            </h1>
            <div className="mt-1 font-[family-name:var(--font-terminal)] text-lg text-hud-accent">
              Full-Stack Developer & AI Enthusiast
            </div>
          </div>

          {/* Location & Education */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-hud-text-dim">
              <MapPin size={16} className="text-hud-accent" />
              <span className="font-[family-name:var(--font-terminal)] text-sm">Rock Island, IL</span>
            </div>
            <div className="flex items-center gap-2 text-hud-text-dim">
              <GraduationCap size={16} className="text-hud-accent" />
              <span className="font-[family-name:var(--font-terminal)] text-sm">Augustana College &apos;27</span>
            </div>
          </div>

          {/* Bio with typewriter */}
          <div className="modern-card rounded-lg p-5">
            <p className="min-h-[80px] font-[family-name:var(--font-terminal)] text-base leading-relaxed text-hud-text-dim">
              {bioText}
              {showBio && bioText.length < bio.length && (
                <span className="text-hud-accent animate-pulse">|</span>
              )}
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Degree', value: 'CS/DS' },
              { label: 'Experience', value: '3+ Years' },
              { label: 'Status', value: 'Active' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="modern-card rounded-lg p-4 text-center"
              >
                <div className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                  {stat.label}
                </div>
                <div className="mt-1 font-[family-name:var(--font-terminal)] text-lg text-hud-accent">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-wrap gap-3 border-t border-hud-border pt-6">
        {[
          { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/Zuri-1' },
          { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sujay-tuladhar-1557793' },
          { icon: <Mail size={18} />, label: 'Contact', href: 'mailto:sujaytuladhar23@augustana.edu' },
          { icon: <FileDown size={18} />, label: 'Resume', href: '#' },
        ].map((action) => (
          <motion.a
            key={action.label}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="focus-ring btn-glow flex items-center gap-2 rounded-lg border border-hud-border bg-hud-bg-secondary px-4 py-2.5 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim transition-colors hover:text-hud-accent"
          >
            {action.icon}
            {action.label}
          </motion.a>
        ))}
      </div>
    </div>
  )
}
