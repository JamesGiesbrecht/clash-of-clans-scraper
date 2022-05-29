import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultSpellScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Research Cost',
  time: 'Research Time',
  requiredHall: 'Laboratory Level Required',
}

export const spells: ScrapingTemplate[] = [
  { name: 'Lightning Spell' },
  { name: 'Healing Spell' },
  { name: 'Rage Spell' },
  { name: 'Jump Spell' },
  { name: 'Freeze Spell' },
  { name: 'Clone Spell' },
  { name: 'Invisibility Spell' },
  { name: 'Poison Spell' },
  { name: 'Earthquake Spell' },
  { name: 'Haste Spell' },
  { name: 'Skeleton Spell' },
  { name: 'Bat Spell' },
]
