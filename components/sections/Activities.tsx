'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Gamepad2, Activity } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'Leadership',
    title: 'Augustana Esports - Captain',
    description: 'Leading team with strong communication and strategic decision-making during high-pressure competitive situations. Analyzing complex plays and relaying tactical information to teammates.',
    duration: 'Sep 2023 - Present',
    icon: <Gamepad2 size={18} />,
  },
  {
    id: 2,
    type: 'Athletics',
    title: 'Augustana Club Volleyball',
    description: 'Building resilience and time management skills through competitive athletics. Emphasizing trust, consistent effort, and supporting teammates while staying focused on continuous improvement.',
    duration: 'Sep 2024 - Present',
    icon: <Activity size={18} />,
  },
  {
    id: 3,
    type: 'Collaboration',
    title: 'Team-Based Development',
    description: 'Collaborated in team environments using Git and GitHub for version control, feature development, and code integration on multiple projects.',
    duration: 'Ongoing',
    icon: <Users size={18} />,
  },
  {
    id: 4,
    type: 'Leadership',
    title: 'Vice President - Omicron Sigma Omicron (OZO) Fraternity',
    description: 'Serving as Vice President of OZO Fraternity, overseeing chapter operations, coordinating events, and fostering brotherhood through leadership, accountability, and community engagement.',
    duration: 'Ongoing',
    icon: <Trophy size={18} />,
  },
]

export function Activities() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-hud-border pb-4">
        <span className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
          Activities
        </span>
        <div className="flex-1 border-t border-hud-border" />
        <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          {activities.length} activities
        </span>
      </div>

      {/* Activity Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="modern-card group rounded-xl p-5 transition-all duration-300 hover:border-hud-accent/30"
          >
            {/* Activity Header */}
            <div className="mb-3 flex items-start justify-between">
              <span className="rounded-full bg-hud-accent/10 px-2.5 py-0.5 font-[family-name:var(--font-terminal)] text-xs text-hud-accent">
                {activity.type}
              </span>
              <span className="text-hud-accent">
                {activity.icon}
              </span>
            </div>

            {/* Activity Content */}
            <h3 className="mb-1 font-[family-name:var(--font-terminal)] text-lg font-medium text-hud-text group-hover:text-hud-accent transition-colors">
              {activity.title}
            </h3>
            <p className="mb-3 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
              {activity.duration}
            </p>
            <p className="font-[family-name:var(--font-terminal)] text-sm leading-relaxed text-hud-text-dim">
              {activity.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Skills from Activities */}
      <div className="modern-card rounded-xl p-5">
        <div className="mb-4 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
          Key Skills Developed
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Leadership',
            'Team Communication',
            'Time Management',
            'Strategic Thinking',
            'Resilience',
            'Collaboration',
            'Quick Decision Making',
            'Version Control',
          ].map((trait) => (
            <span
              key={trait}
              className="rounded-lg border border-hud-accent/30 bg-hud-accent/5 px-3 py-1.5 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
