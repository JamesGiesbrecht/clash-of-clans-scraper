import cheerio from 'cheerio'
import {
  builderBase,
  defaultBuilderScrapingHeaders,
  defaultHomeScrapingHeaders,
  homeVillage,
} from './data/buildings'
import {
  builderBaseTroops,
  defaultBuilderTroopScrapingHeaders,
  defaultHomeTroopScrapingHeaders,
  homeVillageTroops,
} from './data/troops'
import {
  builderBaseHeroes,
  defaultBuilderHeroScrapingHeaders,
  defaultHomeHeroScrapingHeaders,
  homeVillageHeroes,
} from './data/heroes'
import {
  Building,
  BuildingType,
  Hero,
  BuildingLevel,
  Resource,
  ScrapingHeaders,
  ScrapingTemplate,
  SpecialtyBuilding,
  VillageBuildingScrapingCollection,
  HeroLevel,
  Troop as Spell,
  TroopSpellSiegeMachineLevel,
  SiegeMachine,
  Troop,
  Pet,
  PetLevel,
} from './types'
import {
  convertAvailabilityTableToJson,
  convertTableToJson,
  convertTimeStringToSeconds,
  getAvailabilityTable,
  getPage,
  getStatsTable,
  getTableByTableText,
  parseNumber,
  ucFirst,
} from './utility'
import { defaultSpellScrapingHeaders, spells } from './data/spells'
import {
  defaultSiegeMachineScrapingHeaders,
  siegeMachines,
} from './data/siegeMachines'
import { defaultPetsScrapingHeaders, pets } from './data/pets'

const WIKI_BASE_URL = 'https://clashofclans.fandom.com/wiki/'

const fetchPages = async (
  pageList: ScrapingTemplate[],
): Promise<{ info: ScrapingTemplate; page: cheerio.Root }[]> => {
  const pages = await Promise.all(
    pageList.map(async (info) => {
      console.log('Fetching', info.name)
      return {
        info,
        page: await getPage(
          WIKI_BASE_URL +
            info.name.replaceAll(' ', '_') +
            (info.urlSuffix || ''),
        ),
      }
    }),
  )
  return pages
}

const formatBuildingLevel = (
  rawLevel: { [key: string]: string },
  scrapingHeaders: ScrapingHeaders,
): BuildingLevel => {
  const { seconds, timeString } = convertTimeStringToSeconds(
    rawLevel[scrapingHeaders.time],
  )
  const level: BuildingLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    buildCost: parseNumber(rawLevel[scrapingHeaders.cost] || rawLevel.Cost),
    buildTime: seconds,
    friendlyBuildTime: timeString,
  }

  if (scrapingHeaders.requiredHall) {
    level.requiredHall = parseNumber(rawLevel[scrapingHeaders.requiredHall])
  }
  return level
}

const formatHeroLevel = (
  rawLevel: { [key: string]: string },
  scrapingHeaders: ScrapingHeaders,
): HeroLevel => {
  const { seconds, timeString } = convertTimeStringToSeconds(
    rawLevel[scrapingHeaders.time],
  )
  const level: HeroLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    upgradeCost: parseNumber(rawLevel[scrapingHeaders.cost] || rawLevel.Cost),
    upgradeTime: seconds,
    friendlyUpgradeTime: timeString,
    requiredHall: parseNumber(rawLevel[scrapingHeaders.requiredHall]),
  }

  return level
}

const formatTroopSpellSiegeMachineLevel = (
  rawLevel: { [key: string]: string },
  scrapingHeaders: ScrapingHeaders,
): TroopSpellSiegeMachineLevel => {
  const { seconds, timeString } = convertTimeStringToSeconds(
    rawLevel[scrapingHeaders.time],
  )
  const level: TroopSpellSiegeMachineLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    researchCost: parseNumber(rawLevel[scrapingHeaders.cost] || rawLevel.Cost),
    researchTime: seconds,
    friendlyResearchTime: timeString,
    requiredLab: parseNumber(rawLevel[scrapingHeaders.requiredHall]),
  }

  return level
}

const formatPetLevel = (
  rawLevel: { [key: string]: string },
  scrapingHeaders: ScrapingHeaders,
): PetLevel => {
  const { seconds, timeString } = convertTimeStringToSeconds(
    rawLevel[scrapingHeaders.time],
  )
  const level: PetLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    upgradeCost: parseNumber(rawLevel[scrapingHeaders.cost] || rawLevel.Cost),
    upgradeTime: seconds,
    friendlyUpgradeTime: timeString,
  }

  return level
}

const scrapePrep = (
  defaultScrapingHeaders: ScrapingHeaders,
  info: ScrapingTemplate,
  $: cheerio.Root,
): {
  scrapingHeaders: ScrapingHeaders
  resource: Resource
  statsTableAsJson: any
} => {
  const scrapingHeaders = {
    ...defaultScrapingHeaders,
    ...info.scraping,
  }
  const statsTable = getStatsTable($)
  const statsTableAsJson = convertTableToJson($, statsTable, info.indexesToSkip)
  const resource: Resource = $('th', statsTable)
    .filter((i, el) => $(el).text().trim() === scrapingHeaders.cost)
    .children('a')
    .last()
    .attr('title') as Resource

  return { scrapingHeaders, resource, statsTableAsJson }
}

const scrapeBuilding = (
  buildingInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  buildingType: BuildingType,
  $: cheerio.Root,
): Building => {
  const { scrapingHeaders, resource, statsTableAsJson } = scrapePrep(
    defaultScrapingHeaders,
    buildingInfo,
    $,
  )

  const availabilityTable = getAvailabilityTable($)
  const availabilityTableAsJson = convertAvailabilityTableToJson(
    $,
    availabilityTable,
  )

  const building: Building = {
    name: buildingInfo.name,
    resource,
    type: buildingType,
    levels: statsTableAsJson.map((rawLevel: any) =>
      formatBuildingLevel(rawLevel, scrapingHeaders),
    ),
    availability: availabilityTableAsJson,
  }

  return building
}

const scrapeHero = (
  heroInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  $: cheerio.Root,
): Hero => {
  const { scrapingHeaders, resource, statsTableAsJson } = scrapePrep(
    defaultScrapingHeaders,
    heroInfo,
    $,
  )

  const hero: Hero = {
    name: heroInfo.name,
    resource,
    levels: statsTableAsJson.map((rawLevel: any) =>
      formatHeroLevel(rawLevel, scrapingHeaders),
    ),
  }
  return hero
}

const scrapeTroop = (
  troopInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  $: cheerio.Root,
): Spell => {
  const { scrapingHeaders, resource, statsTableAsJson } = scrapePrep(
    defaultScrapingHeaders,
    troopInfo,
    $,
  )

  const troopInfoTable = getTableByTableText($, 'Barracks Level Required')
  const troopInfoTableAsJson = convertTableToJson($, troopInfoTable)[0]

  const troop: Spell = {
    name: troopInfo.name,
    resource,
    requiredBarracks: parseNumber(
      troopInfoTableAsJson['Barracks Level Required'] ||
        troopInfoTableAsJson['Builder Barracks Level Required'] ||
        troopInfoTableAsJson['Dark Barracks Level Required'],
    ),
    levels: statsTableAsJson.map((rawLevel: any) => {
      return formatTroopSpellSiegeMachineLevel(rawLevel, scrapingHeaders)
    }),
  }

  return troop
}

const scrapeSpell = (
  spellInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  $: cheerio.Root,
): Spell => {
  const { scrapingHeaders, resource, statsTableAsJson } = scrapePrep(
    defaultScrapingHeaders,
    spellInfo,
    $,
  )

  const spellInfoTable = getTableByTableText($, 'Spell Factory Level Required')
  const spellInfoTableAsJson = convertTableToJson($, spellInfoTable)[0]

  const spell: Spell = {
    name: spellInfo.name,
    resource,
    requiredBarracks: parseNumber(
      spellInfoTableAsJson['Spell Factory Level Required'] ||
        spellInfoTableAsJson['Dark Spell Factory Level Required'],
    ),
    levels: statsTableAsJson.map((rawLevel: any) => {
      return formatTroopSpellSiegeMachineLevel(rawLevel, scrapingHeaders)
    }),
  }

  return spell
}

const scrapeSiegeMachine = (
  siegeMachineInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  $: cheerio.Root,
): SiegeMachine => {
  const { scrapingHeaders, resource, statsTableAsJson } = scrapePrep(
    defaultScrapingHeaders,
    siegeMachineInfo,
    $,
  )

  const siegeMachineInfoTable = getTableByTableText(
    $,
    'Workshop Level Required',
  )
  const siegeMachineInfoTableAsJson = convertTableToJson(
    $,
    siegeMachineInfoTable,
  )[0]

  const siegeMachine: SiegeMachine = {
    name: siegeMachineInfo.name,
    resource,
    requiredWorkshop: parseNumber(
      siegeMachineInfoTableAsJson['Workshop Level Required'],
    ),
    levels: statsTableAsJson.map((rawLevel: any) => {
      return formatTroopSpellSiegeMachineLevel(rawLevel, scrapingHeaders)
    }),
  }

  return siegeMachine
}

const scrapePets = (
  petInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  $: cheerio.Root,
): Pet => {
  const { scrapingHeaders, resource, statsTableAsJson } = scrapePrep(
    defaultScrapingHeaders,
    petInfo,
    $,
  )

  const petInfoTable = getTableByTableText($, 'Pet House Level Required')
  const petInfoTableAsJson = convertTableToJson($, petInfoTable)[0]
  console.log(`Formatting ${petInfo.name}`)

  const pet: Pet = {
    name: petInfo.name,
    resource,
    requiredPetHouse: parseNumber(
      petInfoTableAsJson['Pet House Level Required'],
    ),
    levels: statsTableAsJson.map((rawLevel: any) => {
      return formatPetLevel(rawLevel, scrapingHeaders)
    }),
  }

  return pet
}

const getBuildings = async (
  scrapingHeaders: ScrapingHeaders,
  village: VillageBuildingScrapingCollection,
) => {
  const buildings: Array<Building | SpecialtyBuilding> = []
  for (const [category, buildingsList] of Object.entries(village.buildings)) {
    const pages = await fetchPages(buildingsList)
    buildings.push(
      ...pages.map(({ info, page }) => {
        console.log(`Scraping ${info.name}`)
        return scrapeBuilding(
          info,
          scrapingHeaders,
          ucFirst(category) as BuildingType,
          page,
        )
      }),
    )
  }
  if (village.specialtyBuildings) {
    buildings.push(...village.specialtyBuildings)
  }
  return buildings
}

const getArmy = async (
  scrapingHeaders: ScrapingHeaders,
  heroesTroopsCollection: ScrapingTemplate[],
  scrape: (
    info: ScrapingTemplate,
    defaultScrapingHeaders: ScrapingHeaders,
    $: cheerio.Root,
  ) => Hero | Troop | Spell | SiegeMachine | Pet,
) => {
  const army: Array<Hero | Troop | Spell | SiegeMachine | Pet> = []
  const pages = await fetchPages(heroesTroopsCollection)
  army.push(
    ...pages.map(({ info, page }) => {
      console.log(`Scraping ${info.name}`)
      return scrape(info, scrapingHeaders, page)
    }),
  )
  return army
}

export const getHomeVillageBuildings = async () =>
  getBuildings(defaultHomeScrapingHeaders, homeVillage)

export const getBuilderBaseBuildings = async () =>
  getBuildings(defaultBuilderScrapingHeaders, builderBase)

export const getHomeVillageHeroes = async () =>
  getArmy(defaultHomeHeroScrapingHeaders, homeVillageHeroes, scrapeHero)

export const getBuilderBaseHeroes = async () =>
  getArmy(defaultBuilderHeroScrapingHeaders, builderBaseHeroes, scrapeHero)

export const getHomeVillageTroops = async () =>
  getArmy(defaultHomeTroopScrapingHeaders, homeVillageTroops, scrapeTroop)

export const getBuilderBaseTroops = async () =>
  getArmy(defaultBuilderTroopScrapingHeaders, builderBaseTroops, scrapeTroop)

export const getSpells = async () =>
  getArmy(defaultSpellScrapingHeaders, spells, scrapeSpell)

export const getSiegeMachines = async () =>
  getArmy(defaultSiegeMachineScrapingHeaders, siegeMachines, scrapeSiegeMachine)

export const getPets = async () =>
  getArmy(defaultPetsScrapingHeaders, pets, scrapePets)
