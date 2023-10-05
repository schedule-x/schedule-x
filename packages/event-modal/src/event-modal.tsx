import { useEffect, useState } from 'preact/compat'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { EventModalProps } from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { createClickOutsideListener } from './utils/stateless/click-outside'
import { calculatePosition } from './utils/stateless/calculate-position'

export default function EventModal({ $app }: EventModalProps) {
  const modalId = randomStringId()

  const [isDisplayed, setIsDisplayed] = useState(false)

  useEffect(() => {
    calculatePosition(
      $app.elements.calendarWrapper?.getBoundingClientRect() as DOMRect,
      $app.config.plugins.eventModal!.calendarEventElement.value?.getBoundingClientRect() as DOMRect
    )

    setIsDisplayed(true)
    const clickOutsideListener = createClickOutsideListener($app, modalId)
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  return (
    <>
      {$app.config.plugins.eventModal?.calendarEvent.value && isDisplayed && (
        <div id={modalId} className={'sx__event-modal'}>
          event with id {$app.config.plugins.eventModal.calendarEvent.value?.id}
        </div>
      )}
    </>
  )
}
