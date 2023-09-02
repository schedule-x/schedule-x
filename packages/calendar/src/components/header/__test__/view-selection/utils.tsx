import { createCalendarAppSingleton } from '../../../../factory'
import { viewDay } from '../../../../views/day'
import { viewWeek } from '../../../../views/week'
import { viewMonth } from '../../../../views/month'
import { render, screen } from '@testing-library/preact'
import { AppContext } from '../../../../utils/stateful/app-context'
import ViewSelection from '../../view-selection'

export const factory = () => {
  const $app = createCalendarAppSingleton({
    views: [viewDay, viewWeek, viewMonth],
  })

  return render(
    <AppContext.Provider value={$app}>
      <ViewSelection />
    </AppContext.Provider>
  )
}

export function queryDropdown() {
  return screen.queryByTestId('view-selection-items')
}
