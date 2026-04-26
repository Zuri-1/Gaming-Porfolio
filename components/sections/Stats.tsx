'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitCommit, Code2, Clock, Cpu, Activity, Zap } from 'lucide-react'

const stats = [
  { id: 1, label: 'TOTAL PROJECTS', value: 47, suffix: '', icon: <Code2 size={24} /> },
  { id: 2, label: 'LANGUAGES KNOWN', value: 12, suffix: '', icon: <Cpu size={24} /> },
  { id: 3, label: 'YEARS CODING', value: 7, suffix: '+', icon: <Clock size={24} /> },
  { id: 4, label: 'TECHNOLOGIES', value: 35, suffix: '+', icon: <Zap size={24} /> },
  { id: 5, label: 'GITHUB COMMITS', value: 2847, suffix: '', icon: <GitCommit size={24} /> },
  { id: 6, label: 'CUPS OF COFFEE', value: 9999, suffix: '+', icon: <Activity size={24} /> },
]

const radarData = [
  { skill: 'Frontend', value: 95 },
  { skill: 'Backend', value: 88 },
  { skill: 'DevOps', value: 75 },
  { skill: 'Database', value: 82 },
  { skill: 'Mobile', value: 65 },
  { skill: 'Design', value: 70 },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const incrementTime = duration / end
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 50)
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{count.toLocaleString()}</span>
}

function RadarChart() {
  const [animated, setAnimated] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const centerX = 120
  const centerY = 120
  const radius = 80
  const angleStep = (2 * Math.PI) / radarData.length

  const points = radarData.map((item, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (item.value / 100) * radius
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
      labelX: centerX + (radius + 20) * Math.cos(angle),
      labelY: centerY + (radius + 20) * Math.sin(angle),
      ...item,
    }
  })

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  return (
    <div className="flex items-center justify-center">
      <svg width="240" height="240" className="overflow-visible">
        {/* Background circles */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke="rgba(0, 255, 65, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.cos(i * angleStep - Math.PI / 2)}
            y2={centerY + radius * Math.sin(i * angleStep - Math.PI / 2)}
            stroke="rgba(0, 255, 65, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <motion.path
          d={pathData}
          fill="rgba(0, 255, 65, 0.2)"
          stroke="#00ff41"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#00ff41"
            initial={{ opacity: 0 }}
            animate={animated ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-hud-text-dim font-[family-name:var(--font-pixel)] text-[8px]"
          >
            {p.skill}
          </text>
        ))}
      </svg>
    </div>
  )
}

export function Stats() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/30 pb-4">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent">
          &gt; PLAYER_STATISTICS
        </span>
        <div className="flex-1 border-t border-dashed border-hud-accent/30" />
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
          LIVE_DATA
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="pixel-border group bg-hud-bg-secondary/50 p-4 transition-all hover:border-hud-accent hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
                {stat.label}
              </span>
              <span className="text-hud-accent/50 transition-colors group-hover:text-hud-accent">
                {stat.icon}
              </span>
            </div>
            <div className="font-[family-name:var(--font-terminal)] text-4xl text-hud-accent neon-glow">
              <AnimatedCounter value={stat.value} />
              {stat.suffix}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Radar Chart Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="pixel-border bg-hud-bg-secondary/50 p-4">
          <div className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
            SKILL_DISTRIBUTION:
          </div>
          <RadarChart />
        </div>

        {/* Activity Graph */}
        <div className="pixel-border bg-hud-bg-secondary/50 p-4">
          <div className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
            WEEKLY_ACTIVITY:
          </div>
          <div className="flex h-40 items-end justify-between gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const height = [65, 80, 45, 90, 75, 30, 55][i]
              return (
                <div key={day} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-hud-accent/30 to-hud-accent"
                    style={{ boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)' }}
                  />
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
                    {day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="pixel-border bg-hud-bg-secondary/50 p-4">
        <div className="mb-4 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
          PROGRESSION_STATUS:
        </div>
        <div className="space-y-4">
          {[
            { label: 'NEXT LEVEL', current: 8500, max: 10000 },
            { label: 'DAILY GOAL', current: 75, max: 100 },
            { label: 'MONTHLY TARGET', current: 23, max: 30 },
          ].map((progress) => (
            <div key={progress.label}>
              <div className="mb-1 flex justify-between font-[family-name:var(--font-pixel)] text-[10px]">
                <span className="text-hud-text-dim">{progress.label}</span>
                <span className="text-hud-accent">
                  {progress.current.toLocaleString()} / {progress.max.toLocaleString()}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden border border-hud-accent/30 bg-hud-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress.current / progress.max) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-hud-accent/50 to-hud-accent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
