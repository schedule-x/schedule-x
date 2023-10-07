export const getRandomElementOfArray = (list: unknown[]) => {
  const randomIndex = Math.floor(Math.random() * list.length)

  return list[randomIndex]
}
