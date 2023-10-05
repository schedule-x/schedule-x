import { useEffect } from 'preact/compat'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { EventModalProps } from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { createClickOutsideListener } from './utils/stateless/click-outside'

export default function EventModal({ calendarEvent, $app }: EventModalProps) {
  const modalId = randomStringId()

  useEffect(() => {
    const clickOutsideListener = createClickOutsideListener($app, modalId)
    document.addEventListener('click', clickOutsideListener)
    return () => {
      console.log('unmount modal')
      document.removeEventListener('click', clickOutsideListener)
    }
  }, [])

  return (
    <>
      <div id={modalId} className={'sx__event-modal'}>
        event with id {calendarEvent.id}
      </div>
    </>
  )
}
