import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { getTimeAxisHours } from '../../utils/stateless/time/time-axis/time-axis'
import { timePointsPerDay } from '@schedule-x/shared/src/utils/stateless/time/time-points/time-points-per-day'

export default function TimeAxis() {
  const $app = useContext(AppContext)

  const [hours, setHours] = useState<number[]>([])
  useEffect(() => {
    setHours(
      getTimeAxisHours($app.config.dayBoundaries, $app.config.isHybridDay)
    )
    const hoursPerDay =
      timePointsPerDay(
        $app.config.dayBoundaries.start,
        $app.config.dayBoundaries.end,
        $app.config.isHybridDay
      ) / 100
    const pixelsPerHour = $app.config.weekOptions.gridHeight / hoursPerDay
    document.documentElement.style.setProperty(
      '--sx-week-grid-hour-height',
      `${pixelsPerHour}px`
    )
  }, [])

  return (
    <>
      <div className="sx__week-grid__time-axis">
        {hours.map((hour) => (
          <div className="sx__week-grid__hour">
            <span className="sx__week-grid__hour-text">
              {new Date(0, 0, 0, hour).toLocaleTimeString($app.config.locale, {
                hour: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
