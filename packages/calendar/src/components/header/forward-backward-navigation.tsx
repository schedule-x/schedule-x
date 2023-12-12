import { useContext } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'

export default function ForwardBackwardNavigation() {
  const $app = useContext(AppContext)

  const navigate = (direction: 'forwards' | 'backwards') => {
    const currentView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    if (!currentView) return

    $app.datePickerState.selectedDate.value = currentView.backwardForwardFn(
      $app.datePickerState.selectedDate.value,
      direction === 'forwards'
        ? currentView.backwardForwardUnits
        : -currentView.backwardForwardUnits
    )
  }

  return (
    <>
      <button onClick={() => navigate('backwards')}>{'<'}</button>

      <button onClick={() => navigate('forwards')}>{'>'}</button>
    </>
  )
}
