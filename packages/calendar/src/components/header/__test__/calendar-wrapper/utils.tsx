import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import CalendarWrapper from '../../../calendar-wrapper'
import { render } from '@testing-library/preact'

export const factory = ($app: CalendarAppSingleton) => {
  return render(<CalendarWrapper $app={$app} />)
}

export const isWeekView = () => {
  return document.querySelector('.sx__week-wrapper') !== null
}

export const isDayView = () => {
  return document.querySelector('.sx__day-wrapper') !== null
}

export const isMonthView = () => {
  return document.querySelector('.sx__month-wrapper') !== null
}
