import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const dragEventNQuarters = (
  clickEvent: MouseEvent,
  nStepsToDrag: number,
  direction: 'up' | 'down',
  pixelPerQuarterHour = 16.6666666667
) => {
  let currentY = clickEvent.clientY
  const event = {
    clientX: clickEvent.clientX,
    clientY: currentY,
  }

  for (let i = 0; i < nStepsToDrag; i++) {
    if (direction === 'down') {
      currentY += pixelPerQuarterHour
    } else {
      currentY -= pixelPerQuarterHour
    }

    event.clientY = currentY
    document.dispatchEvent(new MouseEvent('mousemove', event))
  }

  return event
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

export const dragEventNQuartersIn20HourGridOf2000px = (
  clickEvent: MouseEvent,
  nStepsToDrag: number,
  direction: 'up' | 'down'
) => {
  return dragEventNQuarters(clickEvent, nStepsToDrag, direction, 25)
}
