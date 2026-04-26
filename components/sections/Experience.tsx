'use client'

import { motion } from 'framer-motion'
import { Terminal, ChevronRight } from 'lucide-react'

const experiences = [
  {
    id: 1,
    organization: 'EDGE_CENTER',
    location: 'Rock Island, Illinois',
    role: 'Web Development Intern',
    duration: 'Feb 2026 - PRESENT',
    status: 'ACTIVE',
    classification: 'ALPHA',
    description: [
      'Executing hands-on technical projects, applying core development concepts to build functional and well-structured solutions',
      'Designing and refining digital graphics using Adobe Photoshop, focusing on layout, branding, and visual consistency',
      'Deploying responsive web pages using HTML and CSS, emphasizing clean design and user-friendly interfaces',
      'Producing project-based deliverables utilizing modern digital tools and web development workflows',
    ],
  },
  {
    id: 2,
    organization: 'FUSE_MACHINES',
    location: 'Kathmandu, Nepal',
    role: 'AI Intern',
    duration: 'Dec 2025 - Feb 2026',
    status: 'COMPLETED',
    classification: 'BETA',
    description: [
      'Evaluated AI product features and use cases, assessing viability of ML solutions based on business objectives',
      'Collaborated with cross-functional teams of engineers and product stakeholders to analyze AI system workflows',
      'Conducted research on AI applications across 5+ industries, identifying key limitations and performance trade-offs',
      'Built and evaluated ML workflows using Python, Pandas, and Scikit-learn with real-world datasets',
    ],
  },
  {
    id: 3,
    organization: 'BUDDHA_TECH',
    location: 'Kathmandu, Nepal',
    role: 'Web Developer Intern',
    duration: 'May 2024 - Aug 2024',
    status: 'COMPLETED',
    classification: 'GAMMA',
    description: [
      'Completed full-stack development projects, integrating front-end interfaces with back-end functionality',
      'Identified and resolved 10+ front-end issues, improving UI performance, responsiveness, and UX',
      'Contributed to deploying web applications using modern development workflows including version control',
      'Developed and integrated full-stack features using React, Node.js, Express, and REST APIs',
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
                    <div className="flex flex-wrap gap-3">
                      <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
                        {exp.duration}
                      </span>
                      <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-cyan">
                        {exp.location}
                      </span>
                    </div>
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

      {/* Education Section */}
      <div className="pixel-border bg-hud-bg-secondary/50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
            TRAINING_FACILITY:
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-[family-name:var(--font-terminal)] text-lg text-hud-text">
            Bachelor of Arts in Computer Science and Data Science
          </h4>
          <div className="flex flex-wrap gap-4">
            <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-cyan">
              Augustana College | Rock Island, Illinois
            </span>
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
              Expected: May 2027
            </span>
          </div>
          <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
            Minor: Mathematics
          </span>
        </div>
      </div>
    </div>
  )
}
