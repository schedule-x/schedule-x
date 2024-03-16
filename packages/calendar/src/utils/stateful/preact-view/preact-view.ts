import { View, ViewConfig } from '@schedule-x/shared/src/types/calendar/view'
import { PreactViewComponent } from '@schedule-x/shared/src/types/calendar/preact-view-component'
import { createElement, render as renderPreact } from 'preact'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { RangeSetterConfig } from '@schedule-x/shared/src/interfaces/calendar/range-setter-config.interface'
import {
  addDays,
  addMonths,
} from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'
import { DateRange } from '@schedule-x/shared/src/types/date-range'

class PreactView implements View {
  private randomId = randomStringId()

  public name: string
  public label: string
  public Component: PreactViewComponent
  public setDateRange: (config: RangeSetterConfig) => DateRange
  public hasSmallScreenCompat: boolean
  public hasWideScreenCompat: boolean
  public backwardForwardFn: typeof addDays | typeof addMonths
  public backwardForwardUnits: number

  constructor(config: ViewConfig) {
    this.name = config.name
    this.label = config.label
    this.Component = config.Component
    this.setDateRange = config.setDateRange
    this.hasSmallScreenCompat = config.hasSmallScreenCompat
    this.hasWideScreenCompat = config.hasWideScreenCompat
    this.backwardForwardFn = config.backwardForwardFn
    this.backwardForwardUnits = config.backwardForwardUnits
  }

  render(onElement: HTMLElement, $app: CalendarAppSingleton): void {
    renderPreact(
      createElement(this.Component, { $app, id: this.randomId }),
      onElement
    )
  }

  destroy(): void {
    const el = document.getElementById(this.randomId)
    if (el) {
      el.remove()
    }
  }
}

export const createPreactView = (config: ViewConfig): View => {
  return new PreactView(config)
}
