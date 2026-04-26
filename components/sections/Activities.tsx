'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Swords, Star, Award, Flag } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'HACKATHON',
    title: 'Global Tech Hackathon 2024',
    description: 'Built an AI-powered accessibility tool in 48 hours',
    achievement: '1ST PLACE',
    icon: <Trophy size={20} />,
    color: 'text-yellow-500',
  },
  {
    id: 2,
    type: 'LEADERSHIP',
    title: 'Tech Community Lead',
    description: 'Organized monthly meetups and workshops for 200+ developers',
    achievement: 'COMMANDER',
    icon: <Flag size={20} />,
    color: 'text-hud-accent',
  },
  {
    id: 3,
    type: 'COMPETITION',
    title: 'Code Wars Championship',
    description: 'Algorithm competition with participants from 50+ countries',
    achievement: 'TOP 10',
    icon: <Swords size={20} />,
    color: 'text-hud-danger',
  },
  {
    id: 4,
    type: 'CLUB',
    title: 'Open Source Contributors Guild',
    description: 'Active contributor to major open source projects',
    achievement: 'ELITE MEMBER',
    icon: <Users size={20} />,
    color: 'text-hud-cyan',
  },
  {
    id: 5,
    type: 'CERTIFICATION',
    title: 'AWS Solutions Architect',
    description: 'Professional certification for cloud architecture',
    achievement: 'CERTIFIED',
    icon: <Award size={20} />,
    color: 'text-hud-warning',
  },
  {
    id: 6,
    type: 'ACHIEVEMENT',
    title: 'GitHub Arctic Code Vault',
    description: 'Code preserved in Arctic World Archive for future generations',
    achievement: 'LEGENDARY',
    icon: <Star size={20} />,
    color: 'text-purple-400',
  },
]

const typeColors = {
  HACKATHON: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  LEADERSHIP: 'bg-hud-accent/20 text-hud-accent border-hud-accent/30',
  COMPETITION: 'bg-hud-danger/20 text-hud-danger border-hud-danger/30',
  CLUB: 'bg-hud-cyan/20 text-hud-cyan border-hud-cyan/30',
  CERTIFICATION: 'bg-hud-warning/20 text-hud-warning border-hud-warning/30',
  ACHIEVEMENT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
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
          {activities.length} COMPLETED
        </span>
      </div>

      {/* Quest Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <h3 className="mb-2 font-[family-name:var(--font-terminal)] text-lg text-hud-text">
                {activity.title}
              </h3>
              <p className="mb-4 font-[family-name:var(--font-terminal)] text-sm leading-relaxed text-hud-text-dim">
                {activity.description}
              </p>

              {/* Achievement Badge */}
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-hud-border" />
                <span className={`font-[family-name:var(--font-pixel)] text-[10px] ${activity.color}`}>
                  ★ {activity.achievement}
                </span>
                <div className="h-px flex-1 bg-hud-border" />
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-hud-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      {/* Achievement Summary */}
      <div className="pixel-border bg-hud-bg-secondary/30 p-4">
        <div className="mb-3 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
          QUEST_SUMMARY:
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(
            activities.reduce((acc, act) => {
              acc[act.type] = (acc[act.type] || 0) + 1
              return acc
            }, {} as Record<string, number>)
          ).map(([type, count]) => (
            <div key={type} className="flex items-center gap-2">
              <span className={`border px-2 py-0.5 font-[family-name:var(--font-pixel)] text-[8px] ${typeColors[type as keyof typeof typeColors]}`}>
                {type}
              </span>
              <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text">
                x{count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
