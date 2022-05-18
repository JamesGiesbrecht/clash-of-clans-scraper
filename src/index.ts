import {
  getPage,
  convertToLowercaseRemoveSpaces,
  convertTableToJson,
  writeJsonToFile,
  camelize,
} from './utility.js'
import { homeVillage } from './buildings.js'

const WIKI_BASE_URL = 'https://clashofclans.fandom.com/wiki/'

const run = async () => {
  const buildings = {}
  for (const building of homeVillage.buildings.resource) {
    console.log(building)
    const $ = await getPage(WIKI_BASE_URL + building.replaceAll(' ', '_'))
    const tableId = `${convertToLowercaseRemoveSpaces(building)}-table-1`
    const tableAsJson = convertTableToJson($, tableId)
    buildings[camelize(building)] = tableAsJson
  }
  console.log('writing', buildings)
  writeJsonToFile(`buildings.json`, buildings)
}

run()
