import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useEffect, useRef } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'
import { Fragment } from 'preact'
import { randomStringId } from '@schedule-x/shared/src'
import { EventTimes } from './event-times'
import { EventInstanceInfo } from './list-wrapper'

type props = {
  calendarEvent: CalendarEventInternal
  dayDate: string
  eventInstanceInfo: EventInstanceInfo
  onEventClick: (e: MouseEvent, event: CalendarEventInternal) => void
  onEventDoubleClick: (e: MouseEvent, event: CalendarEventInternal) => void
  onEventKeyDown: (e: KeyboardEvent, event: CalendarEventInternal) => void
}

export default function ListEvent({
  calendarEvent,
  eventInstanceInfo,
  onEventClick,
  onEventDoubleClick,
  onEventKeyDown,
}: props) {
  const $app = useContext(AppContext)

  const customListEventComponent = $app.config._customComponentFns.listEvent
  const customComponentId = useRef(
    customListEventComponent
      ? 'custom-list-event-' + randomStringId()
      : undefined
  )

  useEffect(() => {
    if (!customListEventComponent) return

    customListEventComponent(getElementByCCID(customComponentId.current), {
      calendarEvent: calendarEvent._getExternalEvent(),
      eventInstanceInfo,
    })

    return () => {
      $app.config._destroyCustomComponentInstance?.(
        customComponentId.current as string
      )
    }
  }, [calendarEvent, eventInstanceInfo])

  const hasCustomContent = calendarEvent._customContent?.listEvent

  const classNames = ['sx__event', 'sx__list-event']
  if (calendarEvent._options?.additionalClasses) {
    classNames.push(...calendarEvent._options.additionalClasses)
  }

  return (
    <div
      className={classNames.join(' ')}
      data-ccid={customComponentId.current}
      data-event-id={calendarEvent.id}
      style={{
        padding: customListEventComponent ? '0px' : undefined,
      }}
      onClick={(e) => onEventClick(e, calendarEvent)}
      onDblClick={(e) => onEventDoubleClick(e, calendarEvent)}
      onKeyDown={(e) => onEventKeyDown(e, calendarEvent)}
      tabIndex={0}
      role="button"
    >
      {!customListEventComponent && !hasCustomContent && (
        <Fragment>
          <div
            className={`sx__list-event-color-line`}
            style={{
              backgroundColor: `var(--sx-color-${calendarEvent._color})`,
            }}
          />
          <div className="sx__list-event-content">
            <div className="sx__list-event-title">{calendarEvent.title}</div>
            <div className="sx__list-event-times">
              <EventTimes {...eventInstanceInfo} />
            </div>
          </div>
        </Fragment>
      )}

      {hasCustomContent && (
        <div
          dangerouslySetInnerHTML={{
            __html: calendarEvent._customContent?.listEvent || '',
          }}
        />
      )}
    </div>
  )
}
