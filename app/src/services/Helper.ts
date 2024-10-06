import { toZonedTime, format } from 'date-fns-tz'

// helper with some useful functions

export function getIntervalDates(interval: string) {
  const timeZone = import.meta.env.VITE_TIMEZONE

  const endDate = toZonedTime(new Date(), timeZone)
  const startDate = toZonedTime(new Date(), timeZone)

  // interval value format is number-time e.g. 1-m, 1-h, 1-d, 1-w, 1-m, 3-m, 6-m, 1-y
  const [value, time] = interval.split('-')
  switch (time) {
    case 'm':
      startDate.setMinutes(startDate.getMinutes() - parseInt(value))
      break
    case 'h':
      startDate.setHours(startDate.getHours() - parseInt(value))
      break
    case 'd':
      startDate.setDate(startDate.getDate() - parseInt(value))
      break
    case 'w':
      startDate.setDate(startDate.getDate() - parseInt(value) * 7)
      break
    case 'M':
      startDate.setMonth(startDate.getMonth() - parseInt(value))
      break
    case 'y':
      startDate.setFullYear(startDate.getFullYear() - parseInt(value))
      break
    default:
      startDate.setHours(startDate.getHours() - 1)
      break
  }

  // return the dates in the datetime-local format
  return {
    startDate: format(startDate, "yyyy-MM-dd'T'HH:mm", { timeZone }),
    endDate: format(endDate, "yyyy-MM-dd'T'HH:mm", { timeZone }),
  }
}
