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

  const handleInput = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return

    setInputValue(e.target.value)
  }

  useEffect(() => {
    onChange(inputValue)

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
      setInputValue('00')
      return
    }
    if (inputValue.length === 1) {
      setInputValue(`0${inputValue}`)
    }
  }

  return (
    <input
      ref={inputRef}
      maxLength={2}
      className="sx__time-input"
      type="text"
      value={inputValue}
      onInput={handleInput}
      onBlur={handleOnBlur}
    />
  )
}
