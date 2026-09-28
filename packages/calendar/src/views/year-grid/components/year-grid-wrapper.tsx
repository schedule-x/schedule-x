import { useState } from 'preact/hooks'
import { useSignalEffect } from '@preact/signals'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { AppContext } from '../../../utils/stateful/app-context'
import { YearGrid } from '../types/year-grid'
import {
  createYearGrid,
  positionEventsInYearGrid,
} from '../utils/stateless/create-year-grid'
import YearGridMonth from './year-grid-month'
import YearGridDayEventsModal from './year-grid-day-events-modal'

type OpenDay = {
  day: YearGrid[number]['days'][number]
  anchor: HTMLElement
}

export const YearGridWrapper: PreactViewComponent = ({ $app, id }) => {
  const [yearGrid, setYearGrid] = useState<YearGrid>([])
  const [openDay, setOpenDay] = useState<OpenDay | null>(null)

  useSignalEffect(() => {
    const events = $app.calendarEvents.filterPredicate.value
      ? $app.calendarEvents.list.value.filter(
          $app.calendarEvents.filterPredicate.value
        )
      : $app.calendarEvents.list.value
    const year = createYearGrid(
      $app.datePickerState.selectedDate.value.year,
      $app.config.firstDayOfWeek.value
    )

    setYearGrid(positionEventsInYearGrid(year, events))
  })

  return (
    <AppContext.Provider value={$app}>
      <div id={id} className="sx__year-grid-wrapper">
        {yearGrid.map((month) => (
          <YearGridMonth
            key={month.date.toString()}
            month={month}
            openDay={openDay?.day ?? null}
            onOpenDayEvents={(day, anchor) => setOpenDay({ day, anchor })}
            onCloseDayEvents={() => setOpenDay(null)}
          />
        ))}

        {openDay && (
          <YearGridDayEventsModal
            day={openDay.day}
            anchor={openDay.anchor}
            onClose={() => setOpenDay(null)}
          />
        )}
      </div>
    </AppContext.Provider>
  )
}
