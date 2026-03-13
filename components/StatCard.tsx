'use client'
import { useEffect, useState } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'cyan' | 'amber' | 'green' | 'red'
  prefix?: string
  suffix?: string
  delay?: number
}

export default function StatCard({ label, value, sub, accent = 'cyan', prefix, suffix, delay = 0 }: StatCardProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const colors = {
    cyan: { border: 'rgba(0,212,255,0.2)', glow: 'rgba(0,212,255,0.06)', text: '#00D4FF' },
    amber: { border: 'rgba(245,158,11,0.2)', glow: 'rgba(245,158,11,0.06)', text: '#F59E0B' },
    green: { border: 'rgba(16,185,129,0.2)', glow: 'rgba(16,185,129,0.06)', text: '#10B981' },
    red: { border: 'rgba(239,68,68,0.2)', glow: 'rgba(239,68,68,0.06)', text: '#EF4444' },
  }[accent]

  return (
    <div
      className="rounded-lg p-5 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, var(--color-surface) 0%, ${colors.glow} 100%)`,
        border: `1px solid ${colors.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <div className="section-label mb-3" style={{ color: colors.text, opacity: 0.7 }}>{label}</div>
      <div
        className="text-3xl font-bold number-display"
        style={{ color: colors.text, fontFamily: 'JetBrains Mono, monospace' }}
      >
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      {sub && (
        <div className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          {sub}
        </div>
      )}
    </div>
  )
}
