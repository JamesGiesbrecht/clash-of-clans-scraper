type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type Resource = 'Gold' | 'Elixir' | 'Dark Elixir'

export type BuildingType = 'Defense' | 'Army' | 'Resource'

export type VillageType = 'home-village' | 'builder-base'

export type Availability = {
  [key: number]: number
}

export type Level = {
  level: number
  buildCost: number
  buildTime: number
  friendlyBuildTime: string
  requiredHall?: number
}

export type Building = {
  name: string
  resource: Resource
  type: BuildingType
  levels: Level[]
  availability: Availability
}

export type SpecialtyBuilding = Overwrite<
  Building,
  {
    levels: Array<Level | { level: number; requirement: any }>
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
