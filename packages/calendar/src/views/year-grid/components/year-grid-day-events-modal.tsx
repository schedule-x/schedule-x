import { JSX } from 'preact'
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'preact/hooks'
import { YearGridDay } from '../types/year-grid'
import MonthAgendaEvent from '../../month-agenda/components/month-agenda-event'
import { AppContext } from '../../../utils/stateful/app-context'

type Props = {
  day: YearGridDay
  anchor: HTMLElement
  onClose: () => void
}

const POPOVER_GAP = 8

export default function YearGridDayEventsModal({
  day,
  anchor,
  onClose,
}: Props) {
  const $app = useContext(AppContext)
  const modalRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<JSX.CSSProperties>({ opacity: 0 })

  const updatePosition = () => {
    const wrapper = anchor.closest('.sx__year-grid-wrapper')
    const modal = modalRef.current
    if (!(wrapper instanceof HTMLElement) || !modal) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()
    const modalRect = modal.getBoundingClientRect()
    const maxLeft = Math.max(
      POPOVER_GAP,
      wrapper.clientWidth - modalRect.width - POPOVER_GAP
    )
    const left = Math.min(
      Math.max(
        anchorRect.left -
          wrapperRect.left +
          anchorRect.width / 2 -
          modalRect.width / 2,
        POPOVER_GAP
      ),
      maxLeft
    )
    const topBelow =
      anchorRect.bottom - wrapperRect.top + wrapper.scrollTop + POPOVER_GAP
    const topAbove =
      anchorRect.top -
      wrapperRect.top +
      wrapper.scrollTop -
      modalRect.height -
      POPOVER_GAP
    const availableBelow = wrapperRect.bottom - anchorRect.bottom - POPOVER_GAP

    setPosition({
      left,
      top:
        availableBelow >= modalRect.height
          ? topBelow
          : Math.max(POPOVER_GAP, topAbove),
      opacity: 1,
    })
  }

  useLayoutEffect(() => {
    updatePosition()
    modalRef.current?.focus()
  }, [day.date])

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (modalRef.current?.contains(target) || anchor.contains(target)) return
      onClose()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      onClose()
      anchor.focus()
    }
    const viewContainer = anchor.closest('.sx__view-container')

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', updatePosition)
    viewContainer?.addEventListener('scroll', updatePosition)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', updatePosition)
      viewContainer?.removeEventListener('scroll', updatePosition)
    }
  }, [anchor, day.date])

  const dateLabel = day.date.toLocaleString($app.config.locale.value, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      ref={modalRef}
      className="sx__year-grid-day-events-modal"
      style={position}
      role="dialog"
      aria-modal="false"
      aria-label={dateLabel}
      tabIndex={-1}
    >
      <div className="sx__year-grid-day-events-modal__header">
        <div className="sx__year-grid-day-events-modal__date">{dateLabel}</div>

        <button
          type="button"
          className="sx__button sx__year-grid-day-events-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="sx__year-grid-day-events-modal__events">
        {day.events.map((event) => (
          <MonthAgendaEvent key={event.id} calendarEvent={event} />
        ))}
      </div>
    </div>
  )
}
