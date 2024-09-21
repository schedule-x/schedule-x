import CurrentTimePlugin, {
  CurrentTimePluginConfig,
} from '@schedule-x/shared/src/interfaces/current-time/current-time-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { addMinutes } from '@schedule-x/shared/src'

class CurrentTimePluginImpl implements CurrentTimePlugin {
  name = 'current-time-plugin'
  $app!: CalendarAppSingleton
  observer: MutationObserver | null = null

  constructor(private config: CurrentTimePluginConfig = {}) {
    if (typeof config.timeZoneOffset === 'number') {
      if (config.timeZoneOffset < -720 || config.timeZoneOffset > 840) {
        throw new Error(`Invalid time zone offset: ` + config.timeZoneOffset)
      }
    }
  }

  onRender($app: CalendarAppSingleton): void {
    this.$app = $app

    this.observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          this.setIndicator()
        }
      }
    })

    const calendarWrapper = $app.elements.calendarWrapper
    if (!calendarWrapper) {
      throw new Error('Calendar wrapper not found')
    }

    this.observer.observe(calendarWrapper, {
      childList: true,
      subtree: true,
    })
  }

  private setIndicator(isRecursion = false) {
    const todayDateString = toDateString(new Date())
    let nowDateTimeString = toDateTimeString(new Date())

    if (this.config.timeZoneOffset) {
      nowDateTimeString = addMinutes(
        nowDateTimeString,
        this.config.timeZoneOffset
      )
    }

    const todayElement = this.$app.elements.calendarWrapper!.querySelector(
      `[data-time-grid-date="${todayDateString}"]`
    )

    if (!todayElement) return

    const existingIndicator = todayElement.querySelector(
      '.sx__current-time-indicator'
    )
    if (existingIndicator && isRecursion) existingIndicator.remove()

    if (todayElement && !existingIndicator) {
      const currentTimeIndicator = document.createElement('div')
      currentTimeIndicator.classList.add('sx__current-time-indicator')
      const top =
        getYCoordinateInTimeGrid(
          nowDateTimeString,
          this.$app.config.dayBoundaries.value,
          this.$app.config.timePointsPerDay
        ) + '%'
      currentTimeIndicator.style.top = top
      todayElement.appendChild(currentTimeIndicator)

      if (this.config.fullWeekWidth) {
        this.createFullWidthIndicator(top)
      }

      setTimeout(
        this.setIndicator.bind(this, true),
        60000 - (Date.now() % 60000)
      )
    }
  }

  private createFullWidthIndicator(top: string) {
    const fullWeekTimeIndicator = document.createElement('div')
    fullWeekTimeIndicator.classList.add('sx__current-time-indicator-full-week')
    fullWeekTimeIndicator.style.top = top
    const weekGridWrapper = document.querySelector('.sx__week-grid')

    const existingFullWeekIndicator = weekGridWrapper?.querySelector(
      '.sx__current-time-indicator-full-week'
    )
    if (existingFullWeekIndicator) {
      existingFullWeekIndicator.remove()
    }

    if (weekGridWrapper) {
      weekGridWrapper.appendChild(fullWeekTimeIndicator)
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

export const createCurrentTimePlugin = (config?: CurrentTimePluginConfig) =>
  new CurrentTimePluginImpl(config)
