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
import { defaultScrapingHeaders, homeVillage } from './buildings'
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
  const level: Level = {
    level: parseNumber(rawLevel[scrapingHeaders.level]),
    buildCost: parseNumber(
      rawLevel[scrapingHeaders.buildCost] || rawLevel.Cost,
    ),
    buildTime: convertTimeStringToSeconds(rawLevel[scrapingHeaders.buildTime]),
    friendlyBuildTime: rawLevel[scrapingHeaders.buildTime],
  }

  if (scrapingHeaders.requiredHall) {
    level.requiredHall = parseNumber(rawLevel[scrapingHeaders.requiredHall])
  }
  return level
}

const run = async (): Promise<void> => {
  const buildings: Building[] = []
  for (const [category, buildingsList] of Object.entries(
    homeVillage.buildings,
  )) {
    // Get html for all buildings in category
    const pages = await Promise.all(
      buildingsList.map(async (buildingInfo) => {
        console.log('Fetching', buildingInfo.name)
        return getPage(WIKI_BASE_URL + buildingInfo.name.replaceAll(' ', '_'))
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
      console.log(availabilityTableAsJson)
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
  writeJsonToFile(`buildings.json`, buildings)
}

run()
