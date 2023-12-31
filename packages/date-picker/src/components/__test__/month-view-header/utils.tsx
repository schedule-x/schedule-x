import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewHeader from '../../month-view-header'
import { mockFn } from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import DatePickerAppSingleton from '@schedule-x/shared/src/interfaces/date-picker/date-picker-app.singleton'
import { Mock } from 'vitest'

export const renderComponent = ($app: DatePickerAppSingleton, spy?: Mock) => {
  return render(
    <AppContext.Provider value={$app}>
      <MonthViewHeader setYearsView={spy || mockFn} />
    </AppContext.Provider>
  )
}
