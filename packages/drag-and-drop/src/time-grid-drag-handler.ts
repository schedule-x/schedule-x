import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { CalendarEventInternal } from '@schedule-x/shared/src/interfaces/calendar-event.interface'

const CHANGE_THRESHOLD_IN_TIME_POINTS = 25 // changes are registered in 15 minute intervals

export default class TimeGridDragHandler {
  private readonly originalStart: string
  private readonly originalEnd: string
  private startY: number | undefined = 0
  private lastChangeInIntervals = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent,
    private eventCopy: CalendarEventInternal,
    private updateCopy: (newCopy: CalendarEventInternal | undefined) => void
  ) {
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
    console.log('createTimeGridDragHandler')
    this.startY = this.event.clientY
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp, { once: true })
  }

  private handleMouseMove = (e: MouseEvent) => {
    // console.log('mousemove')
    if (typeof this.startY === 'undefined')
      throw new Error('startY is undefined')

    const pixelChangeY = e.clientY - this.startY
    const timePointsChangeY = pixelChangeY * this.timePointsPerPixel
    const currentChangeInIntervals = Math.round(
      timePointsChangeY / CHANGE_THRESHOLD_IN_TIME_POINTS
    )
    if (currentChangeInIntervals === this.lastChangeInIntervals) return

    this.lastChangeInIntervals = currentChangeInIntervals

    const pointsToAdd =
      currentChangeInIntervals * CHANGE_THRESHOLD_IN_TIME_POINTS
    this.eventCopy.time.start = addTimePointsToDateTime(
      this.originalStart,
      pointsToAdd
    )
    this.eventCopy.time.end = addTimePointsToDateTime(
      this.originalEnd,
      pointsToAdd
    )

    console.log('set copy with new start time: ', this.eventCopy.time.start)
    this.updateCopy(this.eventCopy)

    // pass reference to event to update and update it here (also save as reactive state in component, so it updates automatically)
  }

  private handleMouseUp = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', this.handleMouseMove)

    if (this.lastChangeInIntervals !== 0) {
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

    this.updateCopy(undefined)
  }
}
