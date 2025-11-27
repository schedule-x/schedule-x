import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { RefObject } from 'preact'

interface ExpandInfiniteRecurringEventsConfig {
  $app: CalendarAppSingleton
  wrapperRef: RefObject<HTMLDivElement>
  filteredEvents: CalendarEventInternal[]
  lastRangeExpansionRef: RefObject<string | null>
  isExpandingRangeRef: RefObject<boolean>
  scrollPositionBeforeExpansionRef: RefObject<number | null>
}

/**
 * Checks if there are any infinite recurring events (events with RRULE that has no COUNT or UNTIL)
 */
export const hasInfiniteRecurringEvents = (
  events: CalendarEventInternal[]
): boolean => {
  // Only check original events, not copies (recurrences)
  return events.some((event) => {
    // Skip recurrence copies
    if (event.isCopy) return false
    const rrule = event._getForeignProperties()?.rrule
    if (!rrule || typeof rrule !== 'string') return false
    return !rrule.includes('COUNT') && !rrule.includes('UNTIL')
  })
}

/**
 * Performs the actual range expansion for infinite recurring events.
 * This is the shared logic used by both visibility detection methods.
 */
const performRangeExpansion = ({
  $app,
  wrapperRef,
  lastDateInList,
  lastRangeExpansionRef,
  isExpandingRangeRef,
  scrollPositionBeforeExpansionRef,
}: {
  $app: CalendarAppSingleton
  wrapperRef: RefObject<HTMLDivElement>
  lastDateInList: string
  lastRangeExpansionRef: RefObject<string | null>
  isExpandingRangeRef: RefObject<boolean>
  scrollPositionBeforeExpansionRef: RefObject<number | null>
}): void => {
  const currentRange = $app.calendarState.range.value
  if (!currentRange) return

  const lastDate = Temporal.PlainDate.from(lastDateInList)
  const lastDateZDT = lastDate.toZonedDateTime({
    timeZone: $app.config.timezone.value,
    plainTime: Temporal.PlainTime.from({
      hour: 23,
      minute: 59,
    }),
  })

  const oneYearFromLast = lastDateZDT.add({ years: 1 })
  const rangeEndString = oneYearFromLast.toString()

  // Only expand if we haven't expanded to this date recently
  if (
    oneYearFromLast.epochNanoseconds > currentRange.end.epochNanoseconds &&
    lastRangeExpansionRef.current !== rangeEndString
  ) {
    // Save scroll position before expanding
    if (wrapperRef.current) {
      scrollPositionBeforeExpansionRef.current = wrapperRef.current.scrollTop
      isExpandingRangeRef.current = true
    }

    const extendedRange = {
      start: currentRange.start,
      end: oneYearFromLast,
    }
    lastRangeExpansionRef.current = rangeEndString
    $app.calendarState.range.value = extendedRange
  }
}

/**
 * Expands the calendar range if we're at the bottom of the list and have infinite recurring events.
 * This allows the recurrence plugin to generate more occurrences.
 * Uses DOM-based visibility checking (getBoundingClientRect).
 */
export const expandInfiniteRecurringEventsIfNeeded = ({
  $app,
  wrapperRef,
  filteredEvents,
  lastRangeExpansionRef,
  isExpandingRangeRef,
  scrollPositionBeforeExpansionRef,
}: ExpandInfiniteRecurringEventsConfig): void => {
  if (
    !hasInfiniteRecurringEvents(filteredEvents) ||
    filteredEvents.length === 0
  ) {
    return
  }

  if (!wrapperRef.current) return

  const allDayElements = Array.from(
    wrapperRef.current.querySelectorAll('.sx__list-day')
  )
  if (allDayElements.length === 0) return

  // Check if the last day element is visible
  const lastDayElement = allDayElements[allDayElements.length - 1]
  const rect = lastDayElement.getBoundingClientRect()
  const wrapperRect = wrapperRef.current.getBoundingClientRect()

  // If last element is visible (within viewport)
  if (
    rect.top >= wrapperRect.top &&
    rect.bottom <= wrapperRect.bottom &&
    rect.top < wrapperRect.bottom
  ) {
    const lastDate = lastDayElement.getAttribute('data-date')
    if (lastDate) {
      const allDates = filteredEvents
        .map((e) => dateFromDateTime(e.end.toString()))
        .sort()
      const lastDateInList = allDates[allDates.length - 1]

      // Only expand if the visible last date matches the actual last date in the list
      if (lastDate === lastDateInList) {
        performRangeExpansion({
          $app,
          wrapperRef,
          lastDateInList,
          lastRangeExpansionRef,
          isExpandingRangeRef,
          scrollPositionBeforeExpansionRef,
        })
      }
    }
  }
}

/**
 * Checks if we need to expand infinite recurring events based on visible days in the viewport.
 * Used by IntersectionObserver callback.
 * Uses IntersectionObserver's visibleDates Set for visibility checking.
 */
export const checkAndExpandInfiniteRecurringEvents = ({
  $app,
  wrapperRef,
  filteredEvents,
  visibleDates,
  lastRangeExpansionRef,
  isExpandingRangeRef,
  scrollPositionBeforeExpansionRef,
}: ExpandInfiniteRecurringEventsConfig & {
  visibleDates: Set<string>
}): void => {
  if (!hasInfiniteRecurringEvents(filteredEvents) || visibleDates.size === 0) {
    return
  }

  // Get all dates in the list, sorted
  const allDates = filteredEvents
    .map((e) => dateFromDateTime(e.end.toString()))
    .sort()

  if (allDates.length === 0) return

  // Find the last visible date from the sorted list
  const visibleDatesArray = Array.from(visibleDates).sort()
  const lastVisibleDate = visibleDatesArray[visibleDatesArray.length - 1]
  const lastDateInList = allDates[allDates.length - 1]

  // If the last visible date is one of the last two dates in the entire list, expand
  const lastTwoDates = allDates.slice(-2)
  if (lastTwoDates.includes(lastVisibleDate)) {
    performRangeExpansion({
      $app,
      wrapperRef,
      lastDateInList,
      lastRangeExpansionRef,
      isExpandingRangeRef,
      scrollPositionBeforeExpansionRef,
    })
  }
}
