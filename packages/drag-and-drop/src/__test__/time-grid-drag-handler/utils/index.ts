import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const dragEventNQuarters = (
  clickEvent: MouseEvent,
  nStepsToDrag: number,
  direction: 'up' | 'down',
  pixelPerQuarterHour = 16.6666666667
) => {
  let currentY = clickEvent.clientY
  for (let i = 0; i < nStepsToDrag; i++) {
    if (direction === 'down') {
      currentY += pixelPerQuarterHour
    } else {
      currentY -= pixelPerQuarterHour
    }

    const event = {
      clientX: clickEvent.clientX,
      clientY: currentY,
    } as MouseEvent
    document.dispatchEvent(new MouseEvent('mousemove', event))
  }
}

export const dragEventNQuarters12HourGrid = (
  clickEvent: MouseEvent,
  nStepsToDrag: number,
  direction: 'up' | 'down'
) => {
  dragEventNQuarters(clickEvent, nStepsToDrag, direction, 16.6666666667 * 2)
}

export const getEventWithId = (
  id: string | number,
  $app: CalendarAppSingleton
) => {
  return $app.calendarEvents.list.value.find((event) => event.id === id)
}
