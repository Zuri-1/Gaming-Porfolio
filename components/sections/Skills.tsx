'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Sword, Target } from 'lucide-react'

const skillCategories = [
  {
    name: 'PRIMARY WEAPONS',
    subtitle: 'Languages',
    icon: <Sword size={20} />,
    skills: [
      { name: 'Python', level: 90, xp: '9,000' },
      { name: 'JavaScript', level: 85, xp: '8,500' },
      { name: 'Java', level: 80, xp: '8,000' },
      { name: 'PHP', level: 70, xp: '7,000' },
      { name: 'HTML/CSS', level: 90, xp: '9,000' },
    ],
  },
  {
    name: 'SECONDARY LOADOUT',
    subtitle: 'Frameworks & Libraries',
    icon: <Shield size={20} />,
    skills: [
      { name: 'React', level: 88, xp: '8,800' },
      { name: 'Node.js', level: 82, xp: '8,200' },
      { name: 'OpenCV', level: 78, xp: '7,800' },
      { name: 'PyTorch', level: 72, xp: '7,200' },
      { name: 'scikit-learn', level: 80, xp: '8,000' },
      { name: 'YOLOv5', level: 75, xp: '7,500' },
    ],
  },
  {
    name: 'TACTICAL GEAR',
    subtitle: 'Tools & Tech',
    icon: <Target size={20} />,
    skills: [
      { name: 'Git/GitHub', level: 88, xp: '8,800' },
      { name: 'VS Code', level: 92, xp: '9,200' },
      { name: 'Tableau', level: 75, xp: '7,500' },
      { name: 'Microsoft Excel', level: 85, xp: '8,500' },
      { name: 'Google Colab', level: 82, xp: '8,200' },
    ],
  },
  {
    name: 'DATA ARSENAL',
    subtitle: 'Data & Analytics',
    icon: <Zap size={20} />,
    skills: [
      { name: 'Pandas', level: 88, xp: '8,800' },
      { name: 'NumPy', level: 85, xp: '8,500' },
      { name: 'Matplotlib', level: 80, xp: '8,000' },
      { name: 'SQL', level: 75, xp: '7,500' },
    ],
  },
]

function SkillBar({ skill, delay }: { skill: { name: string; level: number; xp: string }; delay: number }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const blocks = 10
  const filledBlocks = Math.round((skill.level / 100) * blocks)

  return (
    <div className="group">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-[family-name:var(--font-terminal)] text-sm text-hud-text">
          {skill.name}
        </span>
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
          LVL {skill.level}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-0.5">
          {Array.from({ length: blocks }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={animated ? { scaleY: 1 } : {}}
              transition={{ delay: i * 0.05, duration: 0.2 }}
              className={`h-4 flex-1 origin-bottom ${
                i < filledBlocks
                  ? 'bg-hud-accent shadow-[0_0_8px_rgba(0,255,65,0.4)]'
                  : 'bg-hud-border'
              }`}
            />
          ))}
        </div>
        <span className="w-12 font-[family-name:var(--font-pixel)] text-[8px] text-hud-text-dim">
          {skill.xp} XP
        </span>
      </div>
    </div>
  )
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-hud-accent/30 pb-4">
        <span className="font-[family-name:var(--font-pixel)] text-xs text-hud-accent">
          &gt; WEAPON_LOADOUT
        </span>
        <div className="flex-1 border-t border-dashed border-hud-accent/30" />
        <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
          {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} SKILLS
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {skillCategories.map((cat, idx) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(idx)}
            className={`focus-hud flex items-center gap-2 px-3 py-2 font-[family-name:var(--font-terminal)] text-sm transition-all ${
              activeCategory === idx
                ? 'border border-hud-accent bg-hud-accent/10 text-hud-accent'
                : 'border border-hud-border text-hud-text-dim hover:border-hud-accent/50 hover:text-hud-text'
            }`}
          >
            {cat.icon}
            <span className="hidden sm:inline">{cat.name}</span>
            <span className="sm:hidden">{cat.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        <div className="pixel-border bg-hud-bg-secondary/50 p-4 lg:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-hud-accent">{skillCategories[activeCategory].icon}</span>
            <div>
              <h3 className="font-[family-name:var(--font-terminal)] text-lg text-hud-accent">
                {skillCategories[activeCategory].name}
              </h3>
              <p className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
                {skillCategories[activeCategory].subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {skillCategories[activeCategory].skills.map((skill, idx) => (
              <SkillBar key={skill.name} skill={skill} delay={idx * 100} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* All Skills Grid View */}
      <div className="grid gap-4 md:grid-cols-2">
        {skillCategories.map((cat, catIdx) => (
          catIdx !== activeCategory && (
            <div key={cat.name} className="pixel-border bg-hud-bg-secondary/30 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-hud-accent/50">{cat.icon}</span>
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-hud-text-dim">
                  {cat.subtitle}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="bg-hud-accent/5 px-2 py-1 font-[family-name:var(--font-terminal)] text-xs text-hud-text-dim"
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
      <div className="pixel-border bg-hud-bg-secondary/30 p-4">
        <div className="mb-3 font-[family-name:var(--font-pixel)] text-[10px] text-hud-accent">
          COMMUNICATION_PROTOCOLS:
        </div>
        <div className="flex flex-wrap gap-3">
          {['English', 'Nepali', 'Newari', 'Hindi'].map((lang) => (
            <span
              key={lang}
              className="border border-hud-cyan/30 bg-hud-cyan/5 px-3 py-1 font-[family-name:var(--font-terminal)] text-sm text-hud-cyan"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
