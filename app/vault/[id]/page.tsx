import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import ScoreBar from '@/components/ScoreBar'
import { deals } from '@/lib/data'
import { formatCurrency, stageLabel, stageColor, typeLabel, platformColor } from '@/lib/utils'
import { FileText, MapPin, User, AlertTriangle, ArrowRight, CheckCircle, Link2 } from 'lucide-react'

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deal = deals.find(d => d.id === id)
  if (!deal) notFound()

  const docTypeColor: Record<string, string> = {
    feasibility: 'text-cyan-400',
    financial: 'text-amber-400',
    architectural: 'text-purple-400',
    engineering: 'text-emerald-400',
    site_control: 'text-blue-400',
    market: 'text-pink-400',
    legal: 'text-red-400',
    operational: 'text-orange-400',
  }

  return (
    <Layout title={deal.projectName} subtitle={`${deal.location} · ${typeLabel(deal.projectType)}`}>
      {/* Header row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={`tag ${stageColor(deal.stage)}`}>{stageLabel(deal.stage)}</span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          <MapPin size={11} className="inline mr-1" />{deal.location}
        </span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          <User size={11} className="inline mr-1" />{deal.sponsor}
        </span>
        <span className="ml-auto text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          Updated {deal.updatedAt}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left col - main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Section title="PROJECT OVERVIEW">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Capital Requirement', value: formatCurrency(deal.capitalRequirement), color: '#F59E0B' },
                { label: 'Technology', value: deal.technology, color: 'var(--color-text-primary)' },
                { label: 'Infrastructure', value: deal.infrastructureType, color: 'var(--color-text-primary)' },
                { label: 'Project Type', value: typeLabel(deal.projectType), color: 'var(--color-text-primary)' },
                { label: 'OZ Eligible', value: deal.dna.ozEligible ? 'Yes' : 'No', color: deal.dna.ozEligible ? '#10B981' : '#7A8BA0' },
                { label: 'Sector', value: deal.dna.sector, color: 'var(--color-text-primary)' },
              ].map(item => (
                <div key={item.label}>
                  <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                    {item.label.toUpperCase()}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: item.color, fontFamily: 'Syne, sans-serif' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* BDC Evaluation */}
          <Section title="BDC EVALUATION MATRIX">
            <div className="flex items-center gap-4 mb-5">
              <div
                className="flex flex-col items-center justify-center w-20 h-20 rounded-full flex-shrink-0"
                style={{ background: 'rgba(0,212,255,0.08)', border: '2px solid rgba(0,212,255,0.3)' }}
              >
                <div className="text-2xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)' }}>
                  {deal.bdcScore.overall}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                  OVERALL
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <ScoreBar label="Project Viability" score={deal.bdcScore.projectViability} delay={0} />
                <ScoreBar label="Market Strength" score={deal.bdcScore.marketStrength} delay={100} />
                <ScoreBar label="Capital Readiness" score={deal.bdcScore.capitalReadiness} delay={200} />
                <ScoreBar label="Technology Integration" score={deal.bdcScore.technologyIntegration} delay={300} />
                <ScoreBar label="Strategic Alignment" score={deal.bdcScore.strategicAlignment} delay={400} />
              </div>
            </div>
          </Section>

          {/* Capital Stack */}
          <Section title="CAPITAL STACK PROFILE">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'EQUITY', value: formatCurrency(deal.capitalStack.equity), pct: Math.round(deal.capitalStack.equity / deal.capitalStack.totalCapital * 100), color: '#00D4FF' },
                { label: 'DEBT', value: formatCurrency(deal.capitalStack.debt), pct: Math.round(deal.capitalStack.debt / deal.capitalStack.totalCapital * 100), color: '#F59E0B' },
                { label: 'INCENTIVES', value: formatCurrency(deal.capitalStack.incentives), pct: Math.round(deal.capitalStack.incentives / deal.capitalStack.totalCapital * 100), color: '#10B981' },
              ].map(item => (
                <div key={item.label} className="text-center p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>{item.label}</div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: item.color }}>{item.value}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{item.pct}%</div>
                </div>
              ))}
            </div>
            <div className="h-2 rounded-full overflow-hidden flex">
              {[
                { pct: deal.capitalStack.equity / deal.capitalStack.totalCapital * 100, color: '#00D4FF' },
                { pct: deal.capitalStack.debt / deal.capitalStack.totalCapital * 100, color: '#F59E0B' },
                { pct: deal.capitalStack.incentives / deal.capitalStack.totalCapital * 100, color: '#10B981' },
              ].map((s, i) => (
                <div key={i} className="h-full transition-all duration-1000" style={{ width: `${s.pct}%`, background: s.color }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="section-label mb-2" style={{ fontSize: 9 }}>DEBT STRUCTURE</div>
                {deal.capitalStack.debtStructure.map(s => (
                  <div key={s} className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {s}
                  </div>
                ))}
              </div>
              <div>
                <div className="section-label mb-2" style={{ fontSize: 9 }}>INCENTIVE TYPES</div>
                {deal.capitalStack.incentiveTypes.map(s => (
                  <div key={s} className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Market Profile */}
          <Section title="MARKET PROFILE">
            <div className="space-y-3">
              {[
                { label: 'MARKET DEMAND', value: deal.marketProfile.demand },
                { label: 'SECTOR GROWTH', value: deal.marketProfile.sectorGrowth },
                { label: 'REGIONAL INDICATORS', value: deal.marketProfile.regionalIndicators },
              ].map(item => (
                <div key={item.label} className="p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                  <div className="text-xs mb-1 section-label" style={{ fontSize: 9 }}>{item.label}</div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'Syne, sans-serif' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right col */}
        <div className="space-y-4">
          {/* Deal DNA */}
          <Section title="DEAL DNA">
            <div className="space-y-3">
              <DNARow label="SECTOR" value={deal.dna.sector} color="#00D4FF" />
              <DNARow label="GEOGRAPHY" value={deal.dna.geography} color="#F59E0B" />
              <div>
                <div className="text-xs mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>TECHNOLOGY</div>
                <div className="flex flex-wrap gap-1">
                  {deal.dna.technology.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs mb-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>CAPITAL STACK</div>
                <div className="flex flex-wrap gap-1">
                  {deal.dna.capitalStack.map(c => (
                    <span key={c} className="px-2 py-0.5 rounded text-xs" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Platform Distribution */}
          <Section title="PLATFORM DISTRIBUTION">
            <div className="space-y-2">
              {deal.platformDistribution.map(p => (
                <div key={p} className={`flex items-center gap-2 px-3 py-2 rounded border ${platformColor(p)}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p}</span>
                  <ArrowRight size={12} className="ml-auto opacity-50" />
                </div>
              ))}
            </div>
          </Section>

          {/* Correlations */}
          {deal.correlations.length > 0 && (
            <Section title="STRATEGIC CORRELATIONS">
              <div className="space-y-3">
                {deal.correlations.map(c => (
                  <div key={c.dealId} className="p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Link2 size={11} style={{ color: 'var(--color-accent)' }} />
                      <span className="text-xs font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>{c.dealName}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{c.overlapType}</span>
                      <span className="text-xs font-bold" style={{ color: 'var(--color-accent)', fontFamily: 'JetBrains Mono, monospace' }}>{Math.round(c.strength * 100)}%</span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{c.opportunity}</div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Documents */}
          <Section title="DOCUMENT VAULT">
            <div className="space-y-2">
              {deal.documents.map(doc => (
                <div key={doc.id} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                  <FileText size={12} className={docTypeColor[doc.type] || 'text-gray-400'} />
                  <span className="flex-1 text-xs truncate" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-text-secondary)', fontSize: 11 }}>{doc.name}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{doc.size}</span>
                    {doc.processed ? <CheckCircle size={11} className="text-emerald-400" /> : <div className="w-2.5 h-2.5 rounded-full border border-amber-400 data-pulse" />}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Risk + Next Steps */}
          <Section title="RISK INDICATORS">
            {deal.riskIndicators.map((r, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <AlertTriangle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{r}</span>
              </div>
            ))}
          </Section>

          <Section title="STRATEGIC NEXT STEPS">
            {deal.strategicNextSteps.map((s, i) => (
              <div key={i} className="flex items-start gap-2 mb-2">
                <span className="text-xs font-bold mt-0.5 flex-shrink-0" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)', minWidth: 16 }}>
                  {i + 1}.
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{s}</span>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </Layout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="section-label mb-4">{title}</div>
      {children}
    </div>
  )
}

function DNARow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>{label}</div>
      <div className="text-sm font-semibold" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
    </div>
  )
}
