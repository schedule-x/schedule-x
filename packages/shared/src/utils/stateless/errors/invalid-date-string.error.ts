export class InvalidDateStringError extends Error {
  constructor(dateString: string) {
    super(`Invalid date string: ${dateString}`)
  }
}
