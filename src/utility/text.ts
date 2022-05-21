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

export const convertTimeStringToSeconds = (timeString: string): number => {
  if (timeString === 'N/A' || timeString === '' || timeString === 'None')
    return 0
  if (!timeString)
    throw new Error('Error converting time string, time string is undefined')
  const timeParts = timeString.split(' ')

  const seconds: number = timeParts.reduce((acc: number, timePart: string) => {
    const currentAcc = acc
    switch (timePart.slice(-1)) {
      case 's':
        return currentAcc + parseInt(timePart, 10)
      case 'm':
        return currentAcc + parseInt(timePart, 10) * 60
      case 'h':
        return currentAcc + parseInt(timePart, 10) * 60 * 60
      case 'd':
        return currentAcc + parseInt(timePart, 10) * 60 * 60 * 24
      default:
        throw new Error(
          `Error converting time string, unknown time part ${timePart}`,
        )
    }
  }, 0)

  return seconds
}

export const parseNumber = (str: string): number => {
  if (!str) throw new Error('Error parsing number, string is empty')
  return parseInt(str.replaceAll(' ', '').replaceAll(',', ''), 10) || 0
}
