import { useEffect, useState, useRef } from 'preact/hooks'
import {
  IANA_TIMEZONES,
  IANATimezone,
} from '@schedule-x/shared/src/utils/stateless/time/tzdb'
import { getOffsetForTimezone } from '@schedule-x/shared/src/utils/stateless/time/get-offset-for-timezone'
import { isKeyEnterOrSpace } from '@schedule-x/shared/src/utils/stateless/dom/events'
import { CalendarAppSingleton } from '@schedule-x/shared/src'
import chevronIcon from '@schedule-x/shared/src/assets/chevron-input.svg'

export default function TimezoneSelect({
  $app,
}: {
  $app: CalendarAppSingleton
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [timezones] = useState<IANATimezone[]>(() => {
    // Create a temporary map of timezone names to offset minutes for efficient sorting
    const timezoneOffsetMap = new Map<IANATimezone, number>()
    
    const parseOffsetToMinutes = (offset: string): number => {
      if (offset === 'UTC') return 0
      
      const sign = offset.startsWith('+') ? 1 : -1
      const timePart = offset.replace(/^[+-]/, '')
      const [hours, minutes] = timePart.split(':').map(Number)
      
      return sign * (hours * 60 + (minutes || 0))
    }
    
    IANA_TIMEZONES.forEach(timezone => {
      try {
        const offset = getOffsetForTimezone(timezone)
        const minutes = parseOffsetToMinutes(offset)
        timezoneOffsetMap.set(timezone, minutes)
      } catch {
        // If there's an error getting offset, use 0 as fallback
        timezoneOffsetMap.set(timezone, 0)
      }
    })
    
    return [...IANA_TIMEZONES].sort((a, b) => {
      const offsetA = timezoneOffsetMap.get(a) ?? 0
      const offsetB = timezoneOffsetMap.get(b) ?? 0
      return offsetA - offsetB
    })
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)

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
    Object.values($app.config.plugins).forEach((plugin) => {
      if (typeof plugin?.onTimezoneChange === 'function') {
        plugin.onTimezoneChange(timezone)
      }
    })
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
    <div className={`sx__timezone-select ${isOpen ? 'is-open' : ''}`}>
      <div
        tabIndex={0}
        role="button"
        aria-label={$app.translate('Select Timezone')}
        className="sx__timezone-select-selected-item sx__ripple"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleSelectedTimezoneKeyDown}
      >
        {renderTimezoneDisplay($app.config.timezone.value)}
        <img className="sx__timezone-select-chevron" src={chevronIcon} alt="" />
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
                  (timezone === $app.config.timezone.value
                    ? ' is-selected'
                    : '') +
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
