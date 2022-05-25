import { ScrapingHeaders, VillageBuildingScrapingCollection } from '../types'

export const defaultHomeScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  buildCost: 'Build Cost',
  buildTime: 'Build Time',
  requiredHall: 'Town Hall Level Required',
}

export const defaultBuilderScrapingHeaders: ScrapingHeaders = {
  ...defaultHomeScrapingHeaders,
  requiredHall: 'Builder Hall Level Required',
}

const BUILDER_BASE_SUFFIX = '/Builder_Base'

export const homeVillage: VillageBuildingScrapingCollection = {
  buildings: {
    defense: [
      { name: 'Cannon' },
      { name: 'Archer Tower' },
      { name: 'Mortar' },
      { name: 'Air Defense' },
      { name: 'Wizard Tower' },
      { name: 'Air Sweeper' },
      { name: 'Hidden Tesla' },
      { name: 'Bomb Tower' },
      { name: 'X-Bow' },
      {
        name: 'Inferno Tower',
        indexesToSkip: {
          headers: [1, 2],
          rows: [1, 2, 3, 4, 5, 6],
        },
      },
      { name: 'Eagle Artillery' },
      { name: 'Scattershot' },
      { name: "Builder's Hut" },
      { name: 'Bomb' },
      { name: 'Spring Trap' },
      { name: 'Air Bomb' },
      { name: 'Giant Bomb' },
      { name: 'Seeking Air Mine' },
      { name: 'Skeleton Trap' },
      { name: 'Tornado Trap' },
      {
        name: 'Walls',
        indexesToSkip: {
          headers: [4, 6],
          rows: [4, 6],
        },
      },
    ],
    army: [
      { name: 'Army Camp' },
      { name: 'Barracks' },
      { name: 'Dark Barracks' },
      { name: 'Laboratory' },
      {
        name: 'Spell Factory',
        scraping: { requiredHall: 'Town HallLevel Required' },
      },
      {
        name: 'Dark Spell Factory',
        scraping: { requiredHall: 'Town HallLevel Required' },
      },
      { name: 'Workshop' },
      { name: 'Pet House' },
    ],
    resource: [
      { name: 'Gold Mine' },
      { name: 'Elixir Collector' },
      { name: 'Dark Elixir Drill' },
      { name: 'Gold Storage' },
      { name: 'Elixir Storage' },
      { name: 'Dark Elixir Storage' },
      { name: 'Clan Castle' },
      {
        name: 'Town Hall',
        scraping: { level: 'TH Level', requiredHall: null },
      },
    ],
  },
}

export const builderBase: VillageBuildingScrapingCollection = {
  buildings: {
    defense: [
      { name: 'Cannon', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Double Cannon' },
      { name: 'Archer Tower', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Hidden Tesla', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Firecrackers' },
      { name: 'Crusher', urlSuffix: BUILDER_BASE_SUFFIX },
      {
        name: 'Guard Post',
        indexesToSkip: {
          headers: [1],
          rows: [1, 2],
        },
      },
      { name: 'Air Bombs', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Multi Mortar', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Roaster' },
      { name: 'Giant Cannon', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Mega Tesla' },
      { name: 'Lava Launcher' },
      { name: 'Push Trap' },
      { name: 'Spring Trap', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Mine', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Mega Mine', urlSuffix: BUILDER_BASE_SUFFIX },
      {
        name: 'Walls',
        urlSuffix: BUILDER_BASE_SUFFIX,
        indexesToSkip: {
          headers: [4, 6],
          rows: [4, 6],
        },
      },
    ],
    army: [
      { name: 'Builder Barracks' },
      { name: 'Army Camp', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Star Laboratory' },
    ],
    resource: [
      {
        name: 'Builder Hall',
        scraping: { level: 'BH Level', requiredHall: null },
      },
      { name: 'Gold Mine', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Elixir Collector', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Gold Storage', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Elixir Storage', urlSuffix: BUILDER_BASE_SUFFIX },
      { name: 'Gem Mine' },
      { name: 'Clock Tower' },
    ],
  },
  specialtyBuildings: [
    {
      name: 'O.T.T.O. Hut',
      resource: 'Gold',
      type: 'Resource',
      levels: [
        {
          level: 1,
          buildCost: 100000,
          buildTime: 0,
          friendlyBuildTime: 'N/A',
          requiredHall: 9,
        },
        {
          level: 2,
          requirement: {
            homeVillage: {
              cannon: {
                gearedUp: true,
              },
              archerTower: {
                gearedUp: true,
              },
              mortar: {
                gearedUp: true,
              },
            },
          },
        },
        {
          level: 3,
          requirement: {
            builderBase: {
              cannonCart: {
                level: 18,
              },
            },
          },
        },
        {
          level: 4,
          requirement: {
            builderBase: {
              megaTesla: {
                level: 9,
              },
            },
          },
        },
        {
          level: 5,
          requirement: {
            builderBase: {
              battleMachine: {
                level: 30,
              },
            },
          },
        },
      ],
      availability: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 1,
      },
    },
  ],
}

// Home Village
// Heroes

// Builder Base
// Battle Machine
