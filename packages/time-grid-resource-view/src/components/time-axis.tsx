import { useEffect, useMemo, useState } from 'preact/hooks'
import { useSignalEffect } from '@preact/signals'
import { randomStringId } from '@schedule-x/shared/src'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { getTimeAxisHours } from '../utils/get-time-axis-hours'

type props = {
  $app: CalendarAppSingleton
}

export default function TimeAxis({ $app }: props) {
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

  const hourCustomComponentFn = $app.config._customComponentFns.weekGridHour
  const hourCCIDs = useMemo(() => {
    if (!hourCustomComponentFn) return []

    return gridSteps.map(() => `custom-week-grid-hour-${randomStringId()}`)
  }, [gridSteps])

  useEffect(() => {
    if (hourCustomComponentFn && hourCCIDs.length) {
      gridSteps.forEach((gridStep, idx) => {
        const el = document.querySelector(`[data-ccid="${hourCCIDs[idx]}"]`)
        if (!(el instanceof HTMLElement)) {
          return console.warn(
            'Could not find element for custom component weekGridHour'
          )
        }

        hourCustomComponentFn(el, { hour: gridStep.hour, gridStep })
      })
    }
  }, [gridSteps, hourCCIDs])

  return (
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
  )
}
