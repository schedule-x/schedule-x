import CalendarHeader from './calendar-header'
import CalendarAppSingleton from '../../utils/stateful/app-singleton/calendar-app-singleton'
import { AppContext } from '../../utils/stateful/app-context'

type props = {
  $app: CalendarAppSingleton
}

export default function CalendarWrapper({ $app }: props) {
  return (
    <>
      <div className={'sx__calendar-wrapper'}>
        <AppContext.Provider value={$app}>
          <CalendarHeader />
        </AppContext.Provider>
      </div>
    </>
  )
}
