import cheerio from 'cheerio'
import {
  builderBase,
  defaultBuilderScrapingHeaders,
  defaultHomeScrapingHeaders,
  homeVillage,
} from './data/buildings'
import {
  Building,
  BuildingType,
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

const fetchBuildingPages = async (
  buildingsList: ScrapingTemplate[],
): Promise<{ buildingInfo: ScrapingTemplate; page: cheerio.Root }[]> => {
  const buildingPages = await Promise.all(
    buildingsList.map(async (buildingInfo) => {
      console.log('Fetching', buildingInfo.name)
      return {
        buildingInfo,
        page: await getPage(
          WIKI_BASE_URL +
            buildingInfo.name.replaceAll(' ', '_') +
            (buildingInfo.urlSuffix || ''),
        ),
      }
    }),
  )
  return buildingPages
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
) => {
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

const getBuildings = async (
  scrapingHeaders: ScrapingHeaders,
  village: VillageBuildingScrapingCollection,
) => {
  const buildings: Array<Building | SpecialtyBuilding> = []
  for (const [category, buildingsList] of Object.entries(village.buildings)) {
    const pages = await fetchBuildingPages(buildingsList)
    buildings.push(
      ...pages.map(({ buildingInfo, page }) =>
        scrapeBuilding(
          buildingInfo,
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

export const getHomeVillageBuildings = async () =>
  getBuildings(defaultHomeScrapingHeaders, homeVillage)

export const getBuilderBaseBuildings = async () =>
  getBuildings(defaultBuilderScrapingHeaders, builderBase)
