// wanted duplication of code, in order to not depend on same logic as implementation (toDateString)
export const getCurrentDayDateString = () => {
  const today = new Date()
  const expectedYear = today.getFullYear()
  const expectedMonth = today.getMonth() + 1
  const expectedDate = today.getDate()

  return `${expectedYear}-${
    expectedMonth < 10 ? '0' + expectedMonth : expectedMonth
  }-${expectedDate < 10 ? '0' + expectedDate : expectedDate}`
}
