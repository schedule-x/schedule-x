![Schedule-X](https://schedule-x.s3.eu-west-1.amazonaws.com/schedule-x-logo.png)

# @schedule-x/date-picker

A demo can be found at: https://schedule-x.dev/demos/date-picker

## Install

```bash copy
npm install @schedule-x/date-picker @schedule-x/theme-default
```

## Setup

```js copy
import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const datePicker = createDatePicker({
  listeners: {
    onChange: (date) => {
      console.log('date changed', date)
    },
  },
})
datePicker.render(document.getElementById('date-picker'))
```

First, we create a date picker instance with the `createDatePicker` function. This function takes a configuration
object as its only argument. With the `onChange` listener, this sets us up to react to the selection of a date.
Finally, the `render` method is called, rendering the date picker into the element specified as the single argument.

## Methods and properties

### `value` (string property)

The `value` property is used to get or set the selected date. It needs to have the format `YYYY-MM-DD`.

### `disabled` (boolean property)

The `disabled` property is used to get or set the disabled state of the date picker.

### `setTheme(theme: 'light' | 'dark')`

The `setTheme` method is used to set the theme of the date picker

### `getTheme(): 'light' | 'dark'`

The `getTheme` method is used to get the current theme of the date picker

## Configuration

Below is an example of how to configure the date picker, containing all the currently available options.

```js copy
import { createDatePicker } from '@schedule-x/date-picker'
import '@schedule-x/theme-default/dist/date-picker.css'

const config = {
  /**
   * Set the language. Currently supports: 'en-US', 'en-GB', 'de-DE', 'zh-CN' and 'sv-SE'
   * For support of further languages, please open a PR, adding your translations under the folder:
   * packages/translations/src/locales/xx-XX
   *
   * Defaults to 'en-US'
   * */
  locale: 'zh-CN',

  /**
   * Set which day is to be considered the starting day of the week. 0 = Sunday, 1 = Monday, (...other days) 6 = Saturday
   * Defaults to 1 (Monday)
   * */
  firstDayOfWeek: 0,

  /**
   * The default date to display when the calendar is first rendered. Only accepts YYYY-MM-DD format.
   * Defaults to the current date
   * */
  selectedDate: '2023-12-24',

  /**
   * The label to display in the input field when no date has been selected.
   */
  label: 'Select a date',

  /**
   * The name of the date picker input field
   */
  name: 'date-picker',

  /**
   * An HTML element to which the date picker popup will be appended when opened.
   * */
  teleportTo: document.body,

  /**
   * The placement of the date picker popup in relation to the input field
   * Available values: 'top-start', 'top-end', 'bottom-start', 'bottom-end'
   * Defaults to 'bottom-start'
   * */
  placement: 'bottom-end',

  /**
   * The minimum date that a user can select. Only accepts YYYY-MM-DD format.
   * Defaults to 1970-01-01
   * */
  min: '2020-01-01',

  /**
   * The maximum date that a user can select. Only accepts YYYY-MM-DD format.
   * Defaults to December 31st of the year following the current year
   */
  max: '2025-01-01',

  style: {
    /**
     * Render the date picker in dark mode.
     * Defaults to false
     */
    isDark: true,

    /**
     * Set the width of the date picker wrapper to 100%. Particularly useful for small screens.
     * Defaults to false
     */
    fullWidth: true,
  },

  listeners: {
    /**
     * Callback function that is called when the user selects a date.
     * @param {string} date - The date that the user selected, in YYYY-MM-DD format
     */
    onChange: (date) => {
      console.log('date changed', date)
    },

    /**
     * Called when the user presses the escape key while the date picker popup is open.
     * */
    onEscapeKeyDown: ($app) => {
      // 1. do something else first and then...
      $app.timePickerState.isOpen.value = false // 2. close the popup
    },
  },
}

const datePicker = createDatePicker(config)
datePicker.render(document.getElementById('date-picker'))
```
