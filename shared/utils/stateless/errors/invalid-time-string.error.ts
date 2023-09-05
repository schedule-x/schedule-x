export class InvalidTimeStringError extends Error {
  constructor(timeString: string) {
    super(`Invalid time string: ${timeString}`)
  }
}
