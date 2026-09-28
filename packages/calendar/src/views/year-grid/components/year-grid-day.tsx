import { useContext } from 'preact/hooks'
import { YearGridDay as YearGridDayType } from '../types/year-grid'
import { AppContext } from '../../../utils/stateful/app-context'
import {
  isSameDay,
  isToday,
} from '@schedule-x/shared/src/utils/stateless/time/comparison'
import { getLocalizedDate } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'
import { getClassNameForWeekday } from '../../../utils/stateless/get-class-name-for-weekday'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

type props = {
  day: YearGridDayType
  isPopoverOpen: boolean
  onOpenDayEvents: (day: YearGridDayType, anchor: HTMLElement) => void
  onCloseDayEvents: () => void
}

export default function YearGridDay({
  day,
  isPopoverOpen,
  onOpenDayEvents,
  onCloseDayEvents,
}: props) {
  const $app = useContext(AppContext)
  const isBeforeMinDate = !!(
    $app.config.minDate.value &&
    Temporal.PlainDate.compare(day.date, $app.config.minDate.value) < 0
  )
  const isPastMaxDate = !!(
    $app.config.maxDate.value &&
    Temporal.PlainDate.compare(day.date, $app.config.maxDate.value) > 0
  )
  const classNames = [
    'sx__button',
    'sx__year-grid-day',
    getClassNameForWeekday(day.date.dayOfWeek),
  ]

  if (isToday(day.date, $app.config.timezone.value)) {
    classNames.push('sx__is-today')
  }
  if (isSameDay(day.date, $app.datePickerState.selectedDate.value)) {
    classNames.push('is-selected')
  }

  const selectDate = (event: MouseEvent) => {
    $app.datePickerState.selectedDate.value = day.date
    $app.config.callbacks.onClickDate?.(day.date, event)

    if (day.events.length > 0) {
      onOpenDayEvents(day, event.currentTarget as HTMLElement)
    } else {
      onCloseDayEvents()
    }
  }

  const handleDoubleClick = (event: MouseEvent) => {
    $app.datePickerState.selectedDate.value = day.date
    onCloseDayEvents()

    if ($app.config.callbacks.onDoubleClickYearGridDate) {
      $app.config.callbacks.onDoubleClickYearGridDate(day.date, event)
      return
    }
    if ($app.config.callbacks.onDoubleClickDate) {
      $app.config.callbacks.onDoubleClickDate(day.date, event)
      return
    }
    if (
      $app.config.views.value.some((view) => view.name === InternalViewName.Day)
    ) {
      $app.calendarState.setView(InternalViewName.Day, day.date)
    }
  }

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      disabled={isBeforeMinDate || isPastMaxDate}
      aria-label={getLocalizedDate(day.date, $app.config.locale.value)}
      aria-haspopup={day.events.length > 0 ? 'dialog' : undefined}
      aria-expanded={day.events.length > 0 ? isPopoverOpen : undefined}
      onClick={selectDate}
      onDblClick={handleDoubleClick}
      data-date={day.date.toString()}
    >
      <span className="sx__year-grid-day__number">{day.date.day}</span>

      {day.events.length > 0 && (
        <span className="sx__year-grid-day__event-icons" aria-hidden="true">
          {day.events
            .slice(0, $app.config.yearGridOptions.value.nEventIndicatorsPerDay)
            .map((event) => (
              <span
                key={event.id}
                className="sx__year-grid-day__event-icon"
                style={{ backgroundColor: `var(--sx-color-${event._color})` }}
              />
            ))}
        </span>
      )}
    </button>
  )
}
