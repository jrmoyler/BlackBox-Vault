import Layout from '@/components/Layout'
import { deals } from '@/lib/data'
import { formatCurrency, platformColor } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

type Platform = 'BDC' | 'GDG' | 'RRG' | 'EnerGenius'

const platformDetails: Record<Platform, { name: string; description: string; role: string; outputs: string[]; color: string }> = {
  BDC: {
    name: 'Business Development Concepts',
    description: 'Capital structuring, lender network, deal evaluation, and investor packaging.',
    role: 'Capital & Lender Network',
    outputs: ['Deal evaluation packages', 'Lender presentation materials', 'Capital stack modeling', 'Investor introductions'],
    color: '#F59E0B',
  },
  GDG: {
    name: 'Guardian Development Group',
    description: 'Project development, site control, and execution from ground-up to delivery.',
    role: 'Development Execution',
    outputs: ['Development execution strategy', 'Site development requirements', 'Project management', 'Construction oversight'],
    color: '#00D4FF',
  },
  RRG: {
    name: 'Renewable Resource Group',
    description: 'Energy infrastructure, power generation, and resilience system design.',
    role: 'Energy Infrastructure',
    outputs: ['Energy infrastructure analysis', 'Microgrid feasibility reports', 'Power generation specs', 'Grid interconnection strategy'],
    color: '#10B981',
  },
  EnerGenius: {
    name: 'EnerGenius Platform',
    description: 'Microgrid systems, energy monitoring, and SmartConnect analytics deployment.',
    role: 'Energy Monitoring + Microgrid',
    outputs: ['SmartConnect integration', 'Energy optimization strategy', 'Monitoring deployment', 'Performance analytics'],
    color: '#A78BFA',
  },
}

export default function DistributionPage() {
  const platforms: Platform[] = ['BDC', 'GDG', 'RRG', 'EnerGenius']

  return (
    <Layout title="Platform Distribution Engine" subtitle="Intelligence routing — where deal data flows after analysis">
      {/* Distribution overview diagram */}
      <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid rgba(0,212,255,0.15)' }}>
        <div className="section-label mb-6">DISTRIBUTION FLOW — BLACK BOX → PLATFORMS</div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Source */}
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-lg flex flex-col items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.4)' }}
            >
              <div className="text-2xl mb-1">⬛</div>
              <div className="text-xs font-bold text-center" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)', fontSize: 9 }}>
                BLACK BOX
              </div>
              <div className="text-xs text-center" style={{ color: 'var(--color-text-muted)', fontSize: 8, fontFamily: 'JetBrains Mono, monospace' }}>
                VAULT
              </div>
            </div>
          </div>

          <ArrowRight size={24} style={{ color: 'var(--color-text-muted)' }} />

          {/* Platforms */}
          <div className="grid grid-cols-2 gap-3">
            {platforms.map(p => {
              const detail = platformDetails[p]
              const dealCount = deals.filter(d => d.platformDistribution.includes(p)).length
              return (
                <div
                  key={p}
                  className="rounded-lg p-4 text-center"
                  style={{ background: `${detail.color}08`, border: `1px solid ${detail.color}30`, minWidth: 140 }}
                >
                  <div className="font-bold text-base mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace', color: detail.color }}>{p}</div>
                  <div className="text-xs mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                    {detail.role}
                  </div>
                  <div className="text-xs" style={{ color: detail.color }}>
                    {dealCount} deal{dealCount !== 1 ? 's' : ''} routed
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Platform deep-dive */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {platforms.map(platform => {
          const detail = platformDetails[platform]
          const platformDeals = deals.filter(d => d.platformDistribution.includes(platform))
          const totalCapital = platformDeals.reduce((s, d) => s + d.capitalRequirement, 0)

          return (
            <div key={platform} className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: `1px solid ${detail.color}25` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-bold text-lg" style={{ fontFamily: 'JetBrains Mono, monospace', color: detail.color }}>{platform}</div>
                  <div className="text-xs font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-secondary)' }}>{detail.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: detail.color }}>
                    {platformDeals.length}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>DEALS</div>
                </div>
              </div>

              <div className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {detail.description}
              </div>

              <div className="mb-4">
                <div className="text-xs mb-2 section-label" style={{ fontSize: 9, color: detail.color, opacity: 0.7 }}>OUTPUT PRODUCTS</div>
                <div className="space-y-1">
                  {detail.outputs.map(output => (
                    <div key={output} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: detail.color }} />
                      {output}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>TOTAL CAPITAL ROUTED</span>
                  <span className="font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: detail.color }}>{formatCurrency(totalCapital)}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {platformDeals.map(d => (
                    <Link key={d.id} href={`/vault/${d.id}`}>
                      <span
                        className="text-xs px-2 py-0.5 rounded hover:opacity-80 transition-opacity"
                        style={{ background: `${detail.color}10`, color: detail.color, border: `1px solid ${detail.color}25`, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
                      >
                        {d.projectName.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Distribution matrix table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <Zap size={14} style={{ color: 'var(--color-accent)' }} />
          <span className="section-label">DEAL DISTRIBUTION MATRIX</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ background: 'var(--color-surface)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="px-5 py-3 text-left text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>PROJECT</th>
                {platforms.map(p => (
                  <th key={p} className="px-4 py-3 text-center text-xs" style={{ color: platformDetails[p].color, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-white/3 transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-5 py-3">
                    <Link href={`/vault/${deal.id}`} className="text-sm font-semibold hover:underline" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                      {deal.projectName.split(' ').slice(0, 3).join(' ')}
                    </Link>
                  </td>
                  {platforms.map(p => (
                    <td key={p} className="px-4 py-3 text-center">
                      {deal.platformDistribution.includes(p) ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center mx-auto" style={{ background: `${platformDetails[p].color}20` }}>
                          <div className="w-2 h-2 rounded-full" style={{ background: platformDetails[p].color }} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 mx-auto flex items-center justify-center">
                          <div className="w-1.5 h-px" style={{ background: 'var(--color-border)' }} />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
