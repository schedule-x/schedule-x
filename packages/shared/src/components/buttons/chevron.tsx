import { isKeyEnterOrSpace } from '../../utils/stateless/dom/events'

type props = {
  direction: 'previous' | 'next'
  onClick: () => void
  buttonText?: string
  disabled?: boolean
}

export default function Chevron({
  direction,
  onClick,
  buttonText,
  disabled = false,
}: props) {
  const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) onClick()
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className="sx__button sx__chevron-wrapper sx__ripple"
      onMouseUp={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <i className={`sx__chevron sx__chevron--${direction}`}>{buttonText}</i>
    </button>
  )
}
