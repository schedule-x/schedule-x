export class NumberRangeError extends Error {
  constructor(
    public min: number,
    public max: number
  ) {
    super(`Number must be between ${min} and ${max}.`)
  }
}
