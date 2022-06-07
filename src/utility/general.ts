import fs from 'fs'
import path from 'path'
import axios from 'axios'

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

export const downloadImage = async (
  url: string,
  filepath: string,
): Promise<string> => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })
  fs.mkdirSync(path.dirname(filepath), { recursive: true })
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath))
  })
}
