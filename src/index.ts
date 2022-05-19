import {
  getPage,
  convertTableToJson,
  writeJsonToFile,
  convertToLowercaseRemoveSpaces,
  camelize,
} from './utility'
import { homeVillage } from './buildings'

const WIKI_BASE_URL = 'https://clashofclans.fandom.com/wiki/'

const run = async (): Promise<void> => {
  const buildings: any = {}
  for (const building of homeVillage.buildings.resource) {
    console.log(building)
    const $ = await getPage(WIKI_BASE_URL + building.replaceAll(' ', '_'))
    const tableId = `${convertToLowercaseRemoveSpaces(building)}-table-1`
    const tableAsJson = convertTableToJson($, tableId)
    buildings[camelize(building)] = tableAsJson
  }
  writeJsonToFile(`buildings.json`, buildings)
}

run()
