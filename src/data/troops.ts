import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultHomeHeroScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  buildCost: 'Upgrade Cost',
  buildTime: 'Upgrade Time',
  requiredHall: 'Town Hall Level Required',
}

export const defaultBuilderHeroScrapingHeaders: ScrapingHeaders = {
  ...defaultHomeHeroScrapingHeaders,
  requiredHall: 'Builder Hall Level Required',
}

export const defaultHomeTroopScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  buildCost: 'Research Cost',
  buildTime: 'Research Time',
  requiredHall: 'Laboratory Level Required',
}

export const defaultBuilderTroopScrapingHeaders: ScrapingHeaders = {
  ...defaultHomeTroopScrapingHeaders,
  requiredHall: 'Star Laboratory Level Required',
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

export const homeVillageTroops: ScrapingTemplate[] = [
  { name: 'Barbarian' },
  { name: 'Archer' },
  { name: 'Giant' },
  { name: 'Goblin' },
  { name: 'Wall Breaker' },
  { name: 'Balloon' },
  { name: 'Wizard' },
  { name: 'Healer' },
  { name: 'Dragon' },
  { name: 'P.E.K.K.A' },
  { name: 'Baby Dragon', urlSuffix: '/Home_Village' },
  { name: 'Miner' },
  { name: 'Electro Dragon' },
  { name: 'Yeti' },
  { name: 'Dragon Rider' },
  { name: 'Minion' },
  { name: 'Hog Rider' },
  { name: 'Valkyrie' },
  { name: 'Golem' },
  { name: 'Witch' },
  { name: 'Lava Hound' },
  { name: 'Bowler' },
  { name: 'Ice Golem', indexesToSkip: { headers: [3], rows: [3, 4] } },
  { name: 'Headhunter' },
]

export const builderBaseTroops: ScrapingTemplate[] = [
  { name: 'Raged Barbarian' },
  { name: 'Sneaky Archer' },
  { name: 'Boxer Giant' },
  { name: 'Beta Minion' },
  { name: 'Bomber' },
  { name: 'Baby Dragon', urlSuffix: '/Builder_Base' },
  { name: 'Cannon Cart' },
  { name: 'Night Witch' },
  { name: 'Drop Ship' },
  { name: 'Super P.E.K.K.A' },
  { name: 'Hog Glider' },
]
