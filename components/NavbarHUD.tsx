'use client'

import { motion } from 'framer-motion'

export type Section = 'profile' | 'projects' | 'skills' | 'experience' | 'activities' | 'stats'

interface NavbarHUDProps {
  activeSection: Section
  highlightedSection?: Section
  onSectionChange: (section: Section) => void
  isMobile?: boolean
}

const menuItems: { id: Section; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'activities', label: 'Activities' },
  { id: 'stats', label: 'Stats' },
]

export function NavbarHUD({ activeSection, highlightedSection, onSectionChange, isMobile = false }: NavbarHUDProps) {
  return (
    <nav
      className={`${
        isMobile
          ? 'flex w-full flex-row gap-2 overflow-x-auto p-3 bg-black'
          : 'flex h-full w-80 flex-col items-center justify-center bg-black'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Menu Items */}
      <ul className={`${isMobile ? 'flex flex-row gap-2' : 'flex flex-col gap-4 w-full px-6'}`} role="menu">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id
          return (
            <motion.li 
              key={item.id} 
              role="none"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <button
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSectionChange(item.id)}
                className={`
                  game-menu-btn w-full font-[family-name:var(--font-terminal)]
                  ${isMobile ? 'text-xs px-4 py-2' : ''}
                  ${isActive ? 'active' : highlightedSection === item.id ? 'highlighted' : ''}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            </motion.li>
          )
        })}
      </ul>

      {/* Keyboard hint - Desktop only */}
      {!isMobile && (
        <motion.div 
          className="mt-10 text-center font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-hud-accent/70">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
            <span>Use Arrow Keys / WASD</span>
          </div>
          <div className="mt-1 text-hud-text-dim/50">
            Press Enter to select
          </div>
        </motion.div>
      )}
    </nav>
  )
}
