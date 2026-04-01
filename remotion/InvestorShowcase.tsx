import React from 'react'
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { deals, marketSignals, platformStats } from '../lib/data'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const formatCompact = (value: number) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1,
  }).format(value)

const totalDocs = deals.reduce((acc, deal) => acc + deal.documents.length, 0)
const processedDocs = deals.reduce(
  (acc, deal) => acc + deal.documents.filter((doc) => doc.processed).length,
  0
)

const fades = (frame: number, fps: number, start: number, end: number) => {
  if (frame < start || frame > end) return 0

  const inValue = interpolate(frame, [start, start + fps * 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })

  const outValue = interpolate(frame, [end - fps * 0.6, end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  })

  return Math.min(inValue, outValue)
}

const sceneStyle: React.CSSProperties = {
  padding: '88px 92px',
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
}

const cardStyle: React.CSSProperties = {
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.16)',
  background: 'rgba(18, 24, 51, 0.7)',
  padding: '22px 24px',
}

export const InvestorShowcase: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scene1 = fades(frame, fps, 0, fps * 5)
  const scene2 = fades(frame, fps, fps * 4, fps * 10)
  const scene3 = fades(frame, fps, fps * 9, fps * 15)
  const scene4 = fades(frame, fps, fps * 14, fps * 20)

  const heroScale = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 120 },
  })

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 15% 20%, rgba(59,130,246,0.32) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.2) 0%, transparent 45%), linear-gradient(135deg, #020617 0%, #0f172a 52%, #111827 100%)',
        color: '#F8FAFC',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      }}
    >
      <AbsoluteFill style={{ ...sceneStyle, opacity: scene1, transform: `scale(${0.97 + heroScale * 0.03})` }}>
        <div style={{ fontSize: 20, letterSpacing: 3, textTransform: 'uppercase', color: '#93C5FD' }}>
          BlackBox Vault Investor Preview
        </div>
        <h1 style={{ fontSize: 74, lineHeight: 1.05, margin: 0, width: '75%' }}>
          Institutional infrastructure intelligence in one platform
        </h1>
        <p style={{ fontSize: 32, lineHeight: 1.35, color: '#CBD5E1', width: '74%', margin: 0 }}>
          Source, structure, and syndicate high-conviction projects across energy, digital, agriculture, and logistics sectors.
        </p>
      </AbsoluteFill>

      <AbsoluteFill style={{ ...sceneStyle, opacity: scene2 }}>
        <h2 style={{ fontSize: 58, margin: 0 }}>Portfolio at a glance</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 20, color: '#94A3B8' }}>Total tracked capital</div>
            <div style={{ fontSize: 52, marginTop: 8 }}>{formatCompact(platformStats.totalCapital)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 20, color: '#94A3B8' }}>Active deals</div>
            <div style={{ fontSize: 52, marginTop: 8 }}>{platformStats.totalDeals}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 20, color: '#94A3B8' }}>Average BDC score</div>
            <div style={{ fontSize: 52, marginTop: 8 }}>{platformStats.avgBdcScore}/100</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 20, color: '#94A3B8' }}>Processed diligence docs</div>
            <div style={{ fontSize: 52, marginTop: 8 }}>
              {processedDocs}/{totalDocs}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ ...sceneStyle, opacity: scene3 }}>
        <h2 style={{ fontSize: 58, margin: 0 }}>How investors underwrite faster</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {deals.slice(0, 3).map((deal, i) => {
              const appear = spring({
                frame: frame - fps * 9 - i * 8,
                fps,
                config: { damping: 20, stiffness: 90 },
              })
              return (
                <div
                  key={deal.id}
                  style={{
                    borderRadius: 14,
                    padding: '14px 16px',
                    background: 'rgba(148,163,184,0.12)',
                    transform: `translateY(${(1 - appear) * 16}px)`,
                    opacity: appear,
                  }}
                >
                  <div style={{ fontSize: 25, fontWeight: 600 }}>{deal.projectName}</div>
                  <div style={{ fontSize: 18, color: '#94A3B8', marginTop: 6 }}>
                    {deal.location} • {deal.stage.replace('_', ' ')} • {currency.format(deal.capitalRequirement)}
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: 24, color: '#A5B4FC' }}>Signal intelligence</div>
            {marketSignals.slice(0, 2).map((signal) => (
              <div key={signal.id}>
                <div style={{ fontSize: 22 }}>{signal.sector}</div>
                <div style={{ fontSize: 18, color: '#94A3B8' }}>{signal.recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ ...sceneStyle, opacity: scene4, justifyContent: 'center' }}>
        <h2 style={{ fontSize: 66, lineHeight: 1.05, margin: 0, width: '75%' }}>
          Built for disciplined capital deployment
        </h2>
        <p style={{ fontSize: 30, lineHeight: 1.4, color: '#CBD5E1', margin: 0, width: '72%' }}>
          BlackBox Vault gives investors transparent underwriting signals, platform-level portfolio intelligence, and execution-ready opportunities.
        </p>
        <div
          style={{
            marginTop: 14,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#86EFAC',
          }}
        >
          Request access • diligence@blackboxvault.ai
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
