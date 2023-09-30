import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import RangeHeading from '../../range-heading'

export const factory = ($app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <RangeHeading />
    </AppContext.Provider>
  )
}
