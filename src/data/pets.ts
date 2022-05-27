import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultPetsScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Upgrade Cost',
  time: 'Upgrade Time',
}

export const pets: ScrapingTemplate[] = [
  { name: 'L.A.S.S.I' },
  { name: 'Electro Owl' },
  { name: 'Mighty Yak' },
  { name: 'Unicorn' },
]
