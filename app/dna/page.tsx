import Layout from '@/components/Layout'
import { mockDeals } from '@/lib/data'
import Link from 'next/link'

export default function DNAPage() {
  const sectors = [...new Set(mockDeals.map(d => d.dna.sector))]
  const technologies = [...new Set(mockDeals.flatMap(d => d.dna.technology))]
  const capitalTypes = [...new Set(mockDeals.flatMap(d => d.dna.capitalStack))]
  const geographies = [...new Set(mockDeals.map(d => d.dna.geography))]

  const ozDeals = mockDeals.filter(d => d.dna.ozEligible)

  return (
    <Layout title="Deal DNA System" subtitle="Sector, technology, capital, and geography classification">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Sector breakdown */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">SECTOR CLASSIFICATION</div>
          {sectors.map(sector => {
            const sectorDeals = mockDeals.filter(d => d.dna.sector === sector)
            const pct = (sectorDeals.length / mockDeals.length) * 100
            return (
              <div key={sector} className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>{sector}</span>
                  <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-accent)' }}>{sectorDeals.length} deal{sectorDeals.length > 1 ? 's' : ''}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${pct}%`, transition: 'width 1s ease' }} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {sectorDeals.map(d => (
                    <Link key={d.id} href={`/vault/${d.id}`}>
                      <span className="text-xs px-2 py-0.5 rounded hover:opacity-80 transition-opacity" style={{ background: 'rgba(0,212,255,0.06)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        {d.projectName.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Technology grid */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">TECHNOLOGY CLASSIFICATION</div>
          <div className="space-y-3">
            {technologies.map(tech => {
              const techDeals = mockDeals.filter(d => d.dna.technology.includes(tech))
              return (
                <div key={tech} className="p-3 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#A78BFA' }}>{tech.replace('_', ' ').toUpperCase()}</span>
                    <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-text-muted)', fontSize: 10 }}>
                      {techDeals.length}/{mockDeals.length} deals
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {techDeals.map(d => (
                      <Link key={d.id} href={`/vault/${d.id}`}>
                        <span className="text-xs px-1.5 py-0.5 rounded hover:opacity-80" style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                          {d.projectName.split(' ')[0]}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Capital stack DNA */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">CAPITAL STACK DNA</div>
          <div className="space-y-2">
            {capitalTypes.map(cap => {
              const capDeals = mockDeals.filter(d => d.dna.capitalStack.includes(cap))
              return (
                <div key={cap} className="flex items-center justify-between p-2.5 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                  <span className="text-xs font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#F59E0B' }}>{cap}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {capDeals.map(d => <div key={d.id} className="w-2 h-2 rounded-full bg-amber-400/60" title={d.projectName} />)}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                      {capDeals.length} deals
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Geography + OZ */}
        <div className="rounded-lg p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="section-label mb-4">GEOGRAPHY & OZ STATUS</div>
          <div className="space-y-3 mb-4">
            {geographies.map(geo => {
              const geoDeal = mockDeals.find(d => d.dna.geography === geo)
              return (
                <div key={geo} className="flex items-center justify-between p-2.5 rounded" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <div className="text-xs font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-text-primary)' }}>{geo}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                      {geoDeal?.projectName}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${geoDeal?.dna.ozEligible ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : 'text-gray-500 border-gray-500/30 bg-gray-500/10'}`}
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                    {geoDeal?.dna.ozEligible ? 'OZ ELIGIBLE' : 'NO OZ'}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="p-3 rounded" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div className="text-xs font-bold mb-1" style={{ color: '#10B981', fontFamily: 'JetBrains Mono, monospace' }}>
              OZ ELIGIBLE: {ozDeals.length}/{mockDeals.length} DEALS
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {Math.round(ozDeals.length / mockDeals.length * 100)}% of pipeline qualifies for Opportunity Zone equity premium
            </div>
          </div>
        </div>
      </div>

      {/* DNA Matrix table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 border-b" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <span className="section-label">FULL DNA MATRIX</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ background: 'var(--color-surface)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Project', 'Sector', 'Technology', 'Capital Stack', 'Geography', 'OZ'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.1em' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockDeals.map(deal => (
                <tr key={deal.id} className="hover:bg-white/3 transition-colors" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="px-4 py-3">
                    <Link href={`/vault/${deal.id}`} className="text-sm font-semibold hover:underline" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--color-text-primary)' }}>
                      {deal.projectName.split(' ').slice(0, 3).join(' ')}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#00D4FF', fontFamily: 'JetBrains Mono, monospace' }}>{deal.dna.sector}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {deal.dna.technology.slice(0, 2).map(t => (
                        <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                          {t.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {deal.dna.capitalStack.slice(0, 2).map(c => (
                        <span key={c} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.08)', color: '#F59E0B', fontFamily: 'JetBrains Mono, monospace', fontSize: 9 }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
                    {deal.dna.geography}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold ${deal.dna.ozEligible ? 'text-emerald-400' : 'text-gray-600'}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {deal.dna.ozEligible ? 'YES' : 'NO'}
                    </span>
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
