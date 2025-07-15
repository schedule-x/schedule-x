import PluginBase from '@schedule-x/shared/src/interfaces/plugin.interface'
import { PluginName } from '@schedule-x/shared/src/enums/plugin-name.enum'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import ScrollControllerConfig from './interfaces/config'
import { effect } from '@preact/signals'
import { InternalViewName } from '@schedule-x/shared/src/enums/calendar/internal-view.enum'
import { definePlugin } from '@schedule-x/shared/src/utils/stateless/calendar/define-plugin'
import { Temporal } from '@js-temporal/polyfill'

class ScrollControllerPlugin implements PluginBase<string> {
  name = PluginName.ScrollController
  private $app: CalendarAppSingleton | null = null
  private observer: MutationObserver | null = null
  private hasScrolledSinceViewRender = false

  constructor(private config: ScrollControllerConfig = {}) {}

  /**
   * @internal
   * */
  onRender($app: CalendarAppSingleton) {
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
    // const scrollToTimePoint = timePointsFromString(time)

    // Konvertiere Start und Zielzeit mit Temporal
    const startTimeStr = this.formatTimePoints($app.config.dayBoundaries.value.start);
    const endTimeStr = this.formatTimePoints($app.config.dayBoundaries.value.end);

    const scrollToTime = Temporal.PlainTime.from(time);
    const dayStart = Temporal.PlainTime.from(startTimeStr);

    let diffMinutes: number;
    if ($app.config.isHybridDay && scrollToTime < dayStart) {
      // Tagesüberlauf (z.B. über Mitternacht hinaus)
      const dayEnd = Temporal.PlainTime.from(endTimeStr);
      diffMinutes =
        dayEnd.since(dayStart).total('minutes') +
        scrollToTime.since(Temporal.PlainTime.from('00:00')).total('minutes');
    } else {
      diffMinutes = scrollToTime.since(dayStart).total('minutes');
    }

    const hoursPointsToScroll = diffMinutes / 60;
    const pixelsToScroll = hoursPointsToScroll * pixelsPerHour;

    const viewContainer = (
      $app.elements.calendarWrapper as HTMLElement
    ).querySelector('.sx__view-container') as HTMLElement;
    viewContainer.scroll(0, pixelsToScroll);

  }
  private formatTimePoints(timePoint: number): string {
    const hours = String(Math.floor(timePoint / 100)).padStart(2, '0');
    const minutes = String(timePoint % 100).padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  private waitUntilGridDayExistsThenScroll() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const gridDayExists =
          this.$app?.elements.calendarWrapper?.querySelector(
            '.sx__time-grid-day'
          )

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
) => {
  return definePlugin(
    'scrollController',
    new ScrollControllerPlugin(config)
  ) as ScrollControllerPlugin & {
    name: PluginName.ScrollController
  }
}

