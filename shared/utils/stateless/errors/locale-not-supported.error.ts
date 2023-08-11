export class LocaleNotSupportedError extends Error {
  constructor(locale: string) {
    super(`Locale not supported: ${locale}`)
  }
}