import CurrentTimePlugin from '@schedule-x/shared/src/interfaces/current-time/current-time-plugin.interface'
import { CalendarAppSingleton } from '@schedule-x/shared'
import {
  toDateString,
  toDateTimeString,
} from '@schedule-x/shared/src/utils/stateless/time/format-conversion/date-to-strings'
import { getYCoordinateInTimeGrid } from '@schedule-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'

class CurrentTimePluginImpl implements CurrentTimePlugin {
  name = 'current-time-plugin'
  $app!: CalendarAppSingleton
  observer: MutationObserver | null = null

  init($app: CalendarAppSingleton): void {
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
    console.log('ran set indicator')
    const todayDateString = toDateString(new Date())
    const nowDateTimeString = toDateTimeString(new Date())
    const todayElement = document.querySelector(
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
          this.$app.config.dayBoundaries,
          this.$app.config.timePointsPerDay
        ) + '%'
      console.log(top)
      currentTimeIndicator.style.top = top
      todayElement.appendChild(currentTimeIndicator)
      setTimeout(this.setIndicator.bind(this, true), 60000)
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

export const createCurrentTimePlugin = () => new CurrentTimePluginImpl()
