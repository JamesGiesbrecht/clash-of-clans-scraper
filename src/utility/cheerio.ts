import axios from 'axios'
import cheerio from 'cheerio'
import { IndexesToSkip } from '../types'

export const getPage = async (url: string) => {
  const result = await axios.get(url)
  return cheerio.load(result.data)
}

export const getStatsTable = ($: cheerio.Root): cheerio.Cheerio => {
  return $('table')
    .filter((i, el) => {
      const headerText = $(el).find('th').first().text().trim()
      return headerText === 'Level' || headerText === 'TH Level'
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
