'use client'

import { motion } from 'framer-motion'
import { User, FolderGit2, Wrench, Briefcase, Trophy, BarChart3 } from 'lucide-react'

export type Section = 'profile' | 'projects' | 'skills' | 'experience' | 'activities' | 'stats'

interface NavbarHUDProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  isMobile?: boolean
}

const menuItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'PROFILE', icon: <User size={18} /> },
  { id: 'projects', label: 'PROJECTS', icon: <FolderGit2 size={18} /> },
  { id: 'skills', label: 'SKILLS', icon: <Wrench size={18} /> },
  { id: 'experience', label: 'EXPERIENCE', icon: <Briefcase size={18} /> },
  { id: 'activities', label: 'ACTIVITIES', icon: <Trophy size={18} /> },
  { id: 'stats', label: 'STATS', icon: <BarChart3 size={18} /> },
]

export function NavbarHUD({ activeSection, onSectionChange, isMobile = false }: NavbarHUDProps) {
  return (
    <nav
      className={`${
        isMobile
          ? 'flex w-full flex-row gap-1 overflow-x-auto p-2'
          : 'flex h-full w-64 flex-col border-l-2 border-hud-accent/30 bg-hud-bg-secondary/50 p-4'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header - Desktop only */}
      {!isMobile && (
        <div className="mb-6 border-b border-hud-accent/30 pb-4">
          <div className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
            NAVIGATION_HUD
          </div>
          <div className="mt-2 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
            Use ↑↓ or WASD to navigate
            <br />
            Press ENTER to select
          </div>
        </div>
      )}

      {/* Menu Items */}
      <ul className={`${isMobile ? 'flex flex-row gap-1' : 'flex flex-col gap-2'}`} role="menu">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id
          return (
            <li key={item.id} role="none">
              <button
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSectionChange(item.id)}
                className={`
                  focus-hud relative flex w-full items-center gap-3 transition-all duration-200
                  ${isMobile 
                    ? 'flex-col px-3 py-2 text-[10px]' 
                    : 'px-4 py-3 font-[family-name:var(--font-terminal)] text-lg'
                  }
                  ${isActive
                    ? 'bg-hud-accent/10 text-hud-accent'
                    : 'text-hud-text-dim hover:bg-hud-accent/5 hover:text-hud-text'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Selection indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bg-hud-accent ${
                      isMobile ? 'bottom-0 left-0 h-0.5 w-full' : 'left-0 top-0 h-full w-1'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Glow effect for active item */}
                {isActive && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-hud-accent/5"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0, 255, 65, 0.1)',
                    }}
                  />
                )}

                {/* Icon */}
                <span className={`relative z-10 ${isActive ? 'text-hud-accent' : ''}`}>
                  {item.icon}
                </span>

                {/* Label */}
                <span className={`relative z-10 ${isMobile ? 'font-[family-name:var(--font-pixel)]' : ''}`}>
                  {isMobile ? item.label.slice(0, 4) : item.label}
                </span>

                {/* Index number - Desktop only */}
                {!isMobile && (
                  <span className="ml-auto font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
                    [{index + 1}]
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Footer - Desktop only */}
      {!isMobile && (
        <div className="mt-auto border-t border-hud-accent/30 pt-4">
          <div className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
              SYSTEM ONLINE
            </div>
            <div className="mt-2 text-hud-accent/50">
              v1.0.0 // DEV_MODE
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
