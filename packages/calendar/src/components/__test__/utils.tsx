import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render } from '@testing-library/preact'
import CalendarWrapper from '../calendar-wrapper'

export const renderComponent = ($app: CalendarAppSingleton) => {
  render(<CalendarWrapper $app={$app} />)
}
