import {
  getBuilderBaseBuildings,
  getBuilderBaseHeroes,
  getHomeVillageBuildings,
  getHomeVillageHeroes,
} from './clashData'
import { writeJsonToFile } from './utility'

const run = async (): Promise<void> => {
  const [
    // homeVillageBuildings,
    // builderBaseBuildings,
    homeVillageHeroes,
    builderBaseHeroes,
  ] = await Promise.all([
    // getHomeVillageBuildings(),
    // getBuilderBaseBuildings(),
    getHomeVillageHeroes(),
    getBuilderBaseHeroes(),
  ])
  // writeJsonToFile('home-village-buildings.json', homeVillageBuildings)
  // writeJsonToFile('builder-base-buildings.json', builderBaseBuildings)
  writeJsonToFile('home-village-heroes.json', homeVillageHeroes)
  writeJsonToFile('builder-base-heroes.json', builderBaseHeroes)
}

run()
