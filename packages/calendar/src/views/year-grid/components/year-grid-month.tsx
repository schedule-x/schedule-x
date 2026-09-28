import { useContext } from 'preact/hooks'
import { AppContext } from '../../../utils/stateful/app-context'
import { YearGridMonth as YearGridMonthType } from '../types/year-grid'
import YearGridDay from './year-grid-day'
import {
  getOneLetterOrShortDayNames,
  toLocalizedMonth,
} from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/date-time-localization'

type props = {
  month: YearGridMonthType
  openDay: YearGridMonthType['days'][number] | null
  onOpenDayEvents: (
    day: YearGridMonthType['days'][number],
    anchor: HTMLElement
  ) => void
  onCloseDayEvents: () => void
}

export default function YearGridMonth({
  month,
  openDay,
  onOpenDayEvents,
  onCloseDayEvents,
}: props) {
  const $app = useContext(AppContext)
  const weekStart = month.date.subtract({ days: month.leadingDays })
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    weekStart.add({ days: index })
  )
  const dayNames = getOneLetterOrShortDayNames(
    weekdays,
    $app.config.locale.value
  )

  return (
    <section
      className="sx__year-grid-month"
      aria-label={month.date.toLocaleString($app.config.locale.value, {
        month: 'long',
        year: 'numeric',
      })}
    >
      <h2 className="sx__year-grid-month__heading">
        {toLocalizedMonth(month.date, $app.config.locale.value)}
      </h2>

      <div className="sx__year-grid-month__weekdays" aria-hidden="true">
        {dayNames.map((dayName, index) => (
          <span key={index}>{dayName}</span>
        ))}
      </div>

      <div className="sx__year-grid-month__days">
        {Array.from({ length: month.leadingDays }, (_, index) => (
          <span key={`leading-${index}`} />
        ))}
        {month.days.map((day) => (
          <YearGridDay
            key={day.date.toString()}
            day={day}
            isPopoverOpen={openDay?.date.equals(day.date) ?? false}
            onOpenDayEvents={onOpenDayEvents}
            onCloseDayEvents={onCloseDayEvents}
          />
        ))}
      </div>
    </section>
  )
}
