'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Section } from './NavbarHUD'
import { Profile } from './sections/Profile'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Experience } from './sections/Experience'
import { Activities } from './sections/Activities'
import { Stats } from './sections/Stats'

interface MainDisplayProps {
  activeSection: Section
}

const sectionComponents: Record<Section, React.ComponentType> = {
  profile: Profile,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  activities: Activities,
  stats: Stats,
}

const sectionTitles: Record<Section, string> = {
  profile: 'Profile',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  activities: 'Activities',
  stats: 'Stats',
}

export function MainDisplay({ activeSection }: MainDisplayProps) {
  const ActiveComponent = sectionComponents[activeSection]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Display Header */}
      <div className="flex items-center justify-between border-b border-hud-border bg-hud-bg-secondary/30 px-4 py-3 backdrop-blur-sm lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-hud-danger/80" />
            <div className="h-3 w-3 rounded-full bg-hud-warning/80" />
            <div className="h-3 w-3 rounded-full bg-hud-accent/80" />
          </div>
          <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text">
            {sectionTitles[activeSection]}
          </span>
        </div>
        <div className="flex items-center gap-2 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
            Online
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 overflow-auto"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Display Footer */}
      <div className="flex items-center justify-between border-t border-hud-border bg-hud-bg-secondary/30 px-4 py-2 backdrop-blur-sm">
        <div className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          <span className="text-hud-accent">Arrow keys</span> navigate
          <span className="mx-2 text-hud-border">|</span>
          <span className="text-hud-accent">Enter</span> select
        </div>
        <div className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim/50">
          Sujay Tuladhar
        </div>
      </div>
    </div>
  )
}
