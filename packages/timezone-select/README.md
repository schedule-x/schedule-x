![Schedule-X](https://raw.githubusercontent.com/schedule-x/schedule-x/main/website/public/images/brand/schedule-x-logo-light.png)

# @schedule-x/timezone-select

A Schedule-X plugin for adding a timezone dropdown to the calendar header. The timezone select component will appear to the left of the view selection component when configured.

## Installation

```bash
npm install @schedule-x/timezone-select
```

## Usage

```tsx
// other imports
import { createTimezoneSelectPlugin, translations as timezoneTranslations } from '@schedule-x/timezone-select'
import { translations, mergeLocales } from '@schedule-x/translations'
import '@schedule-x/timezone-select/index.css'

const calendar = createCalendar({
  /* other configuration */

  plugins: [
    createTimezoneSelectPlugin()
  ],

  translations: mergeLocales(
    translations,
    timezoneTranslations,
  ),
})
```
