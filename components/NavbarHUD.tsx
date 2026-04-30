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
  { id: 'profile', label: 'Profile', icon: <User size={18} /> },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
  { id: 'skills', label: 'Skills', icon: <Wrench size={18} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
  { id: 'activities', label: 'Activities', icon: <Trophy size={18} /> },
  { id: 'stats', label: 'Stats', icon: <BarChart3 size={18} /> },
]

export function NavbarHUD({ activeSection, onSectionChange, isMobile = false }: NavbarHUDProps) {
  return (
    <nav
      className={`${
        isMobile
          ? 'flex w-full flex-row gap-1 overflow-x-auto p-2'
          : 'flex h-full w-72 flex-col border-l border-hud-border bg-hud-bg-secondary/30 backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header - Desktop only */}
      {!isMobile && (
        <div className="border-b border-hud-border p-5">
          <div className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
            Navigation
          </div>
          <div className="mt-2 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
            Use arrow keys or WASD to navigate
          </div>
        </div>
      )}

      {/* Menu Items */}
      <ul className={`${isMobile ? 'flex flex-row gap-1' : 'flex flex-1 flex-col gap-1 p-3'}`} role="menu">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id
          return (
            <li key={item.id} role="none">
              <button
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSectionChange(item.id)}
                className={`
                  focus-ring relative flex w-full items-center gap-3 rounded-lg transition-all duration-200
                  ${isMobile 
                    ? 'flex-col px-3 py-2 text-[10px]' 
                    : 'px-4 py-3 font-[family-name:var(--font-terminal)] text-base'
                  }
                  ${isActive
                    ? 'bg-hud-accent/10 text-hud-accent'
                    : 'text-hud-text-dim hover:bg-hud-border/50 hover:text-hud-text'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Selection indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bg-hud-accent ${
                      isMobile ? 'bottom-0 left-2 right-2 h-0.5 rounded-full' : 'left-0 top-2 bottom-2 w-0.5 rounded-full'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <span className={`relative z-10 ${isActive ? 'text-hud-accent' : ''}`}>
                  {item.icon}
                </span>

                {/* Label */}
                <span className="relative z-10">
                  {isMobile ? item.label.slice(0, 4) : item.label}
                </span>

                {/* Keyboard shortcut - Desktop only */}
                {!isMobile && (
                  <span className="ml-auto rounded bg-hud-border/50 px-2 py-0.5 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                    {index + 1}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Footer - Desktop only */}
      {!isMobile && (
        <div className="border-t border-hud-border p-5">
          <div className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-hud-accent" />
              <span>Online</span>
            </div>
            <div className="mt-2 text-hud-text-dim/50">
              Press Enter to select
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
