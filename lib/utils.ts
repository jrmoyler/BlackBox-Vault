import type { ProjectStage, ProjectType, Platform } from '@/types'

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
  return `$${amount}`
}

export function stageLabel(stage: ProjectStage): string {
  const map: Record<ProjectStage, string> = {
    early_stage: 'Early Stage',
    structurable: 'Structurable',
    capital_ready: 'Capital Ready',
    lender_ready: 'Lender Ready',
  }
  return map[stage]
}

export function stageColor(stage: ProjectStage): string {
  const map: Record<ProjectStage, string> = {
    early_stage: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    structurable: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
    capital_ready: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    lender_ready: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  }
  return map[stage]
}

export function typeLabel(type: ProjectType): string {
  const map: Record<ProjectType, string> = {
    energy_campus: 'Energy Campus',
    cold_storage: 'Cold Storage',
    waste_to_energy: 'Waste-to-Energy',
    agriculture: 'Agriculture',
    digital_infrastructure: 'Digital Infrastructure',
  }
  return map[type]
}

export function typeIcon(type: ProjectType): string {
  const map: Record<ProjectType, string> = {
    energy_campus: '⚡',
    cold_storage: '🧊',
    waste_to_energy: '♻️',
    agriculture: '🌱',
    digital_infrastructure: '🏗️',
  }
  return map[type]
}

export function platformColor(platform: Platform): string {
  const map: Record<Platform, string> = {
    BDC: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    GDG: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    RRG: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    EnerGenius: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  }
  return map[platform]
}

export function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-400'
  if (score >= 70) return 'text-cyan-400'
  if (score >= 55) return 'text-yellow-400'
  return 'text-red-400'
}

export function scoreBar(score: number): string {
  if (score >= 85) return 'bg-emerald-400'
  if (score >= 70) return 'bg-cyan-400'
  if (score >= 55) return 'bg-yellow-400'
  return 'bg-red-400'
}
