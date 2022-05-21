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
  const [d, h, m, s] = timeString.split(' ')
  return (
    parseInt(d, 10) * 86400 +
    parseInt(h, 10) * 3600 +
    parseInt(m, 10) * 60 +
    parseInt(s, 10)
  )
}
