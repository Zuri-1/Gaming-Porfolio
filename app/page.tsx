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
      {/* Subtle gradient background */}
      <div className="gradient-overlay" />

      {/* Subtle grid background */}
      <div className="grid-bg pointer-events-none fixed inset-0" />

      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-hud-border bg-hud-bg-secondary/60 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-terminal)] text-base font-medium text-hud-accent">
            Sujay Tuladhar
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus-ring rounded-lg p-2 text-hud-text-dim hover:bg-hud-border/50 hover:text-hud-text"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-hud-bg/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-14 w-72 border-l border-hud-border bg-hud-bg-secondary/95 backdrop-blur-md"
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
      <div className="border-t border-hud-border bg-hud-bg-secondary/60 backdrop-blur-md lg:hidden">
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

      {/* Subtle Status Indicator - Desktop */}
      <div className="pointer-events-none fixed bottom-4 left-4 hidden lg:block">
        <div className="flex items-center gap-2 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim/60">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hud-accent" />
            Available for work
          </span>
        </div>
      </div>
    </div>
  )
}
