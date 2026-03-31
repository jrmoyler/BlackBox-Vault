import Layout from '@/components/Layout'
import StatCard from '@/components/StatCard'
import DealCard from '@/components/DealCard'
import { deals, platformStats, marketSignals } from '@/lib/data'
import { formatCurrency, stageLabel, stageColor } from '@/lib/utils'
import { AlertTriangle, TrendingUp, Zap, ArrowRight, Activity } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const recentDeals = deals.slice(0, 3)
  const topDeal = [...deals].sort((a, b) => b.bdcScore.overall - a.bdcScore.overall)[0]

  const layerFlow = [
    { id: 'L1', label: 'Project Sources', items: ['Energy Campuses', 'Cold Storage', 'WTE', 'AgriTech', 'Digital'] },
    { id: 'L2', label: 'Domain Platforms', items: ['BDC', 'GDG', 'RRG', 'EnerGenius'] },
    { id: 'L3', label: 'Data Ingestion', items: ['Documents', 'Reports', 'CAD', 'Financial Models'] },
    { id: 'L4', label: 'BLACK BOX Vault', items: ['Central Storage', 'Deal History', 'Market Intel'] },
    { id: 'L5', label: 'Deal DNA', items: ['Sector Tags', 'Tech Class', 'Capital Type'] },
    { id: 'L6', label: 'BDC Engine', items: ['Scoring', 'Risk Analysis', 'Readiness'] },
    { id: 'L7', label: 'Correlation', items: ['Cross-Deal', 'Pattern Detection'] },
    { id: 'L8', label: 'Capital Stack', items: ['Debt', 'Tax Credits', 'Finance Modeling'] },
    { id: 'L9', label: 'Packaging', items: ['IM', 'Lender Pkg', 'Partnership'] },
    { id: 'L10', label: 'Distribution', items: ['BDC', 'GDG', 'RRG', 'EnerGenius'] },
  ]

  return (
    <Layout title="Command Center" subtitle="BLACK BOX Deal Intelligence Platform">
      {/* System status banner */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg mb-6 text-xs"
        style={{
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.15)',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        <span className="text-emerald-400 data-pulse">●</span>
        <span style={{ color: 'var(--color-accent)' }}>BLACK BOX ONLINE</span>
        <span style={{ color: 'var(--color-text-muted)' }}>—</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {deals.length} active deals · {deals.reduce((s, d) => s + d.documents.length, 0)} documents indexed ·{' '}
          {marketSignals.length} market signals detected
        </span>
        <span className="ml-auto" style={{ color: 'var(--color-text-muted)' }}>
          VAULT INTEGRITY: 100%
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="TOTAL DEALS" value={platformStats.totalDeals} sub="Across all platforms" accent="cyan" delay={0} />
        <StatCard label="TOTAL CAPITAL" value={formatCurrency(platformStats.totalCapital)} sub="Pipeline value" accent="amber" delay={80} />
        <StatCard label="AVG BDC SCORE" value={platformStats.avgBdcScore} suffix="%" sub="Portfolio average" accent="green" delay={160} />
        <StatCard label="LENDER READY" value={platformStats.dealsByStage.lender_ready} sub="Ready for capital raise" accent="cyan" delay={240} />
      </div>

      {/* Main 3-col grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Recent deals — 2 col */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <span className="section-label">RECENT DEALS</span>
            <Link href="/vault" className="text-xs hover:underline" style={{ color: 'var(--color-accent)', fontFamily: 'JetBrains Mono, monospace' }}>
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {recentDeals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Market signals — 1 col */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="section-label">MARKET SIGNALS</span>
            <Link href="/market" className="text-xs hover:underline" style={{ color: 'var(--color-accent)', fontFamily: 'JetBrains Mono, monospace' }}>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {marketSignals.map((sig) => (
              <div
                key={sig.id}
                className="rounded-lg p-4"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded border ${
                      sig.strength === 'high' ? 'text-red-400 border-red-400/30 bg-red-400/10' :
                      sig.strength === 'medium' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                      'text-blue-400 border-blue-400/30 bg-blue-400/10'
                    }`}
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}
                  >
                    {sig.strength.toUpperCase()} SIGNAL
                  </span>
                </div>
                <div className="font-semibold text-sm mb-1" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                  {sig.sector}
                </div>
                <div className="text-xs mb-3 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                  <Activity size={11} />
                  {sig.region}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {sig.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10-Layer Architecture Flow */}
      <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="section-label mb-4">10-LAYER ARCHITECTURE FLOW</div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {layerFlow.map((layer, i) => (
              <div key={layer.id} className="flex items-center gap-2">
                <div
                  className="rounded p-3 flex-shrink-0"
                  style={{
                    background: 'var(--color-surface-high)',
                    border: '1px solid var(--color-border)',
                    minWidth: 120,
                  }}
                >
                  <div
                    className="text-xs font-bold mb-2"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: layer.id === 'L4' || layer.id === 'L6' || layer.id === 'L7' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      fontSize: 9,
                    }}
                  >
                    {layer.id}
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)', fontSize: 11 }}>
                    {layer.label}
                  </div>
                  <div className="space-y-1">
                    {layer.items.map(item => (
                      <div key={item} className="text-xs" style={{ color: 'var(--color-text-muted)', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}>
                        · {item}
                      </div>
                    ))}
                  </div>
                </div>
                {i < layerFlow.length - 1 && (
                  <ArrowRight size={14} style={{ color: 'var(--color-border)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deal stage pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage breakdown */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">DEAL PIPELINE BY STAGE</div>
          <div className="space-y-3">
            {(Object.entries(platformStats.dealsByStage) as [keyof typeof platformStats.dealsByStage, number][]).map(([stage, count]) => {
              const pct = (count / platformStats.totalDeals) * 100
              return (
                <div key={stage} className="flex items-center gap-3">
                  <span className={`tag ${stageColor(stage)}`} style={{ minWidth: 100, textAlign: 'center', fontSize: 9 }}>
                    {stageLabel(stage)}
                  </span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full bg-cyan-400"
                      style={{ width: `${pct}%`, transition: 'width 1s ease' }}
                    />
                  </div>
                  <span className="text-xs number-display w-4 text-right" style={{ color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Risk indicators from top deal */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">ACTIVE RISK INDICATORS</div>
          <div className="space-y-2">
            {deals.flatMap(d => d.riskIndicators.map(r => ({ deal: d.projectName, risk: r }))).slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <AlertTriangle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{item.risk}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                    {item.deal}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
