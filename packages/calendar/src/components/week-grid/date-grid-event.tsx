/* eslint-disable max-lines */
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useEffect } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import {
  getBorderRadius,
  getWidthToSubtract,
} from '../../utils/stateless/events/date-grid-event-styles'
import useEventInteractions from '../../utils/stateful/hooks/use-event-interactions'
import { getElementByCCID } from '../../utils/stateless/dom/getters'
import { Fragment } from 'preact'
import { invokeOnEventClickCallback } from '../../utils/stateless/events/invoke-on-event-click-callback'

type props = {
  calendarEvent: CalendarEventInternal
  gridRow: number
  isCopy?: boolean
}

export default function DateGridEvent({
  calendarEvent,
  gridRow,
  isCopy,
}: props) {
  const $app = useContext(AppContext)

  const {
    eventCopy,
    updateCopy,
    setClickedEventIfNotDragging,
    createDragStartTimeout,
  } = useEventInteractions($app)

  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
  } as const

  const handleMouseDown = (e: MouseEvent) => {
    if (!$app.config.plugins.dragAndDrop) return

    const newEventCopy = deepCloneEvent(calendarEvent, $app)
    updateCopy(newEventCopy)

    $app.config.plugins.dragAndDrop.createDateGridDragHandler({
      event: e,
      eventCopy: newEventCopy,
      updateCopy,
      $app,
    })
  }

  const hasOverflowLeft =
    dateFromDateTime(calendarEvent.start) <
    dateFromDateTime(($app.calendarState.range.value as DateRange).start)
  const hasOverflowRight =
    dateFromDateTime(calendarEvent.end) >
    dateFromDateTime(($app.calendarState.range.value as DateRange).end)
  const overflowStyles = { backgroundColor: eventCSSVariables.backgroundColor }

  const customComponent = $app.config._customComponentFns.dateGridEvent
  let customComponentId = customComponent
    ? 'custom-date-grid-event-' + calendarEvent.id
    : undefined
  if (isCopy && customComponentId) customComponentId += '-copy'

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId), {
      calendarEvent: calendarEvent._getExternalEvent(),
    })
  }, [])

  const eventClasses = [
    'sx__event',
    'sx__date-grid-event',
    'sx__date-grid-cell',
  ]
  if (isCopy) eventClasses.push(' sx__date-grid-event--copy')
  if (hasOverflowLeft) eventClasses.push(' sx__date-grid-event--overflow-left')
  if (hasOverflowRight)
    eventClasses.push(' sx__date-grid-event--overflow-right')

  const borderLeftNonCustom = hasOverflowLeft
    ? 'none'
    : eventCSSVariables.borderLeft
  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        data-ccid={customComponentId}
        onMouseDown={(e) => createDragStartTimeout(handleMouseDown, e)}
        onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
        onClick={() => invokeOnEventClickCallback($app, calendarEvent)}
        className={eventClasses.join(' ')}
        style={{
          width: `calc(${
            (calendarEvent._nDaysInGrid as number) * 100
          }% - ${getWidthToSubtract(
            hasOverflowLeft,
            hasOverflowRight,
            !customComponent
          )}px)`,
          gridRow,
          display: eventCopy ? 'none' : 'flex',
          padding: customComponent ? '0px' : undefined,
          borderLeft: customComponent ? undefined : borderLeftNonCustom,
          color: customComponent ? undefined : eventCSSVariables.color,
          backgroundColor: customComponent
            ? undefined
            : eventCSSVariables.backgroundColor,
          ...getBorderRadius(
            hasOverflowLeft,
            hasOverflowRight,
            !!customComponent
          ),
        }}
      >
        {!customComponent && (
          <Fragment>
            {hasOverflowLeft && (
              <div
                className={'sx__date-grid-event--left-overflow'}
                style={overflowStyles}
              />
            )}

            <span className="sx__date-grid-event-text">
              {calendarEvent.title}
            </span>

            {hasOverflowRight && (
              <div
                className={'sx__date-grid-event--right-overflow'}
                style={overflowStyles}
              />
            )}
          </Fragment>
        )}
      </div>

      {eventCopy && (
        <DateGridEvent
          calendarEvent={eventCopy}
          gridRow={gridRow}
          isCopy={true}
        />
      )}
    </>
  )
}
