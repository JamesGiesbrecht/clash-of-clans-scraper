export type Resource = 'Gold' | 'Elixir' | 'Dark Elixir'

export type BuildingType = 'Defense' | 'Army' | 'Resource'

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
  indexesToSkip?: IndexesToSkip
  scraping?: ScrapingHeaders
}
