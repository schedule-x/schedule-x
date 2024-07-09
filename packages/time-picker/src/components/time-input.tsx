import { Ref } from 'preact'
import { useState } from 'preact/hooks'
import { useEffect } from 'preact/compat'

type props = {
  initialValue: string
  onChange: (value: string) => void
  inputRef: Ref<HTMLInputElement>
  validRange: [number, number]
  nextTabIndexRef?: Ref<HTMLInputElement | HTMLButtonElement>
}

export default function TimeInput({
  initialValue,
  onChange,
  inputRef,
  nextTabIndexRef,
  validRange,
}: props) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [tabBlocker, setTabBlocker] = useState(false)

  const handleInput = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return

    setInputValue(e.target.value)
  }

  useEffect(() => {
    onChange(inputValue)

    if (tabBlocker) return

    if (
      inputValue.length === 2 &&
      nextTabIndexRef &&
      'current' in nextTabIndexRef
    ) {
      nextTabIndexRef.current?.focus()
      if (nextTabIndexRef.current instanceof HTMLInputElement) {
        nextTabIndexRef.current.select()
      }
    }
  }, [inputValue])

  const handleOnBlur = () => {
    const [min, max] = validRange
    const value = +inputValue

    if (value < min || value > max || isNaN(value)) {
      setInputValue(min < 10 ? `0${min}` : String(min))
      return
    }
    if (inputValue.length === 1) {
      setInputValue(`0${inputValue}`)
    }
  }

  const incrementOrDecrementOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const [min, max] = validRange
      const value = +inputValue
      const newValue = e.key === 'ArrowUp' ? value + 1 : value - 1

      if (newValue < min || newValue > max) return

      setInputValue(newValue < 10 ? `0${newValue}` : String(newValue))
      setTabBlocker(true)
      setTimeout(() => setTabBlocker(false))
    }
  }

  return (
    <input
      ref={inputRef}
      maxLength={2}
      className="sx__time-input"
      type="text"
      onKeyDown={incrementOrDecrementOnKeyDown}
      value={inputValue}
      onInput={handleInput}
      onBlur={handleOnBlur}
    />
  )
}
