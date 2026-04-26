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

  // Keyboard navigation
  useKeyboardNav({
    activeSection,
    onSectionChange: setActiveSection,
    enabled: !isBooting,
  })

  // Close mobile menu when section changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeSection])

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-hud-bg lg:flex-row">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Grid Background */}
      <div className="grid-bg pointer-events-none fixed inset-0" />

      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-hud-accent/30 bg-hud-bg-secondary/80 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent neon-glow">
            PLAYER_ONE
          </span>
          <span className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
            // PORTFOLIO
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus-hud p-2 text-hud-accent"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-hud-bg/90 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-14 w-64 border-l border-hud-accent/30 bg-hud-bg-secondary"
            onClick={(e) => e.stopPropagation()}
          >
            <NavbarHUD
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="border-t border-hud-accent/30 bg-hud-bg-secondary/80 backdrop-blur-sm lg:hidden">
        <NavbarHUD
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isMobile
        />
      </div>

      {/* Main Content Area - Desktop */}
      <main className="flex-1 overflow-hidden order-first lg:order-none">
        <div className="h-full">
          <MainDisplay activeSection={activeSection} />
        </div>
      </main>

      {/* Desktop Navigation HUD */}
      <aside className="hidden lg:block">
        <NavbarHUD
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </aside>

      {/* Corner Decorations */}
      <div className="pointer-events-none fixed left-4 top-4 hidden lg:block">
        <div className="h-8 w-8 border-l-2 border-t-2 border-hud-accent/30" />
      </div>
      <div className="pointer-events-none fixed bottom-4 right-4 hidden lg:block">
        <div className="h-8 w-8 border-b-2 border-r-2 border-hud-accent/30" />
      </div>

      {/* Status Bar - Desktop */}
      <div className="pointer-events-none fixed bottom-4 left-4 hidden lg:block">
        <div className="flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
          <span className="text-hud-accent">SYS:</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-accent" />
            OPERATIONAL
          </span>
          <span className="mx-2 text-hud-accent/30">|</span>
          <span className="text-hud-accent">FPS:</span>
          <span>60</span>
          <span className="mx-2 text-hud-accent/30">|</span>
          <span className="text-hud-accent">PING:</span>
          <span>12ms</span>
        </div>
      </div>
    </div>
  )
}
