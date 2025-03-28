import { useContext, useEffect, useMemo, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { getTimeAxisHours } from '../../utils/stateless/time/time-axis/time-axis'
import { useSignalEffect } from '@preact/signals'
import { randomStringId } from '@schedule-x/shared/src'

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

  const hourCustomComponentFn = $app.config._customComponentFns.weekGridHour
  const hourCCIDs = useMemo(() => {
    if (!hourCustomComponentFn) return []

    return hours.map(() => `custom-week-grid-hour-${randomStringId()}`)
  }, [hours])
  useEffect(() => {
    if (hourCustomComponentFn && hourCCIDs.length) {
      hours.forEach((hour, idx) => {
        const el = document.querySelector(`[data-ccid="${hourCCIDs[idx]}"]`)
        if (!(el instanceof HTMLElement)) {
          return console.warn(
            'Could not find element for custom component weekGridHour'
          )
        }

        hourCustomComponentFn(el, { hour })
      })
    }
  }, [hours, hourCCIDs])

  return (
    <>
      <div className="sx__week-grid__time-axis">
        {hours.map((hour, index) => (
          <div className="sx__week-grid__hour">
            {hourCustomComponentFn && hourCCIDs.length && (
              <div data-ccid={hourCCIDs[index]} />
            )}

            {!hourCustomComponentFn && (
              <span className="sx__week-grid__hour-text">
                {formatter.format(new Date(0, 0, 0, hour))}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
