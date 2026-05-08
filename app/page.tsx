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
  const { highlightedSection } = useKeyboardNav({
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
    <div className="relative flex h-screen flex-col overflow-hidden bg-black lg:flex-row">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-hud-border bg-black px-4 py-3 lg:hidden">
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
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-14 w-72 border-l border-hud-border bg-black"
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

      {/* Mobile Bottom Navigation */}
      <div className="border-t border-hud-border bg-black lg:hidden">
        <NavbarHUD
          activeSection={activeSection}
          highlightedSection={highlightedSection}
          onSectionChange={setActiveSection}
          isMobile
        />
      </div>

      {/* Main Content Area - Left Side */}
      <main className="flex-1 overflow-hidden order-first lg:order-none bg-black">
        <div className="h-full">
          <MainDisplay activeSection={activeSection} />
        </div>
      </main>

      {/* Desktop Navigation Menu - Right Side */}
      <aside className="hidden lg:flex lg:items-center border-l border-hud-border/30">
        <NavbarHUD
          activeSection={activeSection}
          highlightedSection={highlightedSection}
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
