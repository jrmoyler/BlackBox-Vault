import Layout from '@/components/Layout'
import { mockMarketSignals, mockDeals } from '@/lib/data'
import { TrendingUp, Zap, BarChart3, AlertCircle } from 'lucide-react'

const marketTrends = [
  { sector: 'Cold Storage', trend: '+14%', driver: 'Food logistics demand surge', region: 'Gulf Coast', outlook: 'Strong', color: '#00D4FF' },
  { sector: 'Digital Infrastructure', trend: '+40%', driver: 'AI compute demand acceleration', region: 'Texas / Southwest', outlook: 'Exceptional', color: '#F59E0B' },
  { sector: 'Renewable Energy', trend: '+23%', driver: 'Industrial reshoring + carbon incentives', region: 'Southeast US', outlook: 'Strong', color: '#10B981' },
  { sector: 'Agriculture Tech', trend: '+31%', driver: 'Food security + supply chain resilience', region: 'Mississippi Delta', outlook: 'Growing', color: '#A78BFA' },
  { sector: 'Waste-to-Energy', trend: '+8%', driver: 'Landfill restrictions + municipal contracts', region: 'Midwest', outlook: 'Stable', color: '#FB923C' },
]

const capitalFlows = [
  { sector: 'Data Centers', amount: '$18B+', region: 'Texas Energy Corridor', source: 'Infrastructure + Private Equity' },
  { sector: 'Cold Chain Logistics', amount: '$4.2B', region: 'Gulf Coast', source: 'Institutional + Family Office' },
  { sector: 'Renewable Energy', amount: '$11B', region: 'Southeast US', source: 'Climate Funds + Project Finance' },
  { sector: 'Controlled Env Agriculture', amount: '$2.8B', region: 'National', source: 'Impact + CDFI + USDA' },
]

export default function MarketPage() {
  return (
    <Layout title="Market Intelligence" subtitle="Sector trends, capital flows, infrastructure opportunity signals">
      {/* Live signals */}
      <div className="section-label mb-4">LIVE MARKET SIGNALS — {new Date().toLocaleDateString()}</div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {mockMarketSignals.map(sig => (
          <div
            key={sig.id}
            className="rounded-lg p-5"
            style={{
              background: 'var(--color-surface)',
              border: `1px solid ${sig.strength === 'high' ? 'rgba(239,68,68,0.3)' : sig.strength === 'medium' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)'}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-0.5 rounded text-xs border ${
                  sig.strength === 'high' ? 'text-red-400 border-red-400/30 bg-red-400/10 data-pulse' :
                  sig.strength === 'medium' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                  'text-blue-400 border-blue-400/30 bg-blue-400/10'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}
              >
                {sig.strength.toUpperCase()} SIGNAL
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                {sig.detectedAt}
              </span>
            </div>
            <div className="font-bold text-base mb-1" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
              {sig.sector}
            </div>
            <div className="text-xs mb-3 flex items-center gap-1" style={{ color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}>
              📍 {sig.region}
            </div>
            <div className="space-y-1 mb-4">
              {sig.drivers.map(d => (
                <div key={d} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  <div className="w-1 h-1 rounded-full bg-current opacity-50 flex-shrink-0" />
                  {d}
                </div>
              ))}
            </div>
            <div
              className="p-3 rounded text-xs leading-relaxed"
              style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)', color: 'var(--color-text-secondary)' }}
            >
              <span className="font-bold" style={{ color: 'var(--color-accent)' }}>→ </span>
              {sig.recommendation}
            </div>
          </div>
        ))}
      </div>

      {/* Sector trends table */}
      <div className="rounded-lg overflow-hidden mb-6" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <TrendingUp size={14} style={{ color: 'var(--color-accent)' }} />
          <span className="section-label">SECTOR GROWTH TRENDS</span>
        </div>
        <div style={{ background: 'var(--color-surface)' }}>
          {marketTrends.map((trend, i) => (
            <div
              key={trend.sector}
              className="px-5 py-4 border-b hover:bg-white/3 transition-colors flex flex-wrap items-center gap-4"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div style={{ minWidth: 160 }}>
                <div className="font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>{trend.sector}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>📍 {trend.region}</div>
              </div>
              <div className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: trend.color }}>
                {trend.trend}
              </div>
              <div className="flex-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {trend.driver}
              </div>
              <span
                className="px-2.5 py-1 rounded text-xs border"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  color: trend.color,
                  borderColor: `${trend.color}30`,
                  background: `${trend.color}10`,
                }}
              >
                {trend.outlook}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Capital flow analysis */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={14} style={{ color: '#F59E0B' }} />
            <span className="section-label">CAPITAL FLOW ANALYSIS</span>
          </div>
          <div className="space-y-3">
            {capitalFlows.map(flow => (
              <div key={flow.sector} className="p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>{flow.sector}</span>
                  <span className="text-base font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B' }}>{flow.amount}</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                  {flow.region} · {flow.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure opportunity scanner */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} style={{ color: '#10B981' }} />
            <span className="section-label">INFRASTRUCTURE OPPORTUNITY SCANNER</span>
          </div>
          <div className="space-y-3">
            {[
              { region: 'Gulf Coast', score: 91, opportunities: ['Cold storage + microgrid', 'Agricultural cold chain', 'Port logistics tech'] },
              { region: 'Texas Energy Corridor', score: 96, opportunities: ['Data center + power', 'Grid modernization', 'Industrial microgrids'] },
              { region: 'Mississippi Delta', score: 74, opportunities: ['Controlled env agriculture', 'Rural OZ development', 'Food processing'] },
              { region: 'Ohio / Midwest', score: 69, opportunities: ['WTE facilities', 'Smart city infrastructure', 'Industrial revival'] },
            ].map(region => (
              <div key={region.region} className="p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                    {region.region}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#10B981' }}>
                      {region.score}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {region.opportunities.map(opp => (
                    <span key={opp} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(16,185,129,0.08)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                      {opp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic intelligence note */}
      <div className="rounded-lg p-5" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)' }}>
        <div className="flex items-start gap-3">
          <AlertCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
              BLACK BOX Pattern Match — Portfolio Intelligence
            </div>
            <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Current portfolio matches <strong style={{ color: 'var(--color-accent)' }}>84%</strong> of successful infrastructure deals previously analyzed by the platform.
              The Gulf Coast cold storage + microgrid + OZ combination has historically demonstrated the highest financing close rate in this database.
              Recommend prioritizing lender package completion on Deal #BB-001 before Q1 ends.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
