import { HeroScrapingCollection, ScrapingHeaders } from '../types'

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

export const homeVillageHeroes: HeroScrapingCollection = {
  barbarianKing: {
    name: 'Barbarian King',
  },
  archerQueen: {
    name: 'Archer Queen',
  },
  grandWarden: {
    name: 'Grand Warden',
    indexesToSkip: {
      headers: [5],
      rows: [5, 6],
    },
  },
  royalChampion: {
    name: 'Royal Champion',
  },
}

export const builderBaseHeroes: HeroScrapingCollection = {
  battleMachine: {
    name: 'Battle Machine',
  },
}
