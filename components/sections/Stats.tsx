'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitCommit, Code2, Clock, Cpu, Briefcase, Globe } from 'lucide-react'

const stats = [
  { id: 1, label: 'Total Projects', value: 5, suffix: '+', icon: <Code2 size={22} /> },
  { id: 2, label: 'Programming Languages', value: 5, suffix: '', icon: <Cpu size={22} /> },
  { id: 3, label: 'Internships', value: 3, suffix: '', icon: <Briefcase size={22} /> },
  { id: 4, label: 'Technologies', value: 20, suffix: '+', icon: <GitCommit size={22} /> },
  { id: 5, label: 'Spoken Languages', value: 4, suffix: '', icon: <Globe size={22} /> },
  { id: 6, label: 'Years Coding', value: 3, suffix: '+', icon: <Clock size={22} /> },
]

const radarData = [
  { skill: 'Frontend', value: 88 },
  { skill: 'Backend', value: 80 },
  { skill: 'AI/ML', value: 78 },
  { skill: 'Data', value: 82 },
  { skill: 'DevOps', value: 70 },
  { skill: 'Design', value: 75 },
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
      labelX: centerX + (radius + 25) * Math.cos(angle),
      labelY: centerY + (radius + 25) * Math.sin(angle),
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
            stroke="rgba(0, 212, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((_, i) => (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.cos(i * angleStep - Math.PI / 2)}
            y2={centerY + radius * Math.sin(i * angleStep - Math.PI / 2)}
            stroke="rgba(0, 212, 255, 0.15)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <motion.path
          d={pathData}
          fill="rgba(0, 212, 255, 0.15)"
          stroke="#00d4ff"
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
            fill="#00d4ff"
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
            className="fill-hud-text-dim font-[family-name:var(--font-terminal)] text-[10px]"
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
      <div className="flex items-center gap-3 border-b border-hud-border pb-4">
        <span className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
          Statistics
        </span>
        <div className="flex-1 border-t border-hud-border" />
        <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          Live data
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
            className="modern-card group rounded-xl p-5 transition-all hover:border-hud-accent/30"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
                {stat.label}
              </span>
              <span className="text-hud-accent/50 transition-colors group-hover:text-hud-accent">
                {stat.icon}
              </span>
            </div>
            <div className="font-[family-name:var(--font-terminal)] text-4xl font-light text-hud-accent">
              <AnimatedCounter value={stat.value} />
              {stat.suffix}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Radar Chart Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="modern-card rounded-xl p-5">
          <div className="mb-4 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
            Skill Distribution
          </div>
          <RadarChart />
        </div>

        {/* Tech Stack Overview */}
        <div className="modern-card rounded-xl p-5">
          <div className="mb-4 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
            Tech Stack
          </div>
          <div className="space-y-4">
            {[
              { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'PHP'] },
              { label: 'Frameworks', items: ['React', 'Node.js', 'Express'] },
              { label: 'AI/ML', items: ['PyTorch', 'scikit-learn', 'YOLOv5', 'OpenCV'] },
              { label: 'Data', items: ['Pandas', 'NumPy', 'Matplotlib', 'Tableau'] },
            ].map((category) => (
              <div key={category.label}>
                <div className="mb-2 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                  {category.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-hud-border/50 px-2 py-1 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
