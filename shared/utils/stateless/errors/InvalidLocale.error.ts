export class InvalidLocaleError extends Error {
    constructor(locale: string) {
        super(`Invalid locale: ${locale}`);
    }
}