import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import ScrollControllerConfig from './interfaces/config'
import { timePointsFromString } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { effect } from '@preact/signals'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'

class ScrollControllerPlugin implements PluginBase {
  name = PluginName.ScrollController
  private $app: CalendarAppSingleton | null = null
  private observer: MutationObserver | null = null
  private hasScrolledSinceViewRender = false

  constructor(private config: ScrollControllerConfig = {}) {}

  /**
   * @internal
   * */
  init($app: CalendarAppSingleton) {
    this.$app = $app
    this.setInitialScroll($app)
    this.setUpViewChangeEffect()
  }

  private setInitialScroll($app: CalendarAppSingleton) {
    const gridDay = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__time-grid-day')

    if (gridDay) this.scrollOnRender()
    else this.waitUntilGridDayExistsThenScroll()
  }

  private setUpViewChangeEffect() {
    effect(() => {
      this.hasScrolledSinceViewRender = false

      if (
        InternalViewName.Day === this.$app?.calendarState.view.value ||
        InternalViewName.Week === this.$app?.calendarState.view.value
      ) {
        this.setInitialScroll(this.$app as CalendarAppSingleton)
      }
    })
  }

  private scrollOnRender() {
    this.scrollTo(this.config.initialScroll || '07:50')
  }

  destroy(): void {
    this.observer?.disconnect()
  }

  /**
   * @param {string} time - time in format 'HH:mm'
   * */
  scrollTo(time: string) {
    if (!this.$app)
      throw new Error(
        '[Schedule-X error]: Plugin not yet initialized. You cannot scroll before the calendar is rendered. For configuring the initial scroll, use the `initialScroll` parameter'
      )

    const $app = this.$app as CalendarAppSingleton
    const pixelsPerHour =
      $app.config.weekOptions.value.gridHeight /
      ($app.config.timePointsPerDay / 100)
    const scrollToTimePoint = timePointsFromString(time)

    const hoursFromDayStart =
      $app.config.isHybridDay &&
      scrollToTimePoint < $app.config.dayBoundaries.value.start
        ? 2400 - $app.config.dayBoundaries.value.start + scrollToTimePoint
        : scrollToTimePoint - $app.config.dayBoundaries.value.start
    const hoursPointsToScroll = hoursFromDayStart / 100
    const pixelsToScroll = hoursPointsToScroll * pixelsPerHour

    const viewContainer = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__view-container') as HTMLElement
    viewContainer.scroll(0, pixelsToScroll)
  }

  private waitUntilGridDayExistsThenScroll() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const gridDayExists = Array.from(mutation.addedNodes).find((node) => {
          if (!(node instanceof HTMLElement)) return false
          return node.classList.contains('sx__time-grid-day')
        })
        if (
          mutation.type === 'childList' &&
          gridDayExists &&
          !this.hasScrolledSinceViewRender
        ) {
          this.scrollOnRender()
          this.hasScrolledSinceViewRender = true
          this.observer?.disconnect()
        }
      })
    })
    this.observer.observe(
      (this.$app as CalendarAppSingleton).elements
        .calendarWrapper as HTMLElement,
      {
        childList: true,
        subtree: true,
      }
    )
  }
}

export const createScrollControllerPlugin = (
  config: ScrollControllerConfig = {}
) => new ScrollControllerPlugin(config)
