'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { deals } from '@/lib/data'
import { formatCurrency, stageLabel, stageColor, scoreColor } from '@/lib/utils'
import { FileText, Download, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

type PackageType = 'investment_memo' | 'lender_package' | 'partnership_package'

export default function PackagingPage() {
  const [generating, setGenerating] = useState<string | null>(null)
  const [generated, setGenerated] = useState<Set<string>>(new Set())

  const handleGenerate = async (dealId: string, type: PackageType) => {
    const key = `${dealId}-${type}`
    setGenerating(key)
    await new Promise(r => setTimeout(r, 2200))
    setGenerating(null)
    setGenerated(prev => new Set([...prev, key]))
  }

  const eligibleDeals = deals.filter(d => d.bdcScore.overall >= 70)

  const packageTypes = [
    {
      id: 'investment_memo' as PackageType,
      label: 'Investment Memorandum',
      description: 'Project overview, market analysis, capital stack, financial projections',
      icon: '📋',
      color: '#00D4FF',
      minScore: 70,
    },
    {
      id: 'lender_package' as PackageType,
      label: 'Lender Package',
      description: 'Construction budget, sources & uses, debt service coverage, financial projections',
      icon: '🏦',
      color: '#F59E0B',
      minScore: 75,
    },
    {
      id: 'partnership_package' as PackageType,
      label: 'Strategic Partnership Package',
      description: 'Technology partners, development team, platform integration strategy',
      icon: '🤝',
      color: '#10B981',
      minScore: 70,
    },
  ]

  return (
    <Layout title="Investor Packaging Engine" subtitle="Deal output packages — IM, lender packages, partnership decks">
      {/* Package type overview */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {packageTypes.map(pkg => (
          <div key={pkg.id} className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: `1px solid ${pkg.color}25` }}>
            <div className="text-3xl mb-3">{pkg.icon}</div>
            <div className="font-bold text-sm mb-2" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
              {pkg.label}
            </div>
            <div className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              {pkg.description}
            </div>
            <div className="text-xs" style={{ color: pkg.color, fontFamily: 'JetBrains Mono, monospace' }}>
              Min BDC Score: {pkg.minScore}+
            </div>
          </div>
        ))}
      </div>

      {/* Generation matrix */}
      <div className="rounded-lg overflow-hidden mb-6" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 border-b" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <span className="section-label">PACKAGE GENERATION MATRIX</span>
          <span className="ml-3 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
            {eligibleDeals.length} deals eligible for packaging
          </span>
        </div>
        <div style={{ background: 'var(--color-surface)' }}>
          {eligibleDeals.map(deal => (
            <div key={deal.id} className="px-5 py-4 border-b hover:bg-white/3 transition-colors" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1" style={{ minWidth: 200 }}>
                  <Link href={`/vault/${deal.id}`} className="font-semibold text-sm hover:underline block" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                    {deal.projectName}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`tag ${stageColor(deal.stage)}`} style={{ fontSize: 9 }}>{stageLabel(deal.stage)}</span>
                    <span className={`text-sm font-bold number-display ${scoreColor(deal.bdcScore.overall)}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      BDC: {deal.bdcScore.overall}%
                    </span>
                    <span className="text-xs" style={{ color: '#F59E0B', fontFamily: 'JetBrains Mono, monospace' }}>
                      {formatCurrency(deal.capitalRequirement)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {packageTypes.map(pkg => {
                    const key = `${deal.id}-${pkg.id}`
                    const isEligible = deal.bdcScore.overall >= pkg.minScore
                    const isGenerating = generating === key
                    const isDone = generated.has(key)

                    return (
                      <button
                        key={pkg.id}
                        onClick={() => isEligible && !isDone && handleGenerate(deal.id, pkg.id)}
                        disabled={!isEligible || isGenerating}
                        className="flex items-center gap-1.5 px-3 py-2 rounded text-xs transition-all"
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 10,
                          background: isDone ? 'rgba(16,185,129,0.1)' : isEligible ? `${pkg.color}12` : 'rgba(255,255,255,0.03)',
                          color: isDone ? '#10B981' : isEligible ? pkg.color : 'var(--color-text-muted)',
                          border: `1px solid ${isDone ? 'rgba(16,185,129,0.3)' : isEligible ? `${pkg.color}30` : 'var(--color-border)'}`,
                          cursor: isDone || !isEligible ? 'default' : 'pointer',
                          opacity: !isEligible ? 0.4 : 1,
                        }}
                      >
                        {isGenerating ? (
                          <Loader2 size={11} className="animate-spin" />
                        ) : isDone ? (
                          <CheckCircle size={11} />
                        ) : (
                          <FileText size={11} />
                        )}
                        {pkg.label.split(' ')[0]}
                        {isDone && <Download size={10} className="ml-1" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Investment Memo preview */}
      <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid rgba(0,212,255,0.2)' }}>
        <div className="section-label mb-4">INVESTMENT MEMORANDUM — SAMPLE STRUCTURE</div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { section: '01', title: 'Executive Summary', items: ['Project overview', 'Investment thesis', 'Key highlights', 'Return profile'] },
            { section: '02', title: 'Market Analysis', items: ['Market demand', 'Sector growth', 'Competitive landscape', 'Regional indicators'] },
            { section: '03', title: 'Capital Stack', items: ['Sources & uses', 'Equity structure', 'Debt facilities', 'Tax credit integration'] },
            { section: '04', title: 'Financial Projections', items: ['Revenue model', 'DSCR analysis', 'IRR/ROE projections', 'Sensitivity analysis'] },
            { section: '05', title: 'Technology & Operations', items: ['Tech infrastructure', 'SmartConnect integration', 'O&M strategy', 'Vendor relationships'] },
            { section: '06', title: 'Risk & Mitigation', items: ['Key risk factors', 'Permitting status', 'Mitigation strategies', 'Insurance coverage'] },
          ].map(section => (
            <div key={section.section} className="p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)', fontSize: 10 }}>
                  {section.section}
                </span>
                <span className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                  {section.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {section.items.map(item => (
                  <span key={item} className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                    · {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
