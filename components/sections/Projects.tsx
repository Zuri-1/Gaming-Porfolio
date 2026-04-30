'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, FolderOpen } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Athletic Swipe-In Tracker',
    description: 'Web-based system to streamline student access to campus recreation facilities with a one-scan automated check-in process. Cloud-backed database for attendance data and facility occupancy tracking.',
    tech: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'GitHub'],
    status: 'Active',
    github: 'https://github.com/Zuri-1',
    demo: null,
    date: 'Feb 2026 - Present',
  },
  {
    id: 2,
    name: 'Real-Time Object Detection',
    description: 'Python-based automation tool to detect and interact with on-screen targets in real time using computer vision. Implemented object detection using YOLOv5 and OpenCV with automated mouse actions via PyAutoGUI.',
    tech: ['Python', 'YOLOv5', 'OpenCV', 'PyAutoGUI', 'NumPy'],
    status: 'Completed',
    github: 'https://github.com/Zuri-1',
    demo: null,
    date: 'Apr 2025 - Jul 2025',
  },
  {
    id: 3,
    name: 'Spam Email Classifier',
    description: 'Machine learning pipeline to classify emails as spam or non-spam using NLP techniques. Implemented Decision Tree, Logistic Regression, and KNN models with performance visualization.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    status: 'Completed',
    github: 'https://github.com/Zuri-1',
    demo: null,
    date: 'Jan 2025 - May 2025',
  },
]

const statusColors: Record<string, string> = {
  Completed: 'text-hud-accent',
  Active: 'text-hud-warning',
  'In Progress': 'text-hud-blue',
}

export function Projects() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-hud-border pb-4">
        <span className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
          Projects
        </span>
        <div className="flex-1 border-t border-hud-border" />
        <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          {projects.length} projects
        </span>
      </div>

      {/* Project Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group modern-card flex flex-col rounded-xl p-5 transition-all duration-300 hover:border-hud-accent/50 hover:shadow-lg hover:shadow-hud-accent/5"
          >
            {/* Project Header */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen size={18} className="text-hud-accent" />
                <span className={`rounded-full px-2 py-0.5 font-[family-name:var(--font-terminal)] text-xs ${statusColors[project.status]} bg-hud-accent/10`}>
                  {project.status}
                </span>
              </div>
              <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                {project.date}
              </span>
            </div>

            {/* Project Content */}
            <h3 className="mb-2 font-[family-name:var(--font-terminal)] text-lg font-medium text-hud-text group-hover:text-hud-accent transition-colors">
              {project.name}
            </h3>
            <p className="mb-4 flex-1 font-[family-name:var(--font-terminal)] text-sm leading-relaxed text-hud-text-dim">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-hud-border/50 px-2 py-1 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex gap-4 border-t border-hud-border pt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-1.5 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim transition-colors hover:text-hud-accent"
              >
                <Github size={16} />
                View Code
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex items-center gap-1.5 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim transition-colors hover:text-hud-accent"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
