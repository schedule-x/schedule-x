// TODO: rename to dateFromDateOrDateTime
export const dateFromDateTime = (dateTime: string): string => {
  return dateTime.slice(0, 10)
}

export const timeFromDateTime = (dateTime: string): string => {
  return dateTime.slice(11)
}
