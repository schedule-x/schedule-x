/* eslint-disable max-lines */
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import {
  getBorderRule,
  getEventHeight,
  getLeftRule,
  getWidthRule,
} from '../../utils/stateless/events/event-styles'
import { useContext, useEffect } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import UserIcon from '@schedule-x/shared/src/components/icons/user-icon'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import useEventInteractions from '../../utils/stateful/hooks/use-event-interactions'
import { concatenatePeople } from '@schedule-x/shared/src/utils/stateless/strings/concatenate-people'
import { Fragment } from 'preact'
import { getCCID } from './time-grid-event-utils'
import { getElementByCCID } from '../../utils/stateless/dom/getters'
import { invokeOnEventClickCallback } from '../../utils/stateless/events/invoke-on-event-click-callback'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { isUIEventTouchEvent } from '@schedule-x/shared/src/utils/stateless/dom/is-touch-event'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'

type props = {
  calendarEvent: CalendarEventInternal
  dayBoundariesDateTime?: DayBoundariesDateTime
  isCopy?: boolean
}

export default function TimeGridEvent({
  calendarEvent,
  dayBoundariesDateTime,
  isCopy,
}: props) {
  const $app = useContext(AppContext)

  const {
    eventCopy,
    updateCopy,
    createDragStartTimeout,
    setClickedEventIfNotDragging,
  } = useEventInteractions($app)

  const localizeArgs = [
    $app.config.locale,
    { hour: 'numeric', minute: 'numeric' },
  ] as const
  const getEventTime = (start: string, end: string) => {
    const localizedStartTime = toJSDate(start).toLocaleTimeString(
      ...localizeArgs
    )
    const localizedEndTime = toJSDate(end).toLocaleTimeString(...localizeArgs)
    return `${localizedStartTime} – ${localizedEndTime}`
  }

  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
    textColor: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    iconStroke: `var(--sx-color-on-${calendarEvent._color}-container)`,
  } as const

  const leftRule = getLeftRule(calendarEvent)

  const handleStartDrag = (uiEvent: UIEvent) => {
    if (isUIEventTouchEvent(uiEvent)) uiEvent.preventDefault()
    if (!dayBoundariesDateTime) return // this can only happen in eventCopy
    if (!uiEvent.target) return
    if (!$app.config.plugins.dragAndDrop) return

    const newEventCopy = deepCloneEvent(calendarEvent, $app)
    updateCopy(newEventCopy)

    $app.config.plugins.dragAndDrop.createTimeGridDragHandler(
      {
        $app,
        eventCoordinates: getEventCoordinates(uiEvent),
        updateCopy,
        eventCopy: newEventCopy,
      },
      dayBoundariesDateTime
    )
  }

  const customComponent = $app.config._customComponentFns.timeGridEvent
  const customComponentId = getCCID(customComponent, isCopy)

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId), {
      calendarEvent: calendarEvent._getExternalEvent(),
    })
  })

  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation()
    invokeOnEventClickCallback($app, calendarEvent)
  }

  const startResize = (e: MouseEvent) => {
    e.stopPropagation()

    if (!dayBoundariesDateTime) return // this can only happen in eventCopy

    if ($app.config.plugins.resize) {
      const eventCopy = deepCloneEvent(calendarEvent, $app)
      updateCopy(eventCopy)

      $app.config.plugins.resize.createTimeGridEventResizer(
        eventCopy,
        updateCopy,
        e,
        dayBoundariesDateTime
      )
    }
  }

  const borderRule = getBorderRule(calendarEvent)

  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        data-event-id={calendarEvent.id}
        onClick={handleOnClick}
        onMouseDown={(e) => createDragStartTimeout(handleStartDrag, e)}
        onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
        onTouchStart={(e) => createDragStartTimeout(handleStartDrag, e)}
        onTouchEnd={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
        className={
          'sx__time-grid-event sx__event' + (isCopy ? ' is-event-copy' : '')
        }
        tabIndex={0}
        style={{
          top: `${getYCoordinateInTimeGrid(
            calendarEvent.start,
            $app.config.dayBoundaries,
            $app.config.timePointsPerDay
          )}%`,
          height: `${getEventHeight(
            calendarEvent.start,
            calendarEvent.end,
            $app.config.dayBoundaries,
            $app.config.timePointsPerDay
          )}%`,
          left: `${leftRule}%`,
          width: `${getWidthRule(leftRule)}%`,
          backgroundColor: customComponent
            ? undefined
            : eventCSSVariables.backgroundColor,
          color: customComponent ? undefined : eventCSSVariables.textColor,
          borderTop: borderRule,
          borderRight: borderRule,
          borderBottom: borderRule,
          borderLeft: customComponent
            ? undefined
            : eventCSSVariables.borderLeft,
          padding: customComponent ? '0' : undefined,
        }}
      >
        <div
          data-ccid={customComponentId}
          className="sx__time-grid-event-inner"
        >
          {!customComponent && (
            <Fragment>
              {calendarEvent.title && (
                <div className="sx__time-grid-event-title">
                  {calendarEvent.title}
                </div>
              )}

              <div className="sx__time-grid-event-time">
                <TimeIcon strokeColor={eventCSSVariables.iconStroke} />
                {getEventTime(calendarEvent.start, calendarEvent.end)}
              </div>

              {calendarEvent.people && (
                <div className="sx__time-grid-event-people">
                  <UserIcon strokeColor={eventCSSVariables.iconStroke} />
                  {concatenatePeople(calendarEvent.people)}
                </div>
              )}
            </Fragment>
          )}

          {$app.config.plugins.resize && (
            <div
              className={'sx__time-grid-event-resize-handle'}
              onMouseDown={startResize}
            />
          )}
        </div>
      </div>

      {eventCopy && <TimeGridEvent calendarEvent={eventCopy} isCopy={true} />}
    </>
  )
}
