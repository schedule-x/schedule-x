import { useContext, useEffect, useState } from 'preact/compat'
import { AppContext } from '../../utils/stateful/app-context'
import { ViewName } from '../../types/view-name'

export default function ViewSelection() {
  const $app = useContext(AppContext)

  const [selectedViewLabel, setSelectedViewLabel] = useState('')
  useEffect(() => {
    const selectedView = $app.config.views.find(
      (view) => view.name === $app.calendarState.view.value
    )
    if (!selectedView) return

    setSelectedViewLabel($app.translate(selectedView.label))
  }, [$app.calendarState.view.value])

  const [isOpen, setIsOpen] = useState(false)

  const clickOutsideListener = (event: MouseEvent) => {
    const target = event.target
    if (
      target instanceof HTMLElement &&
      !target.closest('.sx__view-selection')
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  const handleClickOnSelectionItem = (viewName: ViewName) => {
    setIsOpen(false)
    $app.calendarState.view.value = viewName
  }

  return (
    <div className="sx__view-selection">
      <div
        className="sx__view-selection-selected-item sx__ripple"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedViewLabel}
      </div>
      {isOpen && (
        <ul
          data-testid="view-selection-items"
          className="sx__view-selection-items"
        >
          {$app.config.views.map((view) => (
            <li
              className={
                'sx__view-selection-item' +
                (view.name === $app.calendarState.view.value
                  ? ' is-selected'
                  : '')
              }
              onClick={() => handleClickOnSelectionItem(view.name)}
            >
              {$app.translate(view.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
