'use client'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { CheckCircle, Upload, ChevronRight, ChevronLeft, Loader2, FileText, X } from 'lucide-react'

const steps = [
  'Project Identity',
  'Infrastructure Profile',
  'Capital Requirements',
  'Technology Stack',
  'Document Upload',
  'Market Context',
  'Review & Submit',
]

const projectTypes = ['Energy Campus', 'Cold Storage', 'Waste-to-Energy', 'Agriculture Platform', 'Digital Infrastructure']
const stages = ['Early Stage', 'Structurable', 'Capital Ready', 'Lender Ready']
const techOptions = ['Microgrid', 'Battery Storage', 'Solar PV', 'Waste-to-Energy', 'Vertical Farming', 'SmartConnect', 'Data Center', 'HVDC']
const capitalStackOptions = ['NMTC', 'Opportunity Zone', 'Infrastructure Debt', 'Tax Credits (ITC/PTC)', 'USDA Grant', 'Equity', 'Municipal Bond', 'Mezzanine']
const platformOptions = ['BDC', 'GDG', 'RRG', 'EnerGenius']

interface FormData {
  projectName: string
  location: string
  sponsor: string
  projectType: string
  stage: string
  infraType: string
  capacityMW: string
  acreage: string
  capitalTotal: string
  equityPct: string
  debtPct: string
  incentivesPct: string
  technologies: string[]
  capitalStructure: string[]
  ozEligible: boolean
  platforms: string[]
  marketDemand: string
  sectorGrowth: string
  notes: string
  files: File[]
}

const emptyForm: FormData = {
  projectName: '', location: '', sponsor: '', projectType: '', stage: '',
  infraType: '', capacityMW: '', acreage: '', capitalTotal: '', equityPct: '',
  debtPct: '', incentivesPct: '', technologies: [], capitalStructure: [],
  ozEligible: false, platforms: [], marketDemand: '', sectorGrowth: '', notes: '', files: [],
}

export default function IntakePage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof FormData, v: unknown) => setForm(f => ({ ...f, [k]: v }))
  const toggle = (k: 'technologies' | 'capitalStructure' | 'platforms', v: string) => {
    setForm(f => {
      const arr = f[k] as string[]
      return { ...f, [k]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] }
    })
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) set('files', [...form.files, ...Array.from(e.target.files)])
  }
  const removeFile = (i: number) => set('files', form.files.filter((_, idx) => idx !== i))

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 2800))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Layout title="Deal Intake" subtitle="Step 1 of 10-Layer Architecture">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <CheckCircle size={36} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
            Deal Ingested Successfully
          </h2>
          <p className="mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>{form.projectName}</strong> has been captured and queued for processing.
          </p>
          <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            BDC Evaluation Engine will score this deal within 24 hours.
          </p>
          <div className="rounded-lg p-4 text-left mb-8 space-y-2"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
            {[
              ['STATUS', 'INTAKE COMPLETE'],
              ['VAULT ID', `BB-${Date.now().toString(36).toUpperCase()}`],
              ['DOCUMENTS', `${form.files.length} uploaded`],
              ['NEXT STEP', 'BDC Evaluation Matrix Processing'],
              ['DISTRIBUTION', form.platforms.join(', ') || 'BDC'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span style={{ color: 'var(--color-text-muted)' }}>{k}</span>
                <span style={{ color: 'var(--color-accent)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setForm(emptyForm); setStep(0); setSubmitted(false) }}
              className="px-6 py-2.5 rounded font-semibold text-sm transition-colors hover:opacity-90"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', fontFamily: 'Syne, sans-serif' }}
            >
              New Deal
            </button>
            <a href="/vault"
              className="px-6 py-2.5 rounded font-semibold text-sm transition-colors hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: '#060810', fontFamily: 'Syne, sans-serif' }}
            >
              View Vault →
            </a>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Deal Intake Engine" subtitle="Structured project ingestion — Layer 1 → Vault">
      <div className="max-w-3xl mx-auto">
        {/* Step progress */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-all ${
                  i === step ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' :
                  i < step ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 cursor-pointer' :
                  'bg-transparent border border-transparent cursor-not-allowed'
                }`}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
              >
                {i < step ? <CheckCircle size={10} /> : (
                  <span className="w-4 h-4 flex items-center justify-center rounded-full text-xs"
                    style={{ background: i === step ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)', fontSize: 9 }}>
                    {i + 1}
                  </span>
                )}
                <span className="hidden sm:block">{s}</span>
              </button>
              {i < steps.length - 1 && <div className="w-3 h-px" style={{ background: 'var(--color-border)' }} />}
            </div>
          ))}
        </div>

        {/* Form panel */}
        <div className="rounded-lg p-6 mb-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h2 className="text-lg font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Step {step + 1}: {steps[step]}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            {['Core project identity and classification', 'Physical infrastructure details', 'Capital requirements and stack structure', 'Technology and platform selection', 'Upload all relevant project documents', 'Market context and demand signals', 'Review all data before submitting to vault'][step]}
          </p>

          {/* STEP 0: Project Identity */}
          {step === 0 && (
            <div className="space-y-4">
              <Field label="Project Name" required>
                <input value={form.projectName} onChange={e => set('projectName', e.target.value)}
                  placeholder="e.g. Gulf Coast Cold Storage Campus"
                  className="bb-input" />
              </Field>
              <Field label="Project Location" required>
                <input value={form.location} onChange={e => set('location', e.target.value)}
                  placeholder="City, State" className="bb-input" />
              </Field>
              <Field label="Project Sponsor / Developer" required>
                <input value={form.sponsor} onChange={e => set('sponsor', e.target.value)}
                  placeholder="Company or entity name" className="bb-input" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Project Type" required>
                  <select value={form.projectType} onChange={e => set('projectType', e.target.value)} className="bb-input">
                    <option value="">Select type...</option>
                    {projectTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Development Stage" required>
                  <select value={form.stage} onChange={e => set('stage', e.target.value)} className="bb-input">
                    <option value="">Select stage...</option>
                    {stages.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* STEP 1: Infrastructure */}
          {step === 1 && (
            <div className="space-y-4">
              <Field label="Infrastructure Type">
                <input value={form.infraType} onChange={e => set('infraType', e.target.value)}
                  placeholder="e.g. Cold Storage + Energy Infrastructure" className="bb-input" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Capacity (MW)">
                  <input type="number" value={form.capacityMW} onChange={e => set('capacityMW', e.target.value)}
                    placeholder="0.0" className="bb-input" />
                </Field>
                <Field label="Site Acreage">
                  <input type="number" value={form.acreage} onChange={e => set('acreage', e.target.value)}
                    placeholder="0" className="bb-input" />
                </Field>
              </div>
              <Field label="Platform Distribution">
                <div className="flex flex-wrap gap-2 mt-1">
                  {platformOptions.map(p => (
                    <button key={p} onClick={() => toggle('platforms', p)}
                      className={`px-3 py-1.5 rounded text-xs border transition-colors ${
                        form.platforms.includes(p)
                          ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30'
                          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-cyan-400/30'
                      }`}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Opportunity Zone Eligible">
                <label className="flex items-center gap-3 cursor-pointer mt-1">
                  <div
                    onClick={() => set('ozEligible', !form.ozEligible)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${form.ozEligible ? 'bg-cyan-400' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.ozEligible ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-sm" style={{ color: form.ozEligible ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                    {form.ozEligible ? 'Yes — OZ eligible' : 'No OZ designation'}
                  </span>
                </label>
              </Field>
            </div>
          )}

          {/* STEP 2: Capital */}
          {step === 2 && (
            <div className="space-y-4">
              <Field label="Total Capital Requirement ($)" required>
                <input type="number" value={form.capitalTotal} onChange={e => set('capitalTotal', e.target.value)}
                  placeholder="0" className="bb-input" />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Equity %">
                  <input type="number" value={form.equityPct} onChange={e => set('equityPct', e.target.value)}
                    placeholder="30" className="bb-input" />
                </Field>
                <Field label="Debt %">
                  <input type="number" value={form.debtPct} onChange={e => set('debtPct', e.target.value)}
                    placeholder="60" className="bb-input" />
                </Field>
                <Field label="Incentives %">
                  <input type="number" value={form.incentivesPct} onChange={e => set('incentivesPct', e.target.value)}
                    placeholder="10" className="bb-input" />
                </Field>
              </div>
              <Field label="Capital Structure Types">
                <div className="flex flex-wrap gap-2 mt-1">
                  {capitalStackOptions.map(c => (
                    <button key={c} onClick={() => toggle('capitalStructure', c)}
                      className={`px-3 py-1.5 rounded text-xs border transition-colors ${
                        form.capitalStructure.includes(c)
                          ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-amber-400/30'
                      }`}
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* STEP 3: Technology */}
          {step === 3 && (
            <div className="space-y-4">
              <Field label="Technology Types">
                <div className="flex flex-wrap gap-2 mt-1">
                  {techOptions.map(t => (
                    <button key={t} onClick={() => toggle('technologies', t)}
                      className={`px-3 py-1.5 rounded text-xs border transition-colors ${
                        form.technologies.includes(t)
                          ? 'bg-purple-400/10 text-purple-400 border-purple-400/30'
                          : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-purple-400/30'
                      }`}
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              {form.technologies.length > 0 && (
                <div className="rounded p-3 text-xs" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}>
                  <div className="section-label mb-2" style={{ fontSize: 9 }}>DEAL DNA PREVIEW</div>
                  <div className="flex flex-wrap gap-1">
                    {form.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded" style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Documents */}
          {step === 4 && (
            <div className="space-y-4">
              <label
                className="flex flex-col items-center justify-center rounded-lg p-8 cursor-pointer transition-colors hover:border-cyan-400/40"
                style={{ border: '2px dashed var(--color-border)', background: 'rgba(0,212,255,0.02)' }}
              >
                <Upload size={28} className="mb-3" style={{ color: 'var(--color-text-muted)' }} />
                <div className="text-sm font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Drop files or click to upload
                </div>
                <div className="text-xs text-center" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                  Feasibility studies · Financial models · Engineering reports · Site plans · Legal docs
                </div>
                <input type="file" multiple onChange={handleFiles} className="hidden" />
              </label>
              {form.files.length > 0 && (
                <div className="space-y-2">
                  {form.files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded"
                      style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)' }}>
                      <FileText size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                      <span className="flex-1 text-xs truncate" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-text-secondary)' }}>
                        {f.name}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                        {(f.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <button onClick={() => removeFile(i)}>
                        <X size={13} style={{ color: 'var(--color-text-muted)' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Market */}
          {step === 5 && (
            <div className="space-y-4">
              <Field label="Market Demand Description">
                <textarea value={form.marketDemand} onChange={e => set('marketDemand', e.target.value)}
                  placeholder="Describe the target market demand and drivers..."
                  rows={3} className="bb-input resize-none" />
              </Field>
              <Field label="Sector Growth Indicators">
                <textarea value={form.sectorGrowth} onChange={e => set('sectorGrowth', e.target.value)}
                  placeholder="Key sector growth signals, YoY trends, projections..."
                  rows={3} className="bb-input resize-none" />
              </Field>
              <Field label="Additional Notes">
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                  placeholder="Strategic notes, partner context, special considerations..."
                  rows={3} className="bb-input resize-none" />
              </Field>
            </div>
          )}

          {/* STEP 6: Review */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="rounded-lg p-4 space-y-3" style={{ background: 'var(--color-surface-high)', border: '1px solid var(--color-border)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
                {[
                  ['PROJECT NAME', form.projectName || '—'],
                  ['LOCATION', form.location || '—'],
                  ['SPONSOR', form.sponsor || '—'],
                  ['TYPE', form.projectType || '—'],
                  ['STAGE', form.stage || '—'],
                  ['CAPITAL REQ', form.capitalTotal ? `$${Number(form.capitalTotal).toLocaleString()}` : '—'],
                  ['TECHNOLOGIES', form.technologies.join(', ') || '—'],
                  ['CAPITAL STACK', form.capitalStructure.join(', ') || '—'],
                  ['OZ ELIGIBLE', form.ozEligible ? 'YES' : 'NO'],
                  ['PLATFORMS', form.platforms.join(', ') || 'BDC (default)'],
                  ['DOCUMENTS', `${form.files.length} files`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span style={{ color: 'var(--color-text-muted)', minWidth: 130 }}>{k}</span>
                    <span className="text-right" style={{ color: 'var(--color-text-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-center" style={{ color: 'var(--color-text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
                Submitting will ingest this deal into the BLACK BOX vault and queue it for BDC evaluation.
              </div>
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded text-sm transition-colors disabled:opacity-30"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: 'Syne, sans-serif' }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
              className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)', color: '#060810', fontFamily: 'Syne, sans-serif' }}
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
              style={{ background: 'var(--color-accent)', color: '#060810', fontFamily: 'Syne, sans-serif' }}
            >
              {submitting ? <><Loader2 size={16} className="animate-spin" /> Ingesting...</> : 'Submit to Vault →'}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .bb-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid var(--color-border);
          background: var(--color-surface-high);
          color: var(--color-text-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          outline: none;
          transition: border-color 0.15s;
        }
        .bb-input:focus { border-color: rgba(0,212,255,0.4); }
        .bb-input option { background: var(--color-surface-high); }
      `}</style>
    </Layout>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'var(--color-text-secondary)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
        {label.toUpperCase()}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
