import { useEffect, useState } from "react";

const isKeyEnterOrSpace = (keyboardEvent: KeyboardEvent) =>
  keyboardEvent.key === 'Enter' || keyboardEvent.key === ' '

type DropdownItem = {
  label: string
  id: number
}

type props = {
  items: DropdownItem[]
  selectedItem: DropdownItem
  onSelect?: (item: number) => void
}

export default function AppDropdown({ items, selectedItem, onSelect }: props) {
  const [selectedOption, setSelectedOption] = useState<DropdownItem>(selectedItem)

  const [isOpen, setIsOpen] = useState(false)

  const clickOutsideListener = (event: MouseEvent) => {
    const target = event.target
    if (
      target instanceof HTMLElement &&
      !target.closest('.app-dropdown')
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, []);

  const handleClickOnSelectionItem = (optionValue: number) => {
    setIsOpen(false)
    if (onSelect) {
      onSelect(optionValue)
    }
    setSelectedOption(items.find((item) => item.id === optionValue) || selectedItem)
  }

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0)
  const [optionElements, setOptionElements] =
    useState<NodeListOf<Element>>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedViewKeyDown: any = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) {
      setIsOpen(!isOpen)
    }

    setTimeout(() => {
      const allOptions = document.querySelectorAll(
        '.app-dropdown-item'
      )
      if (!allOptions) return
      setOptionElements(allOptions as NodeListOf<Element>)
      const firstOption = allOptions[0]
      if (firstOption instanceof HTMLElement) {
        setFocusedOptionIndex(0)
        firstOption.focus()
      }
    }, 50)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigateUpOrDown = (keyboardEvent: KeyboardEvent | any, optionValue: number) => {
    if (!optionElements) return

    if (keyboardEvent.key === 'ArrowDown') {
      const nextOption = optionElements[focusedOptionIndex + 1]
      if (nextOption instanceof HTMLElement) {
        setFocusedOptionIndex(focusedOptionIndex + 1)
        nextOption.focus()
      }
    } else if (keyboardEvent.key === 'ArrowUp') {
      const prevOption = optionElements[focusedOptionIndex - 1]
      if (prevOption instanceof HTMLElement) {
        setFocusedOptionIndex(focusedOptionIndex - 1)
        prevOption.focus()
      }
    } else if (isKeyEnterOrSpace(keyboardEvent)) {
      handleClickOnSelectionItem(optionValue)
    }
  }

  return (
    <div className="app-dropdown">
      <button
        tabIndex={0}
        role="button"
        aria-label={'Select option'}
        className="app-dropdown-selected-item sx__ripple"
        onClick={() => setIsOpen(true)}
        onKeyDown={handleSelectedViewKeyDown}
      >
        {selectedOption.label}
      </button>
      {isOpen && (
        <ul
          className="app-dropdown-items"
        >
          {items.map((view) => (
            <li
              key={view.id}
              aria-label={view.label}
              tabIndex={-1}
              role="button"
              onKeyDown={(keyboardEvent) =>
                navigateUpOrDown(keyboardEvent, view.id)
              }
              onClick={() => handleClickOnSelectionItem(view.id)}
              className={
                'app-dropdown-item' +
                (view.label === selectedOption.label
                  ? ' is-selected'
                  : '')
              }
            >
              {view.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
