'use client'
import { useEffect, useState } from 'react'
import { scoreBar, scoreColor } from '@/lib/utils'

interface ScoreBarProps {
  label: string
  score: number
  delay?: number
}

export default function ScoreBar({ label, score, delay = 0 }: ScoreBarProps) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), delay + 200)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: 'Syne, sans-serif' }}>
          {label}
        </span>
        <span className={`text-xs font-bold number-display ${scoreColor(score)}`}>
          {score}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${scoreBar(score)}`}
          style={{ width: filled ? `${score}%` : '0%' }}
        />
      </div>
    </div>
  )
}
