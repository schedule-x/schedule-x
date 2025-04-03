import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { getTimeStamp } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { useContext, useEffect } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import useEventInteractions from '../../../utils/stateful/hooks/use-event-interactions'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'
import { Fragment } from 'preact'
import { invokeOnEventClickCallback } from '../../../utils/stateless/events/invoke-on-event-click-callback'
import { invokeOnEventDoubleClickCallback } from '../../../utils/stateless/events/invoke-on-event-double-click-callback'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import { focusModal } from '../../../utils/stateless/events/focus-modal'
import { randomStringId } from '@schedule-x/shared/src'
import { wasEventAddedInLastSecond } from '../utils/stateless/was-event-added-in-last-second'

type props = {
  calendarEvent: CalendarEventInternal
}

export default function MonthAgendaEvent({ calendarEvent }: props) {
  const $app = useContext(AppContext)
  const { setClickedEvent } = useEventInteractions($app)

  const eventCSSVariables = {
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    borderInlineStart: `4px solid var(--sx-color-${calendarEvent._color})`,
  }

  const customComponent = $app.config._customComponentFns.monthAgendaEvent
  const customComponentId = customComponent
    ? 'custom-month-agenda-event-' + randomStringId()
    : undefined

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId), {
      calendarEvent: calendarEvent._getExternalEvent(),
    })
  }, [calendarEvent])

  const onClick = (e: MouseEvent) => {
    setClickedEvent(e, calendarEvent)
    invokeOnEventClickCallback($app, calendarEvent, e)
  }

  const onDoubleClick = (e: MouseEvent) => {
    setClickedEvent(e, calendarEvent)
    invokeOnEventDoubleClickCallback($app, calendarEvent, e)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      setClickedEvent(e, calendarEvent)
      invokeOnEventClickCallback($app, calendarEvent, e)
      nextTick(() => {
        focusModal($app)
      })
    }
  }

  const hasCustomContent = calendarEvent._customContent?.monthAgenda

  const classNames = ['sx__event', 'sx__month-agenda-event']

  if (wasEventAddedInLastSecond(calendarEvent)) classNames.push('is-event-new')

  return (
    <div
      className={classNames.join(' ')}
      data-ccid={customComponentId}
      data-event-id={calendarEvent.id}
      style={{
        backgroundColor: customComponent
          ? undefined
          : eventCSSVariables.backgroundColor,
        color: customComponent ? undefined : eventCSSVariables.color,
        borderInlineStart: customComponent
          ? undefined
          : eventCSSVariables.borderInlineStart,
        padding: customComponent ? '0px' : undefined,
      }}
      onClick={(e) => onClick(e)}
      onDblClick={(e) => onDoubleClick(e)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
    >
      {!customComponent && !hasCustomContent && (
        <Fragment>
          <div className="sx__month-agenda-event__title">
            {calendarEvent.title}
          </div>

          <div className="sx__month-agenda-event__time sx__month-agenda-event__has-icon">
            <TimeIcon
              strokeColor={`var(--sx-color-on-${calendarEvent._color}-container)`}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: getTimeStamp(calendarEvent, $app.config.locale.value),
              }}
            ></div>
          </div>
        </Fragment>
      )}

      {hasCustomContent && (
        <div
          dangerouslySetInnerHTML={{
            __html: calendarEvent._customContent?.monthAgenda || '',
          }}
        />
      )}
    </div>
  )
}
