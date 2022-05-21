export const convertToLowercaseRemoveSpaces = (str: string): string => {
  return str.replaceAll(' ', '').toLowerCase()
}

export const camelize = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const ucFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

// convert '1d 2h 3m 18s' to seconds
export const convertTimeStringToSeconds = (timeString: string): number => {
  if (timeString === 'N/A' || timeString === '') return 0
  if (!timeString)
    throw new Error('Error converting time string, time string is undefined')
  const [d, h, m, s] = timeString.split(' ')
  return (
    parseInt(d, 10) * 86400 +
    parseInt(h, 10) * 3600 +
    parseInt(m, 10) * 60 +
    parseInt(s, 10)
  )
}

export const parseNumber = (str: string): number => {
  if (!str) throw new Error('Error parsing number, string is empty')
  return parseInt(str.replaceAll(' ', '').replaceAll(',', ''), 10)
}
