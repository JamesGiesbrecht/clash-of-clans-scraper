import { ScrapingTemplate } from './types'

export const defaultScrapingHeaders = {
  level: 'Level',
  buildCost: 'Build Cost',
  buildTime: 'Build Time',
  requiredHall: 'Town Hall Level Required',
}

export const homeVillage: {
  buildings: {
    defense: ScrapingTemplate[]
    army: ScrapingTemplate[]
    resource: ScrapingTemplate[]
  }
} = {
  buildings: {
    defense: [
      { name: 'Cannon' },
      { name: 'Archer Tower' },
      { name: 'Mortar' },
      { name: 'Air Defense' },
      { name: 'Wizard Tower' },
      { name: 'Air Sweeper' },
      { name: 'Hidden Tesla' },
      { name: 'Bomb Tower' },
      { name: 'X-Bow' },
      {
        name: 'Inferno Tower',
        indexesToSkip: {
          headers: [1, 2],
          rows: [1, 2, 3, 4, 5, 6],
        },
      },
      { name: 'Eagle Artillery' },
      { name: 'Scattershot' },
      { name: "Builder's Hut" },
      { name: 'Bomb' },
      { name: 'Spring Trap' },
      { name: 'Air Bomb' },
      { name: 'Giant Bomb' },
      { name: 'Seeking Air Mine' },
      { name: 'Skeleton Trap' },
      { name: 'Tornado Trap' },
    ],
    army: [
      { name: 'Army Camp' },
      { name: 'Barracks' },
      { name: 'Dark Barracks' },
      { name: 'Laboratory' },
      {
        name: 'Spell Factory',
        scraping: { requiredHall: 'Town HallLevel Required' },
      },
      {
        name: 'Dark Spell Factory',
        scraping: { requiredHall: 'Town HallLevel Required' },
      },
      { name: 'Workshop' },
      { name: 'Pet House' },
    ],
    resource: [
      { name: 'Gold Mine' },
      { name: 'Elixir Collector' },
      { name: 'Dark Elixir Drill' },
      { name: 'Gold Storage' },
      { name: 'Elixir Storage' },
      { name: 'Dark Elixir Storage' },
      { name: 'Clan Castle' },
      {
        name: 'Town Hall',
        scraping: { level: 'TH Level', requiredHall: null },
      },
    ],
  },
}
