import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultSiegeMachineScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Research Cost',
  time: 'Research Time',
  requiredHall: 'Laboratory Level Required',
}

export const siegeMachines: ScrapingTemplate[] = [
  { name: 'Wall Wrecker' },
  { name: 'Battle Blimp' },
  { name: 'Stone Slammer' },
  { name: 'Siege Barracks' },
  { name: 'Log Launcher' },
  { name: 'Flame Flinger' },
]
