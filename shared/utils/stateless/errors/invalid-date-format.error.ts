export class InvalidDateFormatError extends Error {
  constructor(dateFormat: string, locale: string) {
    super(`Invalid date format: ${dateFormat} for locale: ${locale}`)
  }
}
