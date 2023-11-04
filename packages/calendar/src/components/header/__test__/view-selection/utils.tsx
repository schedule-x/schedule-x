import { createCalendarAppSingleton } from '../../../../factory'
import { viewDay } from '../../../../views/day'
import { viewWeek } from '../../../../views/week'
import { viewMonthGrid } from '../../../../views/month-grid'
import { render } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import ViewSelection from '../../view-selection'
import { viewMonthAgenda } from '../../../../views/month-agenda'

export const renderComponent = () => {
  const $app = createCalendarAppSingleton({
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  })

  render(
    <AppContext.Provider value={$app}>
      <ViewSelection />
    </AppContext.Provider>
  )

  return { $app }
}
