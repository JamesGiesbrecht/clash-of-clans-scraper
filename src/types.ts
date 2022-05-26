type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type Resource =
  | 'Gold'
  | 'Elixir'
  | 'Dark Elixir'
  | 'Builder Gold'
  | 'Builder Elixir'

export type BuildingType = 'Defense' | 'Army' | 'Resource'

export type VillageType = 'home-village' | 'builder-base'

export type Availability = {
  [key: number]: number
}

export type BuildingLevel = {
  level: number
  buildCost: number
  buildTime: number
  friendlyBuildTime: string
  requiredHall?: number
}

export type PetLevel = {
  level: number
  upgradeCost: number
  upgradeTime: number
  friendlyUpgradeTime: string
}

export type HeroLevel = PetLevel & {
  requiredHall: number
}

export type TroopSpellSiegeMachineLevel = {
  level: number
  researchCost: number
  researchTime: number
  friendlyResearchTime: string
  requiredLab: number
}

export type Building = {
  name: string
  resource: Resource
  type: BuildingType
  levels: BuildingLevel[]
  availability: Availability
}

export type Hero = {
  name: string
  resource: Resource
  levels: HeroLevel[]
}

export type Troop = {
  name: string
  resource: Resource
  requiredBarracks: number
  levels: TroopSpellSiegeMachineLevel[]
}

// TODO
export type Spell = {
  name: string
  resource: Resource
  requiredSpellFactory: number
  levels: TroopSpellSiegeMachineLevel[]
}

// TODO
export type SiegeMachine = {
  name: string
  resource: Resource
  requiredWorkshop: number
  levels: TroopSpellSiegeMachineLevel[]
}

// TODO
export type Pet = {
  name: string
  resource: Resource
  requiredPetHouse: number
  levels: PetLevel[]
}

export type SpecialtyBuilding = Overwrite<
  Building,
  {
    levels: Array<BuildingLevel | { level: number; requirement: any }>
  }
>

export type IndexesToSkip = {
  headers?: number[]
  rows?: number[]
}

export type ScrapingHeaders = {
  level?: string
  buildCost?: string
  buildTime?: string
  requiredHall?: string
}

export type ScrapingTemplate = {
  name: string
  urlSuffix?: string
  indexesToSkip?: IndexesToSkip
  scraping?: ScrapingHeaders
}

export type VillageBuildingScrapingCollection = {
  buildings: {
    defense: ScrapingTemplate[]
    army: ScrapingTemplate[]
    resource: ScrapingTemplate[]
  }
  specialtyBuildings?: SpecialtyBuilding[]
}

export type HeroTroopScrapingCollection = ScrapingTemplate[]
