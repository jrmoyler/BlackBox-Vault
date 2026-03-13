'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import DealCard from '@/components/DealCard'
import { mockDeals } from '@/lib/data'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { typeLabel, stageLabel } from '@/lib/utils'
import type { ProjectStage, ProjectType } from '@/types'

const stageFilters: { label: string; value: ProjectStage | 'all' }[] = [
  { label: 'All Stages', value: 'all' },
  { label: 'Early Stage', value: 'early_stage' },
  { label: 'Structurable', value: 'structurable' },
  { label: 'Capital Ready', value: 'capital_ready' },
  { label: 'Lender Ready', value: 'lender_ready' },
]

const typeFilters: { label: string; value: ProjectType | 'all' }[] = [
  { label: 'All Types', value: 'all' },
  { label: 'Energy Campus', value: 'energy_campus' },
  { label: 'Cold Storage', value: 'cold_storage' },
  { label: 'Waste-to-Energy', value: 'waste_to_energy' },
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'Digital Infrastructure', value: 'digital_infrastructure' },
]

export default function VaultPage() {
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState<ProjectStage | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all')
  const [sortBy, setSortBy] = useState<'score' | 'capital' | 'date'>('score')

  const filtered = mockDeals
    .filter(d => {
      const q = query.toLowerCase()
      if (q && !d.projectName.toLowerCase().includes(q) && !d.location.toLowerCase().includes(q) && !d.sponsor.toLowerCase().includes(q)) return false
      if (stageFilter !== 'all' && d.stage !== stageFilter) return false
      if (typeFilter !== 'all' && d.projectType !== typeFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.bdcScore.overall - a.bdcScore.overall
      if (sortBy === 'capital') return b.capitalRequirement - a.capitalRequirement
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

  return (
    <Layout title="Black Box Data Vault" subtitle="Central intelligence repository — all indexed deals">
      {/* Vault stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'INDEXED DEALS', value: mockDeals.length, color: '#00D4FF' },
          { label: 'TOTAL DOCUMENTS', value: mockDeals.reduce((s, d) => s + d.documents.length, 0), color: '#F59E0B' },
          { label: 'PROCESSED DOCS', value: mockDeals.reduce((s, d) => s + d.documents.filter(doc => doc.processed).length, 0), color: '#10B981' },
          { label: 'CORRELATIONS', value: mockDeals.reduce((s, d) => s + d.correlations.length, 0), color: '#A78BFA' },
        ].map(item => (
          <div key={item.label} className="rounded-lg px-4 py-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
              {item.label}
            </div>
            <div className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: item.color }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="rounded-lg p-4 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded"
            style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
            <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search deals by name, location, sponsor..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
            />
          </div>
          <div className="flex items-center gap-1 text-xs">
            <SlidersHorizontal size={13} style={{ color: 'var(--color-text-muted)' }} />
            {(['score', 'capital', 'date'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="px-3 py-2 rounded transition-colors"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  background: sortBy === s ? 'rgba(0,212,255,0.1)' : 'transparent',
                  color: sortBy === s ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  border: sortBy === s ? '1px solid rgba(0,212,255,0.25)' : '1px solid transparent',
                  textTransform: 'uppercase',
                  fontSize: 10,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center gap-1">
            <Filter size={11} style={{ color: 'var(--color-text-muted)' }} />
            <span className="text-xs mr-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>STAGE:</span>
            {stageFilters.map(f => (
              <button key={f.value} onClick={() => setStageFilter(f.value)}
                className="px-2.5 py-1 rounded text-xs transition-colors"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  background: stageFilter === f.value ? 'rgba(0,212,255,0.1)' : 'transparent',
                  color: stageFilter === f.value ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  border: stageFilter === f.value ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-1.5">
          <div className="flex items-center gap-1">
            <span className="text-xs mr-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>TYPE:</span>
            {typeFilters.map(f => (
              <button key={f.value} onClick={() => setTypeFilter(f.value)}
                className="px-2.5 py-1 rounded text-xs transition-colors"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  background: typeFilter === f.value ? 'rgba(245,158,11,0.1)' : 'transparent',
                  color: typeFilter === f.value ? '#F59E0B' : 'var(--color-text-muted)',
                  border: typeFilter === f.value ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          {filtered.length} DEAL{filtered.length !== 1 ? 'S' : ''} FOUND
        </span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          SORTED BY {sortBy.toUpperCase()}
        </span>
      </div>

      {/* Deal grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
          <div className="text-4xl mb-4">🔍</div>
          <div className="font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>No deals match this filter</div>
          <div className="text-sm mt-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
            Adjust your search or filter criteria
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} delay={i * 60} />
          ))}
        </div>
      )}
    </Layout>
  )
}
