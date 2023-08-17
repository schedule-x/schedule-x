import { render } from '@testing-library/preact'
import { AppContext } from '../../../utils/stateful/app-context'
import MonthViewHeader from '../../month-view-header'
import { mockFn } from '../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import DatePickerAppSingleton from '../../../utils/stateful/app-singleton/date-picker-app.singleton'
import { Mock } from 'vitest'

export const factory = ($app: DatePickerAppSingleton, spy?: Mock) => {
  return render(
    <AppContext.Provider value={$app}>
      <MonthViewHeader setYearsView={spy || mockFn} />
    </AppContext.Provider>
  )
}