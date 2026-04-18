import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useEffect, useRef } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import useEventInteractions from '@schedule-x/shared/src/utils/stateful/calendar/use-event-interactions'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import {
  invokeOnEventClickCallback,
  invokeOnEventDoubleClickCallback,
} from '@schedule-x/shared/src'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import { focusModal } from '@schedule-x/shared/src/utils/stateless/events/focus-modal'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

type props = {
  calendarEvent: CalendarEventInternal
  dayDate: string
  renderEventTimes: (
    event: CalendarEventInternal,
    dayDate: string
  ) => preact.JSX.Element | preact.JSX.Element[]
}

const getEventInstanceInfo = (
  event: CalendarEventInternal,
  dayDate: string,
  $app: CalendarAppSingleton
) => {
  const eventStartDate = dateFromDateTime(event.start.toString())
  const eventEndDate = dateFromDateTime(event.end.toString())
  const isFirstDay = eventStartDate === dayDate
  const isLastDay = eventEndDate === dayDate
  const isMultiDay = eventStartDate !== eventEndDate

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: $app.config.locale.value === 'en-US',
  } as const

  const startZDT = Temporal.ZonedDateTime.from({
    year: event.start.year,
    month: event.start.month,
    day: event.start.day,
    hour: event.start instanceof Temporal.ZonedDateTime ? event.start.hour : 0,
    minute:
      event.start instanceof Temporal.ZonedDateTime ? event.start.minute : 0,
    timeZone: $app.config.timezone.value,
  })

  const endZDT = Temporal.ZonedDateTime.from({
    year: event.end.year,
    month: event.end.month,
    day: event.end.day,
    hour: event.end instanceof Temporal.ZonedDateTime ? event.end.hour : 0,
    minute: event.end instanceof Temporal.ZonedDateTime ? event.end.minute : 0,
    timeZone: $app.config.timezone.value,
  })

  const startLocaleString = startZDT.toLocaleString(
    $app.config.locale.value,
    timeOptions
  )
  const endLocaleString = endZDT.toLocaleString(
    $app.config.locale.value,
    timeOptions
  )

  return {
    isFirstDay,
    isLastDay,
    isMultiDay,
    startLocaleString,
    endLocaleString,
    forDayOf: dayDate,
  }
}

export default function ListEvent({
  calendarEvent,
  dayDate,
  renderEventTimes,
}: props) {
  const $app = useContext(AppContext)
  const { setClickedEvent } = useEventInteractions($app)

  const customComponent = $app.config._customComponentFns.listEvent
  const customComponentId = useRef(
    customComponent ? 'custom-list-event-' + randomStringId() : undefined
  )

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId.current), {
      calendarEvent: calendarEvent._getExternalEvent(),
      eventInstanceInfo: getEventInstanceInfo(calendarEvent, dayDate, $app),
    })

    return () => {
      $app.config._destroyCustomComponentInstance?.(
        customComponentId.current as string
      )
    }
  }, [calendarEvent])

  const handleEventClick = (e: MouseEvent) => {
    setClickedEvent(e, calendarEvent)
    invokeOnEventClickCallback($app, calendarEvent, e)
  }

  const handleEventDoubleClick = (e: MouseEvent) => {
    setClickedEvent(e, calendarEvent)
    invokeOnEventDoubleClickCallback($app, calendarEvent, e)
  }

  const handleEventKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      setClickedEvent(e, calendarEvent)
      invokeOnEventClickCallback($app, calendarEvent, e)
      nextTick(() => {
        focusModal($app)
      })
    }
  }

  const classNames = ['sx__event', 'sx__list-event']
  if (calendarEvent._options?.additionalClasses) {
    classNames.push(...calendarEvent._options.additionalClasses)
  }

  return (
    <div
      key={calendarEvent.id}
      className={classNames.join(' ')}
      data-ccid={customComponentId.current}
      data-event-id={calendarEvent.id}
      onClick={(e) => handleEventClick(e)}
      onDblClick={(e) => handleEventDoubleClick(e)}
      onKeyDown={(e) => handleEventKeyDown(e)}
      tabIndex={0}
      role="button"
    >
      {!customComponent && (
        <>
          <div
            className={`sx__list-event-color-line`}
            style={{
              backgroundColor: `var(--sx-color-${calendarEvent._color})`,
            }}
          />
          <div className="sx__list-event-content">
            <div className="sx__list-event-title">{calendarEvent.title}</div>
            <div className="sx__list-event-times">
              {renderEventTimes(calendarEvent, dayDate)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
