import Layout from '@/components/Layout'
import { deals } from '@/lib/data'
import { typeLabel } from '@/lib/utils'
import Link from 'next/link'
import { Link2, Zap, TrendingUp } from 'lucide-react'

export default function CorrelationPage() {
  // Build correlation pairs
  const allCorrelations = deals.flatMap(deal =>
    deal.correlations.map(c => ({
      sourceId: deal.id,
      sourceName: deal.projectName,
      sourceType: deal.projectType,
      targetId: c.dealId,
      targetName: c.dealName,
      overlapType: c.overlapType,
      strength: c.strength,
      opportunity: c.opportunity,
    }))
  )

  // Deduplicate bidirectional
  const seen = new Set<string>()
  const uniqueCorrelations = allCorrelations.filter(c => {
    const key = [c.sourceId, c.targetId].sort().join('-')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  // Cross-platform opportunities (deals sharing platforms)
  const sharedPlatformPairs = deals.flatMap((deal, i) =>
    deals.slice(i + 1).flatMap(other => {
      const shared = deal.platformDistribution.filter(p => other.platformDistribution.includes(p))
      if (shared.length >= 2) {
        return [{ deal1: deal, deal2: other, sharedPlatforms: shared }]
      }
      return []
    })
  )

  // DNA pattern detection
  const ozDeals = deals.filter(d => d.dna.ozEligible)
  const microGridDeals = deals.filter(d => d.dna.technology.includes('microgrid'))
  const patterns = [
    { label: 'Microgrid + Cold Storage + Rural OZ', deals: deals.filter(d => d.dna.technology.includes('microgrid') && d.dna.ozEligible), successRate: 84, note: 'High infrastructure financing success rate' },
    { label: 'SmartConnect + Energy Campus', deals: deals.filter(d => d.dna.technology.includes('smart_connect')), successRate: 91, note: 'Technology integration premium in BDC scoring' },
    { label: 'Opportunity Zone + Infrastructure Debt', deals: ozDeals, successRate: 78, note: 'Blended capital stack with strong investor appetite' },
  ]

  return (
    <Layout title="Strategic Correlation Engine" subtitle="Cross-deal analysis, pattern detection, shared infrastructure opportunities">
      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'CORRELATIONS DETECTED', value: uniqueCorrelations.length, color: '#00D4FF' },
          { label: 'CROSS-PLATFORM PAIRS', value: sharedPlatformPairs.length, color: '#F59E0B' },
          { label: 'PATTERN MATCHES', value: patterns.length, color: '#10B981' },
          { label: 'AVG CORRELATION STRENGTH', value: `${Math.round(uniqueCorrelations.reduce((s, c) => s + c.strength, 0) / (uniqueCorrelations.length || 1) * 100)}%`, color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>{s.label}</div>
            <div className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Direct correlations */}
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <div className="px-5 py-4 border-b flex items-center gap-2" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <Link2 size={14} style={{ color: 'var(--color-accent)' }} />
            <span className="section-label">DIRECT DEAL CORRELATIONS</span>
          </div>
          <div className="divide-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            {uniqueCorrelations.map((c, i) => (
              <div key={i} className="p-4 hover:bg-white/3 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <Link href={`/vault/${c.sourceId}`} className="font-semibold hover:underline truncate" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)', maxWidth: 130 }}>
                        {c.sourceName}
                      </Link>
                      <span style={{ color: 'var(--color-text-muted)' }}>↔</span>
                      <span className="font-semibold truncate" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)', maxWidth: 130 }}>
                        {c.targetName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.08)', color: 'var(--color-accent)', border: '1px solid rgba(0,212,255,0.15)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        {c.overlapType}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: c.strength >= 0.85 ? '#10B981' : c.strength >= 0.7 ? '#00D4FF' : '#F59E0B' }}>
                      {Math.round(c.strength * 100)}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>STRENGTH</div>
                  </div>
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {c.opportunity}
                </div>
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.strength * 100}%`,
                      background: c.strength >= 0.85 ? '#10B981' : c.strength >= 0.7 ? '#00D4FF' : '#F59E0B',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DNA Pattern detection */}
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <TrendingUp size={14} style={{ color: '#F59E0B' }} />
              <span className="section-label">DEAL DNA PATTERN DETECTION</span>
            </div>
            <div className="divide-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {patterns.map((p, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="text-sm font-semibold"
                      style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)', fontSize: 11 }}
                    >
                      {p.label}
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#10B981' }}>{p.successRate}%</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>SUCCESS RATE</div>
                    </div>
                  </div>
                  <div className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{p.note}</div>
                  <div className="flex flex-wrap gap-1">
                    {p.deals.map(d => (
                      <Link key={d.id} href={`/vault/${d.id}`}>
                        <span className="px-2 py-0.5 rounded text-xs hover:opacity-80 transition-opacity" style={{ background: 'rgba(245,158,11,0.08)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                          {d.projectName.split(' ').slice(0, 3).join(' ')}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-platform opportunities */}
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <Zap size={14} style={{ color: '#A78BFA' }} />
              <span className="section-label">CROSS-PLATFORM OPPORTUNITIES</span>
            </div>
            <div className="divide-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {sharedPlatformPairs.length === 0 ? (
                <div className="p-4 text-xs text-center" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                  No multi-platform pairs detected yet
                </div>
              ) : (
                sharedPlatformPairs.map((pair, i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      <span className="font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                        {pair.deal1.projectName.split(' ').slice(0, 3).join(' ')}
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }}>+</span>
                      <span className="font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                        {pair.deal2.projectName.split(' ').slice(0, 3).join(' ')}
                      </span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {pair.sharedPlatforms.map(p => (
                        <span key={p} className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                          {p}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        shared platforms
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Integrated platform vision */}
      <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid rgba(0,212,255,0.15)' }}>
        <div className="section-label mb-4">INTEGRATED INFRASTRUCTURE PLATFORM — DETECTED OPPORTUNITY</div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {[
            { name: 'Gulf Coast Cold Storage', type: 'cold_storage' },
            { name: 'Louisiana Energy Campus', type: 'energy_campus' },
            { name: 'Mississippi AgriTech', type: 'agriculture' },
          ].map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="rounded px-3 py-2 text-center" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)', minWidth: 140 }}>
                <div className="text-xs font-semibold mb-0.5" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>{item.name}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{typeLabel(item.type as 'cold_storage' | 'energy_campus' | 'agriculture')}</div>
              </div>
              {i < 2 && <span style={{ color: 'var(--color-accent)', fontSize: 18 }}>→</span>}
            </div>
          ))}
          <div className="ml-4 p-3 rounded-lg" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}>
            <div className="text-xs font-bold mb-1" style={{ color: 'var(--color-accent)', fontFamily: 'JetBrains Mono, monospace' }}>= INTEGRATED PLATFORM</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Cold chain + renewable power + agriculture supply</div>
            <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>Estimated shared infrastructure savings: 12–18%</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
