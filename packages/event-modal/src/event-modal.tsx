import { useEffect, useState } from 'preact/hooks'
import { randomStringId } from '@schedule-x/shared/src/utils/stateless/strings/random'
import EventModalPlugin, {
  EventModalProps,
} from '@schedule-x/shared/src/interfaces/event-modal/event-modal.plugin'
import { createClickOutsideListener } from './utils/stateless/click-outside'
import { setPosition } from './utils/stateless/set-position'
import TimeIcon from '@schedule-x/shared/src/components/icons/time-icon'
import UserIcon from '@schedule-x/shared/src/components/icons/user-icon'
import { concatenatePeople } from '@schedule-x/shared/src/utils/stateless/strings/concatenate-people'
import LocationPinIcon from '@schedule-x/shared/src/components/icons/location-pin-icon'
import DescriptionIcon from '@schedule-x/shared/src/components/icons/description-icon'
import { getTimeStamp } from '@schedule-x/shared/src/utils/stateless/time/date-time-localization/get-time-stamp'

export default function EventModal({ $app }: EventModalProps) {
  const modalId = randomStringId()
  const { value: calendarEvent } = (
    $app.config.plugins.eventModal as EventModalPlugin
  ).calendarEvent
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

  let iconColor = '#000'
  if ($app.config.isDark) iconColor = 'var(--sx-color-neutral-variant)'

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
            <TimeIcon strokeColor={iconColor} />

            {getTimeStamp(calendarEvent, $app.config.locale)}
          </div>

          {calendarEvent.people && calendarEvent.people.length && (
            <div className="sx__has-icon sx__event-modal__people">
              <UserIcon strokeColor={iconColor} />

              {concatenatePeople(calendarEvent.people)}
            </div>
          )}

          {calendarEvent.location && (
            <div className="sx__has-icon sx__event-modal__location">
              <LocationPinIcon strokeColor={iconColor} />

              {calendarEvent.location}
            </div>
          )}

          {calendarEvent.description && (
            <div className="sx__has-icon sx__event-modal__description">
              <DescriptionIcon strokeColor={iconColor} />

              {calendarEvent.description}
            </div>
          )}
        </div>
      )}
    </>
  )
}
