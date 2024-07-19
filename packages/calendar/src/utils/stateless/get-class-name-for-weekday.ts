export const getClassNameForWeekday = (weekday: number) => {
  switch (weekday) {
    case 0:
      return 'sx__sunday'
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
  }
}
