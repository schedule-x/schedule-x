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

    if (inputValue.length === 2 && nextTabIndexRef) {
      nextTabIndexRef.current?.focus()
    }
  }, [inputValue])

  const handleOnBlur = () => {
    const [min, max] = validRange
    const value = parseInt(inputValue)
    if (value < min || value > max) {
      setInputValue('00')
    }
    if (inputValue.length === 1) {
      setInputValue(`0${inputValue}`)
    }
  }

  return (
    <input
      ref={inputRef}
      className="sx__time-input"
      type="text"
      value={inputValue}
      onInput={handleInput}
      onBlur={handleOnBlur}
    />
  )
}
