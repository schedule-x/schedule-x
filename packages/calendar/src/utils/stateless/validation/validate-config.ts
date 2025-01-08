import { CalendarConfigExternal } from '@schedule-x/shared/src'
import { DateFormats } from '@schedule-x/shared/src/values/date-formats'

export const validateConfig = (config: CalendarConfigExternal) => {
  if (
    config.selectedDate &&
    !DateFormats.DATE_STRING.test(config.selectedDate)
  ) {
    throw new Error(
      '[Schedule-X error]: selectedDate must have the format YYYY-MM-DD'
    )
  }

  if (config.minDate && !DateFormats.DATE_STRING.test(config.minDate)) {
    throw new Error(
      '[Schedule-X error]: minDate must have the format YYYY-MM-DD'
    )
  }

  if (config.maxDate && !DateFormats.DATE_STRING.test(config.maxDate)) {
    throw new Error(
      '[Schedule-X error]: maxDate must have the format YYYY-MM-DD'
    )
  }

  if (
    typeof config.firstDayOfWeek !== 'undefined' &&
    (config.firstDayOfWeek < 0 || config.firstDayOfWeek > 6)
  ) {
    throw new Error(
      '[Schedule-X error]: firstDayOfWeek must be a number between 0 and 6'
    )
  }

  if (
    typeof config.weekOptions?.gridHeight !== 'undefined' &&
    config.weekOptions.gridHeight < 0
  ) {
    throw new Error(
      '[Schedule-X error]: weekOptions.gridHeight must be a positive number'
    )
  }

  if (
    typeof config.weekOptions?.nDays !== 'undefined' &&
    (config.weekOptions.nDays < 1 || config.weekOptions.nDays > 7)
  ) {
    throw new Error(
      '[Schedule-X error]: weekOptions.nDays must be a number between 1 and 7'
    )
  }

  if (
    typeof config.weekOptions?.eventWidth !== 'undefined' &&
    (config.weekOptions.eventWidth < 1 || config.weekOptions.eventWidth > 100)
  ) {
    throw new Error(
      '[Schedule-X error]: weekOptions.eventWidth must be an integer between 1 and 100'
    )
  }

  if (
    typeof config.monthGridOptions?.nEventsPerDay !== 'undefined' &&
    config.monthGridOptions.nEventsPerDay < 0
  ) {
    throw new Error(
      '[Schedule-X error]: monthGridOptions.nEventsPerDay must be a positive number'
    )
  }

  const dayBoundaryPattern = /^\d{2}:\d{2}$/
  if (typeof config.dayBoundaries !== 'undefined') {
    const startFormatIsInvalid = !dayBoundaryPattern.test(
      config.dayBoundaries.start
    )
    const endFormatIsInvalid = !dayBoundaryPattern.test(
      config.dayBoundaries.end
    )
    if (startFormatIsInvalid || endFormatIsInvalid) {
      throw new Error(
        '[Schedule-X error]: dayBoundaries must be an object with "start"- and "end" properties, each with the format HH:mm'
      )
    }
  }
}
