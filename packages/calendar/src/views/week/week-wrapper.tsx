import { PreactViewComponent } from '../../types/preact-view-component'
import { toJSDate } from '../../../../../shared/utils/stateless/time/format-conversion/format-conversion'
import { useEffect, useState } from 'preact/compat'
import { WeekWithDates } from '../../../../../shared/types/time'
import WeekDay from '../../components/week-grid/week-day'
import TimeAxis from '../../components/week-grid/time-axis'
import { AppContext } from '../../utils/stateful/app-context'

export const WeekWrapper: PreactViewComponent = ({ $app, id }) => {
  document.documentElement.style.setProperty(
    '--sx-week-grid-height',
    `${$app.config.weekOptions.weekGridHeight}px`
  )

  const [week, setWeek] = useState<WeekWithDates>([])

  useEffect(() => {
    if (!$app.calendarState.range.value?.start) return

    setWeek(
      $app.timeUnitsImpl.getWeekFor(
        toJSDate($app.calendarState.range.value.start)
      )
    )
  }, [$app.calendarState.range.value?.start])

  return (
    <>
      <AppContext.Provider value={$app}>
        <div className="sx__week-wrapper" id={id}>
          <div className="sx__week-header">
            <div className="sx__week-header-content">
              hello
              <div className="sx__week-header-border" />
            </div>
          </div>

          <div className="sx__week-grid">
            <TimeAxis />

            {week.map((day) => (
              <WeekDay calendarEvents={[]} />
            ))}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
