/* eslint-disable max-lines */
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import {
  getBorderRule,
  getEventHeight,
  getLeftRule,
  getWidthRule,
} from '../../utils/stateless/events/event-styles'
import { StateUpdater, useContext, useEffect } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import UserIcon from '@schedule-x/shared/src/components/icons/user-icon'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import LocationPinIcon from '@schedule-x/shared/src/components/icons/location-pin-icon'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import useEventInteractions from '../../utils/stateful/hooks/use-event-interactions'
import { concatenatePeople } from '@schedule-x/shared/src/utils/stateless/strings/concatenate-people'
import { Fragment } from 'preact'
import { getCCID } from './time-grid-event-utils'
import { getElementByCCID } from '../../utils/stateless/dom/getters'
import { invokeOnEventClickCallback } from '../../utils/stateless/events/invoke-on-event-click-callback'
import { invokeOnEventDoubleClickCallback } from '../../utils/stateless/events/invoke-on-event-double-click-callback'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { isUIEventTouchEvent } from '@schedule-x/shared/src/utils/stateless/dom/is-touch-event'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import { focusModal } from '../../utils/stateless/events/focus-modal'
import { wasEventAddedInLastSecond } from '../../views/month-agenda/utils/stateless/was-event-added-in-last-second'

type props = {
  calendarEvent: CalendarEventInternal
  dayBoundariesDateTime: DayBoundariesDateTime
  setMouseDown: StateUpdater<boolean>
  isCopy?: boolean
}

export default function TimeGridEvent({
  calendarEvent,
  dayBoundariesDateTime,
  isCopy,
  setMouseDown,
}: props) {
  const $app = useContext(AppContext)

  const {
    eventCopy,
    updateCopy,
    createDragStartTimeout,
    setClickedEventIfNotDragging,
    setClickedEvent,
  } = useEventInteractions($app)

  const localizeArgs = [
    $app.config.locale.value,
    { hour: 'numeric', minute: 'numeric' },
  ] as const
  const getEventTime = (start: string, end: string) => {
    const localizedStartTime = toJSDate(start).toLocaleTimeString(
      ...localizeArgs
    )

    if (start === end) {
      return localizedStartTime
    }

    const localizedEndTime = toJSDate(end).toLocaleTimeString(...localizeArgs)
    return `${localizedStartTime} – ${localizedEndTime}`
  }

  const eventCSSVariables = {
    borderLeft: `4px solid var(--sx-color-${calendarEvent._color})`,
    textColor: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    iconStroke: `var(--sx-color-on-${calendarEvent._color}-container)`,
  } as const

  const leftRule = getLeftRule(
    calendarEvent,
    $app.config.weekOptions.value.eventWidth
  )

  const handleStartDrag = (uiEvent: UIEvent) => {
    if (isUIEventTouchEvent(uiEvent)) uiEvent.preventDefault()
    if (isCopy) return
    if (!uiEvent.target) return
    if (!$app.config.plugins.dragAndDrop) return
    if (calendarEvent._options?.disableDND) return
    if (realStartIsBeforeDayBoundaryStart) return // Don't allow dragging events that start before the day boundary; it would require a bunch of adjustments in drag & drop plugin in order to look nice

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
  }, [calendarEvent, eventCopy])

  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation()
    invokeOnEventClickCallback($app, calendarEvent, e)
  }

  const handleOnDoubleClick = (e: MouseEvent) => {
    e.stopPropagation()
    invokeOnEventDoubleClickCallback($app, calendarEvent, e)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation()
      setClickedEvent(e, calendarEvent)
      invokeOnEventClickCallback($app, calendarEvent, e)
      nextTick(() => {
        focusModal($app)
      })
    }
  }

  const startResize = (e: MouseEvent) => {
    setMouseDown(true)
    e.stopPropagation()

    if (isCopy) return

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
  const classNames = ['sx__time-grid-event', 'sx__event']

  if (wasEventAddedInLastSecond(calendarEvent)) classNames.push('is-event-new')
  if (isCopy) classNames.push('is-event-copy')
  if (
    !$app.config.weekOptions.value.eventOverlap &&
    calendarEvent._maxConcurrentEvents &&
    calendarEvent._maxConcurrentEvents > 1
  )
    classNames.push('is-event-overlap')
  if (calendarEvent._options?.additionalClasses)
    classNames.push(...calendarEvent._options.additionalClasses)

  const handlePointerDown = (e: UIEvent) => {
    setMouseDown(true)
    createDragStartTimeout(handleStartDrag, e)
  }

  const handlePointerUp = (e: UIEvent) => {
    nextTick(() => setMouseDown(false))
    setClickedEventIfNotDragging(calendarEvent, e)
  }

  const hasCustomContent = calendarEvent._customContent?.timeGrid

  const realStartIsBeforeDayBoundaryStart =
    dayBoundariesDateTime &&
    calendarEvent.start < dayBoundariesDateTime.start &&
    calendarEvent.end >= dayBoundariesDateTime.start

  const relativeStartWithinDayBoundary = realStartIsBeforeDayBoundaryStart
    ? dayBoundariesDateTime?.start
    : calendarEvent.start

  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        data-event-id={calendarEvent.id}
        onClick={handleOnClick}
        onDblClick={handleOnDoubleClick}
        onKeyDown={handleKeyDown}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
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
            calendarEvent.end,
            $app.config.dayBoundaries.value,
            $app.config.timePointsPerDay
          )}%`,
          left: `${leftRule}%`,
          width: `${getWidthRule(
            leftRule,
            isCopy ? 100 : $app.config.weekOptions.value.eventWidth,
            calendarEvent._maxConcurrentEvents,
            $app.config.weekOptions.value.eventOverlap
          )}%`,
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
          {!customComponent && !hasCustomContent && (
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

          {$app.config.plugins.resize &&
            !calendarEvent._options?.disableResize && (
              <div
                className={'sx__time-grid-event-resize-handle'}
                onMouseDown={startResize}
              />
            )}
        </div>
      </div>

      {eventCopy && (
        <TimeGridEvent
          calendarEvent={eventCopy}
          isCopy={true}
          setMouseDown={setMouseDown}
          dayBoundariesDateTime={dayBoundariesDateTime}
        />
      )}
    </>
  )
}
