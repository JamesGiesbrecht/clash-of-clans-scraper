import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultHomeHeroScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Upgrade Cost',
  time: 'Upgrade Time',
  requiredHall: 'Town Hall Level Required',
}

export const defaultBuilderHeroScrapingHeaders: ScrapingHeaders = {
  ...defaultHomeHeroScrapingHeaders,
  requiredHall: 'Builder Hall Level Required',
}

export const homeVillageHeroes: ScrapingTemplate[] = [
  { name: 'Barbarian King' },
  { name: 'Archer Queen' },
  { name: 'Grand Warden', indexesToSkip: { headers: [5], rows: [5, 6] } },
  { name: 'Royal Champion' },
]

export const builderBaseHeroes: ScrapingTemplate[] = [
  { name: 'Battle Machine' },
]
