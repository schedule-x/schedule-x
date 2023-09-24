import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'
import { addTimePointsToDateTime } from '@schedule-x/shared/src/utils/stateless/time/time-points/string-conversion'

const CHANGE_THRESHOLD_IN_TIME_POINTS = 25 // changes are registered in 15 minute intervals

export default class TimeGridDragHandler {
  private startY: number | undefined = 0
  private lastChangeInIntervals = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent,
    private calendarEventId: string | number | symbol
  ) {
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
    const eventToUpdate = this.$app.calendarEvents.list.value.find(
      (event) => event.id === this.calendarEventId
    )
    if (!eventToUpdate) throw new Error('no event with this id found') // todo: custom error

    const pointsToAdd =
      currentChangeInIntervals * CHANGE_THRESHOLD_IN_TIME_POINTS
    eventToUpdate.time.start = addTimePointsToDateTime(
      eventToUpdate.time.start,
      pointsToAdd
    )
    eventToUpdate.time.end = addTimePointsToDateTime(
      eventToUpdate.time.end,
      pointsToAdd
    )

    // pass reference to event to update
  }

  private handleMouseUp = (e: MouseEvent) => {
    console.log('mouseup')
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
}
