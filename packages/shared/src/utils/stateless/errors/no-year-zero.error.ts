export class NoYearZeroError extends Error {
  constructor() {
    super('Year zero does not exist in the Gregorian calendar.')
  }
}
