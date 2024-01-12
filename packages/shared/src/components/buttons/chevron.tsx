import { isKeyEnterOrSpace } from '../../utils/stateless/dom/events'

type props = {
  direction: 'previous' | 'next'
  onClick: () => void
  buttonText?: string
}

export default function Chevron({ direction, onClick, buttonText }: props) {
  const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) onClick()
  }

  return (
    <button
      className="sx__chevron-wrapper sx__ripple"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <i className={`sx__chevron sx__chevron--${direction}`}>{buttonText}</i>
    </button>
  )
}
