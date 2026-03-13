'use client'
import Link from 'next/link'
import { FileText, MapPin, User, TrendingUp } from 'lucide-react'
import type { Deal } from '@/types'
import { formatCurrency, stageLabel, stageColor, typeLabel, scoreColor } from '@/lib/utils'

interface DealCardProps {
  deal: Deal
  delay?: number
}

export default function DealCard({ deal, delay = 0 }: DealCardProps) {
  return (
    <Link href={`/vault/${deal.id}`}>
      <div
        className="rounded-lg p-5 card-hover cursor-pointer"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          animationDelay: `${delay}ms`,
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h3
              className="font-bold text-sm leading-tight mb-1 truncate"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}
            >
              {deal.projectName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <MapPin size={11} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{deal.location}</span>
            </div>
          </div>
          <span className={`tag flex-shrink-0 ${stageColor(deal.stage)}`}>
            {stageLabel(deal.stage)}
          </span>
        </div>

        {/* Type + sponsor */}
        <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <div className="flex items-center gap-1.5">
            <FileText size={11} />
            <span>{typeLabel(deal.projectType)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={11} />
            <span className="truncate max-w-[120px]">{deal.sponsor}</span>
          </div>
        </div>

        {/* Capital + Score */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs mb-0.5" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              CAPITAL REQ
            </div>
            <div
              className="text-lg font-bold number-display"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent-warm)' }}
            >
              {formatCurrency(deal.capitalRequirement)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs mb-0.5" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              BDC SCORE
            </div>
            <div className={`text-2xl font-bold number-display ${scoreColor(deal.bdcScore.overall)}`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {deal.bdcScore.overall}
              <span className="text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Docs badge */}
        <div className="mt-4 pt-3 flex items-center justify-between border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex gap-1.5">
            {deal.platformDistribution.map(p => (
              <span
                key={p}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 9,
                  background: 'rgba(0,212,255,0.08)',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(0,212,255,0.15)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <TrendingUp size={11} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
              {deal.documents.length} docs
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
