import fs from 'fs'
import path from 'path'

export const writeJsonToFile = (fileName: string, json: any): void => {
  fs.writeFile(
    path.join('json', fileName),
    JSON.stringify(json, null, 2),
    (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`JSON saved to ${fileName}`)
      }
    },
  )
}
