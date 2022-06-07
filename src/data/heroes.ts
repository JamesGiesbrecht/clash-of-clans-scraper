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
  {
    name: 'Barbarian King',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/2/26/Barbarian_King_3D_preview.png',
  },
  {
    name: 'Archer Queen',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/5/5a/Archer_Queen_3D_preview.png',
  },
  {
    name: 'Grand Warden',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/3/3a/Grand_Warden_3D_preview.png',
    indexesToSkip: { headers: [5], rows: [5, 6] },
  },
  {
    name: 'Royal Champion',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/4/42/Royal_Champion_3D_preview.png',
  },
]

export const builderBaseHeroes: ScrapingTemplate[] = [
  {
    name: 'Battle Machine',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/7/7c/Battle_Machine30.png',
  },
]
