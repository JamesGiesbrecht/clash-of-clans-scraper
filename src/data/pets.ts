import { ScrapingTemplate, ScrapingHeaders } from '../types'

export const defaultPetsScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Upgrade Cost',
  time: 'Upgrade Time',
}

export const pets: ScrapingTemplate[] = [
  {
    name: 'L.A.S.S.I',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/5/5a/LASSI_field.png',
  },
  {
    name: 'Electro Owl',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/8/88/Electro_Owl_field.png',
  },
  {
    name: 'Mighty Yak',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/6/66/Mighty_Yak_field.png',
  },
  {
    name: 'Unicorn',
    remoteImageUrl:
      'https://static.wikia.nocookie.net/clashofclans/images/6/67/Unicorn_field.png',
  },
]
