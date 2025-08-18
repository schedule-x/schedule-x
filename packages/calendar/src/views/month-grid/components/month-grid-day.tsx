import { MonthDay as MonthDayType } from '../types/month'
import { toJSDate } from '@schedule-x/shared/src/utils/stateless/time/format-conversion/format-conversion'
import { getDayNameShort } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthGridEvent from './month-grid-event'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { DATE_GRID_BLOCKER } from '../../../constants'
import {
  isSameDay,
  isToday,
} from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { getClassNameForWeekday } from '../../../utils/stateless/get-class-name-for-weekday'
import { randomStringId, toDateString } from '@schedule-x/shared/src'

type props = {
  day: MonthDayType
  isFirstWeek: boolean
  isLastWeek: boolean
}

export default function MonthGridDay({ day, isFirstWeek, isLastWeek }: props) {
  const $app = useContext(AppContext)
  const nEventsInDay = Object.values(day.events).filter(
    (event) => typeof event === 'object' || event === DATE_GRID_BLOCKER
  ).length

  const getEventTranslationSingularOrPlural = (nOfAdditionalEvents: number) => {
    if (nOfAdditionalEvents === 1) return $app.translate('+ 1 event')

    return $app.translate('+ {{n}} events', { n: nOfAdditionalEvents })
  }

  const getAriaLabelSingularOrPlural = (nOfAdditionalEvents: number) => {
    if (nOfAdditionalEvents === 1) {
      return $app.translate('Link to 1 more event on {{date}}', {
        date: getLocalizedDate(day.date, $app.config.locale.value),
      })
    }

    return $app.translate('Link to {{n}} more events on {{date}}', {
      date: getLocalizedDate(day.date, $app.config.locale.value),
      n: nEventsInDay - $app.config.monthGridOptions.value.nEventsPerDay,
    })
  }

  const handleClickAdditionalEvents = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation()

    if ($app.config.callbacks.onClickPlusEvents)
      $app.config.callbacks.onClickPlusEvents(day.date, e)
    if (
      !$app.config.views.value.find(
        (view) => view.name === InternalViewName.Day
      )
    )
      return

    // Timeout to display the ripple effect
    setTimeout(() => {
      $app.datePickerState.selectedDate.value = day.date
      $app.calendarState.setView(InternalViewName.Day, day.date)
    }, 250)
  }

  const dateClassNames = ['sx__month-grid-day__header-date']
  const dayDate = day.date
  if (
    isToday(
      dayDate.toZonedDateTime($app.config.timezone.value),
      $app.config.timezone.value
    )
  )
    dateClassNames.push('sx__is-today')

  const selectedDateMonth = $app.datePickerState.selectedDate.value.month
  const dayMonth = day.date.month
  const baseClasses = [
    'sx__month-grid-day',
    getClassNameForWeekday(dayDate.dayOfWeek),
  ]
  const [wrapperClasses, setWrapperClasses] = useState(baseClasses)

  useEffect(() => {
    const classes = [...baseClasses]

    if (dayMonth !== selectedDateMonth) classes.push('is-leading-or-trailing')
    if (isSameDay($app.datePickerState.selectedDate.value, day.date))
      classes.push('is-selected')
    setWrapperClasses(classes)
  }, [$app.datePickerState.selectedDate.value])

  const getNumberOfNonDisplayedEvents = () => {
    return Object.values(day.events)
      .slice($app.config.monthGridOptions.value.nEventsPerDay)
      .filter(
        (event) => event === DATE_GRID_BLOCKER || typeof event === 'object'
      ).length
  }

  const numberOfNonDisplayedEvents = getNumberOfNonDisplayedEvents()

  const dayStartDateTime = Temporal.ZonedDateTime.from({
    year: day.date.year,
    month: day.date.month,
    day: day.date.day,
    hour: 0,
    minute: 0,
    second: 0,
    timeZone: $app.config.timezone.value,
  })
  const dayEndDateTime = Temporal.ZonedDateTime.from({
    year: day.date.year,
    month: day.date.month,
    day: day.date.day,
    hour: 23,
    minute: 59,
    second: 59,
    timeZone: $app.config.timezone.value,
  })
  const fullDayBackgroundEvent = day.backgroundEvents.find((event) => {
    const eventStartWithTime =
      event.start instanceof Temporal.PlainDate
        ? event.start.toZonedDateTime($app.config.timezone.value)
        : event.start
    const eventEndWithTime =
      event.end instanceof Temporal.PlainDate
        ? event.end.toZonedDateTime($app.config.timezone.value).with({
            hour: 23,
            minute: 59,
            second: 59,
          })
        : event.end
    return (
      eventStartWithTime.toString() <= dayStartDateTime.toString() &&
      eventEndWithTime.toString() >= dayEndDateTime.toString()
    )
  })

  const handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.classList.contains('sx__month-grid-day')) return

    const callback = $app.config.callbacks.onMouseDownMonthGridDate
    if (callback) callback(day.date, e)
  }

  const monthGridDayNameCustomComponent =
    $app.config._customComponentFns.monthGridDayName
  const monthGridDayNameCCID = useState(
    monthGridDayNameCustomComponent ? randomStringId() : ''
  )[0]
  useEffect(() => {
    if (!monthGridDayNameCustomComponent) return

    const dayNameEl = document.querySelector(
      `[data-ccid="${monthGridDayNameCCID}"]`
    )
    if (!(dayNameEl instanceof HTMLElement)) {
      return
    }

    monthGridDayNameCustomComponent(dayNameEl, {
      day: toJSDate(day.date.toString()).getDay(),
    })
  }, [day])

  const monthGridDateCustomComponent =
    $app.config._customComponentFns.monthGridDate
  const monthGridDateCCID = useState(
    monthGridDateCustomComponent ? randomStringId() : ''
  )[0]
  useEffect(() => {
    if (!monthGridDateCustomComponent) return

    const dateEl = document.querySelector(`[data-ccid="${monthGridDateCCID}"]`)
    if (!(dateEl instanceof HTMLElement)) return

    monthGridDateCustomComponent(dateEl, {
      date: toJSDate(day.date.toString()).getDate(),
      jsDate: toJSDate(day.date.toString()),
    })
  }, [day])

  return (
    <div
      className={wrapperClasses.join(' ')}
      data-date={toDateString(day.date)}
      onClick={(e) =>
        $app.config.callbacks.onClickDate &&
        $app.config.callbacks.onClickDate(day.date, e)
      }
      aria-label={getLocalizedDate(day.date, $app.config.locale.value)}
      onDblClick={(e) => $app.config.callbacks.onDoubleClickDate?.(day.date, e)}
      onMouseDown={handleMouseDown}
    >
      {fullDayBackgroundEvent && (
        <>
          <div
            className="sx__month-grid-background-event"
            title={fullDayBackgroundEvent.title}
            style={{
              ...fullDayBackgroundEvent.style,
            }}
          />
        </>
      )}

      <div className="sx__month-grid-day__header">
        {isFirstWeek ? (
          <>
            {monthGridDayNameCustomComponent ? (
              <div data-ccid={monthGridDayNameCCID} />
            ) : (
              <div className="sx__month-grid-day__header-day-name">
                {getDayNameShort(dayDate, $app.config.locale.value)}
              </div>
            )}
          </>
        ) : null}

        {monthGridDateCCID ? (
          <div data-ccid={monthGridDateCCID} />
        ) : (
          <div className={dateClassNames.join(' ')}>{dayDate.day}</div>
        )}
      </div>

      <div className="sx__month-grid-day__events">
        {Object.values(day.events)
          .slice(0, $app.config.monthGridOptions.value.nEventsPerDay)
          .map((event, index) => {
            if (typeof event !== 'object')
              return (
                <div
                  className="sx__month-grid-blocker sx__month-grid-cell"
                  style={{ gridRow: index + 1 }}
                />
              )

            return (
              <MonthGridEvent
                gridRow={index + 1}
                calendarEvent={event}
                date={day.date.toString()}
                isFirstWeek={isFirstWeek}
                isLastWeek={isLastWeek}
              />
            )
          })}
      </div>

      {numberOfNonDisplayedEvents > 0 ? (
        <button
          type="button"
          className="sx__month-grid-day__events-more sx__ripple--wide"
          aria-label={getAriaLabelSingularOrPlural(numberOfNonDisplayedEvents)}
          onClick={handleClickAdditionalEvents}
        >
          {getEventTranslationSingularOrPlural(numberOfNonDisplayedEvents)}
        </button>
      ) : null}
    </div>
  )
}
