import { useContext, useEffect, useMemo, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { getTimeAxisHours } from '../../utils/stateless/time/time-axis/time-axis'
import { useSignalEffect } from '@preact/signals'
import { randomStringId } from '@schedule-x/shared/src'

export default function TimeAxis() {
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
      if ($app.config.weekOptions.value.gridStep === 60) {
        result.push({ hour: hour, minute: 0 })
      }
      if ($app.config.weekOptions.value.gridStep === 30) {
        result.push({ hour: hour, minute: 0 }, { hour: hour, minute: 30 })
      }
      if ($app.config.weekOptions.value.gridStep === 15) {
        result.push(
          { hour: hour, minute: 0 },
          { hour: hour, minute: 15 },
          { hour: hour, minute: 30 },
          { hour: hour, minute: 45 }
        )
      }
    })

    setGridSteps(result)

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

  const hourCustomComponentFn = $app.config._customComponentFns.weekGridHour
  const hourCCIDs = useMemo(() => {
    if (!hourCustomComponentFn) return []

    return gridSteps.map(() => `custom-week-grid-hour-${randomStringId()}`)
  }, [gridSteps])
  useEffect(() => {
    if (hourCustomComponentFn && hourCCIDs.length) {
      gridSteps.forEach((hour, idx) => {
        const el = document.querySelector(`[data-ccid="${hourCCIDs[idx]}"]`)
        if (!(el instanceof HTMLElement)) {
          return console.warn(
            'Could not find element for custom component weekGridHour'
          )
        }

        hourCustomComponentFn(el, { hour })
      })
    }
  }, [gridSteps, hourCCIDs])

  return (
    <>
      <div className="sx__week-grid__time-axis">
        {gridSteps.map((gridStep, index) => (
          <div className="sx__week-grid__hour">
            {hourCustomComponentFn && hourCCIDs.length && (
              <div data-ccid={hourCCIDs[index]} />
            )}

            {!hourCustomComponentFn && (
              <span className="sx__week-grid__hour-text">
                {formatter.format(
                  new Date(0, 0, 0, gridStep.hour, gridStep.minute)
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
