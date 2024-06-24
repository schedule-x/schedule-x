import AppWrapper from '@schedule-x/date-picker/src/components/app-wrapper'
import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import DatePickerAppSingletonBuilder from '@schedule-x/shared/src/utils/stateful/date-picker/app-singleton/date-picker-app-singleton.builder'
import RangeHeading from './range-heading'
import TodayButton from './today-button'
import ViewSelection from './view-selection'
import ForwardBackwardNavigation from './forward-backward-navigation'
import { randomStringId } from '@schedule-x/shared/src'
import { getElementByCCID } from '../../utils/stateless/dom/getters'

export default function CalendarHeader() {
  const $app = useContext(AppContext)

  const datePickerAppSingleton = new DatePickerAppSingletonBuilder()
    .withDatePickerState($app.datePickerState)
    .withConfig($app.datePickerConfig)
    .withTranslate($app.translate)
    .withTimeUnitsImpl($app.timeUnitsImpl)
    .build()

  const headerContentLeftPrepend =
    $app.config._customComponentFns.headerContentLeftPrepend
  const headerContentLeftPrependId = useState(
    headerContentLeftPrepend ? randomStringId() : undefined
  )[0]
  const headerContentLeftAppend =
    $app.config._customComponentFns.headerContentLeftAppend
  const headerContentLeftAppendId = useState(
    headerContentLeftAppend ? randomStringId() : undefined
  )[0]
  const headerContentRightPrepend =
    $app.config._customComponentFns.headerContentRightPrepend
  const headerContentRightPrependId = useState(
    headerContentRightPrepend ? randomStringId() : undefined
  )[0]
  const headerContentRightAppend =
    $app.config._customComponentFns.headerContentRightAppend
  const headerContentRightAppendId = useState(
    headerContentRightAppend ? randomStringId() : undefined
  )[0]

  useEffect(() => {
    if (headerContentLeftPrepend && headerContentLeftPrependId) {
      headerContentLeftPrepend(getElementByCCID(headerContentLeftPrependId), {})
    }
    if (headerContentLeftAppend) {
      headerContentLeftAppend(getElementByCCID(headerContentLeftAppendId), {})
    }
    if (headerContentRightPrepend) {
      headerContentRightPrepend(
        getElementByCCID(headerContentRightPrependId),
        {}
      )
    }
    if (headerContentRightAppend) {
      headerContentRightAppend(getElementByCCID(headerContentRightAppendId), {})
    }
  }, [])

  return (
    <header className={'sx__calendar-header'}>
      <div className={'sx__calendar-header-content'}>
        {headerContentLeftPrependId && (
          <div data-ccid={headerContentLeftPrependId} />
        )}

        <TodayButton />

        <ForwardBackwardNavigation />

        <RangeHeading />

        {headerContentLeftAppendId && (
          <div data-ccid={headerContentLeftAppendId} />
        )}
      </div>

      <div className={'sx__calendar-header-content'}>
        {headerContentRightPrependId && (
          <div data-ccid={headerContentRightPrependId} />
        )}

        <ViewSelection />

        <AppWrapper $app={datePickerAppSingleton}></AppWrapper>

        {headerContentRightAppendId && (
          <div data-ccid={headerContentRightAppendId} />
        )}
      </div>
    </header>
  )
}
