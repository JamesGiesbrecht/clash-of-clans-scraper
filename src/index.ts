import {
  getPage,
  convertTableToJson,
  convertTimeStringToSeconds,
  writeJsonToFile,
  convertToLowercaseRemoveSpaces,
  camelize,
  ucFirst,
  getStatsTable,
} from './utility'
import { homeVillage } from './buildings'
import { Building, BuildingType, Resource } from './types'

const WIKI_BASE_URL = 'https://clashofclans.fandom.com/wiki/'

const run = async (): Promise<void> => {
  const buildings: Building[] = []
  for (const [category, buildingsList] of Object.entries(
    homeVillage.buildings,
  )) {
    const pages = await Promise.all(
      buildingsList.map(async (buildingName) => {
        console.log('Fetching', buildingName)
        return getPage(WIKI_BASE_URL + buildingName.replaceAll(' ', '_'))
      }),
    )
    buildingsList.forEach((buildingName, index) => {
      const $ = pages[index]
      const table = getStatsTable($)
      const tableAsJson = convertTableToJson($, table)
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
        levels: tableAsJson,
      }
      buildings.push(building)
    })
  }
  writeJsonToFile(`buildings.json`, buildings)
}

run()
