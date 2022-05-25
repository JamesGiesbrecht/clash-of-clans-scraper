import cheerio from 'cheerio'
import {
  builderBase,
  defaultBuilderScrapingHeaders,
  defaultHomeScrapingHeaders,
  homeVillage,
} from './data/buildings'
import {
  builderBaseHeroes,
  defaultBuilderHeroScrapingHeaders,
  defaultHomeHeroScrapingHeaders,
  homeVillageHeroes,
} from './data/troops'
import {
  Building,
  BuildingType,
  Hero,
  HeroScrapingCollection,
  Level,
  Resource,
  ScrapingHeaders,
  ScrapingTemplate,
  SpecialtyBuilding,
  VillageBuildingScrapingCollection,
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

const formatLevel = (
  rawLevel: { [key: string]: string },
  scrapingHeaders: ScrapingHeaders,
): Level => {
  const { seconds, timeString } = convertTimeStringToSeconds(
    rawLevel[scrapingHeaders.buildTime],
  )
  const level: Level = {
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
      formatLevel(rawLevel, scrapingHeaders),
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
      formatLevel(rawLevel, scrapingHeaders),
    ),
  }
  return hero
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

const getHeroes = async (
  scrapingHeaders: ScrapingHeaders,
  heroesCollection: HeroScrapingCollection,
) => {
  const heroes: Array<Hero> = []
  const heroNames = Object.keys(heroesCollection).map(
    (hero) => heroesCollection[hero],
  )
  const pages = await fetchPages(heroNames)
  heroes.push(
    ...pages.map(({ info, page }) => scrapeHero(info, scrapingHeaders, page)),
  )
  return heroes
}

export const getHomeVillageBuildings = async () =>
  getBuildings(defaultHomeScrapingHeaders, homeVillage)

export const getBuilderBaseBuildings = async () =>
  getBuildings(defaultBuilderScrapingHeaders, builderBase)

export const getHomeVillageHeroes = async () =>
  getHeroes(defaultHomeHeroScrapingHeaders, homeVillageHeroes)

export const getBuilderBaseHeroes = async () =>
  getHeroes(defaultBuilderHeroScrapingHeaders, builderBaseHeroes)
