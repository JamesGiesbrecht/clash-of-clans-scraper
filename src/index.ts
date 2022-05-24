import { getBuilderBaseBuildings, getHomeVillageBuildings } from './clashData'
import { writeJsonToFile } from './utility'

const run = async (): Promise<void> => {
  const homeVillageBuildings = await getHomeVillageBuildings()
  const builderBaseBuildings = await getBuilderBaseBuildings()
  writeJsonToFile('home-village-buildings.json', homeVillageBuildings)
  writeJsonToFile('builder-base-buildings.json', builderBaseBuildings)
}

run()
