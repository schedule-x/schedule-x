export class InvalidDateTimeError extends Error {
  constructor(dateTimeSpecification: string) {
    super(`Invalid date time specification: ${dateTimeSpecification}`)
  }
}
