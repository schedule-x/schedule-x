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
      <button
        className="sx__chevron-wrapper"
        onClick={() => navigate('backwards')}
      >
        <i className="sx__chevron sx__chevron--previous"></i>
      </button>

      <button
        className="sx__chevron-wrapper"
        onClick={() => navigate('forwards')}
      >
        <i className="sx__chevron sx__chevron--next"></i>
      </button>
    </>
  )
}
