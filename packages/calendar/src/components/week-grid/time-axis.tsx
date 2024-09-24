import { useContext, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { getTimeAxisHours } from '../../utils/stateless/time/time-axis/time-axis'
import { useSignalEffect } from '@preact/signals'

export default function TimeAxis() {
  const $app = useContext(AppContext)

  const [hours, setHours] = useState<number[]>([])
  useSignalEffect(() => {
    setHours(
      getTimeAxisHours($app.config.dayBoundaries.value, $app.config.isHybridDay)
    )
    const hoursPerDay = $app.config.timePointsPerDay / 100
    const pixelsPerHour = $app.config.weekOptions.value.gridHeight / hoursPerDay
    document.documentElement.style.setProperty(
      '--sx-week-grid-hour-height',
      `${pixelsPerHour}px`
    )
  })

  const formatter = new Intl.DateTimeFormat(
    $app.config.locale.value,
    $app.config.weekOptions.value.timeAxisFormatOptions
  )

  return (
    <>
      <div className="sx__week-grid__time-axis">
        {hours.map((hour) => (
          <div className="sx__week-grid__hour">
            <span className="sx__week-grid__hour-text">
              {formatter.format(new Date(0, 0, 0, hour))}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
