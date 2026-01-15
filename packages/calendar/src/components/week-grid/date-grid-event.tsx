import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { useContext, useEffect, useMemo, useRef } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { deepCloneEvent } from '@schedule-x/shared/src/utils/stateless/calendar/deep-clone-event'
import { DateRange } from '@schedule-x/shared/src/types/date-range'
import { getTimeGridEventCopyElementId } from '@schedule-x/shared/src/utils/stateless/strings/selector-generators'
import {
  getBorderRadius,
  getWidthToSubtract,
} from '../../utils/stateless/events/date-grid-event-styles'
import useEventInteractions from '@schedule-x/shared/src/utils/stateful/calendar/use-event-interactions'
import { getElementByCCID } from '../../utils/stateless/dom/getters'
import { Fragment } from 'preact'
import { invokeOnEventClickCallback } from '../../utils/stateless/events/invoke-on-event-click-callback'
import { invokeOnEventDoubleClickCallback } from '../../utils/stateless/events/invoke-on-event-double-click-callback'
import { getEventCoordinates } from '@schedule-x/shared/src/utils/stateless/dom/get-event-coordinates'
import { isUIEventTouchEvent } from '@schedule-x/shared/src/utils/stateless/dom/is-touch-event'
import {
  getTimeStamp,
  timeFn,
} from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { ResizePlugin } from '@schedule-x/shared/src/interfaces/resize/resize-plugin.interface'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import { focusModal } from '../../utils/stateless/events/focus-modal'
import { wasEventAddedInLastSecond } from '../../views/month-agenda/utils/stateless/was-event-added-in-last-second'

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
    createDragStartTimeout,
    setClickedEventIfNotDragging,
    setClickedEvent,
  } = useEventInteractions($app)

  const eventCSSVariables = {
    borderInlineStart: `4px solid var(--sx-color-${calendarEvent._color})`,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
  } as const

  const handleStartDrag = (uiEvent: UIEvent) => {
    if (!$app.config.plugins.dragAndDrop) return
    if (calendarEvent._options?.disableDND) return
    if (isUIEventTouchEvent(uiEvent)) uiEvent.preventDefault()

    const newEventCopy = deepCloneEvent(calendarEvent, $app)
    updateCopy(newEventCopy)

    $app.config.plugins.dragAndDrop.startDateGridDrag({
      eventCoordinates: getEventCoordinates(uiEvent),
      eventCopy: newEventCopy,
      updateCopy,
      $app,
    })
  }

  const rangeStartForComparison =
    calendarEvent.start instanceof Temporal.ZonedDateTime
      ? ($app.calendarState.range.value as DateRange).start.toString()
      : Temporal.PlainDate.from({
          year: ($app.calendarState.range.value as DateRange).start.year,
          month: ($app.calendarState.range.value as DateRange).start.month,
          day: ($app.calendarState.range.value as DateRange).start.day,
        }).toString()
  const rangeEndForComparison =
    calendarEvent.end instanceof Temporal.ZonedDateTime
      ? ($app.calendarState.range.value as DateRange).end.toString()
      : Temporal.PlainDate.from({
          year: ($app.calendarState.range.value as DateRange).end.year,
          month: ($app.calendarState.range.value as DateRange).end.month,
          day: ($app.calendarState.range.value as DateRange).end.day,
        }).toString()
  const startsBeforeWeek =
    calendarEvent.start.toString() < rangeStartForComparison
  const endsAfterWeek = calendarEvent.end.toString() > rangeEndForComparison
  const hasOverflowLeft = useMemo(() => {
    if ($app.config.direction === 'ltr') {
      return startsBeforeWeek
    }

    return endsAfterWeek
  }, [startsBeforeWeek, endsAfterWeek])
  const hasOverflowRight = useMemo(() => {
    if ($app.config.direction === 'ltr') {
      return endsAfterWeek
    }

    return startsBeforeWeek
  }, [startsBeforeWeek, endsAfterWeek])
  const overflowStyles = { backgroundColor: eventCSSVariables.backgroundColor }

  const customComponent = $app.config._customComponentFns.dateGridEvent
  const customComponentId = useRef(
    customComponent
      ? 'custom-date-grid-event-' + randomStringId() // needs a unique string to support event recurrence
      : undefined
  )
  if (isCopy && customComponentId.current) customComponentId.current += '-copy'

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId.current), {
      calendarEvent: calendarEvent._getExternalEvent(),
    })

    return () => {
      $app.config._destroyCustomComponentInstance?.(
        customComponentId.current as string
      )
    }
  }, [calendarEvent, eventCopy])

  const startResize = (mouseEvent: MouseEvent | TouchEvent) => {
    mouseEvent.stopPropagation()
    const eventCopy = deepCloneEvent(calendarEvent, $app)
    updateCopy(eventCopy)
    ;($app.config.plugins.resize as ResizePlugin).createDateGridEventResizer(
      eventCopy,
      updateCopy,
      mouseEvent
    )
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

  const eventClasses = [
    'sx__event',
    'sx__date-grid-event',
    'sx__date-grid-cell',
  ]
  if (isCopy) eventClasses.push('sx__date-grid-event--copy')
  if (wasEventAddedInLastSecond(calendarEvent))
    eventClasses.push('is-event-new')
  if (hasOverflowLeft) eventClasses.push('sx__date-grid-event--overflow-left')
  if (hasOverflowRight) eventClasses.push('sx__date-grid-event--overflow-right')
  if (calendarEvent._options?.additionalClasses)
    eventClasses.push(...calendarEvent._options.additionalClasses)

  const borderInlineStartNonCustom = startsBeforeWeek
    ? 'none'
    : eventCSSVariables.borderInlineStart

  const hasCustomContent = calendarEvent._customContent?.dateGrid

  return (
    <>
      <div
        id={
          isCopy ? getTimeGridEventCopyElementId(calendarEvent.id) : undefined
        }
        tabIndex={0}
        aria-label={
          calendarEvent.title +
          ' ' +
          getTimeStamp(
            calendarEvent,
            $app.config.locale.value,
            $app.translate('to')
          )
        }
        role="button"
        data-ccid={customComponentId.current}
        data-event-id={calendarEvent.id}
        onMouseDown={(e) => createDragStartTimeout(handleStartDrag, e)}
        onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
        onTouchStart={(e) => createDragStartTimeout(handleStartDrag, e)}
        onTouchEnd={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
        onClick={(e) => invokeOnEventClickCallback($app, calendarEvent, e)}
        onDblClick={(e) =>
          invokeOnEventDoubleClickCallback($app, calendarEvent, e)
        }
        onKeyDown={handleKeyDown}
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
          borderInlineStart: customComponent
            ? undefined
            : borderInlineStartNonCustom,
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
        {!customComponent && !hasCustomContent && (
          <Fragment>
            {hasOverflowLeft && (
              <div
                className={'sx__date-grid-event--left-overflow'}
                style={overflowStyles}
              />
            )}

            <span className="sx__date-grid-event-text">
              {calendarEvent.title} &nbsp;
              {calendarEvent.start instanceof Temporal.ZonedDateTime && (
                <span className="sx__date-grid-event-time">
                  {timeFn(calendarEvent.start, $app.config.locale.value)}
                </span>
              )}
            </span>

            {hasOverflowRight && (
              <div
                className={'sx__date-grid-event--right-overflow'}
                style={overflowStyles}
              />
            )}
          </Fragment>
        )}

        {hasCustomContent && (
          <div
            dangerouslySetInnerHTML={{
              __html: calendarEvent._customContent?.dateGrid || '',
            }}
          />
        )}

        {$app.config.plugins.resize &&
          !calendarEvent._options?.disableResize &&
          !endsAfterWeek && (
            <div
              className="sx__date-grid-event-resize-handle"
              onMouseDown={startResize}
              onTouchStart={startResize}
            />
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
