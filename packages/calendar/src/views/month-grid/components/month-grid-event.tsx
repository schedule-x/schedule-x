import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar/calendar-event.interface'
import { dateFromDateTime } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import useEventInteractions from '@schedule-x/shared/src/utils/stateful/calendar/use-event-interactions'
import { AppContext } from '../../../utils/stateful/app-context'
import { useContext, useEffect, useRef } from 'preact/hooks'
import { getElementByCCID } from '../../../utils/stateless/dom/getters'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { invokeOnEventClickCallback } from '../../../utils/stateless/events/invoke-on-event-click-callback'
import { invokeOnEventDoubleClickCallback } from '../../../utils/stateless/events/invoke-on-event-double-click-callback'
import { isUIEventTouchEvent } from '@schedule-x/shared/src/utils/stateless/dom/is-touch-event'
import { nextTick } from '@schedule-x/shared/src/utils/stateless/next-tick'
import { focusModal } from '../../../utils/stateless/events/focus-modal'
import { timeFn } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { wasEventAddedInLastSecond } from '../../month-agenda/utils/stateless/was-event-added-in-last-second'

type props = {
  gridRow: number
  calendarEvent: CalendarEventInternal
  isFirstWeek: boolean
  isLastWeek: boolean
  date: string
}

export default function MonthGridEvent({
  gridRow,
  calendarEvent,
  date,
  isFirstWeek,
  isLastWeek,
}: props) {
  const $app = useContext(AppContext)
  const hasOverflowLeft =
    isFirstWeek &&
    $app.calendarState.range.value?.start &&
    calendarEvent.start.toString() <
      $app.calendarState.range.value.start.toString()
  const hasOverflowRight =
    isLastWeek &&
    $app.calendarState.range.value?.end &&
    calendarEvent.end.toString() > $app.calendarState.range.value.end.toString()
  const {
    createDragStartTimeout,
    setClickedEventIfNotDragging,
    setClickedEvent,
  } = useEventInteractions($app)

  const plainDate = Temporal.PlainDate.from(date).toString()
  const hasStartDate =
    dateFromDateTime(calendarEvent.start.toString()) === plainDate
  const nDays = calendarEvent._eventFragments[date]

  const eventCSSVariables = {
    borderInlineStart: hasStartDate
      ? `4px solid var(--sx-color-${calendarEvent._color})`
      : undefined,
    color: `var(--sx-color-on-${calendarEvent._color}-container)`,
    backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
    // CORRELATION ID: 2 (10px subtracted from width)
    // nDays * 100% for the width of each day + 1px for border - 10 px for horizontal gap between events
    width: `calc(${nDays * 100 + '%'} + ${nDays}px - 10px)`,
  } as const

  const handleStartDrag = (uiEvent: UIEvent) => {
    if (isUIEventTouchEvent(uiEvent)) uiEvent.preventDefault()
    if (!uiEvent.target) return
    if (!$app.config.plugins.dragAndDrop || calendarEvent._options?.disableDND)
      return

    $app.config.plugins.dragAndDrop.createMonthGridDragHandler(
      calendarEvent,
      $app
    )
  }

  const customComponent = $app.config._customComponentFns.monthGridEvent
  const customComponentId = useRef(
    customComponent
      ? 'custom-month-grid-event-' + randomStringId() // needs a unique string to support event recurrence
      : undefined
  )

  useEffect(() => {
    if (!customComponent) return

    customComponent(getElementByCCID(customComponentId.current), {
      calendarEvent: calendarEvent._getExternalEvent(),
      hasStartDate,
    })

    return () => {
      $app.config._destroyCustomComponentInstance?.(
        customComponentId.current as string
      )
    }
  }, [calendarEvent])

  const handleOnClick = (e: MouseEvent) => {
    e.stopPropagation() // prevent the click from bubbling up to the day element
    invokeOnEventClickCallback($app, calendarEvent, e)
  }

  const handleOnDoubleClick = (e: MouseEvent) => {
    e.stopPropagation() // prevent the click from bubbling up to the day element
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

  const classNames = [
    'sx__event',
    'sx__month-grid-event',
    'sx__month-grid-cell',
  ]
  if (calendarEvent._options?.additionalClasses) {
    classNames.push(...calendarEvent._options.additionalClasses)
  }
  if (wasEventAddedInLastSecond(calendarEvent)) classNames.push('is-event-new')
  if (hasOverflowLeft) classNames.push('sx__month-grid-event--overflow-left')
  if (hasOverflowRight) classNames.push('sx__month-grid-event--overflow-right')

  const hasCustomContent = calendarEvent._customContent?.monthGrid

  return (
    <div
      draggable={!!$app.config.plugins.dragAndDrop}
      data-event-id={calendarEvent.id}
      data-ccid={customComponentId.current}
      onMouseDown={(e) => createDragStartTimeout(handleStartDrag, e)}
      onMouseUp={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
      onTouchStart={(e) => createDragStartTimeout(handleStartDrag, e)}
      onTouchEnd={(e) => setClickedEventIfNotDragging(calendarEvent, e)}
      onClick={handleOnClick}
      onDblClick={handleOnDoubleClick}
      onKeyDown={handleKeyDown}
      className={classNames.join(' ')}
      style={{
        gridRow,
        width: eventCSSVariables.width,
        padding: customComponent ? '0px' : undefined,
        borderInlineStart: customComponent
          ? undefined
          : eventCSSVariables.borderInlineStart,
        color: customComponent ? undefined : eventCSSVariables.color,
        backgroundColor: customComponent
          ? undefined
          : eventCSSVariables.backgroundColor,
      }}
      tabIndex={0}
      role="button"
    >
      {!customComponent && !hasCustomContent && (
        <>
          {calendarEvent.start instanceof Temporal.ZonedDateTime && (
            <div className="sx__month-grid-event-time">
              {timeFn(calendarEvent.start, $app.config.locale.value)}
            </div>
          )}

          <div className="sx__month-grid-event-title">
            {calendarEvent.title}
          </div>
        </>
      )}

      {hasCustomContent && (
        <div
          dangerouslySetInnerHTML={{
            __html: calendarEvent._customContent?.monthGrid || '',
          }}
        />
      )}
    </div>
  )
}
