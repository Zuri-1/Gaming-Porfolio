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
  profile:    Profile,
  projects:   Projects,
  skills:     Skills,
  experience: Experience,
  activities: Activities,
  stats:      Stats,
}

const sectionTitles: Record<Section, string> = {
  profile:    'OPERATOR PROFILE',
  projects:   'PROJECT LOG',
  skills:     'TECH ARSENAL',
  experience: 'FIELD RECORD',
  activities: 'MISSION LOG',
  stats:      'SYSTEM METRICS',
}

export function MainDisplay({ activeSection }: MainDisplayProps) {
  const ActiveComponent = sectionComponents[activeSection]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Display header */}
      <div className="flex items-center justify-between border-b border-hud-accent/15 bg-black/60 px-4 py-2.5 backdrop-blur-sm lg:px-6">
        <div className="flex items-center gap-3 font-[family-name:var(--font-terminal)]">
          <span className="text-[10px] text-hud-text-dim/50">FILE:</span>
          <span className="text-sm font-semibold tracking-widest text-hud-text">
            {sectionTitles[activeSection]}
          </span>
        </div>
        <div className="flex items-center gap-2 font-[family-name:var(--font-terminal)] text-xs">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-accent" />
          <span className="tracking-wider text-hud-accent/80">ONLINE</span>
        </div>
      </div>

      {/* Content area with glitch-blur transitions */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-0 overflow-auto"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Display footer */}
      <div className="flex items-center justify-between border-t border-hud-accent/15 bg-black/60 px-4 py-1.5 backdrop-blur-sm">
        <div className="font-[family-name:var(--font-terminal)] text-[11px] text-hud-text-dim">
          <span className="text-hud-accent">ARROW KEYS</span>
          <span className="mx-2 text-hud-border">│</span>
          <span className="text-hud-accent">ENTER</span>
          <span className="ml-1.5">TO SELECT</span>
        </div>
        <div className="font-[family-name:var(--font-terminal)] text-[11px] tracking-widest text-hud-text-dim/40">
          SUJAY TULADHAR
        </div>
      </div>
    </div>
  )
}
