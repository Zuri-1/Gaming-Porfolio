'use client'

import { useState, useEffect } from 'react'
import { BootScreen } from '@/components/BootScreen'
import { NavbarHUD, Section } from '@/components/NavbarHUD'
import { MainDisplay } from '@/components/MainDisplay'
import { useKeyboardNav } from '@/hooks/useKeyboardNav'
import { Menu, X } from 'lucide-react'

export default function Home() {
  const [isBooting, setIsBooting] = useState(true)
  const [activeSection, setActiveSection] = useState<Section>('profile')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  const { highlightedSection } = useKeyboardNav({
    activeSection,
    onSectionChange: setActiveSection,
    enabled: !isBooting,
  })

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeSection])

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-black">
      {/* Ambient grid background */}
      <div className="hud-grid-bg pointer-events-none absolute inset-0" />

      {/* Scanlines */}
      <div className="scanlines-overlay pointer-events-none absolute inset-0 z-50" />

      {/* Vignette */}
      <div className="vignette-overlay pointer-events-none absolute inset-0 z-40" />

      {/* ── TOP HUD BAR ── */}
      <header className="hud-bar-border-bottom relative z-30 flex items-center justify-between bg-black/85 px-4 py-2 backdrop-blur-sm lg:px-6">
        <div className="flex items-center gap-4 font-[family-name:var(--font-terminal)]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-hud-accent/50">◈</span>
            <span className="text-xs text-hud-text-dim">OPERATOR:</span>
            <span className="text-sm font-bold tracking-widest text-hud-accent">
              SUJAY TULADHAR
            </span>
          </div>
          <span className="hidden text-hud-border lg:block">│</span>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-xs text-hud-text-dim">MODULE:</span>
            <span className="text-sm uppercase tracking-widest text-hud-text">
              {activeSection}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-[family-name:var(--font-terminal)]">
          <div className="hidden items-center gap-1.5 text-xs lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="tracking-wider text-green-400">SYS NOMINAL</span>
          </div>
          <span className="hidden text-xs text-hud-border lg:block">│</span>
          <span className="font-mono text-xs tracking-widest text-hud-text-dim">{time}</span>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus-ring rounded p-1.5 text-hud-text-dim hover:text-hud-accent lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-11 w-72 border-l border-hud-accent/20 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <NavbarHUD
              activeSection={activeSection}
              highlightedSection={highlightedSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>
      )}

      {/* ── MAIN AREA ── */}
      <div className="relative z-20 flex min-h-0 flex-1 overflow-hidden">
        {/* Viewport with corner brackets */}
        <main className="relative flex-1 overflow-hidden">
          <div className="hud-corner-tl pointer-events-none absolute left-3 top-3 z-10 h-5 w-5" />
          <div className="hud-corner-tr pointer-events-none absolute right-3 top-3 z-10 h-5 w-5 lg:right-3" />
          <div className="hud-corner-bl pointer-events-none absolute bottom-3 left-3 z-10 h-5 w-5" />
          <div className="hud-corner-br pointer-events-none absolute bottom-3 right-3 z-10 h-5 w-5 lg:right-3" />

          <div className="h-full">
            <MainDisplay activeSection={activeSection} />
          </div>
        </main>

        {/* Desktop nav panel */}
        <aside className="hidden border-l border-hud-accent/15 lg:flex">
          <NavbarHUD
            activeSection={activeSection}
            highlightedSection={highlightedSection}
            onSectionChange={setActiveSection}
          />
        </aside>
      </div>

      {/* Mobile bottom nav strip */}
      <div className="hud-bar-border-top relative z-30 overflow-x-auto bg-black lg:hidden">
        <NavbarHUD
          activeSection={activeSection}
          highlightedSection={highlightedSection}
          onSectionChange={setActiveSection}
          isMobile
        />
      </div>

      {/* ── BOTTOM HUD BAR ── */}
      <footer className="hud-bar-border-top relative z-30 hidden bg-black/85 px-4 py-1.5 backdrop-blur-sm lg:flex lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-3 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          <span>
            <span className="text-hud-accent">↑↓</span> /{' '}
            <span className="text-hud-accent">WASD</span> NAVIGATE
          </span>
          <span className="text-hud-border">│</span>
          <span>
            <span className="text-hud-accent">ENTER</span> SELECT
          </span>
        </div>
        <div className="flex items-center gap-3 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-accent" />
            <span className="tracking-wider text-hud-accent">AVAILABLE FOR WORK</span>
          </span>
          <span className="text-hud-border">│</span>
          <span className="tracking-wider">CS &amp; DS // AUGUSTANA &apos;27</span>
        </div>
      </footer>
    </div>
  )
}
