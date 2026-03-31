import Layout from '@/components/Layout'
import ScoreBar from '@/components/ScoreBar'
import { deals } from '@/lib/data'
import { formatCurrency, stageLabel, stageColor, scoreColor } from '@/lib/utils'
import Link from 'next/link'

const evalCategories = [
  {
    id: 'projectViability',
    label: 'Project Viability',
    description: 'Site readiness, permitting complexity, infrastructure feasibility',
    icon: '🏗️',
  },
  {
    id: 'marketStrength',
    label: 'Market Strength',
    description: 'Market demand, sector growth, regional economic indicators',
    icon: '📈',
  },
  {
    id: 'capitalReadiness',
    label: 'Capital Stack Readiness',
    description: 'Equity requirements, debt availability, tax credit eligibility, grant potential',
    icon: '💰',
  },
  {
    id: 'technologyIntegration',
    label: 'Technology Integration',
    description: 'Renewable integration potential, microgrid feasibility, SmartConnect compatibility',
    icon: '⚡',
  },
  {
    id: 'strategicAlignment',
    label: 'Strategic Alignment',
    description: 'Alignment with partner platforms, scalability, replication potential',
    icon: '🎯',
  },
]

export default function EvaluationPage() {
  const sortedDeals = [...deals].sort((a, b) => b.bdcScore.overall - a.bdcScore.overall)
  const avgScores = {
    projectViability: Math.round(deals.reduce((s, d) => s + d.bdcScore.projectViability, 0) / deals.length),
    marketStrength: Math.round(deals.reduce((s, d) => s + d.bdcScore.marketStrength, 0) / deals.length),
    capitalReadiness: Math.round(deals.reduce((s, d) => s + d.bdcScore.capitalReadiness, 0) / deals.length),
    technologyIntegration: Math.round(deals.reduce((s, d) => s + d.bdcScore.technologyIntegration, 0) / deals.length),
    strategicAlignment: Math.round(deals.reduce((s, d) => s + d.bdcScore.strategicAlignment, 0) / deals.length),
    overall: Math.round(deals.reduce((s, d) => s + d.bdcScore.overall, 0) / deals.length),
  }

  return (
    <Layout title="BDC Evaluation Matrix" subtitle="Deal scoring engine — automated intake criteria processing">
      {/* Portfolio averages */}
      <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid rgba(0,212,255,0.2)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="section-label">PORTFOLIO AVERAGE SCORES</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 data-pulse" />
            <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
              {deals.length} DEALS ANALYZED
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {evalCategories.map((cat, i) => (
              <ScoreBar
                key={cat.id}
                label={cat.label}
                score={avgScores[cat.id as keyof typeof avgScores]}
                delay={i * 80}
              />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-lg" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
            <div className="section-label mb-3">PORTFOLIO OVERALL</div>
            <div
              className="text-7xl font-bold"
              style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)' }}
            >
              {avgScores.overall}
            </div>
            <div className="text-lg" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>/ 100</div>
            <div className="mt-4 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Portfolio performing above institutional infrastructure fund benchmarks
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation criteria reference */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {evalCategories.map(cat => (
          <div key={cat.id} className="rounded-lg p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="text-2xl mb-2">{cat.icon}</div>
            <div className="text-xs font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
              {cat.label}
            </div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
              {cat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Deal comparison table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <span className="section-label">DEAL EVALUATION RANKINGS</span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
            SORTED BY OVERALL SCORE
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ background: 'var(--color-surface)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['#', 'Project', 'Stage', 'Viability', 'Market', 'Capital', 'Technology', 'Alignment', 'OVERALL'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedDeals.map((deal, i) => (
                <tr
                  key={deal.id}
                  className="transition-colors hover:bg-white/3"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: i === 0 ? '#F59E0B' : 'var(--color-text-muted)' }}>
                      #{i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/vault/${deal.id}`}>
                      <div className="text-sm font-semibold hover:underline" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)', maxWidth: 200 }}>
                        {deal.projectName}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        {formatCurrency(deal.capitalRequirement)}
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`tag ${stageColor(deal.stage)}`} style={{ fontSize: 9 }}>
                      {stageLabel(deal.stage)}
                    </span>
                  </td>
                  {[deal.bdcScore.projectViability, deal.bdcScore.marketStrength, deal.bdcScore.capitalReadiness, deal.bdcScore.technologyIntegration, deal.bdcScore.strategicAlignment].map((score, si) => (
                    <td key={si} className="px-4 py-4">
                      <div className={`text-sm font-bold number-display ${scoreColor(score)}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {score}
                      </div>
                      <div className="w-12 h-1 rounded-full mt-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${score}%`, background: score >= 85 ? '#10B981' : score >= 70 ? '#00D4FF' : score >= 55 ? '#F59E0B' : '#EF4444' }}
                        />
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <div
                      className={`text-xl font-bold number-display ${scoreColor(deal.bdcScore.overall)}`}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {deal.bdcScore.overall}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classification guide */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[
          { range: '85–100', label: 'Capital Ready', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5', desc: 'Proceed to capital raise' },
          { range: '70–84', label: 'Structurable', color: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5', desc: 'Structure capital stack' },
          { range: '55–69', label: 'Requires Work', color: 'text-amber-400 border-amber-400/30 bg-amber-400/5', desc: 'Address key gaps' },
          { range: '0–54', label: 'Early Stage', color: 'text-red-400 border-red-400/30 bg-red-400/5', desc: 'Development phase' },
        ].map(tier => (
          <div key={tier.range} className={`rounded-lg p-4 border ${tier.color}`}>
            <div className="text-xs font-bold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{tier.range}</div>
            <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{tier.label}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{tier.desc}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
