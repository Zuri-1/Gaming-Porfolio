'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Gamepad2, Volleyball, Flag } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'LEADERSHIP',
    title: 'Augustana Esports - Captain',
    description: 'Leading team with strong communication and strategic decision-making during high-pressure competitive situations. Analyzing complex plays and relaying tactical information to teammates.',
    achievement: 'CAPTAIN',
    duration: 'Sep 2023 - Present',
    icon: <Gamepad2 size={20} />,
    color: 'text-hud-accent',
  },
  {
    id: 2,
    type: 'ATHLETICS',
    title: 'Augustana Club Volleyball',
    description: 'Building resilience and time management skills through competitive athletics. Emphasizing trust, consistent effort, and supporting teammates while staying focused on continuous improvement.',
    achievement: 'MEMBER',
    duration: 'Sep 2024 - Present',
    icon: <Volleyball size={20} />,
    color: 'text-hud-cyan',
  },
  {
    id: 3,
    type: 'TEAMWORK',
    title: 'Team-Based Development',
    description: 'Collaborated in team environments using Git and GitHub for version control, feature development, and code integration on multiple projects.',
    achievement: 'COLLABORATOR',
    duration: 'Ongoing',
    icon: <Users size={20} />,
    color: 'text-hud-warning',
  },
  {
    id: 4,
    type: 'COMPETITION',
    title: 'Competitive Gaming',
    description: 'Experience in high-stakes competitive environments, developing quick decision-making skills, strategic thinking, and effective team communication.',
    achievement: 'COMPETITOR',
    duration: 'Ongoing',
    icon: <Trophy size={20} />,
    color: 'text-yellow-500',
  },
]

const typeColors = {
  LEADERSHIP: 'bg-hud-accent/20 text-hud-accent border-hud-accent/30',
  ATHLETICS: 'bg-hud-cyan/20 text-hud-cyan border-hud-cyan/30',
  TEAMWORK: 'bg-hud-warning/20 text-hud-warning border-hud-warning/30',
  COMPETITION: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  HACKATHON: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export function Activities() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/30 pb-4">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent">
          &gt; SIDE_QUESTS
        </span>
        <div className="flex-1 border-t border-dashed border-hud-accent/30" />
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
          {activities.length} ACTIVE
        </span>
      </div>

      {/* Quest Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="pixel-border group relative bg-hud-bg-secondary/50 transition-all duration-300 hover:border-hud-accent hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]"
          >
            {/* Quest Header */}
            <div className="flex items-center justify-between border-b border-hud-border p-3">
              <span className={`border px-2 py-0.5 font-[family-name:var(--font-pixel)] text-[8px] ${typeColors[activity.type as keyof typeof typeColors]}`}>
                {activity.type}
              </span>
              <span className={`${activity.color}`}>
                {activity.icon}
              </span>
            </div>

            {/* Quest Content */}
            <div className="p-4">
              <h3 className="mb-1 font-[family-name:var(--font-terminal)] text-lg text-hud-text">
                {activity.title}
              </h3>
              <p className="mb-2 font-[family-name:var(--font-pixel)] text-[9px] text-hud-text-dim">
                {activity.duration}
              </p>
              <p className="mb-4 font-[family-name:var(--font-terminal)] text-sm leading-relaxed text-hud-text-dim">
                {activity.description}
              </p>

              {/* Achievement Badge */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-hud-border" />
                <span className={`font-[family-name:var(--font-pixel)] text-[10px] ${activity.color}`}>
                  <Flag size={10} className="mr-1 inline" />
                  {activity.achievement}
                </span>
                <div className="h-px flex-1 bg-hud-border" />
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-hud-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      {/* Skills from Activities */}
      <div className="pixel-border bg-hud-bg-secondary/30 p-4">
        <div className="mb-3 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
          ACQUIRED_TRAITS:
        </div>
        <div className="flex flex-wrap gap-3">
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
              className="border border-hud-accent/30 bg-hud-accent/5 px-3 py-1 font-[family-name:var(--font-terminal)] text-sm text-hud-text"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
