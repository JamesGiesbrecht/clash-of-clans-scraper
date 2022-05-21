import axios from 'axios'
import cheerio from 'cheerio'

export const getPage = async (url: string) => {
  const result = await axios.get(url)
  return cheerio.load(result.data)
}

export const getStatsTable = ($: cheerio.Root): cheerio.Cheerio => {
  return $('table')
    .filter((i, el) => {
      const headerText = $(el).find('th').first().text().trim()
      return headerText === 'Level'

      // $('th', el).filter((i, el) => $(el).text().trim() === 'Level').length > 0
      // $(el).text().trim() === 'Build Cost'
    })
    .first()
}

export const convertTableToJson = (
  $: cheerio.Root,
  table: cheerio.Cheerio,
  buildingName?: string,
): any => {
  const tableAsJson: any[] = []
  // Get column headings
  // @fixme Doesn't support vertical column headings.
  // @todo Try to support badly formated tables.
  const columnHeadings: any[] = []

  const indexesToSkip: {
    [key: string]: { headers: number[]; rows: number[] }
  } = {
    'Inferno Tower': {
      headers: [1, 2],
      rows: [1, 2, 3, 4, 5, 6],
    },
  }

  $(table)
    .find('tr')
    .first()
    .each((i, row) => {
      $(row)
        .find('th')
        .each((j, cell) => {
          if (buildingName && indexesToSkip[buildingName]) {
            if (indexesToSkip[buildingName].headers.includes(j)) {
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
          if (buildingName && indexesToSkip[buildingName]) {
            if (indexesToSkip[buildingName].rows.includes(j)) {
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
