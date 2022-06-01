import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultSpellScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Research Cost',
  time: 'Research Time',
  requiredHall: 'Laboratory Level Required',
}

export const spells: ScrapingTemplate[] = [
  {
    name: 'Lightning Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/c/c0/Lightning_Spell_info.png',
  },
  {
    name: 'Healing Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/f/f2/Healing_Spell_info.png',
  },
  {
    name: 'Rage Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/8/8a/Rage_Spell_info.png',
  },
  {
    name: 'Jump Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/3/38/Jump_Spell_info.png',
  },
  {
    name: 'Freeze Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/e/ef/Freeze_Spell_info.png',
  },
  {
    name: 'Clone Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/9/91/Clone_Spell_info.png',
  },
  {
    name: 'Invisibility Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/a/a3/Invisibility_Spell_info.png',
  },
  {
    name: 'Poison Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/4/49/Poison_Spell_info.png',
  },
  {
    name: 'Earthquake Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/3/3f/Earthquake_Spell_info.png',
  },
  {
    name: 'Haste Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/b/be/Haste_Spell_info.png',
  },
  {
    name: 'Skeleton Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/0/0f/Skeleton_Spell_info.png',
  },
  {
    name: 'Bat Spell',
    imageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/3/3d/Bat_Spell_info.png',
  },
]
