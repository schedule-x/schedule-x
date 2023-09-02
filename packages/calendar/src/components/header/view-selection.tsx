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

  useEffect(() => {
    if (!isOpen) return

    const listener = (event: MouseEvent) => {
      event.stopPropagation()
      const target = event.target as HTMLElement
      if (!target.closest('.sx__view-selection')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', listener)
    return () => document.removeEventListener('click', listener)
  }, [isOpen])

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
      <ul className="sx__view-selection-items">
        {isOpen &&
          $app.config.views.map((view) => (
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
    </div>
  )
}
