export type ProjectStage = 'early_stage' | 'structurable' | 'capital_ready' | 'lender_ready'
export type ProjectType = 'energy_campus' | 'cold_storage' | 'waste_to_energy' | 'agriculture' | 'digital_infrastructure'
export type Platform = 'BDC' | 'GDG' | 'RRG' | 'EnerGenius'
export type Sector = 'Energy' | 'Agriculture' | 'Logistics' | 'Digital Infrastructure' | 'Cold Storage' | 'Waste-to-Energy'
export type TechType = 'microgrid' | 'battery_storage' | 'waste_to_energy' | 'vertical_farming' | 'smart_connect'
export type CapitalStack = 'NMTC' | 'Opportunity Zone' | 'infrastructure_debt' | 'tax_credits' | 'equity' | 'grant'

export interface DealDNA {
  sector: Sector
  technology: TechType[]
  capitalStack: CapitalStack[]
  geography: string
  ozEligible: boolean
}

export interface BDCScore {
  projectViability: number
  marketStrength: number
  capitalReadiness: number
  technologyIntegration: number
  strategicAlignment: number
  overall: number
}

export interface Document {
  id: string
  name: string
  type: 'feasibility' | 'architectural' | 'engineering' | 'financial' | 'site_control' | 'market' | 'legal' | 'operational'
  uploadedAt: string
  size: string
  processed: boolean
}

export interface CapitalStackProfile {
  equity: number
  debt: number
  incentives: number
  totalCapital: number
  debtStructure: string[]
  incentiveTypes: string[]
  investorTypes: string[]
}

export interface Correlation {
  dealId: string
  dealName: string
  overlapType: string
  strength: number
  opportunity: string
}

export interface Deal {
  id: string
  projectName: string
  location: string
  projectType: ProjectType
  sponsor: string
  stage: ProjectStage
  technology: string
  infrastructureType: string
  capitalRequirement: number
  createdAt: string
  updatedAt: string
  documents: Document[]
  dna: DealDNA
  bdcScore: BDCScore
  capitalStack: CapitalStackProfile
  correlations: Correlation[]
  platformDistribution: Platform[]
  riskIndicators: string[]
  strategicNextSteps: string[]
  marketProfile: {
    demand: string
    sectorGrowth: string
    regionalIndicators: string
  }
}

export interface MarketSignal {
  id: string
  sector: string
  region: string
  signal: string
  strength: 'high' | 'medium' | 'low'
  drivers: string[]
  recommendation: string
  detectedAt: string
}

export interface PlatformStats {
  totalDeals: number
  totalCapital: number
  avgBdcScore: number
  dealsByStage: Record<ProjectStage, number>
  dealsByType: Record<string, number>
  capitalByPlatform: Record<Platform, number>
}
