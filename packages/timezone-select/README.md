![Schedule-X](https://schedule-x.s3.eu-west-1.amazonaws.com/schedule-x-logo.png)

# @schedule-x/timezone-select

A Schedule-X plugin for adding a timezone dropdown to the calendar header. The timezone select component will appear to the left of the view selection component when configured.

## Installation

```bash
npm install @schedule-x/timezone-select
```

## Usage

```typescript
import { createCalendar } from '@schedule-x/calendar'
import { createTimezoneSelectPlugin } from '@schedule-x/timezone-select'

const timezoneSelectPlugin = createTimezoneSelectPlugin()

const calendar = createCalendar({
  // ... other calendar options
  plugins: [
    timezoneSelectPlugin,
    // ... other plugins
  ],
})
```

## Features

- **Comprehensive timezone list**: Includes all major IANA timezones
- **Automatic timezone display**: Shows the current timezone abbreviation (e.g., "EST", "PST", "GMT")
- **Real-time updates**: When a new timezone is selected, it updates `$app.config.timezone.value`
- **Conditional rendering**: Only renders when the plugin is enabled
- **Accessible**: Full keyboard navigation and screen reader support
- **Responsive**: Works on both desktop and mobile devices

## API

### `createTimezoneSelectPlugin()`

Creates a new timezone select plugin instance.

### Plugin Methods

#### `setEnabled(enabled: boolean)`

Enable or disable the timezone select component.

```typescript
const timezoneSelectPlugin = createTimezoneSelectPlugin()

// Disable the timezone select
timezoneSelectPlugin.setEnabled(false)

// Enable the timezone select
timezoneSelectPlugin.setEnabled(true)
```

## Styling

The timezone select component uses CSS custom properties that match the Schedule-X theme system. You can customize the appearance by overriding the following CSS classes:

- `.sx__timezone-select` - Main container
- `.sx__timezone-select-selected-item` - The selected timezone display
- `.sx__timezone-select-items` - Dropdown container
- `.sx__timezone-select-item` - Individual timezone options

## Example

```typescript
import { createCalendar } from '@schedule-x/calendar'
import { createViewWeek } from '@schedule-x/calendar'
import { createTimezoneSelectPlugin } from '@schedule-x/timezone-select'

const viewWeek = createViewWeek()
const timezoneSelectPlugin = createTimezoneSelectPlugin()

const calendar = createCalendar({
  selectedDate: Temporal.PlainDate.from('2024-01-15'),
  views: [viewWeek],
  defaultView: viewWeek.name,
  plugins: [timezoneSelectPlugin],
  timezone: 'America/New_York',
})

calendar.render(document.getElementById('calendar'))
```

For more documentation, please refer to: https://schedule-x.dev/
