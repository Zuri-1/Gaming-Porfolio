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
  profile: 'PLAYER_PROFILE',
  projects: 'MISSION_LOG',
  skills: 'WEAPON_LOADOUT',
  experience: 'COMBAT_HISTORY',
  activities: 'SIDE_QUESTS',
  stats: 'PLAYER_STATS',
}

export function MainDisplay({ activeSection }: MainDisplayProps) {
  const ActiveComponent = sectionComponents[activeSection]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Display Header */}
      <div className="flex items-center justify-between border-b border-hud-accent/30 bg-hud-bg-secondary/30 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-full bg-hud-danger" />
            <div className="h-3 w-3 rounded-full bg-hud-warning" />
            <div className="h-3 w-3 rounded-full bg-hud-accent" />
          </div>
          <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
            {sectionTitles[activeSection]}.exe
          </span>
        </div>
        <div className="flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
          <span className="hidden sm:inline">SYSTEM_STATUS:</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
            ONLINE
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-auto"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Display Footer */}
      <div className="flex items-center justify-between border-t border-hud-accent/30 bg-hud-bg-secondary/30 px-4 py-2">
        <div className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
          <span className="text-hud-accent">↑↓</span> NAVIGATE{' '}
          <span className="text-hud-accent">ENTER</span> SELECT{' '}
          <span className="text-hud-accent">ESC</span> BACK
        </div>
        <div className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-accent/50">
          v1.0.0
        </div>
      </div>
    </div>
  )
}
