import {
  getPage,
  convertTableToJson,
  convertTimeStringToSeconds,
  writeJsonToFile,
  ucFirst,
  getStatsTable,
  parseNumber,
  getAvailabilityTable,
  convertAvailabilityTableToJson,
} from './utility'
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
} from './types'

const WIKI_BASE_URL = 'https://clashofclans.fandom.com/wiki/'

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

const fetchBuildings = async (
  village: 'home-village' | 'builder-base',
): Promise<void> => {
  const buildingsCollection =
    village === 'home-village' ? homeVillage : builderBase
  const fileName = `${village}-buildings`
  const defaultScrapingHeaders =
    village === 'home-village'
      ? defaultHomeScrapingHeaders
      : defaultBuilderScrapingHeaders
  const buildings: Building[] = []
  for (const [category, buildingsList] of Object.entries(
    buildingsCollection.buildings,
  )) {
    // Get html for all buildings in category
    const pages = await Promise.all(
      buildingsList.map(async (buildingInfo) => {
        console.log('Fetching', buildingInfo.name)
        return getPage(
          WIKI_BASE_URL +
            buildingInfo.name.replaceAll(' ', '_') +
            (buildingInfo.urlSuffix || ''),
        )
      }),
    )
    // Convert each table to json
    buildingsList.forEach((buildingInfo, index) => {
      const $ = pages[index]
      const statsTable = getStatsTable($)
      const availibityTable = getAvailabilityTable($)
      const statsTableAsJson = convertTableToJson(
        $,
        statsTable,
        buildingInfo.indexesToSkip,
      )
      const availabilityTableAsJson = convertAvailabilityTableToJson(
        $,
        availibityTable,
      )
      const scrapingHeaders = {
        ...defaultScrapingHeaders,
        ...buildingInfo.scraping,
      }
      const resource: Resource = $('th', statsTable)
        .filter((i, el) => $(el).text().trim() === scrapingHeaders.buildCost)
        .children('a')
        .last()
        .attr('title') as Resource
      const buildingType: BuildingType = ucFirst(category) as BuildingType
      const building: Building = {
        name: buildingInfo.name,
        resource,
        type: buildingType,
        levels: statsTableAsJson.map((rawLevel: any) =>
          formatLevel(rawLevel, scrapingHeaders),
        ),
        availability: availabilityTableAsJson,
      }

      buildings.push(building)
    })
  }
  writeJsonToFile(`${fileName}.json`, buildings)
}

const run = async (): Promise<void> => {
  await fetchBuildings('home-village')
  await fetchBuildings('builder-base')
}

run()
