export type Resource = 'Gold' | 'Elixir' | 'Dark Elixir'

export type BuildingType = 'Defense' | 'Army' | 'Resource'

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
}
