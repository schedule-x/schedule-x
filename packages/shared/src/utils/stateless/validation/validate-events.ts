import { dateStringRegex, dateTimeStringRegex } from '../time/validation/regex'
import CalendarEventExternal from '../../../interfaces/calendar/calendar-event.interface'

export const validateEvents = (events: CalendarEventExternal[] = []) => {
  events?.forEach((event: CalendarEventExternal) => {
    if (
      !dateTimeStringRegex.test(event.start) &&
      !dateStringRegex.test(event.start)
    ) {
      throw new Error(
        `[Schedule-X error]: Event start time ${event.start} is not a valid time format. Please refer to the docs for more information.`
      )
    }

    if (
      !dateTimeStringRegex.test(event.end) &&
      !dateStringRegex.test(event.end)
    ) {
      throw new Error(
        `[Schedule-X error]: Event end time ${event.end} is not a valid time format. Please refer to the docs for more information.`
      )
    }

    const isIdDecimalNumber = typeof event.id === 'number' && event.id % 1 !== 0
    if (isIdDecimalNumber) {
      throw new Error(
        `[Schedule-X error]: Event id ${event.id} is not a valid id. Only non-unicode characters that can be used by document.querySelector is allowed, see: https://developer.mozilla.org/en-US/docs/Web/CSS/ident. We recommend using uuids or integers.`
      )
    }

    // only allow non-unicode characters that can be used by document.querySelector: https://developer.mozilla.org/en-US/docs/Web/CSS/ident
    if (typeof event.id === 'string' && !/^[a-zA-Z0-9_-]*$/.test(event.id)) {
      throw new Error(
        `[Schedule-X error]: Event id ${event.id} is not a valid id. Only non-unicode characters that can be used by document.querySelector is allowed, see: https://developer.mozilla.org/en-US/docs/Web/CSS/ident. We recommend using uuids or integers.`
      )
    }

    if (typeof event.id !== 'string' && typeof event.id !== 'number') {
      throw new Error(
        `[Schedule-X error]: Event id ${event.id} is not a valid id. Only non-unicode characters that can be used by document.querySelector is allowed, see: https://developer.mozilla.org/en-US/docs/Web/CSS/ident. We recommend using uuids or integers.`
      )
    }
  })
}
