const bydayJSDayMap = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
}

export const getJSDayFromByday = (byday: string): number => {
  return bydayJSDayMap[byday as keyof typeof bydayJSDayMap]
}
