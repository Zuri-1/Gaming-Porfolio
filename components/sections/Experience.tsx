'use client'

import { motion } from 'framer-motion'
import { Briefcase, ChevronRight, GraduationCap } from 'lucide-react'

const experiences = [
  {
    id: 1,
    organization: 'EDGE Center',
    location: 'Rock Island, Illinois',
    role: 'Web Development Intern',
    duration: 'Feb 2026 - Present',
    status: 'Current',
    description: [
      'Executing hands-on technical projects, applying core development concepts to build functional and well-structured solutions',
      'Designing and refining digital graphics using Adobe Photoshop, focusing on layout, branding, and visual consistency',
      'Deploying responsive web pages using HTML and CSS, emphasizing clean design and user-friendly interfaces',
      'Producing project-based deliverables utilizing modern digital tools and web development workflows',
    ],
  },
  {
    id: 2,
    organization: 'Fuse Machines',
    location: 'Kathmandu, Nepal',
    role: 'AI Intern',
    duration: 'Dec 2025 - Feb 2026',
    status: 'Completed',
    description: [
      'Evaluated AI product features and use cases, assessing viability of ML solutions based on business objectives',
      'Collaborated with cross-functional teams of engineers and product stakeholders to analyze AI system workflows',
      'Conducted research on AI applications across 5+ industries, identifying key limitations and performance trade-offs',
      'Built and evaluated ML workflows using Python, Pandas, and Scikit-learn with real-world datasets',
    ],
  },
  {
    id: 3,
    organization: 'Buddha Tech',
    location: 'Kathmandu, Nepal',
    role: 'Web Developer Intern',
    duration: 'May 2024 - Aug 2024',
    status: 'Completed',
    description: [
      'Completed full-stack development projects, integrating front-end interfaces with back-end functionality',
      'Identified and resolved 10+ front-end issues, improving UI performance, responsiveness, and UX',
      'Contributed to deploying web applications using modern development workflows including version control',
      'Developed and integrated full-stack features using React, Node.js, Express, and REST APIs',
    ],
  },
]

export function Experience() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-hud-border pb-4">
        <span className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
          Experience
        </span>
        <div className="flex-1 border-t border-hud-border" />
        <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          {experiences.length} positions
        </span>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute bottom-0 left-3 top-0 w-px bg-hud-border lg:left-4" />

        <div className="space-y-5">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10 lg:pl-12"
            >
              {/* Timeline Node */}
              <div className="absolute left-0.5 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-hud-accent/50 bg-hud-bg-secondary lg:left-1">
                <Briefcase size={12} className="text-hud-accent" />
              </div>

              {/* Experience Card */}
              <div className="modern-card rounded-xl p-5 transition-all hover:border-hud-accent/30">
                {/* Card Header */}
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-terminal)] text-lg font-medium text-hud-text">
                      {exp.role}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-accent">
                        {exp.organization}
                      </span>
                      <span className="text-hud-text-dim">-</span>
                      <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-terminal)] text-xs ${
                      exp.status === 'Current' 
                        ? 'bg-hud-accent/10 text-hud-accent' 
                        : 'bg-hud-border/50 text-hud-text-dim'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                  {exp.duration}
                </div>

                {/* Description */}
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim"
                    >
                      <ChevronRight size={14} className="mt-0.5 shrink-0 text-hud-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="modern-card rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <GraduationCap size={18} className="text-hud-accent" />
          <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
            Education
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-[family-name:var(--font-terminal)] text-lg font-medium text-hud-text">
            Bachelor of Arts in Computer Science and Data Science
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-accent">
              Augustana College
            </span>
            <span className="text-hud-text-dim">-</span>
            <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
              Rock Island, Illinois
            </span>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="font-[family-name:var(--font-terminal)] text-hud-text-dim">
              Expected: May 2027
            </span>
            <span className="text-hud-border">|</span>
            <span className="font-[family-name:var(--font-terminal)] text-hud-text-dim">
              Minor: Mathematics
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
