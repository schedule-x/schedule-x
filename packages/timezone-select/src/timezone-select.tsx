import { useContext, useEffect, useState } from 'preact/hooks'
import { AppContext } from '@schedule-x/calendar/src/utils/stateful/app-context'
import { IANATimezone } from '@schedule-x/shared/src/utils/stateless/time/tzdb'
import { getOffsetForTimezone } from '@schedule-x/shared/src/utils/stateless/time/get-offset-for-timezone'
import { isKeyEnterOrSpace } from '@schedule-x/shared/src/utils/stateless/dom/events'
import { useSignalEffect } from '@preact/signals'

// Get all IANA timezones - this is a comprehensive list of common timezones
const getAllTimezones = (): IANATimezone[] => {
  return [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Honolulu',
    'America/Toronto',
    'America/Vancouver',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    'America/Santiago',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Rome',
    'Europe/Madrid',
    'Europe/Amsterdam',
    'Europe/Brussels',
    'Europe/Vienna',
    'Europe/Zurich',
    'Europe/Stockholm',
    'Europe/Oslo',
    'Europe/Copenhagen',
    'Europe/Helsinki',
    'Europe/Warsaw',
    'Europe/Prague',
    'Europe/Budapest',
    'Europe/Bucharest',
    'Europe/Sofia',
    'Europe/Athens',
    'Europe/Istanbul',
    'Europe/Moscow',
    'Europe/Kiev',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Seoul',
    'Asia/Singapore',
    'Asia/Hong_Kong',
    'Asia/Bangkok',
    'Asia/Jakarta',
    'Asia/Manila',
    'Asia/Kolkata',
    'Asia/Dubai',
    'Asia/Tehran',
    'Asia/Jerusalem',
    'Asia/Riyadh',
    'Asia/Kuwait',
    'Asia/Qatar',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Perth',
    'Australia/Brisbane',
    'Australia/Adelaide',
    'Pacific/Auckland',
    'Pacific/Fiji',
    'Pacific/Guam',
    'Pacific/Honolulu',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'Africa/Nairobi',
    'Africa/Casablanca',
    'Africa/Algiers',
    'Africa/Tunis',
  ] as IANATimezone[]
}

export default function TimezoneSelect() {
  const $app = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTimezone, setSelectedTimezone] = useState<IANATimezone>('UTC')
  const [timezones] = useState<IANATimezone[]>(getAllTimezones())

  useSignalEffect(() => {
    setSelectedTimezone($app.config.timezone.value)
  })

  const clickOutsideListener = (event: MouseEvent) => {
    const target = event.target
    if (
      target instanceof HTMLElement &&
      !target.closest('.sx__timezone-select')
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideListener)
    return () => document.removeEventListener('click', clickOutsideListener)
  }, [])

  const handleTimezoneSelect = (timezone: IANATimezone) => {
    setIsOpen(false)
    $app.config.timezone.value = timezone
  }

  const handleSelectedTimezoneKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) {
      setIsOpen(!isOpen)
    }
  }

  const getTimezoneDisplayName = (timezone: IANATimezone): string => {
    try {
      const offset = getOffsetForTimezone(timezone)

      // Format offset as GMT+XX:XX or GMT-XX:XX
      let gmtOffset = 'GMT'
      if (offset === 'UTC') {
        gmtOffset = 'GMT'
      } else if (offset.startsWith('+')) {
        gmtOffset = `GMT${offset}`
      } else if (offset.startsWith('-')) {
        gmtOffset = `GMT${offset}`
      }

      return `${gmtOffset} ${$app.translate(timezone)}`
    } catch {
      return timezone
    }
  }

  const renderTimezoneDisplay = (timezone: IANATimezone) => {
    const displayText = getTimezoneDisplayName(timezone)
    const parts = displayText.split(' ')

    if (parts.length >= 2) {
      const offsetPart = parts[0]
      const timezoneName = parts.slice(1).join(' ')

      return (
        <>
          <span className="gmt-part">{offsetPart}</span>
          <span className="timezone-name">{timezoneName}</span>
        </>
      )
    }

    return displayText
  }

  return (
    <div className="sx__timezone-select">
      <div
        tabIndex={0}
        role="button"
        aria-label={$app.translate('Select Timezone')}
        className="sx__timezone-select-selected-item sx__ripple"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleSelectedTimezoneKeyDown}
      >
        {renderTimezoneDisplay(selectedTimezone)}
      </div>
      {isOpen && (
        <ul
          data-testid="timezone-select-items"
          className="sx__timezone-select-items"
        >
          {timezones.map((timezone) => (
            <li
              key={timezone}
              aria-label={
                $app.translate('Select Timezone') +
                ' ' +
                getTimezoneDisplayName(timezone)
              }
              tabIndex={-1}
              role="button"
              onClick={() => handleTimezoneSelect(timezone)}
              className={
                'sx__timezone-select-item' +
                (timezone === selectedTimezone ? ' is-selected' : '')
              }
            >
              {renderTimezoneDisplay(timezone)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
