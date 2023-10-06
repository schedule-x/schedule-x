export const concatenatePeople = (people: string[]) => {
  return people.reduce((acc, person, index) => {
    if (index === 0) return person

    if (index === people.length - 1) return `${acc} & ${person}`

    return `${acc}, ${person}`
  }, '')
}
