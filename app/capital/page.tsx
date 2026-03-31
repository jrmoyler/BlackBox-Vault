import Layout from '@/components/Layout'
import { deals } from '@/lib/data'
import { formatCurrency, stageColor, stageLabel } from '@/lib/utils'
import Link from 'next/link'

export default function CapitalPage() {
  const totalEquity = deals.reduce((s, d) => s + d.capitalStack.equity, 0)
  const totalDebt = deals.reduce((s, d) => s + d.capitalStack.debt, 0)
  const totalIncentives = deals.reduce((s, d) => s + d.capitalStack.incentives, 0)
  const totalCapital = totalEquity + totalDebt + totalIncentives

  const investorTypes = [...new Set(deals.flatMap(d => d.capitalStack.investorTypes))]
  const incentiveTypes = [...new Set(deals.flatMap(d => d.capitalStack.incentiveTypes))]
  const debtTypes = [...new Set(deals.flatMap(d => d.capitalStack.debtStructure))]

  return (
    <Layout title="Capital Stack Engine" subtitle="Debt structuring, tax credit integration, infrastructure finance modeling">
      {/* Portfolio capital overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'TOTAL EQUITY', value: formatCurrency(totalEquity), pct: Math.round(totalEquity / totalCapital * 100), color: '#00D4FF', bg: 'rgba(0,212,255,0.06)' },
          { label: 'TOTAL DEBT', value: formatCurrency(totalDebt), pct: Math.round(totalDebt / totalCapital * 100), color: '#F59E0B', bg: 'rgba(245,158,11,0.06)' },
          { label: 'TOTAL INCENTIVES', value: formatCurrency(totalIncentives), pct: Math.round(totalIncentives / totalCapital * 100), color: '#10B981', bg: 'rgba(16,185,129,0.06)' },
        ].map(item => (
          <div key={item.label} className="rounded-lg p-5" style={{ background: item.bg, border: `1px solid ${item.color}30` }}>
            <div className="section-label mb-3" style={{ color: item.color, opacity: 0.7 }}>{item.label}</div>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: item.color }}>
              {item.value}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              {item.pct}% of total pipeline
            </div>
          </div>
        ))}
      </div>

      {/* Visual capital stack waterfall */}
      <div className="rounded-lg p-5 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="section-label mb-4">PORTFOLIO CAPITAL STACK — {formatCurrency(totalCapital)} TOTAL</div>
        <div className="space-y-3">
          {[
            { label: 'Senior Debt / Infrastructure Finance', value: totalDebt * 0.65, color: '#F59E0B', description: 'Construction loans, infrastructure term debt, project finance' },
            { label: 'Mezzanine / Junior Debt', value: totalDebt * 0.35, color: '#FB923C', description: 'Subordinated debt, bridge financing, USDA programs' },
            { label: 'Tax Credit Equity', value: totalIncentives * 0.6, color: '#10B981', description: 'ITC, PTC, NMTC, Opportunity Zone equity' },
            { label: 'Grants & Incentives', value: totalIncentives * 0.4, color: '#34D399', description: 'Federal grants, state programs, EPA incentives' },
            { label: 'Equity (Institutional)', value: totalEquity * 0.6, color: '#00D4FF', description: 'Infrastructure funds, pension capital, sovereign wealth' },
            { label: 'Equity (Impact / Family Office)', value: totalEquity * 0.4, color: '#67E8F9', description: 'Family offices, impact investors, climate capital' },
          ].map(item => {
            const pct = (item.value / totalCapital) * 100
            return (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-48 flex-shrink-0">
                  <div className="text-xs font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)', fontSize: 11 }}>{item.label}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{item.description}</div>
                </div>
                <div className="flex-1 h-6 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div
                    className="h-full rounded flex items-center px-2 transition-all duration-1000"
                    style={{ width: `${Math.max(pct, 3)}%`, background: item.color }}
                  >
                    <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#060810', fontSize: 10 }}>
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
                <div className="w-10 text-right text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: item.color }}>
                  {pct.toFixed(1)}%
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Investor types */}
        <div className="rounded-lg p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">INVESTOR TYPES ACTIVE</div>
          <div className="space-y-2">
            {investorTypes.map((type, i) => (
              <div key={type} className="flex items-center gap-2 text-sm py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,255,0.1)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--color-accent)' }}>
                  {i + 1}
                </div>
                <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'Syne, sans-serif', fontSize: 13 }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Incentive programs */}
        <div className="rounded-lg p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">INCENTIVE PROGRAMS</div>
          <div className="space-y-2">
            {incentiveTypes.map(type => (
              <div key={type} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'Syne, sans-serif' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Debt structures */}
        <div className="rounded-lg p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">DEBT STRUCTURES</div>
          <div className="space-y-2">
            {debtTypes.map(type => (
              <div key={type} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'Syne, sans-serif' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-deal capital table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 border-b" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <span className="section-label">DEAL-BY-DEAL CAPITAL PROFILES</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ background: 'var(--color-surface)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Project', 'Stage', 'Total Capital', 'Equity', 'Debt', 'Incentives', 'Investor Types'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-white/3 transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-3">
                    <Link href={`/vault/${deal.id}`} className="text-sm font-semibold hover:underline" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                      {deal.projectName.split(' ').slice(0, 3).join(' ')}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag ${stageColor(deal.stage)}`} style={{ fontSize: 9 }}>{stageLabel(deal.stage)}</span>
                  </td>
                  <td className="px-4 py-3 font-bold number-display" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B', fontSize: 13 }}>
                    {formatCurrency(deal.capitalStack.totalCapital)}
                  </td>
                  <td className="px-4 py-3 text-sm number-display" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#00D4FF' }}>
                    {formatCurrency(deal.capitalStack.equity)}
                  </td>
                  <td className="px-4 py-3 text-sm number-display" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B' }}>
                    {formatCurrency(deal.capitalStack.debt)}
                  </td>
                  <td className="px-4 py-3 text-sm number-display" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#10B981' }}>
                    {formatCurrency(deal.capitalStack.incentives)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {deal.capitalStack.investorTypes.slice(0, 2).map(t => (
                        <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,255,0.06)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
