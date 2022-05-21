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
      console.log(i, headerText, headerText === 'Level')
      return headerText === 'Level'

      // $('th', el).filter((i, el) => $(el).text().trim() === 'Level').length > 0
      // $(el).text().trim() === 'Build Cost'
    })
    .first()
}

export const convertTableToJson = (
  $: cheerio.Root,
  table: cheerio.Cheerio,
): any => {
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
