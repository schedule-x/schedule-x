/* eslint-disable max-lines */
import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'
import { DayBoundariesDateTime } from '@schedule-x/shared/src/types/day-boundaries-date-time'
import { addDays } from '@schedule-x/shared/src/utils/stateless/time/date-time-mutation/adding'

const CHANGE_THRESHOLD_IN_TIME_POINTS = 25 // changes are registered in 15 minute intervals

export default class TimeGridDragHandler {
  private readonly originalStart: string
  private readonly originalEnd: string
  private readonly dayWidth: number
  private startY = 0 // todo: see if start point should be undefined
  private startX = 0 // todo: see if start point should be undefined
  private lastChangeInIntervals = 0
  private lastChangeInDays = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void,
    private dayBoundariesDateTime: DayBoundariesDateTime
  ) {
    this.dayWidth = (
      document.querySelector('.sx__time-grid-day') as HTMLDivElement
    ).clientWidth
    this.originalStart = this.eventCopy.time.start
    this.originalEnd = this.eventCopy.time.end
    this.init()
  }

  get timePointsPerPixel(): number {
    return (
      this.$app.config.timePointsPerDay /
      this.$app.config.weekOptions.gridHeight
    )
  }

  private init = () => {
    this.startY = this.event.clientY
    this.startX = this.event.clientX
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (typeof this.startY === 'undefined')
      throw new Error('startY is undefined')

    const pixelChangeY = e.clientY - this.startY
    const pixelChangeX = e.clientX - this.startX
    const timePointsChangeY = pixelChangeY * this.timePointsPerPixel
    const currentChangeInIntervals = Math.round(
      timePointsChangeY / CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    const currentChangeInDays = Math.round(pixelChangeX / this.dayWidth)

    if (currentChangeInIntervals !== this.lastChangeInIntervals) {
      this.handleVerticalChange(currentChangeInIntervals)
    }

    // if (currentChangeInDays !== this.lastChangeInDays) {
    //   this.handleHorizontalChange(currentChangeInDays)
    // }
  }

  private handleVerticalChange(currentChangeInIntervals: number) {
    this.lastChangeInIntervals = currentChangeInIntervals
    const pointsToAdd =
      currentChangeInIntervals * CHANGE_THRESHOLD_IN_TIME_POINTS
    this.updateTimeForEventCopy(pointsToAdd)
  }

  private updateTimeForEventCopy(pointsToAdd: number) {
    const newStart = addTimePointsToDateTime(this.originalStart, pointsToAdd)
    const newEnd = addTimePointsToDateTime(this.originalEnd, pointsToAdd)
    if (newStart < this.dayBoundariesDateTime.start) return
    if (newEnd > this.dayBoundariesDateTime.end) return

    this.eventCopy.time.start = newStart
    this.eventCopy.time.end = newEnd
    this.updateCopy(this.eventCopy)
  }

  // private handleHorizontalChange(changeInDays: number) {}

  private handleMouseUp = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    this.updateOriginalEvent()
    this.updateCopy(undefined)
  }

  private updateOriginalEvent() {
    if (this.lastChangeInIntervals === 0) return

    const eventToUpdate = this.$app.calendarEvents.list.value.find(
      (event) => event.id === this.eventCopy.id
    )
    if (!eventToUpdate) throw new Error('eventToUpdate is undefined')

    eventToUpdate.time.start = this.eventCopy.time.start
    eventToUpdate.time.end = this.eventCopy.time.end
    this.$app.calendarEvents.list.value = [
      ...this.$app.calendarEvents.list.value,
    ]
  }
}
