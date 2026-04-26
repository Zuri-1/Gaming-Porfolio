'use client'

import { motion } from 'framer-motion'
import { Terminal, ChevronRight } from 'lucide-react'

const experiences = [
  {
    id: 1,
    organization: 'TECH_CORPS',
    role: 'Senior Full-Stack Developer',
    duration: '2022 - PRESENT',
    status: 'ACTIVE',
    classification: 'ALPHA',
    description: [
      'Leading development of mission-critical web applications serving 100k+ users',
      'Architecting scalable microservices infrastructure on AWS',
      'Mentoring junior developers and conducting code reviews',
      'Implementing CI/CD pipelines reducing deployment time by 60%',
    ],
  },
  {
    id: 2,
    organization: 'STARTUP_OPS',
    role: 'Full-Stack Developer',
    duration: '2020 - 2022',
    status: 'COMPLETED',
    classification: 'BETA',
    description: [
      'Built and launched SaaS platform from ground zero to 10k users',
      'Developed real-time collaboration features using WebSockets',
      'Integrated third-party APIs for payments and analytics',
      'Optimized database queries improving performance by 40%',
    ],
  },
  {
    id: 3,
    organization: 'FREELANCE_UNIT',
    role: 'Web Developer',
    duration: '2018 - 2020',
    status: 'COMPLETED',
    classification: 'GAMMA',
    description: [
      'Delivered 20+ client projects across various industries',
      'Specialized in responsive design and WordPress development',
      'Managed client relationships and project timelines',
      'Built custom e-commerce solutions and landing pages',
    ],
  },
]

const classificationColors = {
  ALPHA: 'text-hud-accent border-hud-accent',
  BETA: 'text-hud-cyan border-hud-cyan',
  GAMMA: 'text-hud-warning border-hud-warning',
}

export function Experience() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/30 pb-4">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent">
          &gt; COMBAT_HISTORY
        </span>
        <div className="flex-1 border-t border-dashed border-hud-accent/30" />
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
          {experiences.length} DEPLOYMENTS
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-hud-accent/30 lg:left-6" />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-10 lg:pl-14"
            >
              {/* Timeline Node */}
              <div className="absolute left-2 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-hud-accent bg-hud-bg lg:left-4 lg:h-5 lg:w-5">
                <Terminal size={10} className="text-hud-accent" />
              </div>

              {/* Experience Card */}
              <div className="pixel-border group bg-hud-bg-secondary/50 transition-all hover:border-hud-accent hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hud-border p-3">
                  <div className="flex items-center gap-2">
                    <span className={`border px-2 py-0.5 font-[family-name:var(--font-pixel)] text-[8px] ${classificationColors[exp.classification as keyof typeof classificationColors]}`}>
                      {exp.classification}
                    </span>
                    <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
                      {exp.organization}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-[family-name:var(--font-pixel)] text-[8px] ${
                      exp.status === 'ACTIVE' ? 'text-hud-accent' : 'text-hud-text-dim'
                    }`}>
                      [{exp.status}]
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-[family-name:var(--font-terminal)] text-lg text-hud-text">
                      {exp.role}
                    </h3>
                    <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Mission Objectives */}
                  <div className="space-y-2">
                    <span className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-accent">
                      MISSION_OBJECTIVES:
                    </span>
                    <ul className="space-y-1.5">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim"
                        >
                          <ChevronRight size={12} className="mt-1 shrink-0 text-hud-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
