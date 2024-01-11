import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { ViewName } from '@schedule-x/shared/src/types/calendar/view-name'
import { View } from '@schedule-x/shared/src/types/calendar/view'
import { isKeyEnterOrSpace } from '@schedule-x/shared/src/utils/stateless/dom/events'

export default function ViewSelection() {
  const $app = useContext(AppContext)

  const [availableViews, setAvailableViews] = useState<View[]>([])

  useEffect(() => {
    if ($app.calendarState.isCalendarSmall.value) {
      setAvailableViews(
        $app.config.views.filter((view) => view.hasSmallScreenCompat)
      )
    } else {
      setAvailableViews(
        $app.config.views.filter((view) => view.hasWideScreenCompat)
      )
    }
  }, [$app.calendarState.isCalendarSmall.value])

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

  const [viewSelectionItems, setViewSelectionItems] =
    useState<NodeListOf<Element>>()
  const [selectedViewIndex, setSelectedViewIndex] = useState(0)

  const handleSelectedViewKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) {
      setIsOpen(!isOpen)
    }

    setTimeout(() => {
      const allOptions = $app.elements.calendarWrapper?.querySelectorAll(
        '.sx__view-selection-item'
      )
      if (!allOptions) return

      setViewSelectionItems(allOptions as NodeListOf<Element>)
      const firstOption = allOptions[0]
      if (firstOption instanceof HTMLElement) {
        setSelectedViewIndex(0)
        firstOption.focus()
      }
    })
  }

  const navigateUpOrDown = (keyboardEvent: KeyboardEvent, viewName: string) => {
    if (!viewSelectionItems) return

    if (keyboardEvent.key === 'ArrowDown') {
      if (selectedViewIndex < viewSelectionItems.length - 1) {
        const nextOption = viewSelectionItems[selectedViewIndex + 1]
        if (nextOption instanceof HTMLElement) {
          setSelectedViewIndex(selectedViewIndex + 1)
          nextOption.focus()
        }
      }
    } else if (keyboardEvent.key === 'ArrowUp') {
      if (selectedViewIndex > 0) {
        const prevOption = viewSelectionItems[selectedViewIndex - 1]
        if (prevOption instanceof HTMLElement) {
          setSelectedViewIndex(selectedViewIndex - 1)
          prevOption.focus()
        }
      }
    } else if (isKeyEnterOrSpace(keyboardEvent)) {
      const selectedViewName = viewSelectionItems[selectedViewIndex].textContent
      if (selectedViewName) {
        handleClickOnSelectionItem(viewName)
      }
    }
  }

  return (
    <div className="sx__view-selection">
      <div
        tabIndex={0}
        role="button"
        aria-label={$app.translate('Select view')}
        className="sx__view-selection-selected-item sx__ripple"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleSelectedViewKeyDown}
      >
        {selectedViewLabel}
      </div>
      {isOpen && (
        <ul
          data-testid="view-selection-items"
          className="sx__view-selection-items"
        >
          {availableViews.map((view) => (
            <li
              aria-label={$app.translate('Select view') + ' ' + view.label}
              tabIndex={-1}
              role="button"
              onKeyDown={(keyboardEvent) =>
                navigateUpOrDown(keyboardEvent, view.name)
              }
              onClick={() => handleClickOnSelectionItem(view.name)}
              className={
                'sx__view-selection-item' +
                (view.name === $app.calendarState.view.value
                  ? ' is-selected'
                  : '')
              }
            >
              {$app.translate(view.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
