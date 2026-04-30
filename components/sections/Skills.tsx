'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Layers, Wrench, Database } from 'lucide-react'

const skillCategories = [
  {
    name: 'Languages',
    icon: <Code size={18} />,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'PHP', level: 70 },
      { name: 'HTML/CSS', level: 90 },
    ],
  },
  {
    name: 'Frameworks',
    icon: <Layers size={18} />,
    skills: [
      { name: 'React', level: 88 },
      { name: 'Node.js', level: 82 },
      { name: 'OpenCV', level: 78 },
      { name: 'PyTorch', level: 72 },
      { name: 'scikit-learn', level: 80 },
      { name: 'YOLOv5', level: 75 },
    ],
  },
  {
    name: 'Tools',
    icon: <Wrench size={18} />,
    skills: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'VS Code', level: 92 },
      { name: 'Tableau', level: 75 },
      { name: 'Microsoft Excel', level: 85 },
      { name: 'Google Colab', level: 82 },
    ],
  },
  {
    name: 'Data & Analytics',
    icon: <Database size={18} />,
    skills: [
      { name: 'Pandas', level: 88 },
      { name: 'NumPy', level: 85 },
      { name: 'Matplotlib', level: 80 },
      { name: 'SQL', level: 75 },
    ],
  },
]

function SkillBar({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="group">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text">
          {skill.name}
        </span>
        <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-hud-border">
        <motion.div
          initial={{ width: 0 }}
          animate={animated ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-hud-accent to-hud-blue"
        />
      </div>
    </div>
  )
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-hud-border pb-4">
        <span className="font-[family-name:var(--font-terminal)] text-sm font-medium text-hud-accent">
          Skills
        </span>
        <div className="flex-1 border-t border-hud-border" />
        <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
          {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} skills
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {skillCategories.map((cat, idx) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(idx)}
            className={`focus-ring flex items-center gap-2 rounded-lg px-4 py-2 font-[family-name:var(--font-terminal)] text-sm transition-all ${
              activeCategory === idx
                ? 'bg-hud-accent/10 text-hud-accent border border-hud-accent/50'
                : 'bg-hud-bg-secondary text-hud-text-dim hover:text-hud-text border border-hud-border'
            }`}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1"
      >
        <div className="modern-card rounded-xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-hud-accent">{skillCategories[activeCategory].icon}</span>
            <h3 className="font-[family-name:var(--font-terminal)] text-lg font-medium text-hud-text">
              {skillCategories[activeCategory].name}
            </h3>
          </div>

          <div className="space-y-4">
            {skillCategories[activeCategory].skills.map((skill, idx) => (
              <SkillBar key={skill.name} skill={skill} delay={idx * 80} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Other Skills Summary */}
      <div className="grid gap-3 md:grid-cols-3">
        {skillCategories.map((cat, catIdx) => (
          catIdx !== activeCategory && (
            <div key={cat.name} className="modern-card rounded-lg p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-hud-accent/60">{cat.icon}</span>
                <span className="font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim">
                  {cat.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-md bg-hud-border/50 px-2 py-1 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Languages Section */}
      <div className="modern-card rounded-lg p-4">
        <div className="mb-3 font-[family-name:var(--font-terminal)] text-sm text-hud-text-dim">
          Languages
        </div>
        <div className="flex flex-wrap gap-2">
          {['English', 'Nepali', 'Newari', 'Hindi'].map((lang) => (
            <span
              key={lang}
              className="rounded-lg border border-hud-accent/30 bg-hud-accent/5 px-3 py-1.5 font-[family-name:var(--font-terminal)] text-sm text-hud-accent"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
