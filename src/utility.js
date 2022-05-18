import axios from 'axios'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

export const getPage = async (url) => {
  const result = await axios.get(url)
  return cheerio.load(result.data)
}

export const convertToLowercaseRemoveSpaces = (str) => {
  return str.replaceAll(' ', '').toLowerCase()
}

export const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const convertTableToJson = ($, tableId) => {
  const table = $(`#${tableId}`)
  console.log(tableId)
  const tableAsJson = []
  // Get column headings
  // @fixme Doesn't support vertical column headings.
  // @todo Try to support badly formated tables.
  const columnHeadings = []
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
      const rowAsJson = {}
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

export const writeJsonToFile = (fileName, json) => {
  fs.writeFile(path.join('json', fileName), JSON.stringify(json, null, 2), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`JSON saved to ${fileName}`)
    }
  })
}
