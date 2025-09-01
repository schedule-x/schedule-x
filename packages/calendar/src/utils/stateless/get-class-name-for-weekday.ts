export const getClassNameForWeekday = (weekday: number): string => {
  switch (weekday) {
    case 1:
      return 'sx__monday'
    case 2:
      return 'sx__tuesday'
    case 3:
      return 'sx__wednesday'
    case 4:
      return 'sx__thursday'
    case 5:
      return 'sx__friday'
    case 6:
      return 'sx__saturday'
    case 7:
      return 'sx__sunday'
    default:
      throw new Error(`Invalid weekday ${weekday}`)
  }
}
