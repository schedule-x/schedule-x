export const replaceTimeInDatetime = (dateTime: string, time: string) => {
  const [date, _] = dateTime.split(' ')
  return `${date} ${time}`
}
