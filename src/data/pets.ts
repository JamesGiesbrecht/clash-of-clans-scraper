import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultSpellScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  buildCost: 'Upgrade Cost',
  buildTime: 'Upgrade Time',
}

export const spells: ScrapingTemplate[] = [
  { name: 'L.A.S.S.I' },
  { name: 'Electro Owl' },
  { name: 'Mighty Yak' },
  { name: 'Unicorn' },
]
