import { useEffect, useState } from 'preact/compat'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import { EventModalProps } from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { createClickOutsideListener } from './utils/stateless/click-outside'
import { setPosition } from './utils/stateless/set-position'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import { getTimeStamp } from './utils/stateless/get-time-stamp'
import UserIcon from '@schedule-x/shared/src/components/icons/user-icon'
import { concatenatePeople } from '@schedule-x/shared/src/utils/stateless/strings/concatenate-people'
import LocationPinIcon from '@schedule-x/shared/src/components/icons/location-pin-icon'
import DescriptionIcon from '@schedule-x/shared/src/components/icons/description-icon'

export default function EventModal({ $app }: EventModalProps) {
  const modalId = randomStringId()
  const { value: calendarEvent } = $app.config.plugins.eventModal!.calendarEvent
  const [isDisplayed, setIsDisplayed] = useState(false)

  useEffect(() => {
    setPosition(
      $app.elements.calendarWrapper?.getBoundingClientRect() as DOMRect,
      $app.config.plugins.eventModal?.calendarEventElement.value?.getBoundingClientRect() as DOMRect,
      (
        $app.elements.calendarWrapper?.querySelector(
          '.sx__event-modal'
        ) as HTMLElement
      ).clientHeight
    )

    setIsDisplayed(true)
    const clickOutsideListener = createClickOutsideListener($app, modalId)
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  return (
    <>
      {calendarEvent && (
        <div
          id={modalId}
          className={`sx__event-modal${isDisplayed ? ' is-open' : ''}`}
        >
          <div className="sx__has-icon sx__event-modal__title">
            <div
              style={{
                backgroundColor: `var(--sx-color-${calendarEvent._color}-container)`,
              }}
              className="sx__event-modal__color-icon sx__event-icon"
            />

            {calendarEvent.title}
          </div>

          <div className="sx__has-icon sx__event-modal__time">
            {/*todo: fix stroke color for dark mode*/}
            <TimeIcon strokeColor={'#000'} />

            {getTimeStamp(calendarEvent, $app.config.locale)}
          </div>

          {calendarEvent.people && (
            <div className="sx__has-icon sx__event-modal__people">
              <UserIcon strokeColor={'#000'} />

              {concatenatePeople(calendarEvent.people)}
            </div>
          )}

          {calendarEvent.location && (
            <div className="sx__has-icon sx__event-modal__location">
              <LocationPinIcon strokeColor={'#000'} />

              {calendarEvent.location}
            </div>
          )}

          {calendarEvent.description && (
            <div className="sx__has-icon sx__event-modal__description">
              <DescriptionIcon strokeColor={'#000'} />

              {calendarEvent.description}
            </div>
          )}
        </div>
      )}
    </>
  )
}
