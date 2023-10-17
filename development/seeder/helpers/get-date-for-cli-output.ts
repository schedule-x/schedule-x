import { CLI_MONTH_ARG_PATTERN } from '../faker-config.ts'

/**
 * monthArg is expected to carry the format YYYY.MM
 * */
export const getDateForCliOutput = (monthArg: string | null = null) => {
  if (monthArg && CLI_MONTH_ARG_PATTERN.test(monthArg)) {
    return new Date(
      +monthArg.substring(0, 4),
      +monthArg.substring(5, 7) - 1
    ).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  return 'Current month'
}
