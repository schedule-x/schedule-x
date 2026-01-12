import { useContext, useState } from 'preact/hooks'
import { AppContext } from '@schedule-x/shared/src/utils/stateful/app-context'
import { useSignalEffect } from '@preact/signals'

const getTimeAxisHours = (
  dayBoundaries: { start: number; end: number },
  isHybridDay: boolean
): number[] => {
  const hours: number[] = []
  const startHour = Math.floor(dayBoundaries.start / 100)
  let endHour = Math.floor(dayBoundaries.end / 100)

  if (isHybridDay) {
    // For hybrid days, go from start to 24, then 0 to end
    for (let h = startHour; h < 24; h++) hours.push(h)
    for (let h = 0; h <= endHour; h++) hours.push(h)
  } else {
    if (dayBoundaries.end === 2400) endHour = 24
    for (let h = startHour; h < endHour; h++) {
      hours.push(h)
    }
  }

  return hours
}

export default function ResourceTimeAxis() {
  const $app = useContext(AppContext)

  const [gridSteps, setGridSteps] = useState<
    { hour: number; minute: number }[]
  >([])

  useSignalEffect(() => {
    const hourSteps = getTimeAxisHours(
      $app.config.dayBoundaries.value,
      $app.config.isHybridDay
    )

    const result: { hour: number; minute: number }[] = []

    hourSteps.forEach((hour) => {
      if ($app.config.weekOptions.value.gridStep === 180) {
        if (hour % 3 === 0) {
          result.push({ hour: hour, minute: 0 })
        }
      } else if ($app.config.weekOptions.value.gridStep === 120) {
        if (hour % 2 === 0) {
          result.push({ hour: hour, minute: 0 })
        }
      } else if ($app.config.weekOptions.value.gridStep === 60) {
        result.push({ hour: hour, minute: 0 })
      } else if ($app.config.weekOptions.value.gridStep === 30) {
        result.push({ hour: hour, minute: 0 }, { hour: hour, minute: 30 })
      } else if ($app.config.weekOptions.value.gridStep === 15) {
        result.push(
          { hour: hour, minute: 0 },
          { hour: hour, minute: 15 },
          { hour: hour, minute: 30 },
          { hour: hour, minute: 45 }
        )
      }
    })

    setGridSteps(result)

    const pixelsPerGridStep =
      $app.config.weekOptions.value.gridHeight / result.length

    document.documentElement.style.setProperty(
      '--sx-week-grid-hour-height',
      `${pixelsPerGridStep}px`
    )
  })

  const formatter = new Intl.DateTimeFormat(
    $app.config.locale.value,
    $app.config.weekOptions.value.timeAxisFormatOptions
  )

  return (
    <>
      <div className="sx__week-grid__time-axis">
        {gridSteps.map((gridStep) => (
          <div className="sx__week-grid__hour">
            <span className="sx__week-grid__hour-text">
              {formatter.format(
                new Date(0, 0, 0, gridStep.hour, gridStep.minute)
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
