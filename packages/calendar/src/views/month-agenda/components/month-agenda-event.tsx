import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { getTimeStamp } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { useContext, useEffect } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import useEventInteractions from '../../../utils/stateful/hooks/use-event-interactions'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'
import { Fragment } from 'preact'
import { invokeOnEventClickCallback } from '../../../utils/stateless/events/invoke-on-event-click-callback'

type props = {
  calendarEvent: CalendarEventInternal
}

export default function MonthAgendaEvent({ calendarEvent }: props) {
  const $app = useContext(AppContext)
  const { setClickedEvent } = useEventInteractions($app)

  const eventCSSVariables = {
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
  }

  const customComponent = $app.config._customComponentFns.monthAgendaEvent
  const customComponentId = customComponent
    ? 'custom-month-agenda-event-' + calendarEvent.id
    : undefined

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId), {
      calendarEvent: calendarEvent._getExternalEvent(),
    })
  }, [])

  const onClick = (e: MouseEvent) => {
    invokeOnEventClickCallback($app, calendarEvent)
    setClickedEvent(e, calendarEvent)
  }

  return (
    <div
      className="sx__event sx__month-agenda-event"
      data-ccid={customComponentId}
      data-event-id={calendarEvent.id}
      style={{
        backgroundColor: customComponent
          ? undefined
          : eventCSSVariables.backgroundColor,
        color: customComponent ? undefined : eventCSSVariables.color,
        borderLeft: customComponent ? undefined : eventCSSVariables.borderLeft,
        padding: customComponent ? '0px' : undefined,
      }}
      onClick={(e) => onClick(e)}
    >
      {!customComponent && (
        <Fragment>
          <div className="sx__month-agenda-event__title">
            {calendarEvent.title}
          </div>

          <div className="sx__month-agenda-event__time sx__month-agenda-event__has-icon">
            <TimeIcon
              strokeColor={`var(--sx-color-on-${calendarEvent._color}-container)`}
            />

            {getTimeStamp(calendarEvent, $app.config.locale)}
          </div>
        </Fragment>
      )}
    </div>
  )
}
