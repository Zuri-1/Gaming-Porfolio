'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Crosshair } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'OPERATION: E-COMMERCE',
    codename: 'SHOP_STRIKE',
    description: 'Full-stack e-commerce platform with real-time inventory management, secure payments, and admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    status: 'DEPLOYED',
    difficulty: 'HARD',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 2,
    name: 'MISSION: TASK_COMMANDER',
    codename: 'TASK_OPS',
    description: 'Real-time collaborative task management app with drag-and-drop interface and team synchronization.',
    tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    status: 'DEPLOYED',
    difficulty: 'MEDIUM',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
  {
    id: 3,
    name: 'DIRECTIVE: AI_ASSISTANT',
    codename: 'NEURAL_NET',
    description: 'AI-powered chatbot with natural language processing and custom training capabilities.',
    tech: ['Python', 'OpenAI', 'FastAPI', 'React'],
    status: 'IN_DEV',
    difficulty: 'EXTREME',
    github: 'https://github.com',
    demo: null,
  },
  {
    id: 4,
    name: 'PROTOCOL: ANALYTICS_HUB',
    codename: 'DATA_RECON',
    description: 'Real-time analytics dashboard with customizable widgets and data visualization.',
    tech: ['Vue.js', 'D3.js', 'Express', 'Redis'],
    status: 'DEPLOYED',
    difficulty: 'HARD',
    github: 'https://github.com',
    demo: 'https://example.com',
  },
]

const statusColors = {
  DEPLOYED: 'text-hud-accent',
  IN_DEV: 'text-hud-warning',
  CLASSIFIED: 'text-hud-danger',
}

const difficultyBars = {
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  EXTREME: 5,
}

export function Projects() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/30 pb-4">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent">
          &gt; MISSION_LOG
        </span>
        <div className="flex-1 border-t border-dashed border-hud-accent/30" />
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
          {projects.length} MISSIONS
        </span>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group pixel-border relative bg-hud-bg-secondary/50 transition-all duration-300 hover:border-hud-accent hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
          >
            {/* Mission Header */}
            <div className="flex items-center justify-between border-b border-hud-border p-3">
              <div className="flex items-center gap-2">
                <Crosshair size={14} className="text-hud-accent" />
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
                  {project.codename}
                </span>
              </div>
              <span className={`font-[family-name:var(--font-pixel)] text-[8px] ${statusColors[project.status as keyof typeof statusColors]}`}>
                [{project.status}]
              </span>
            </div>

            {/* Mission Content */}
            <div className="p-4">
              <h3 className="mb-2 font-[family-name:var(--font-terminal)] text-lg text-hud-text">
                {project.name}
              </h3>
              <p className="mb-4 font-[family-name:var(--font-terminal)] text-sm leading-relaxed text-hud-text-dim">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="border border-hud-accent/30 bg-hud-accent/5 px-2 py-1 font-[family-name:var(--font-pixel)] text-[8px] text-hud-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Difficulty Bar */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
                    DIFFICULTY
                  </span>
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-warning">
                    {project.difficulty}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className={`h-2 flex-1 ${
                        bar <= difficultyBars[project.difficulty as keyof typeof difficultyBars]
                          ? 'bg-hud-warning'
                          : 'bg-hud-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-hud flex items-center gap-1 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim transition-colors hover:text-hud-accent"
                >
                  <Github size={14} />
                  CODE
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-hud flex items-center gap-1 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim transition-colors hover:text-hud-accent"
                  >
                    <ExternalLink size={14} />
                    DEPLOY
                  </a>
                )}
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-hud-accent/30 group-hover:border-hud-accent" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-hud-accent/30 group-hover:border-hud-accent" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
