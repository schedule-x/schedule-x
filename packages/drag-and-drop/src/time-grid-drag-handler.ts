import CalendarAppSingleton from '@schedule-x/calendar/src/utils/stateful/app-singleton/calendar-app-singleton'

export default class TimeGridDragHandler {
  private startY: number | undefined = 0

  constructor(
    private $app: CalendarAppSingleton,
    private event: MouseEvent
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
  }

  private handleMouseUp = (e: MouseEvent) => {
    console.log('mouseup')
    document.removeEventListener('mousemove', this.handleMouseMove)
  }
}
