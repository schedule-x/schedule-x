type props = {
  direction: 'previous' | 'next'
  onClick: () => void
  buttonText?: string
}

export default function Chevron({ direction, onClick, buttonText }: props) {
  return (
    <button className="sx__chevron-wrapper sx__ripple" onClick={onClick}>
      <i className={`sx__chevron sx__chevron--${direction}`}>{buttonText}</i>
    </button>
  )
}
