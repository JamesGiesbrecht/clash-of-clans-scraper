import axios from 'axios'
import cheerio from 'cheerio'

export const getPage = async (url: string) => {
  const result = await axios.get(url)
  return cheerio.load(result.data)
}

export const convertTableToJson = ($: cheerio.Root, tableId: string): any => {
  const table = $(`#${tableId}`)
  console.log(tableId)
  const tableAsJson: any[] = []
  // Get column headings
  // @fixme Doesn't support vertical column headings.
  // @todo Try to support badly formated tables.
  const columnHeadings: any[] = []
  $(table)
    .find('tr')
    .each((i, row) => {
      $(row)
        .find('th')
        .each((j, cell) => {
          columnHeadings[j] = $(cell).text().trim()
        })
    })

  // Fetch each row
  $(table)
    .find('tr')
    .each((i, row) => {
      const rowAsJson: any = {}
      $(row)
        .find('td')
        .each((j, cell) => {
          if (columnHeadings[j]) {
            rowAsJson[columnHeadings[j]] = $(cell).text().trim()
          } else {
            rowAsJson[j] = $(cell).text().trim()
          }
        })

      // Skip blank rows
      if (JSON.stringify(rowAsJson) !== '{}') tableAsJson.push(rowAsJson)
    })

  return tableAsJson
}
