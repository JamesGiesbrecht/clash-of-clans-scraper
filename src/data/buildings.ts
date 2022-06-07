import { ScrapingHeaders, VillageBuildingScrapingCollection } from '../types'

export const defaultHomeScrapingHeaders: ScrapingHeaders = {
  level: 'Level',
  cost: 'Build Cost',
  time: 'Build Time',
  requiredHall: 'Town Hall Level Required',
}

export const defaultBuilderScrapingHeaders: ScrapingHeaders = {
  ...defaultHomeScrapingHeaders,
  requiredHall: 'Builder Hall Level Required',
}

const HOME_VILLAGE_SUFFIX = '/Home_Village'
const BUILDER_BASE_SUFFIX = '/Builder_Base'

export const homeVillage: VillageBuildingScrapingCollection = {
  buildings: {
    defense: [
      { name: 'Cannon', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Archer Tower', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Mortar' },
      { name: 'Air Defense', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Wizard Tower' },
      { name: 'Air Sweeper' },
      { name: 'Hidden Tesla', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Bomb Tower', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'X-Bow' },
      {
        name: 'Inferno Tower',
        urlSuffix: HOME_VILLAGE_SUFFIX,
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
        name: 'Wall',
        urlSuffix: HOME_VILLAGE_SUFFIX,
        indexesToSkip: {
          headers: [4, 6],
          rows: [4, 6],
        },
      },
    ],
    army: [
      { name: 'Army Camp', urlSuffix: HOME_VILLAGE_SUFFIX },
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
      { name: 'Gold Mine', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Elixir Collector', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Dark Elixir Drill' },
      { name: 'Gold Storage', urlSuffix: HOME_VILLAGE_SUFFIX },
      { name: 'Elixir Storage', urlSuffix: HOME_VILLAGE_SUFFIX },
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
        name: 'Wall',
        urlSuffix: BUILDER_BASE_SUFFIX,
        indexesToSkip: {
          headers: [4, 6],
          rows: [4, 6],
        },
      },
    ],
    army: [{ name: 'Builder Barracks' }, { name: 'Star Laboratory' }],
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
      name: 'Army Camp',
      resource: 'Builder Elixir',
      type: 'Army',
      levels: [
        {
          level: 1,
          remoteImageUrl:
            'https://static.wikia.nocookie.net/clashofclans/images/e/e4/Army_CampB.png',
          requirement: {
            '1': {
              buildCost: 0,
              buildTime: 0,
              friendlyBuildTime: 'N/A',
            },
            '2': {
              buildCost: 12000,
              buildTime: 300,
              friendlyBuildTime: '5m',
            },
            '3': {
              buildCost: 180000,
              buildTime: 10800,
              friendlyBuildTime: '3h',
            },
            '4': {
              buildCost: 350000,
              buildTime: 28800,
              friendlyBuildTime: '8h',
            },
            '5': {
              buildCost: 2500000,
              buildTime: 172800,
              friendlyBuildTime: '2d',
            },
            '6': {
              buildCost: 2500000,
              buildTime: 172800,
              friendlyBuildTime: '2d',
            },
          },
        },
      ],
      availability: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 4,
        '6': 4,
        '7': 5,
        '8': 6,
        '9': 6,
      },
    },
    {
      name: 'O.T.T.O. Hut',
      resource: 'Builder Gold',
      type: 'Resource',
      levels: [
        {
          level: 1,
          buildCost: 100000,
          buildTime: 0,
          friendlyBuildTime: 'N/A',
          remoteImageUrl:
            'https://static.wikia.nocookie.net/clashofclans/images/9/95/O.T.T.O_Hut1.png',
          requiredHall: 9,
        },
        {
          level: 2,
          remoteImageUrl:
            'http://static.wikia.nocookie.net/clashofclans/images/a/a7/O.T.T.O_Hut2.png',
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
          remoteImageUrl:
            'https://static.wikia.nocookie.net/clashofclans/images/2/2e/O.T.T.O_Hut3.png',
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
          remoteImageUrl:
            'https://static.wikia.nocookie.net/clashofclans/images/6/6b/O.T.T.O_Hut4.png',
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
          remoteImageUrl:
            'https://static.wikia.nocookie.net/clashofclans/images/8/80/O.T.T.O_Hut5.png',
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
