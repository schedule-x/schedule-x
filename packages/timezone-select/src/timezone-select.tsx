import { useContext, useEffect, useState, useRef } from 'preact/hooks'
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
  const [searchQuery, setSearchQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Small delay to ensure the dropdown is fully rendered
      const timer = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 10)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleTimezoneSelect = (timezone: IANATimezone) => {
    setIsOpen(false)
    setSearchQuery('')
    setFocusedIndex(-1)
    $app.config.timezone.value = timezone
  }

  const handleSelectedTimezoneKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (isKeyEnterOrSpace(keyboardEvent)) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setSearchQuery('')
        setFocusedIndex(-1)
      }
    }
  }

  const handleSearchInputKeyDown = (keyboardEvent: KeyboardEvent) => {
    const filteredTimezones = getFilteredTimezones()

    switch (keyboardEvent.key) {
      case 'ArrowDown':
        keyboardEvent.preventDefault()
        setFocusedIndex((prev) =>
          prev < filteredTimezones.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        keyboardEvent.preventDefault()
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredTimezones.length - 1
        )
        break
      case 'Enter':
        keyboardEvent.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < filteredTimezones.length) {
          handleTimezoneSelect(filteredTimezones[focusedIndex])
        }
        break
      case 'Escape':
        keyboardEvent.preventDefault()
        setIsOpen(false)
        setSearchQuery('')
        setFocusedIndex(-1)
        break
    }
  }

  const getFilteredTimezones = (): IANATimezone[] => {
    if (!searchQuery.trim()) {
      return timezones
    }

    const query = searchQuery.toLowerCase()
    return timezones.filter((timezone) => {
      const { name } = getTimezoneDisplayParts(timezone)
      return (
        name.toLowerCase().includes(query) ||
        timezone.toLowerCase().includes(query)
      )
    })
  }

  const getTimezoneDisplayParts = (
    timezone: IANATimezone
  ): { offset: string; name: string } => {
    try {
      const offset = getOffsetForTimezone(timezone)

      let gmtOffset = 'GMT'
      if (offset === 'UTC') {
        gmtOffset = 'GMT'
      } else if (offset.startsWith('+')) {
        gmtOffset = `GMT${offset}`
      } else if (offset.startsWith('-')) {
        gmtOffset = `GMT${offset}`
      }

      return {
        offset: gmtOffset,
        name: $app.translate(timezone),
      }
    } catch {
      return {
        offset: '',
        name: timezone,
      }
    }
  }

  const renderTimezoneDisplay = (timezone: IANATimezone) => {
    const { offset, name } = getTimezoneDisplayParts(timezone)

    return (
      <>
        <span className="gmt-part">{offset}</span>
        <span className="timezone-name">{name}</span>
      </>
    )
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
        <div className="sx__timezone-select-dropdown">
          <div className="sx__timezone-select-search">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={$app.translate('Search timezones...')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.currentTarget.value)
                setFocusedIndex(-1)
              }}
              onKeyDown={handleSearchInputKeyDown}
              className="sx__timezone-select-search-input"
            />
          </div>
          <ul
            data-testid="timezone-select-items"
            className="sx__timezone-select-items"
          >
            {getFilteredTimezones().map((timezone, index) => (
              <li
                key={timezone}
                aria-label={
                  $app.translate('Select Timezone') +
                  ' ' +
                  (() => {
                    const { offset, name } = getTimezoneDisplayParts(timezone)
                    return `${offset} ${name}`
                  })()
                }
                tabIndex={-1}
                role="button"
                onClick={() => handleTimezoneSelect(timezone)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={
                  'sx__timezone-select-item' +
                  (timezone === selectedTimezone ? ' is-selected' : '') +
                  (index === focusedIndex ? ' is-focused' : '')
                }
              >
                {renderTimezoneDisplay(timezone)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
