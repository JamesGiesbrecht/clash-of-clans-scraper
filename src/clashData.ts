import cheerio from 'cheerio'
import {
  builderBase,
  defaultBuilderScrapingHeaders,
  defaultHomeScrapingHeaders,
  homeVillage,
} from './data/buildings'
import {
  builderBaseHeroes,
  builderBaseTroops,
  defaultBuilderHeroScrapingHeaders,
  defaultBuilderTroopScrapingHeaders,
  defaultHomeHeroScrapingHeaders,
  defaultHomeTroopScrapingHeaders,
  homeVillageHeroes,
  homeVillageTroops,
} from './data/troops'
import {
  Building,
  BuildingType,
  Hero,
  HeroTroopScrapingCollection,
  BuildingLevel,
  Resource,
  ScrapingHeaders,
  ScrapingTemplate,
  SpecialtyBuilding,
  VillageBuildingScrapingCollection,
  HeroLevel,
  Troop,
  TroopLevel,
} from './types'
import {
  convertAvailabilityTableToJson,
  convertTableToJson,
  convertTimeStringToSeconds,
  getAvailabilityTable,
  getPage,
  getStatsTable,
  parseNumber,
  ucFirst,
} from './utility'

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
    rawLevel[scrapingHeaders.buildTime],
  )
  const level: BuildingLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    buildCost: parseNumber(
      rawLevel[scrapingHeaders.buildCost] || rawLevel.Cost,
    ),
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
    rawLevel[scrapingHeaders.buildTime],
  )
  const level: HeroLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    upgradeCost: parseNumber(
      rawLevel[scrapingHeaders.buildCost] || rawLevel.Cost,
    ),
    upgradeTime: seconds,
    friendlyUpgradeTime: timeString,
    requiredHall: parseNumber(rawLevel[scrapingHeaders.requiredHall]),
  }

  return level
}

const formatTroopLevel = (
  rawLevel: { [key: string]: string },
  scrapingHeaders: ScrapingHeaders,
): TroopLevel => {
  const { seconds, timeString } = convertTimeStringToSeconds(
    rawLevel[scrapingHeaders.buildTime],
  )
  const level: TroopLevel = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    researchCost: parseNumber(
      rawLevel[scrapingHeaders.buildCost] || rawLevel.Cost,
    ),
    researchTime: seconds,
    friendlyResearchTime: timeString,
    requiredLab: parseNumber(rawLevel[scrapingHeaders.requiredHall]),
  }

  return level
}

const scrapeBuilding = (
  buildingInfo: ScrapingTemplate,
  defaultScrapingHeaders: ScrapingHeaders,
  buildingType: BuildingType,
  $: cheerio.Root,
): Building => {
  const scrapingHeaders = {
    ...defaultScrapingHeaders,
    ...buildingInfo.scraping,
  }

  const statsTable = getStatsTable($)
  const statsTableAsJson = convertTableToJson(
    $,
    statsTable,
    buildingInfo.indexesToSkip,
  )
  const availabilityTable = getAvailabilityTable($)
  const availabilityTableAsJson = convertAvailabilityTableToJson(
    $,
    availabilityTable,
  )

  const resource: Resource = $('th', statsTable)
    .filter((i, el) => $(el).text().trim() === scrapingHeaders.buildCost)
    .children('a')
    .last()
    .attr('title') as Resource
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
  const scrapingHeaders = {
    ...defaultScrapingHeaders,
    ...heroInfo.scraping,
  }

  const statsTable = getStatsTable($)
  const statsTableAsJson = convertTableToJson(
    $,
    statsTable,
    heroInfo.indexesToSkip,
  )

  const resource: Resource = $('th', statsTable)
    .filter((i, el) => $(el).text().trim() === scrapingHeaders.buildCost)
    .children('a')
    .last()
    .attr('title') as Resource
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
): Troop => {
  const scrapingHeaders = {
    ...defaultScrapingHeaders,
    ...troopInfo.scraping,
  }

  const statsTable = getStatsTable($)
  const statsTableAsJson = convertTableToJson(
    $,
    statsTable,
    troopInfo.indexesToSkip,
  )

  const resource: Resource = $('th', statsTable)
    .filter((i, el) => $(el).text().trim() === scrapingHeaders.buildCost)
    .children('a')
    .last()
    .attr('title') as Resource
  const troop: Troop = {
    name: troopInfo.name,
    resource,
    requiredBarracks: 1,
    levels: statsTableAsJson.map((rawLevel: any) => {
      console.log(
        'Formatting troop level',
        troopInfo.name,
        rawLevel,
        scrapingHeaders,
      )
      return formatTroopLevel(rawLevel, scrapingHeaders)
    }),
  }

  return troop
}

const getBuildings = async (
  scrapingHeaders: ScrapingHeaders,
  village: VillageBuildingScrapingCollection,
) => {
  const buildings: Array<Building | SpecialtyBuilding> = []
  for (const [category, buildingsList] of Object.entries(village.buildings)) {
    const pages = await fetchPages(buildingsList)
    buildings.push(
      ...pages.map(({ info, page }) =>
        scrapeBuilding(
          info,
          scrapingHeaders,
          ucFirst(category) as BuildingType,
          page,
        ),
      ),
    )
  }
  if (village.specialtyBuildings) {
    buildings.push(...village.specialtyBuildings)
  }
  return buildings
}

const getHeroesTroops = async (
  scrapingHeaders: ScrapingHeaders,
  heroesTroopsCollection: HeroTroopScrapingCollection,
  isHero?: boolean,
) => {
  const heroes: Array<Hero | Troop> = []
  const pages = await fetchPages(heroesTroopsCollection)
  const scrape = isHero ? scrapeHero : scrapeTroop
  heroes.push(
    ...pages.map(({ info, page }) => scrape(info, scrapingHeaders, page)),
  )
  return heroes
}

export const getHomeVillageBuildings = async () =>
  getBuildings(defaultHomeScrapingHeaders, homeVillage)

export const getBuilderBaseBuildings = async () =>
  getBuildings(defaultBuilderScrapingHeaders, builderBase)

export const getHomeVillageHeroes = async () =>
  getHeroesTroops(defaultHomeHeroScrapingHeaders, homeVillageHeroes, true)

export const getBuilderBaseHeroes = async () =>
  getHeroesTroops(defaultBuilderHeroScrapingHeaders, builderBaseHeroes, true)

export const getHomeVillageTroops = async () =>
  getHeroesTroops(defaultHomeTroopScrapingHeaders, homeVillageTroops)

export const getBuilderBaseTroops = async () =>
  getHeroesTroops(defaultBuilderTroopScrapingHeaders, builderBaseTroops)
