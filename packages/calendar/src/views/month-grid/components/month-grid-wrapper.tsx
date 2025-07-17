import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { useState } from 'preact/hooks'
import { createMonth } from '../utils/stateless/create-month'
import { Month } from '../types/month'
import MonthGridWeek from './month-grid-week'
import { AppContext } from '../../../utils/stateful/app-context'
import { positionInMonth } from '../utils/stateless/position-in-month'
import { sortEventsForMonthGrid } from '../../../utils/stateless/events/sort-by-start-date'
import { filterByRange } from '../../../utils/stateless/events/filter-by-range'
import { useSignalEffect } from '@preact/signals'


export const MonthGridWrapper: PreactViewComponent = ({ $app, id }) => {
  const [month, setMonth] = useState<Month>([])

  useSignalEffect(() => {
    $app.calendarEvents.list.value.forEach((event) => {
      event._eventFragments = {}
    })
    const newMonth = createMonth(
      Temporal.PlainDate.from($app.datePickerState.selectedDate.value),
      $app.timeUnitsImpl
    )
    newMonth.forEach((week) => {
      week.forEach((day) => {
        const plainDate = Temporal.PlainDate.from(day.date)
        const rangeStartDateTime = Temporal.ZonedDateTime.from({
          year: plainDate.year,
          month: plainDate.month,
          day: plainDate.day,
          hour: 0,
          minute: 0,
          second: 0,
          timeZone: $app.config.timezone.value,
        })
        const rangeEndDateTime = Temporal.ZonedDateTime.from({
          year: plainDate.year,
          month: plainDate.month,
          day: plainDate.day,
          hour: 23,
          minute: 59,
          second: 59,
          timeZone: $app.config.timezone.value,
        })

        day.backgroundEvents = filterByRange(
          $app.calendarEvents.backgroundEvents.value,
          {
            start: rangeStartDateTime,
            end: rangeEndDateTime,
          },
          $app.config.timezone.value
        )
      })
    })
    const filteredEvents = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value
    setMonth(
      positionInMonth(newMonth, filteredEvents.sort(sortEventsForMonthGrid))
    )
  })

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__month-grid-wrapper">
        {month.map((week, index) => (
          <MonthGridWeek
            key={index}
            week={week}
            isFirstWeek={index === 0}
            isLastWeek={index === month.length - 1}
          />
        ))}
      </div>
    </AppContext.Provider>
  )
}
