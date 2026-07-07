'use client'

import { motion } from 'framer-motion'

export type Section = 'profile' | 'projects' | 'skills' | 'experience' | 'activities' | 'stats'

interface NavbarHUDProps {
  activeSection: Section
  highlightedSection?: Section
  onSectionChange: (section: Section) => void
  isMobile?: boolean
}

const menuItems: { id: Section; label: string; code: string }[] = [
  { id: 'profile',    label: 'Profile',    code: '01' },
  { id: 'projects',   label: 'Projects',   code: '02' },
  { id: 'skills',     label: 'Skills',     code: '03' },
  { id: 'experience', label: 'Experience', code: '04' },
  { id: 'activities', label: 'Activities', code: '05' },
  { id: 'stats',      label: 'Stats',      code: '06' },
]

export function NavbarHUD({
  activeSection,
  highlightedSection,
  onSectionChange,
  isMobile = false,
}: NavbarHUDProps) {
  if (isMobile) {
    return (
      <nav className="flex flex-row gap-1 px-2 py-2" role="navigation" aria-label="Main navigation">
        <ul className="flex flex-row gap-1" role="menu">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <li key={item.id} role="none">
                <button
                  role="menuitem"
                  onClick={() => onSectionChange(item.id)}
                  className={`hud-nav-btn px-3 py-2 text-[11px] whitespace-nowrap ${
                    isActive ? 'hud-nav-active' : highlightedSection === item.id ? 'hud-nav-highlighted' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label.toUpperCase()}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  return (
    <nav
      className="flex h-full w-64 flex-col bg-black font-[family-name:var(--font-terminal)]"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/15 px-4 py-3">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-accent" />
        <span className="text-xs tracking-widest text-hud-accent">NAV SYSTEM</span>
        <span className="ml-auto text-[10px] text-hud-text-dim/50">v2.0</span>
      </div>

      {/* Nav items */}
      <ul className="flex flex-1 flex-col gap-0 p-3" role="menu">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id
          const isHighlighted = highlightedSection === item.id
          return (
            <motion.li
              key={item.id}
              role="none"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
            >
              <button
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSectionChange(item.id)}
                className={`hud-nav-btn ${
                  isActive
                    ? 'hud-nav-active'
                    : isHighlighted
                    ? 'hud-nav-highlighted'
                    : ''
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-[10px] text-hud-text-dim/40">{item.code}</span>
                <span className="flex-1 tracking-widest">{item.label.toUpperCase()}</span>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-hud-accent"
                  >
                    ▶
                  </motion.span>
                )}
              </button>
            </motion.li>
          )
        })}
      </ul>

      {/* Panel footer info */}
      <div className="space-y-1.5 border-t border-hud-accent/15 px-4 py-4 text-xs text-hud-text-dim">
        <div className="flex items-center gap-2">
          <span className="text-hud-accent/50">◈</span>
          <span>CS &amp; DS MAJOR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-hud-accent/50">◈</span>
          <span>AUGUSTANA COLLEGE</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-accent" />
          <span className="tracking-widest text-hud-accent">AVAILABLE</span>
        </div>
      </div>
    </nav>
  )
}
