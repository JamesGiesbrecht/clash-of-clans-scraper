import {
  getBuilderBaseBuildings,
  getBuilderBaseHeroes,
  getBuilderBaseTroops,
  getHomeVillageBuildings,
  getHomeVillageHeroes,
  getHomeVillageTroops,
} from './clashData'
import { writeJsonToFile } from './utility'

const run = async (): Promise<void> => {
  const [
    // homeVillageBuildings,
    // builderBaseBuildings,
    // homeVillageHeroes,
    // builderBaseHeroes,
    homeVillageTroops,
    builderBaseTroops,
  ] = await Promise.all([
    // getHomeVillageBuildings(),
    // getBuilderBaseBuildings(),
    // getHomeVillageHeroes(),
    // getBuilderBaseHeroes(),
    getHomeVillageTroops(),
    getBuilderBaseTroops(),
  ])
  // writeJsonToFile('home-village-buildings.json', homeVillageBuildings)
  // writeJsonToFile('builder-base-buildings.json', builderBaseBuildings)
  // writeJsonToFile('home-village-heroes.json', homeVillageHeroes)
  // writeJsonToFile('builder-base-heroes.json', builderBaseHeroes)
  writeJsonToFile('home-village-troops.json', homeVillageTroops)
  writeJsonToFile('builder-base-troops.json', builderBaseTroops)
}

run()
