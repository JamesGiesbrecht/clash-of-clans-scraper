import {
  getPage,
  convertTableToJson,
  convertTimeStringToSeconds,
  writeJsonToFile,
  ucFirst,
  getStatsTable,
  parseNumber,
} from './utility'
import { homeVillage } from './buildings'
import { Building, BuildingType, Level, Resource } from './types'

const WIKI_BASE_URL = 'https://clashofclans.fandom.com/wiki/'

const formatLevel = (rawLevel: { [key: string]: string }): Level => {
  return {
    level: parseNumber(rawLevel.Level),
    buildCost: parseNumber(rawLevel['Build Cost'] || rawLevel.Cost),
    buildTime: convertTimeStringToSeconds(rawLevel['Build Time']),
    friendlyBuildTime: rawLevel['Build Time'],
    requiredHall: parseNumber(
      rawLevel['Town Hall Level Required'] ||
        rawLevel['Town HallLevel Required'],
    ),
  }
}

const run = async (): Promise<void> => {
  const buildings: Building[] = []
  for (const [category, buildingsList] of Object.entries(
    homeVillage.buildings,
  )) {
    // Get html for all buildings in category
    const pages = await Promise.all(
      buildingsList.map(async (buildingName) => {
        console.log('Fetching', buildingName)
        return getPage(WIKI_BASE_URL + buildingName.replaceAll(' ', '_'))
      }),
    )
    // Convert each table to json
    buildingsList.forEach((buildingName, index) => {
      const $ = pages[index]
      const table = getStatsTable($)
      const tableAsJson = convertTableToJson($, table, buildingName)
      const resource: Resource = $('th', table)
        .filter((i, el) => $(el).text().trim() === 'Build Cost')
        .children('a')
        .last()
        .attr('title') as Resource
      const buildingType: BuildingType = ucFirst(category) as BuildingType
      const building: Building = {
        name: buildingName,
        resource,
        type: buildingType,
        levels: tableAsJson.map((rawLevel: any) => formatLevel(rawLevel)),
      }

      buildings.push(building)
    })
  }
  writeJsonToFile(`buildings.json`, buildings)
}

run()
