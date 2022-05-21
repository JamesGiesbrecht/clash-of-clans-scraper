export type Resource = 'Gold' | 'Elixir' | 'Dark Elixir'

export type BuildingType = 'Defense' | 'Army' | 'Resource'

export type Level = {
  level: number
  buildCost: number
  buildTime: number
  friendlyBuildTime: string
  requiredHall: number
}

export type Building = {
  name: string
  resource: Resource
  type: BuildingType
  levels: Level[]
}
