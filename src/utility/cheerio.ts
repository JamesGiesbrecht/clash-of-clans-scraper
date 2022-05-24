import axios from 'axios'
import cheerio from 'cheerio'
import { IndexesToSkip } from '../types'
import { parseNumber } from './text'

export const getPage = async (url: string) => {
  const result = await axios.get(url)
  return cheerio.load(result.data)
}

export const getStatsTable = ($: cheerio.Root): cheerio.Cheerio => {
  return $('table')
    .filter((i, el) => {
      const headerText = $(el).find('th').first().text().trim()
      return (
        headerText === 'Level' ||
        headerText === 'TH Level' ||
        headerText === 'BH Level'
      )
    })
    .first()
}

export const getAvailabilityTable = ($: cheerio.Root): cheerio.Cheerio => {
  return $('table')
    .filter((i, el) => {
      const firstHeaderText = $(el).find('th').first().text().trim()
      const lastHeaderText = $(el).find('th').last().text().trim()
      return (
        (firstHeaderText === 'Town Hall Level' ||
          firstHeaderText === 'Builder Hall Level') &&
        lastHeaderText === 'Number Available'
      )
    })
    .first()
}

export const convertTableToJson = (
  $: cheerio.Root,
  table: cheerio.Cheerio,
  indexesToSkip?: IndexesToSkip,
): any => {
  const tableAsJson: any[] = []
  // Get column headings
  // @fixme Doesn't support vertical column headings.
  // @todo Try to support badly formated tables.
  const columnHeadings: any[] = []

  $(table)
    .find('tr')
    .first()
    .each((i, row) => {
      $(row)
        .find('th')
        .each((j, cell) => {
          if (indexesToSkip) {
            if (indexesToSkip.headers?.includes(j)) {
              return
            }
          }
          columnHeadings.push($(cell).text().trim())
        })
    })

  // Fetch each row
  $(table)
    .find('tr')
    .each((i, row) => {
      const rowAsJson: any = {}
      const rowValues: any[] = []
      $(row)
        .find('td')
        .each((j, cell) => {
          if (indexesToSkip) {
            if (indexesToSkip.rows?.includes(j)) {
              return
            }
          }
          rowValues.push($(cell).text().trim())
          columnHeadings.forEach((heading, index) => {
            rowAsJson[heading] = rowValues[index]
          })
        })

      // Skip blank rows
      if (JSON.stringify(rowAsJson) !== '{}') tableAsJson.push(rowAsJson)
    })

  return tableAsJson
}

export const convertAvailabilityTableToJson = (
  $: cheerio.Root,
  table: cheerio.Cheerio,
): any => {
  const tableAsJson: any = {}
  const columnHeadings: any[] = []
  const rowValues: any[] = []

  $(table)
    .find('tr')
    .first()
    .each((i, row) => {
      $(row)
        .find('th')
        .each((j, cell) => {
          columnHeadings.push($(cell).text().trim())
        })
    })
  // Remove Header Text
  columnHeadings.shift()

  $(table)
    .find('tr')
    .last()
    .find('td')
    .each((i, cell) => {
      rowValues.push($(cell).text().trim())
    })

  columnHeadings.forEach((heading, index) => {
    tableAsJson[heading] = parseNumber(rowValues[index])
  })

  return tableAsJson
}
