import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import {
  getBorderRule,
  getEventHeight,
  getInlineStartRule,
  getWidthRule,
} from '../utils/stateless/event-styles'
import { useContext, useEffect, useRef, useState } from 'preact/hooks'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { concatenatePeople } from '@schedule-x/shared/src/utils/stateless/strings/concatenate-people'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import UserIcon from '@schedule-x/shared/src/components/icons/user-icon'
import LocationPinIcon from '@schedule-x/shared/src/components/icons/location-pin-icon'
import { Fragment } from 'preact'

type props = {
  calendarEvent: CalendarEventInternal
  dayBoundariesDateTime: DayBoundariesDateTime
}

export default function ResourceTimeGridEvent({
  calendarEvent,
  dayBoundariesDateTime,
}: props) {
  const $app = useContext(AppContext)
  const eventRef = useRef<HTMLDivElement>(null)
  const [isCompact, setIsCompact] = useState(false)

  const localizeArgs = [
    $app.config.locale.value,
    { hour: 'numeric', minute: 'numeric' },
  ] as const
  const getEventTime = (
    start: Temporal.ZonedDateTime,
    end: Temporal.ZonedDateTime
  ) => {
    const localizedStartTime = start.toLocaleString(...localizeArgs)

    if (start === end) {
      return localizedStartTime
    }

    const localizedEndTime = end.toLocaleString(...localizeArgs)
    return `${localizedStartTime} – ${localizedEndTime}`
  }

  const eventCSSVariables = {
    borderInlineStart: `4px solid var(--sx-color-${calendarEvent._color})`,
    textColor: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    iconStroke: `var(--sx-color-on-${calendarEvent._color}-container)`,
  } as const

  const insetInlineStart = getInlineStartRule(
    calendarEvent,
    $app.config.weekOptions.value.eventWidth
  )

  // ResizeObserver to detect when event height changes
  useEffect(() => {
    if (!eventRef.current) return

    const checkHeight = () => {
      const element = eventRef.current
      if (!element) return

      const height = element.offsetHeight
      const shouldBeCompact = height < 36
      setIsCompact(shouldBeCompact)
    }

    checkHeight()

    const resizeObserver = new ResizeObserver(checkHeight)
    resizeObserver.observe(eventRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [calendarEvent])

  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation()
    const callback = $app.config.callbacks.onEventClick
    if (callback) {
      callback(calendarEvent._getExternalEvent(), e)
    }
  }

  const handleOnDoubleClick = (e: MouseEvent) => {
    e.stopPropagation()
    const callback = $app.config.callbacks.onDoubleClickEvent
    if (callback) {
      callback(calendarEvent._getExternalEvent(), e)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      const callback = $app.config.callbacks.onEventClick
      if (callback) {
        callback(calendarEvent._getExternalEvent(), e)
      }
    }
  }

  const borderRule = getBorderRule(calendarEvent)
  const classNames = ['sx__time-grid-event', 'sx__event']

  if (
    !$app.config.weekOptions.value.eventOverlap &&
    calendarEvent._maxConcurrentEvents &&
    calendarEvent._maxConcurrentEvents > 1
  )
    classNames.push('is-event-overlap')
  if (calendarEvent._options?.additionalClasses)
    classNames.push(...calendarEvent._options.additionalClasses)

  const hasCustomContent = calendarEvent._customContent?.timeGrid

  const realStartIsBeforeDayBoundaryStart =
    dayBoundariesDateTime &&
    calendarEvent.start.toString() < dayBoundariesDateTime.start.toString() &&
    calendarEvent.end.toString() >= dayBoundariesDateTime.start.toString()

  const relativeStartWithinDayBoundary = realStartIsBeforeDayBoundaryStart
    ? dayBoundariesDateTime?.start
    : (calendarEvent.start as Temporal.ZonedDateTime)

  const timeFn = (date: Temporal.ZonedDateTime, locale: string) =>
    date.toLocaleString(locale, { hour: 'numeric', minute: 'numeric' })

  return (
    <div
      ref={eventRef}
      data-event-id={calendarEvent.id}
      onClick={handleOnClick}
      onDblClick={handleOnDoubleClick}
      onKeyDown={handleKeyDown}
      className={classNames.join(' ')}
      tabIndex={0}
      role="button"
      style={{
        top: `${getYCoordinateInTimeGrid(
          relativeStartWithinDayBoundary,
          $app.config.dayBoundaries.value,
          $app.config.timePointsPerDay
        )}%`,
        height: `${getEventHeight(
          relativeStartWithinDayBoundary,
          calendarEvent.end as Temporal.ZonedDateTime,
          $app.config.dayBoundaries.value,
          $app.config.timePointsPerDay
        )}%`,
        insetInlineStart: `${insetInlineStart}%`,
        width: `${getWidthRule(
          insetInlineStart,
          $app.config.weekOptions.value.eventWidth,
          calendarEvent._maxConcurrentEvents,
          $app.config.weekOptions.value.eventOverlap
        )}%`,
        backgroundColor: eventCSSVariables.backgroundColor,
        color: eventCSSVariables.textColor,
        borderTop: borderRule,
        borderInlineEnd: borderRule,
        borderBottom: borderRule,
        borderInlineStart: eventCSSVariables.borderInlineStart,
      }}
    >
      <div className="sx__time-grid-event-inner">
        {!hasCustomContent && (
          <Fragment>
            {/* Compact layout - title and time inline */}
            {isCompact && calendarEvent.title && (
              <div className="sx__title-and-time-compact">
                <div className="sx__time-grid-event-title">
                  {calendarEvent.title}
                </div>
                <div className="sx__time-grid-event-time">
                  {timeFn(
                    calendarEvent.start as Temporal.ZonedDateTime,
                    $app.config.locale.value
                  )}
                </div>
              </div>
            )}

            {/* Regular layout - title and time separate */}
            {!isCompact && calendarEvent.title && (
              <div className="sx__time-grid-event-title">
                {calendarEvent.title}
              </div>
            )}

            {/* Show time in regular layout or when compact and no title */}
            {(!isCompact || (isCompact && !calendarEvent.title)) && (
              <div className="sx__time-grid-event-time">
                <TimeIcon strokeColor={eventCSSVariables.iconStroke} />
                {getEventTime(
                  calendarEvent.start as Temporal.ZonedDateTime,
                  calendarEvent.end as Temporal.ZonedDateTime
                )}
              </div>
            )}

            {calendarEvent.people && calendarEvent.people.length > 0 && (
              <div className="sx__time-grid-event-people">
                <UserIcon strokeColor={eventCSSVariables.iconStroke} />
                {concatenatePeople(calendarEvent.people)}
              </div>
            )}

            {calendarEvent.location && (
              <div className="sx__time-grid-event-location">
                <LocationPinIcon strokeColor={eventCSSVariables.iconStroke} />
                {calendarEvent.location}
              </div>
            )}
          </Fragment>
        )}

        {hasCustomContent && (
          <div
            dangerouslySetInnerHTML={{
              __html: calendarEvent._customContent?.timeGrid || '',
            }}
          />
        )}
      </div>
    </div>
  )
}
