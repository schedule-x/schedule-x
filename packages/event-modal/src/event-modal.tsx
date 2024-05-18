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
import { useIconColors } from './utils/stateful/use-icon-colors'
import { Fragment } from 'preact/jsx-runtime'
import { getScrollableParents } from '@schedule-x/shared/src/utils/stateless/dom/scrolling'

export default function EventModal({ $app }: EventModalProps) {
  const [modalId] = useState(randomStringId())
  const { value: calendarEvent } = (
    $app.config.plugins.eventModal as EventModalPlugin
  ).calendarEvent
  const [isDisplayed, setIsDisplayed] = useState(false)
  const customComponent = $app.config._customComponentFns.eventModal

  const [eventWrapperStyle, setEventWrapperStyle] = useState('sx__event-modal')

  const callSetPosition = () => {
    setPosition(
      $app.elements.calendarWrapper?.getBoundingClientRect() as DOMRect,
      $app.config.plugins.eventModal?.calendarEventDOMRect.value as DOMRect,
      (
        $app.elements.calendarWrapper?.querySelector(
          '.sx__event-modal'
        ) as HTMLElement
      ).clientHeight
    )
  }

  const scrollListener = () => {
    ;(
      $app.config.plugins.eventModal as EventModalPlugin
    ).calendarEventDOMRect.value =
      $app.config.plugins.eventModal?.calendarEventElement.value?.getBoundingClientRect() as DOMRect
    callSetPosition()
  }

  useEffect(() => {
    if (customComponent) {
      customComponent(
        document.querySelector(`[data-ccid=${modalId}]`) as HTMLElement,
        {
          calendarEvent: calendarEvent?._getExternalEvent(),
        }
      )
    } else {
      setEventWrapperStyle(eventWrapperStyle.concat(' sx__event-modal-default'))
    }
    callSetPosition()

    setIsDisplayed(true)
    const clickOutsideListener = createClickOutsideListener($app, modalId)

    const scrollableAncestors = getScrollableParents(
      $app.config.plugins.eventModal?.calendarEventElement.value || null
    )
    scrollableAncestors.forEach((el) =>
      el.addEventListener('scroll', scrollListener)
    )

    document.addEventListener('click', clickOutsideListener)

    return () => {
      document.removeEventListener('click', clickOutsideListener)
      scrollableAncestors.forEach((el) =>
        el.removeEventListener('scroll', scrollListener)
      )
    }
  }, [])

  const iconColor = useIconColors($app)

  return (
    <>
      {calendarEvent && (
        <div
          id={modalId}
          data-ccid={modalId}
          className={`${eventWrapperStyle}${isDisplayed ? ' is-open' : ''}`}
        >
          {!customComponent && (
            <Fragment>
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
                <TimeIcon strokeColor={iconColor.value} />

                {getTimeStamp(calendarEvent, $app.config.locale)}
              </div>

              {calendarEvent.people && calendarEvent.people.length && (
                <div className="sx__has-icon sx__event-modal__people">
                  <UserIcon strokeColor={iconColor.value} />

                  {concatenatePeople(calendarEvent.people)}
                </div>
              )}

              {calendarEvent.location && (
                <div className="sx__has-icon sx__event-modal__location">
                  <LocationPinIcon strokeColor={iconColor.value} />

                  {calendarEvent.location}
                </div>
              )}

              {calendarEvent.description && (
                <div className="sx__has-icon sx__event-modal__description">
                  <DescriptionIcon strokeColor={iconColor.value} />

                  {calendarEvent.description}
                </div>
              )}
            </Fragment>
          )}
        </div>
      )}
    </>
  )
}
