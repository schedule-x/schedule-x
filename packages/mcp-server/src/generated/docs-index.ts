import type { DocsIndex } from '../types.js'

export const docsIndex: DocsIndex = {
  docsVersion: '4.6.0',
  docsBaseUrl: 'https://schedule-x.dev',
  docs: [
    {
      id: 'ai-mcp',
      title: 'MCP server',
      description:
        'Use the Schedule-X MCP server in coding agents and AI coding tools.',
      url: 'https://schedule-x.dev/docs/ai/mcp',
      sourcePath: 'website/app/docs/ai/mcp/page.mdx',
      section: 'ai',
      headings: ['MCP server', 'Install', 'Tools'],
      codeBlocks: [
        {
          language: 'json',
          content:
            '{\n  "mcpServers": {\n    "schedule-x": {\n      "command": "npx",\n      "args": ["-y", "@schedule-x/mcp"]\n    }\n  }\n}',
        },
      ],
      content:
        'MCP server The Schedule-X MCP server gives AI coding tools access to a generated snapshot of the Schedule-X docs, plugin guidance, starter code and basic validation tools. Install Use the server through npx in any MCP client that supports local stdio servers: Tools Tool Purpose ---------------------------- ---------------------------------------------------------------- search docs Search the generated Schedule-X docs index. get doc Read one docs entry by id. list plugins List known plugins, package names, docs URLs and premium flags. get plugin setup Get install and docs guidance for one plugin. get starter Generate starter install commands and code. validate event Check event objects for common Schedule-X mistakes. validate calendar config Check calendar config objects for common setup mistakes. explain temporal usage Explain when to use Temporal.PlainDate or Temporal.ZonedDateTime .',
    },
    {
      id: 'calendar',
      title: 'Calendar - getting started',
      description:
        'Learn how to install and start using the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar',
      sourcePath: 'website/app/docs/calendar/page.mdx',
      section: 'calendar',
      headings: [
        'Getting Started',
        'Coding with AI',
        '1. Install',
        '2. Setup',
        'Configuration object',
        'Style & theme',
        'Usage over CDN',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm i @schedule-x/calendar @schedule-x/theme-default temporal-polyfill',
        },
        {
          language: 'ts',
          content:
            "import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar'\nimport '@schedule-x/theme-default/dist/index.css'\nimport 'temporal-polyfill/global'\n\nconst calendar = createCalendar({\n  views: [createViewMonthGrid()],\n  events: [\n    {\n      id: 1,\n      title: 'Coffee with John',\n      start: Temporal.ZonedDateTime.from('2023-12-04T10:05:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2023-12-04T10:35:00+01:00[Europe/Berlin]'),\n    },\n  ],\n})\n\ncalendar.render(document.getElementById('calendar'))",
        },
        {
          language: 'css',
          content:
            '#calendar {\n  width: 100%;\n  height: 800px;\n  max-height: 90vh;\n}',
        },
        {
          language: 'ts',
          content:
            "const calendar = createCalendar(/***/)\n\ncalendar.setTheme('dark')\n// or\ncalendar.setTheme('light')",
        },
        {
          language: 'html',
          content:
            '<!doctype html>\n<html class="no-js" lang="">\n\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n\n  <!-- Do not change the order of these dependencies, since some of them depend on others -->\n  <script src="https://cdn.jsdelivr.net/npm/preact@10.23.2/dist/preact.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/preact@10.23.2/hooks/dist/hooks.umd.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/@preact/signals-core@1.8.0/dist/signals-core.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/@preact/signals@1.3.0/dist/signals.min.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/preact@10.23.2/jsx-runtime/dist/jsxRuntime.umd.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/preact@10.23.2/compat/dist/compat.umd.js"></script>\n\n  <script src="https://cdn.jsdelivr.net/npm/@schedule-x/calendar@2.2.0/dist/core.umd.js"></script>\n  <script src="https://cdn.jsdelivr.net/npm/@schedule-x/drag-and-drop@2.2.0/dist/core.umd.js"></script>\n\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@schedule-x/theme-default@2.2.0/dist/index.css">\n</head>\n\n<body>\n  <div class="calendar"></div>\n\n  <script type="module">\n    const { createCalendar, viewWeek } = window.SXCalendar;\n    const { createDragAndDropPlugin } = window.SXDragAndDrop;\n\n    const plugins = [\n      createDragAndDropPlugin(),\n    ]\n\n    const calendar = createCalendar({\n      views: [viewWeek],\n      events: [\n        {\n          id: \'1\',\n          title: \'Event 1\',\n          start: \'2024-08-23 09:00\',\n          end: \'2024-08-23 10:00\'\n        },\n      ],\n      plugins,\n    })\n\n    calendar.render(document.querySelector(\'.calendar\'))\n  </script>\n</body>\n\n</html>',
        },
      ],
      content:
        "Getting Started If you are using any of the following frameworks, you can start by checking out their respective setup guides: Coding with AI If you use an AI coding agent, you can connect it to the Schedule-X MCP server. This lets your agent search the docs, generate starter code and validate common Schedule-X setup details without you having to manually rummage through every page made for humans. 1. Install We will start by downloading the calendar and its theme. Curious about the temporal-polyfill package? Read more here. 2. Setup After downloading and importing our dependencies, we can create an instance of the calendar using the createCalendar function. This function takes two arguments: 1) The configuration object 2) An array of plugins Here we will start by only adding the config. The calendar is then rendered using the render method. Configuration object As a bare minimum, the configuration object needs two things: 1. A list of views. Currently available views are month grid , week , day and month agenda . 2. A list of events. Style & theme CSS of wrapping element You will need to decide on the styles of the element wrapping the calendar. This will depend on your use case. For many use cases, something like this should suffice: Theme The calendar renders to light mode by default. If you want, you can either override this default through configuration, or set the theme programmatically: Usage over CDN For testing purposes, or if you're in a setup that predates modern build tools, you can use the calendar over a CDN like this:",
    },
    {
      id: 'calendar-advanced-background-events',
      title: 'Background events',
      description: 'Learn how to use background events in Schedule-X',
      url: 'https://schedule-x.dev/docs/calendar/advanced/background-events',
      sourcePath:
        'website/app/docs/calendar/advanced/background-events/page.mdx',
      section: 'calendar',
      headings: [
        'Background events',
        'API',
        'BackgroundEvent API',
        'Update background events',
      ],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import { createCalendar, createViewWeek } from '@schedule-x/calendar'\n\nconst calendar = createCalendar({\n  // ... other config\n  backgroundEvents: [\n\n    // full day event\n    {\n      title: 'Out of office',\n      start: Temporal.PlainDate.from('2024-09-03'),\n      end: Temporal.PlainDate.from('2024-09-03'),\n      style: {\n        // create tilted 5px thick gray lines\n        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',\n        opacity: 0.5,\n      },\n    },\n\n    // timed event\n    {\n      title: 'Out of office',\n      start: Temporal.ZonedDateTime.from('2024-09-02T00:00:00+02:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-09-02T02:00:00+02:00[Europe/Berlin]'),\n      style: {\n        background: 'linear-gradient(45deg, #f91c45, #1c7df9)',\n        opacity: 0.5,\n      },\n    },\n\n    // multi-day event\n    {\n      title: 'Holiday',\n      start: Temporal.PlainDate.from('2024-09-05'),\n      end: Temporal.PlainDate.from('2024-09-07'),\n      style: {\n        backgroundImage: 'repeating-linear-gradient(45deg, #1cf9b0, #1cf9b0 5px, transparent 5px, transparent 10px)',\n        opacity: 0.5,\n      },\n    }\n  ],\n})",
        },
        {
          language: 'ts',
          content:
            'export type BackgroundEvent = {\n  start: Temporal.PlainDate | Temporal.ZonedDateTime\n  end: Temporal.PlainDate | Temporal.ZonedDateTime\n  style: CSSProperties\n  title?: string\n  rrule?: string\n  exdate?: string[]\n}',
        },
      ],
      content:
        "Background events Additional to the regular calendar events, you can also add background events. These are meant to be used for displaying things such as out-of-office hours, public holidays or other events that your users won't interact with or have the possibility to change. You can then style these background events to your taste via a style property, and add a title which will be added as a title-property to the HTML element for the background event (thus creating a tooltip). API BackgroundEvent API For docs on how to use rrule and exdate , please see the event recurrence documentation. Update background events See the events service plugin for how to update background events.",
    },
    {
      id: 'calendar-advanced-custom-views',
      title: 'Custom calendar views',
      description:
        'Learn how to build custom views for the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/advanced/custom-views',
      sourcePath: 'website/app/docs/calendar/advanced/custom-views/page.mdx',
      section: 'calendar',
      headings: ['Custom views', 'Building a custom view with Preact'],
      codeBlocks: [],
      content:
        'Custom views The Schedule-X calendar can be extended endlessly. You are not limited to using the default views offered by this library; you can create your own views and plug them into the calendar. Currently, you can only build a custom view using Preact, the virtual DOM library used by Schedule-X, but the ambition is to extend this to enable building custom views in React and Vue. Building a custom view with Preact The easiest way to get started building a custom view is to clone the extension builder repo.',
    },
    {
      id: 'calendar-calendars',
      title: 'Calendar configuration - calendars option',
      description:
        'Learn how to configure the Schedule-X calendar to use multiple calendars',
      url: 'https://schedule-x.dev/docs/calendar/calendars',
      sourcePath: 'website/app/docs/calendar/calendars/page.mdx',
      section: 'calendar',
      headings: ['Calendars', 'Configuration', 'Example'],
      codeBlocks: [
        {
          language: 'js',
          content:
            "const config = {\n  // ... other configuration\n  calendars: {\n    personal: {\n      colorName: 'personal',\n      lightColors: {\n        main: '#f9d71c',\n        container: '#fff5aa',\n        onContainer: '#594800',\n      },\n      darkColors: {\n        main: '#fff5c0',\n        onContainer: '#fff5de',\n        container: '#a29742',\n      },\n    },\n    work: {\n      colorName: 'work',\n      lightColors: {\n        main: '#f91c45',\n        container: '#ffd2dc',\n        onContainer: '#59000d',\n      },\n      darkColors: {\n        main: '#ffc0cc',\n        onContainer: '#ffdee6',\n        container: '#a24258',\n      },\n    },\n    leisure: {\n      colorName: 'leisure',\n      lightColors: {\n        main: '#1cf9b0',\n        container: '#dafff0',\n        onContainer: '#004d3d',\n      },\n      darkColors: {\n        main: '#c0fff5',\n        onContainer: '#e6fff5',\n        container: '#42a297',\n      },\n    },\n    school: {\n      colorName: 'school',\n      lightColors: {\n        main: '#1c7df9',\n        container: '#d2e7ff',\n        onContainer: '#002859',\n      },\n      darkColors: {\n        main: '#c0dfff',\n        onContainer: '#dee6ff',\n        container: '#426aa2',\n      },\n    },\n  },\n  events: [\n    // ... other events\n    {\n      title: \"Meeting with Mr. boss\",\n      start: Temporal.ZonedDateTime.from('2024-01-05T05:15:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-01-05T06:00:00+01:00[Europe/Berlin]'),\n      id: \"98d85d98541f\",\n      calendarId: \"work\"\n    }, {\n      title: \"Sipping Aperol Spritz on the beach\",\n      start: Temporal.ZonedDateTime.from('2024-01-05T12:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-01-05T15:20:00+01:00[Europe/Berlin]'),\n      id: \"0d13aae3b8a1\",\n      calendarId: \"leisure\"\n    },\n  ]\n}",
        },
      ],
      content:
        'Calendars The events of a single calendar can be sorted into different categories, called calendars. Configuration Each calendar needs a name, which is then referenced as calendarId in the events. The name can be freely chosen, as long as it can be used a JavaScript object key as in the example below, where we have the calendars personal , work , leisure and school . The value of colorName can only contain lower key characters, since this will internally be used as part of a custom CSS property. You do not need to define colors for dark- and light mode unless you use them both. Example',
    },
    {
      id: 'calendar-configuration',
      title: 'Calendar configuration',
      description: 'Learn how to configure the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/configuration',
      sourcePath: 'website/app/docs/calendar/configuration/page.mdx',
      section: 'calendar',
      headings: ['Calendar configuration', 'Options in the calendar config'],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import { createCalendar, viewMonthGrid } from '@schedule-x/calendar'\nimport '@schedule-x/theme-default/dist/index.css'\n\nconst config = {\n  // ... views, events and other options\n\n  /**\n   * Set the language. List of supported languages: https://schedule-x.dev/docs/calendar/language\n   * For support of further languages, please open a PR, adding your translations under the folder:\n   * packages/translations/src/locales/xx-XX\n   *\n   * Defaults to 'en-US'\n   * */\n  locale: 'zh-CN',\n\n  /**\n   * Set the timezone.\n   * Defaults to 'UTC'\n   * */\n  timezone: 'Asia/Tokyo',\n\n  /**\n   * Set which day is to be considered the starting day of the week.\n   * Follows Temporal API for Gregorian calendar: 1 = Monday, 2 = Tuesday, (...other days) 7 = Sunday\n   * Defaults to 1 (Monday)\n   * */\n  firstDayOfWeek: 7, // 7 = Sunday\n\n  /**\n   * The preferred view to display when the calendar is first rendered.\n   * all views that you import have a \"name\" property, which helps you identify them.\n   * Defaults to the first view in the \"views\" array\n   * */\n  defaultView: viewMonthGrid.name,\n\n  /**\n   * The default date to display when the calendar is first rendered. Only accepts Temporal.PlainDate format.\n   * Defaults to the current date\n   * */\n  selectedDate: Temporal.PlainDate.from('2023-12-24'),\n\n  /**\n   * Render the calendar in dark mode.\n   * Defaults to false\n   * */\n  isDark: true,\n\n  /**\n   * Decides which hours should be displayed in the week and day grids.\n   * Both start and end must be whole hours in the format HH:00 (e.g. 06:00, 18:00).\n   * Half-hours such as 08:30 are not supported.\n   * Defaults to midnight - midnight (a full day)\n   * Can also be set to a \"hybrid\" day, such as { start: '06:00', end: '03:00' }, meaning each day starts at 6am but\n   * extends into the next day until 3am.\n   * */\n  dayBoundaries: {\n    start: '06:00',\n    end: '18:00',\n  },\n\n  /**\n   * The minimum and maximum date that can be displayed\n   * */\n  minDate: Temporal.PlainDate.from('2024-01-01'),\n  maxDate: Temporal.PlainDate.from('2024-12-31'),\n\n  weekOptions: {\n    /**\n     * The total height in px of the week grid (week- and day views)\n     * */\n    gridHeight: 2500,\n\n    /**\n     * The number of days to display in week view\n     */\n    nDays: 5,\n\n    /**\n     * The width in percentage of the event element in the week grid\n     * Defaults to 100, but can be used to leave a small margin to the right of the event\n     */\n    eventWidth: 95,\n\n    /**\n     * Intl.DateTimeFormatOptions used to format the hour labels on the time axis\n     * Default: { hour: 'numeric' }\n     */\n    timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },\n\n    /**\n     * Determines whether concurrent events can overlap.\n     * Defaults to true. Set to false to disable overlapping.\n     */\n    eventOverlap: true,\n\n    /**\n     * The granularity of the time grid in minutes for week and day views.\n     * Can be 180 (every three hours), 120 (every two hours), 60 (hourly), 30 (half-hourly), or 15 (quarter-hourly).\n     * When set to 30 or 15, the timeAxisFormatOptions will automatically include minutes.\n     * Defaults to 60\n     */\n    gridStep: 30,\n  },\n\n  monthGridOptions: {\n    /**\n     * Number of events to display in a day cell before the \"+ N events\" button is shown\n     * */\n    nEventsPerDay: 8,\n  },\n\n  /**\n    * Display week numbers. Not 100% according to ISO 8601, which considers a week to start on Monday and end on Sunday.\n    * Since Schedule-X enables you to configure the first day of the week, the week numbers are calculated based on that.\n    * */\n  showWeekNumbers: true,\n\n  /**\n   * Toggle automatic view change when the calendar is resized below a certain width breakpoint.\n   * Defaults to true\n   * */\n  isResponsive: false,\n\n  /**\n   * Disable the sliding transition animation when navigating between dates.\n   * Defaults to false\n   * */\n  skipAnimations: true,\n\n  /**\n   * Skip validating events when initializing the calendar. This can help you gain a bit of performance if you are loading a lot of events,\n   * and you are sure that the events are valid.\n   * */\n  skipValidation: true,\n\n  /**\n   * Callbacks for events that occur in the calendar\n   * */\n  callbacks: {\n    /**\n     * Is called when:\n     * 1. Selecting a date in the date picker\n     * 2. Selecting a new view\n     * */\n    onRangeUpdate(range) {\n      console.log('new calendar range start date', range.start)\n      console.log('new calendar range end date', range.end)\n    },\n\n    /**\n     * Fetch events for the given date range.\n     * This callback is called every time onRangeUpdate runs, and also once on render.\n     * The returned events will be converted to internal events and set as $app.calendarEvents.list.value\n     * */\n    async fetchEvents(range) {\n      const events = await fetch(`/api/events?start=${range.start}&end=${range.end}`)\n        .then((res) => res.json())\n      return events\n    },\n\n    /**\n     * Is called when an event is updated through drag and drop, resizing or the interactive event modal\n     * */\n    onEventUpdate(updatedEvent) {\n      console.log('onEventUpdate', updatedEvent)\n    },\n\n    /**\n      * Is called before an event is updated by drag & drop or resizing.\n      * If you return false, the update will be aborted,\n      * and the event will be reset to its original position.\n      * If you return true, the event will be updated.\n      * */\n    onBeforeEventUpdate(oldEvent, newEvent, $app) {\n      // run your validation or side effects\n      return false\n    },\n\n    // See docs for \"onBeforeEventUpdate\"\n    async onBeforeEventUpdateAsync(oldEvent, newEvent, $app) {\n      // run some async validation, like fetching data from an API and then validating\n      return false\n    },\n\n    /**\n     * Is called when an event is clicked\n     * */\n    onEventClick(calendarEvent, e: UIEvent) {\n      console.log('onEventClick', calendarEvent)\n    },\n\n    /**\n     * Is called when an event is double clicked\n     * */\n    onDoubleClickEvent(calendarEvent, e: UIEvent) {\n      console.log('onDoubleClickEvent', calendarEvent)\n    },\n\n    /**\n     * Is called when clicking a date in the month grid\n     * */\n    onClickDate(date: Temporal.PlainDate, e?: UIEvent) {\n      console.log('onClickDate', date) // e.g. 2024-01-01\n    },\n\n    /**\n     * Is called when clicking somewhere in the time grid of a week or day view\n     * */\n    onClickDateTime(dateTime: Temporal.ZonedDateTime, e?: UIEvent) {\n      console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37\n    },\n\n    /**\n     * Is called when selecting a day in the month agenda\n     * */\n    onClickAgendaDate(date: Temporal.PlainDate, e?: UIEvent) {\n      console.log('onClickAgendaDate', date) // e.g. 2024-01-01\n    },\n\n    /**\n     * Is called when double-clicking a day in the month agenda\n     * */\n    onDoubleClickAgendaDate(date: Temporal.PlainDate, e?: UIEvent) {\n      console.log('onDoubleClickAgendaDate', date) // e.g. 2024-01-01\n    },\n\n    /**\n     * Is called when double-clicking a date in the month grid\n     * */\n    onDoubleClickDate(date: Temporal.PlainDate, e?: UIEvent) {\n      console.log('onClickDate', date) // e.g. 2024-01-01\n    },\n\n    /**\n     * Is called when double-clicking somewhere in the time grid of a week or day view\n     * */\n    onDoubleClickDateTime(dateTime: Temporal.ZonedDateTime, e?: UIEvent) {\n      console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37\n    },\n\n    /**\n     * Is called when clicking the \"+ N events\" button of a month grid-day\n     * */\n    onClickPlusEvents(date: Temporal.PlainDate, e?: UIEvent) {\n      console.log('onClickPlusEvents', date) // e.g. 2024-01-01\n    },\n\n    /**\n     * Is called when the selected date is updated\n     * */\n    onSelectedDateUpdate(date: Temporal.PlainDate) {\n      console.log('onSelectedDateUpdate', date)\n    },\n\n    /**\n     * Runs on resizing the calendar, to decide if the calendar should be small or not.\n     * This in turn affects what views are rendered.\n     * */\n    isCalendarSmall($app) {\n      return $app.elements.calendarWrapper?.clientWidth! < 500\n    },\n\n    /**\n     * Runs before the calendar is rendered\n     * */\n    beforeRender($app) {\n      const range = $app.calendarState.range.value\n      fetchYourEventsFor(range.start, range.end)\n    },\n\n    /**\n     * Runs after the calendar is rendered\n     * */\n    onRender($app) {\n      console.log('onRender', $app)\n    },\n  },\n}\n\nconst calendar = createCalendar(config)\n\ncalendar.render(document.getElementById('calendar'))",
        },
      ],
      content:
        'Calendar configuration This page describes a few of the config-options available. Some options, however, require more in-depth understanding and are therefore documented in separate pages. Options in the calendar config',
    },
    {
      id: 'calendar-custom-components',
      title: 'Visual overview of custom components',
      url: 'https://schedule-x.dev/docs/calendar/custom-components',
      sourcePath: 'website/app/docs/calendar/custom-components/page.mdx',
      section: 'calendar',
      headings: [
        'Visual overview of custom components',
        'Custom components',
        'Week- and day views',
        'Month grid view',
        'Month agenda view',
      ],
      codeBlocks: [],
      content:
        'Visual overview of custom components Below follow a few images, to help visualize the parts of a calendar that can be replaced by custom components. Please note that only the React, Vue and Svelte adapters will at all times have 100% support for all custom components. This is due to the way custom components are implemented. While in Vue, React and Svelte custom components can be passed 100% dynamically, the Angular components require a bit of hard-coding for every new custom component. If you are missing some custom component in Angular, please open an issue or PR. Custom components Week- and day views Month grid view Month agenda view',
    },
    {
      id: 'calendar-events',
      title: 'Calendar events',
      description: 'Learn how events work in the Schedule-X calendar.',
      url: 'https://schedule-x.dev/docs/calendar/events',
      sourcePath: 'website/app/docs/calendar/events/page.mdx',
      section: 'calendar',
      headings: [
        'Events',
        'Properties',
        'Other properties',
        'Event time',
        '_options',
        'Updating events',
        'Example',
      ],
      codeBlocks: [
        {
          language: 'js',
          content:
            "const timedEvent = {\n  id: 1,\n  start: Temporal.ZonedDateTime.from('2025-10-01T20:15:00+02:00[Europe/Berlin]'),\n  end: Temporal.ZonedDateTime.from('2025-10-01T21:15:00+02:00[Europe/Berlin]'),\n}",
        },
        {
          language: 'js',
          content:
            "const fullDayEvent = {\n  id: 2,\n  start: Temporal.PlainDate.from('2025-10-01'),\n  end: Temporal.PlainDate.from('2025-10-01'),\n}",
        },
        {
          language: 'ts',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport '@schedule-x/theme-default/dist/index.css'\n\nconst calendar = createCalendar({\n  // ... other config\n  events: [\n    {\n      id: 1,\n      title: 'Coffee with John',\n      start: Temporal.ZonedDateTime.from('2023-11-04T10:05:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2023-11-04T10:35:00+01:00[Europe/Berlin]'),\n    },\n    {\n      id: 2,\n      title: 'Ski trip',\n      start: Temporal.PlainDate.from('2023-12-04'),\n      end: Temporal.PlainDate.from('2023-12-06'),\n    },\n  ],\n})\n\ncalendar.render(document.getElementById('calendar'))",
        },
      ],
      content:
        'Events Properties Property Type Description Required ------------------------------ ----------------------------------------------------------- ------------------------------------------------------------ ---------- id string or number A unique identifier for the event. Yes start Temporal.PlainDate or Temporal.ZonedDateTime The start time of the event. Yes end Temporal.PlainDate or Temporal.ZonedDateTime The end time of the event. Yes title string The title of the event. No description string A description of the event. No location string The location of the event. No people string[] Names of the participants No calendarId string id of the calendar. See "calendars" section No options See " options" section Configuration for the event. No customContent.timeGrid string Custom HTML to display in the time grid of week/day views. No customContent.dateGrid string Custom HTML to display in the date grid of week/day views. No customContent.monthGrid string Custom HTML to display in the month view. No customContent.monthAgenda string Custom HTML to display in the month agenda view. No Other properties Since you may want to add additional properties to your events, that carry meaning in the business logic of your application, you are free to do so. The calendar will simply ignore the existence of them and return them back to you upon interacting with the events. Event time The timestamps of an event can have two different formats: Temporal.PlainDate or Temporal.ZonedDateTime . These cannot be mixed within the same event. For example: 1. Timed events - Events that have a start and end time such as: 2. Full day events - Events that span the entire day such as: Both of these types have the possibility to be either a single day event or a multi day event . If you want some examples for how to convert different date and time formats to Temporal, see the Temporal section. options Configure the behavior of individual events by adding an options object to the event. All the following properties are optional: Property Type Description Default ------------------- ------------ ----------------------------------------- ------------- disableDND boolean Disables drag and drop for the event. undefined disableResize boolean Disables resizing for the event. undefined additionalClasses string[] Additional classes to add to the event. undefined Updating events If you want to get, update or remove events after rendering the calendar, you need to use the events service plugin. Example',
    },
    {
      id: 'calendar-installing-premium',
      title: 'Installing premium plugins',
      description:
        'Learn how to install premium plugins for the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/installing-premium',
      sourcePath: 'website/app/docs/calendar/installing-premium/page.mdx',
      section: 'calendar',
      headings: [
        'Installing',
        '1. `.npmrc`',
        '2. Install the packages you need',
        'Quick links',
      ],
      codeBlocks: [
        {
          language: 'text',
          content:
            '@sx-premium:registry=https://gitlab.schedule-x.com/api/v4/packages/npm/\n//gitlab.schedule-x.com/api/v4/packages/npm/:_authToken=${SX_PREMIUM_TOKEN}',
        },
        {
          language: 'bash',
          content: 'npm i @sx-premium/interactive-event-modal',
        },
      ],
      content:
        'Installing Upon purchasing a premium subscription you will receive an authentication token. This you will need for the following steps. 1. .npmrc In order to download the premium packages you need to add an .npmrc file or edit your existing one. Exchange $ with your actual token. This can also be done via environment variables. 2. Install the packages you need Quick links',
    },
    {
      id: 'calendar-language',
      title: 'Language',
      description:
        'Learn which languages are supported by the Schedule-X calendar, and how to customize translations',
      url: 'https://schedule-x.dev/docs/calendar/language',
      sourcePath: 'website/app/docs/calendar/language/page.mdx',
      section: 'calendar',
      headings: [
        'Language',
        'Supported languages for calendar',
        'Customizing the translations',
        'Direction',
      ],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import { translations, mergeLocales } from '@schedule-x/translations'\n\nconst calendar = createCalendar({\n  translations: mergeLocales(\n    translations,\n    {\n      enUS: {\n        'Week': '4 days'\n      }\n    }\n  ),\n  // ... other config options\n})",
        },
      ],
      content:
        'Language Supported languages for calendar Schedule-X currently supports the following languages. For support of further languages, please open a PR, adding your translations under the folder: packages/translations/src/locales/xx-XX Language Code -------------------------- ------------ Arabic (Egypt) ar-EG Catalan ca-ES Chinese (China) zh-CN Chinese (Taiwan) zh-TW Croatian hr-HR Czech cs-CZ Danish da-DK Dutch nl-NL English (UK) en-GB English (US) en-US Estonian et-EE Finnish fi-FI French fr-FR French (Switzerland) fr-CH German de-DE Hebrew he-IL Bahasa (ID) id-ID Italian it-IT Japanese ja-JP Korean ko-KR Kyrgyz ky-KG Lithuanian lt-LT Macedonian mk-MK Norwegian (Bokmål) nb-NO Persian fa-IR Polish pl-PL Portuguese (BR) pt-BR Romanian ro-RO Russian ru-RU Serbian (Latin alphabet) sr-Latn-RS Serbian (Cyrillic) sr-RS Slovak sk-SK Slovenian sl-SI Spanish es-ES Swedish sv-SE Turkish tr-TR Ukrainian uk-UA Customizing the translations To customize translations, you can use the mergeLocales helper to merge the original translations with your custom translations. This way, you can override the default translations with your own. Below is an example of how to customize the Week translation for the en-US locale, which could be useful if you configure the number of days shown in a week. Direction Schedule-X supports both LTR and RTL languages. You do not need to configure this explicitly; Schedule-X just looks at the dir attribute of the html element on your page.',
    },
    {
      id: 'calendar-major-version-migrations',
      title: 'Migrating between major versions',
      description:
        'Learn how to migrate between major versions of the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/major-version-migrations',
      sourcePath: 'website/app/docs/calendar/major-version-migrations/page.mdx',
      section: 'calendar',
      headings: [
        'Migrating between major versions',
        'Migration from v3 to v4',
        'Premium v13 to v14',
        'Migration from v2 to v3',
        'Migration from @sx-premium v2 to v3',
        'Breaking changes in the interactive event modal',
        'Migration guide for v2',
        'Migrating with custom plugins',
        'Breaking changes in the UI',
        'Premium plugins',
        '`@schedule-x/react`',
      ],
      codeBlocks: [
        {
          language: 'ts',
          content:
            'const modal = createInteractiveEventModal({\n  fields: {\n    rruleFrequency: {},\n    rruleUntil: {}\n  }\n\n  // other config\n})',
        },
        {
          language: 'ts',
          content:
            'const modal = createInteractiveEventModal({\n  fields: {\n    // your other fields\n    ...rruleFields()\n  }\n\n  // other config\n})',
        },
      ],
      content:
        "Migrating between major versions Migration from v3 to v4 With v4 of the Schedule-X calendar, there were a few breaking changes to the API, especially: @schedule-x/drag-and-drop moved to @sx-premium/drag-and-drop @schedule-x/resize moved to @sx-premium/resize Additionally, anyone premium users should migrate their premium plugins to version ^15.0.0 . For the old resource scheduler plugin, the resources config option moved from the rConfig object, to the main calendar config, see plugin documentation for more details. Premium v13 to v14 With v14 of the premium plugins, there were a couple of minor breaking changes to the API: - ResourceViewConfig.highlightToday now defaults to true, meaning the current day is highlighted by default in resource view. To keep old behaviour, set it to false. - ResourceViewConfig.dayNameFormat now defaults to 'short'. This will display day names in the daily view. To keep old behaviour, set it to false. Migration from v2 to v3 With v3 of the Schedule-X calendar, there were a few breaking changes to the API, especially: - start and end properties of events now expect Temporal.ZonedDateTime or Temporal.PlainDate instances, rather than strings. - selectedDate of the calendar config now expects a Temporal.PlainDate instance, rather than a string. - minDate and maxDate of the calendar config now expect Temporal.PlainDate instances, rather than strings. - Callbacks that used to accept a date parameter of format YYYY-MM-DD now use instances of Temporal.PlainDate instead. - Callbacks that used to accept a date-time parameter of format YYYY-MM-DD HH:MM now use instances of Temporal.ZonedDateTime instead. Additionally, there were some other breaking changes to the UI and plugins ecosystem: - v3 of the open source packages, now work together with v13 of the premium plugins. There was a jump from premium v3 - v13, to make it abundantly clear that there is no numeric correlation between the open source major version and the premium major version. - ResourceViewConfig.onLazyLoadDate and ResourceViewConfig.onLazyLoadMonth for @sx-premium/resource-scheduler now expect Temporal.PlainDate instances, rather than strings. - Time grid events (in day- and week views), now reactively display title and time inline, if there is no vertical space to display them in two lines. - The view select element now features a chevron icon, to indicate that it is a dropdown. - The iCalendar plugin returned in v3.4 with Temporal support, but it assumes all timestamps are UTC. Keep the calendar timezone at UTC to preserve the legacy behaviour or pre-process the events if you need timezone-aware rendering. Migration from @sx-premium v2 to v3 v3 of the premium plugins brought some breaking changes to the interactive event modal plugin, and nothing else. If you do not use this, you should be able to update to v3 without changing anything. Breaking changes in the interactive event modal 1. Event recurrence UI and API The event recurrence section now has more options. Users can set an interval for the recurrence, decide on which weekdays the event should recur, and decide between until , count or infinite, for limiting the recurrence. Previously, you could configure the rrule fields like this: In v3, this will throw an error, since you need to either configure all rrule fields, or none. Now you can do this: 2. onAddEvent callback The onAddEvent callback is now required in the modal configuration. If you do not provide it, the modal will throw an error. Migration guide for v2 V2 brought a few breaking changes in the UI and internal APIs. If you haven't built your own custom plugins, you will probably be able to migrate effortlessly. Migrating with custom plugins If you have built custom plugins that use the internal config in some way, you will need to change the way you access the config values. This is because the config values are now mostly reactive. So for example: v1.x.x: $app.config.locale ➡️ v2.x.x: $app.config.locale.value And this pattern repeats itself across the different config values. Also, the init function on plugins has been renamed into onRender , to better reflect when it is invoked. It is now accompanied by another method for plugins, beforeRender . Breaking changes in the UI The UI had a few breaking changes: - The time grid event now displays a location by default, if one exists on the event. The showLocation option has now been removed. - Month grid- and date grid events now display a timestamp next to their title, for all timed events. - The view selection component is now hidden, if there is only one view available. Premium plugins If you are using the premium plugins, you will also need to migrate them to at least v2, but preferably even to v3. @schedule-x/react The Calendar alias for the ScheduleXCalendar component has been removed. If you were using this API, use ScheduleXCalendar instead.",
    },
    {
      id: 'calendar-plugins',
      title: 'Plugins',
      description:
        'Extend the calendar with additional features through plugins.',
      url: 'https://schedule-x.dev/docs/calendar/plugins',
      sourcePath: 'website/app/docs/calendar/plugins/page.mdx',
      section: 'calendar',
      headings: ['Plugins', 'Basic example', 'Available plugins'],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar'\nimport { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'\nimport '@schedule-x/theme-default/dist/index.css'\n\nconst calendar = createCalendar({\n  views: [createViewMonthGrid()],\n  events: [\n    {\n      id: 1,\n      title: 'Coffee with John',\n      start: '2023-12-04 10:05',\n      end: '2023-12-04 10:35',\n    },\n  ],\n  plugins: [\n    createDragAndDropPlugin()\n  ],\n})\n\ncalendar.render(document.getElementById('calendar'))",
        },
      ],
      content:
        'Plugins The calendar can be extended with additional features through plugins. The library offers a range of plugins that can be downloaded separately. You can also write your own custom plugins. Basic example You can add plugins to the calendar, by adding them to the config object. Available plugins',
    },
    {
      id: 'calendar-plugins-calendar-controls',
      title: 'Calendar controls plugin',
      description:
        'Add some additional controls, to programmatically change the calendar view, set the date, or update the calendar configuration.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/calendar-controls',
      sourcePath:
        'website/app/docs/calendar/plugins/calendar-controls/page.mdx',
      section: 'calendar',
      headings: [
        'Calendar controls',
        'Install',
        'API',
        '`setView(viewName: string)`',
        '`setDate(date: Temporal.PlainDate)`',
        '`setTimezone(timezone: IANATimezone): void`',
        '`setFirstDayOfWeek(firstDayOfWeek: WeekDay): void`',
        '`setLocale(locale: string): void`',
        '`setViews(views: [View, ...View]): void`',
        '`setDayBoundaries(dayBoundaries: DayBoundariesExternal): void`',
        '`setWeekOptions(weekOptions: WeekOptions): void`',
        '`setCalendars(calendars: Record): void`',
        '`setMinDate(minDate: string|undefined): void`',
        '`setMaxDate(maxDate: string|undefined): void`',
        '`setMonthGridOptions(monthGridOptions: MonthGridOptions): void`',
        '`setResources(resources: Resource[]): void`',
        '`getView(): string`',
        '`getDate(): Temporal.PlainDate`',
        '`getRange(): { start: Temporal.ZonedDateTime, end: Temporal.ZonedDateTime }`',
        '`getFirstDayOfWeek(): WeekDay`',
        '`getLocale(): string`',
        '`getViews(): View[]`',
        '`getDayBoundaries(): DayBoundariesExternal`',
        '`getWeekOptions(): WeekOptions`',
        '`getCalendars(): Record`',
        '`getMinDate(): Temporal.PlainDate|undefined`',
        '`getMaxDate(): Temporal.PlainDate|undefined`',
        '`getMonthGridOptions(): MonthGridOptions`',
        '`getResources(): Resource[]`',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @schedule-x/calendar-controls',
        },
        {
          language: 'js',
          content:
            "import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'\n\nconst calendarControls = createCalendarControlsPlugin()\n\nconst calendar = createCalendar(\n  { /** config */ },\n  [calendarControls]\n)\ncalendar.render(/** your calendar element */)\n\n// Programmatically change the calendar view\ncalendarControls.setView('week')\n\n// Programmatically set the date\ncalendarControls.setDate(Temporal.PlainDate.from('2025-01-01'))",
        },
      ],
      content:
        'Calendar controls Add some additional controls, to programmatically change the calendar view and set the date. Install API setView(viewName: string) Change the calendar view. setDate(date: Temporal.PlainDate) Set the date of the calendar. setTimezone(timezone: IANATimezone): void Set the timezone of the calendar. setFirstDayOfWeek(firstDayOfWeek: WeekDay): void Set the first day of the week for the calendar. Value must be between 0 and 6 where 0 is Sunday, 1 is Monday etc. setLocale(locale: string): void Set the locale of the calendar. setViews(views: [View, ...View]): void Set the available views for the calendar. The views to be set must include the currently active view name. At least one view must be passed into this function. setDayBoundaries(dayBoundaries: DayBoundariesExternal): void Set the day boundaries of the calendar. Both start and end must be whole hours in the format HH:00 (e.g. 06:00 , 18:00 ). Half-hours such as 08:30 are not supported. setWeekOptions(weekOptions: WeekOptions): void Set the week options of the calendar. setCalendars(calendars: Record ): void Set the available calendars to be displayed in the calendar. setMinDate(minDate: string undefined): void Set the min date for the calendar navigation. setMaxDate(maxDate: string undefined): void Set the max date for the calendar navigation. setMonthGridOptions(monthGridOptions: MonthGridOptions): void Set the month grid options of the calendar. setResources(resources: Resource[]): void Set the resources of the calendar. getView(): string Get the name of the current view. getDate(): Temporal.PlainDate Get the currently selected date of the calendar. getRange(): Get the currently visible time range of the calendar. getFirstDayOfWeek(): WeekDay Get the currently configured first day of week of the calendar. getLocale(): string Get the current locale of the calendar. getViews(): View[] Get the currently available views of the calendar. getDayBoundaries(): DayBoundariesExternal Get the day boundaries of the calendar. getWeekOptions(): WeekOptions Get the week options of the calendar. getCalendars(): Record Get the calendars of the calendar. getMinDate(): Temporal.PlainDate undefined Get the current min date for the calendar navigation. getMaxDate(): Temporal.PlainDate undefined Get the current max date for the calendar navigation. getMonthGridOptions(): MonthGridOptions Get the current month grid options of the calendar. getResources(): Resource[] Get the current resources of the calendar. Examples',
    },
    {
      id: 'calendar-plugins-community-plugins',
      title: 'Community plugins',
      description: 'A list of community plugins for the Schedule-X.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/community-plugins',
      sourcePath:
        'website/app/docs/calendar/plugins/community-plugins/page.mdx',
      section: 'calendar',
      headings: ['Community plugins', 'List of plugins'],
      codeBlocks: [],
      content:
        'Community plugins Sharing is caring, right? If you are one of those awesome people that have built a plugin and would like to share it with the community, please let us know by creating an issue in the GitHub repository. Here follows a not yet so long, but someday hopefully longer, list of community plugins for the Schedule-X. List of plugins - CopyEventPlugin by Bryan van der Starre: A plugin that allows you to copy/paste events. - ZoomInPlugin by Bryan van der Starre: A plugin that allows you to zoom in on the calendar grid.',
    },
    {
      id: 'calendar-plugins-current-time',
      title: 'Current time plugin',
      description: 'Add a current time indicator to the calendar.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/current-time',
      sourcePath: 'website/app/docs/calendar/plugins/current-time/page.mdx',
      section: 'calendar',
      headings: ['Current time indicator', 'Install', 'Usage', 'Configuration'],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @schedule-x/current-time',
        },
        {
          language: 'js',
          content:
            "import { createCurrentTimePlugin } from '@schedule-x/current-time'\n\nconst calendar = createCalendar({\n  /* other configuration */\n\n  plugins: [\n    createCurrentTimePlugin()\n  ]\n})",
        },
        {
          language: 'js',
          content:
            'createCurrentTimePlugin({\n  // Whether the indicator should be displayed in the full width of the week. Defaults to false\n  fullWeekWidth: true,\n})',
        },
      ],
      content:
        'Current time indicator This plugin adds a current time indicator to the calendar, according to the timezone of the calendar. This defaults to UTC if not configured otherwise. It will automatically update every minute. !Current time indicator Install Usage Configuration',
    },
    {
      id: 'calendar-plugins-custom-plugins',
      title: 'Custom plugins',
      description:
        'Write your own plugins to extend the functionality of the calendar.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/custom-plugins',
      sourcePath: 'website/app/docs/calendar/plugins/custom-plugins/page.mdx',
      section: 'calendar',
      headings: ['Write your own plugin', 'A simple example'],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import { CalendarAppSingleton } from '@schedule-x/shared'\nimport { createCalendar } from '@schedule-x/calendar'\n\nclass LoggerPlugin {\n  name = 'logger-plugin'\n\n  beforeRender($app: CalendarAppSingleton) {\n    $app.calendarEvents.list.value.forEach((event) => {\n      console.log('init', event)\n    })\n  }\n\n  onRender($app: CalendarAppSingleton) {\n    console.log('do something else')\n  }\n}\n\nconst calendar = createCalendar(\n  { /* config */ },\n  [new LoggerPlugin()]\n)",
        },
      ],
      content:
        "Write your own plugin A plugin can be any object that has a name property, and an beforeRender method. The $app object, the \"control center\" object of the calendar, is then received as the first argument of the beforeRender method. This gives you access to most of the calendar's global, internal APIs. If you're writing TypeScript, the type of this object is CalendarAppSingleton . If you're writing JavaScript, just leave out the type annotation, but then take a moment to study the following interface and its nested interfaces to get an idea of what's available to you: https://github.com/schedule-x/schedule-x/blob/main/packages/shared/src/interfaces/calendar/calendar-app-singleton.ts A simple example",
    },
    {
      id: 'calendar-plugins-drag-and-drop',
      title: 'Drag and drop plugin',
      description:
        'Update event time and date using a classical drag and drop.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/drag-and-drop',
      sourcePath: 'website/app/docs/calendar/plugins/drag-and-drop/page.mdx',
      section: 'calendar',
      headings: [
        'Drag and Drop',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'Configuration',
        'Limitations with recurring events',
        'Methods',
        'setInterval(minutes: number)',
        'Changelog',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @sx-premium/drag-and-drop',
        },
        {
          language: 'js',
          content:
            "import { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'\n\nconst calendar = createCalendar({\n  /* other configuration */\n  plugins: [\n    createDragAndDropPlugin()\n  ],\n\n  callbacks: {\n    onEventUpdate(updatedEvent) {\n      console.log('onEventUpdate', updatedEvent)\n    },\n\n    // (Optionally) run your validation or side effects\n    // return false to stop the update, and true to allow it\n    onBeforeEventUpdate(oldEvent, newEvent, $app) {\n      return false\n    }\n  }\n})",
        },
        {
          language: 'js',
          content:
            "import { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'\n\nconst calendar = createCalendar({\n  /* other configuration */\n\n  plugins: [\n    createDragAndDropPlugin(30) // drag with 30 minutes intervals\n  ]\n})",
        },
        {
          language: 'js',
          content:
            "import { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'\n\nconst dragAndDropPlugin = createDragAndDropPlugin()\n\nconst calendar = createCalendar({\n  /* other configuration */\n  plugins: [\n    dragAndDropPlugin\n  ]\n})\n\ndragAndDropPlugin.setInterval(30)",
        },
      ],
      content:
        'Drag and Drop Update event time and date using a classical drag and drop. Available in all views except the month agenda- and list views. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage Configuration You can configure the length, in minutes, of the intervals that are used when dragging: Available values are 15 (default), 30 and 60 Limitations with recurring events When using the event recurrence plugin, most recurring events can be updated via drag and drop. However, events with BYDAY rules cannot be updated by dragging . This includes events like: - FREQ=MONTHLY;BYDAY=1MO (first Monday of each month) - FREQ=YEARLY;BYDAY=-1FR (last Friday of each year) If you need to allow users to modify such events, consider: - Disabling drag and drop for these specific events using the onBeforeEventUpdate callback - Providing alternative UI (like the interactive event modal) for editing - Updating events programmatically through the events service Methods setInterval(minutes: number) Set the interval, in minutes, for dragging events. Changelog See changelog page.',
    },
    {
      id: 'calendar-plugins-drag-to-create',
      title: 'Drag to create plugin',
      description:
        'Create events by dragging an external placeholder element onto the calendar.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/drag-to-create',
      sourcePath: 'website/app/docs/calendar/plugins/drag-to-create/page.mdx',
      section: 'calendar',
      headings: [
        'Drag to create',
        'Features',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'API',
        'Example',
        'Changelog',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm install @sx-premium/drag-to-create',
        },
        {
          language: 'html',
          content:
            '// somewhere in your html structure\n<div id="event-placeholder" draggable="true">Create new event</div>',
        },
        {
          language: 'js',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport { createEventsServicePlugin } from \"@schedule-x/events-service\";\nimport { createDragToCreatePlugin } from '@sx-premium/drag-to-create'\n\nimport '@sx-premium/drag-to-create/index.css'\nimport '@schedule-x/theme-default/dist/calendar.css'\n\nconst onAddEvent = (event) => {\n  console.log('Event added', event)\n}\n\nconst dragToCreatePlugin = createDragToCreatePlugin({\n  onAddEvent,\n\n  // Optional: add a validation hook. Return false to prevent the event from being added.\n  onBeforeAddEvent: (event, $app) => {\n    // Your validation logic\n    return true\n  },\n\n  // Optional: async version of onBeforeAddEvent\n  onBeforeAddEventAsync: async (event, $app) => {\n    // Your async validation logic\n    // Return false to prevent the event from being added.\n    return true\n  }\n})\n\nconst calendar = createCalendar({\n  plugins: [\n    createEventsServicePlugin(),\n    dragToCreatePlugin,\n  ],\n})\n\nconst eventPlaceholder = document.getElementById('event-placeholder')\neventPlaceholder.addEventListener('dragstart', () => {\n  dragToCreatePlugin.dragToCreate('yourEventId123', {\n    title: '(No title)',\n    calendarId: 'leisure',\n  })\n})\n\ncalendar.render(document.getElementById('your-calendar-wrapper'))",
        },
      ],
      content:
        'Drag to create A plugin that allows you to create events by dragging an external placeholder element onto the calendar. Has support for week, day and month-grid views. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. Features 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage API createDragToCreatePlugin(config: DragToCreateConfig) Create the plugin instance. DragToCreateConfig Configuration object for the plugin. Added as the first parameter to the createDragToCreatePlugin function. Property Type Default ------------------------ ----------------------------------------- --------- onAddEvent (event: CalendarEvent) = void - onAddEventAsync (event: CalendarEvent) = Promise - onBeforeAddEvent (event: CalendarEvent) = boolean - onBeforeAddEventAsync (event: CalendarEvent) = Promise - snapDuration 15 \\ 30 \\ 60 30 dragToCreate(eventId: string, otherEventProperties: Partial ) Call this method as a response to a dragstart event on your placeholder element, in order to start the drag-to-create process. The eventId is a required, unique id for the event being created. otherEventProperties is an optional object-parameter with the properties of the event being created (however, start and end properties will have no effect here). Example Changelog See changelog page. Examples These can be added on request. Please let us know if you need an example for a specific framework. React example: https://github.com/schedule-x/react-examples/blob/main/drag-to-create/src/App.tsx Vue example: https://github.com/schedule-x/vue-examples/tree/main/drag-to-create Angular example: https://github.com/schedule-x/angular-examples/tree/main/sidebar--modal--drag-to-create Svelte example: https://github.com/schedule-x/svelte-examples',
    },
    {
      id: 'calendar-plugins-draw',
      title: 'Draw plugin',
      description: 'Plugin for drawing events in the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/plugins/draw',
      sourcePath: 'website/app/docs/calendar/plugins/draw/page.mdx',
      section: 'calendar',
      headings: [
        'Draw',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'API',
        'Example',
        'Changelog',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm install @sx-premium/draw',
        },
        {
          language: 'js',
          content:
            "import {\n  createCalendar,\n  viewWeek,\n  viewMonthGrid,\n  viewDay,\n} from '@schedule-x/calendar'\nimport { createDrawPlugin } from \"@sx-premium/draw\";\nconst drawPlugin = createDrawPlugin({\n  onFinishDrawing: (event) => {\n    // do something, like saving the event to the server\n  },\n\n  // (Optional) callback that runs on mouseup after drawing an event, before calling onFinishDrawing\n  onBeforeFinishDrawing: (event) => {\n    // do something, like validating the event\n    // return false to remove the event, and true to keep it\n  },\n\n  // (Optional) async version of onBeforeFinishDrawing\n  onBeforeFinishDrawingAsync: async (event) => {\n    // do something, like validating the event\n    // return false to remove the event, and true to keep it\n  },\n\n  // (Optional) configure the intervals, in minutes, at which a time grid-event can be drawn. Valid values: 15, 30, 60\n  snapDuration: 30\n})\n\nconst calendar = createCalendar({\n  callbacks: {\n    onMouseDownDateTime(dateTime, mouseDownEvent) {\n      drawPlugin.drawTimeGridEvent(dateTime, mouseDownEvent, {\n        title: 'Unknown event'\n      })\n    },\n\n    onMouseDownMonthGridDate(date, _mouseDownEvent) {\n      console.log(_mouseDownEvent)\n      drawPlugin.drawMonthGridEvent(date, {\n        title: 'Unknown event'\n      })\n    },\n\n    onMouseDownDateGridDate(date, mouseDownEvent) {\n      drawPlugin.drawDateGridEvent(date, mouseDownEvent, {\n        title: 'Unknown event'\n      })\n    }\n  },\n  views: [viewMonthGrid, viewWeek, viewDay],\n  plugins: [\n    drawPlugin\n  ]\n})",
        },
      ],
      content:
        'Draw A plugin that enables your users to draw events directly onto the calendar. Compatible with week, day, and month views. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage API createDrawPlugin(config: ) Create the plugin instance. drawTimeGridEvent(dateTime: Temporal.ZonedDateTime, mouseDownEvent: MouseEvent, eventProperties: ) Create a new event in the time grid of the day- and week views. drawDateGridEvent(date: Temporal.PlainDate, mouseDownEvent: MouseEvent, eventProperties: ) Create a new full-day event in the date grid of the day- and week view. drawMonthGridEvent(date: Temporal.PlainDate, eventProperties: ) Create a new full-day event in the month grid view. Example Changelog See changelog page. Examples These can be added on request. Please let us know if you need an example for a specific framework. Vue example: https://github.com/schedule-x/vue-examples/tree/main/draw React example: https://github.com/schedule-x/react-examples/tree/main/draw Svelte example: https://github.com/schedule-x/svelte-examples',
    },
    {
      id: 'calendar-plugins-event-modal',
      title: 'Event modal plugin',
      description: 'Display more information about events in a modal.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/event-modal',
      sourcePath: 'website/app/docs/calendar/plugins/event-modal/page.mdx',
      section: 'calendar',
      headings: [
        'Event modal',
        'Install',
        'Usage',
        'Methods',
        '`close`',
        'Customization',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @schedule-x/event-modal',
        },
        {
          language: 'js',
          content:
            "import { createEventModalPlugin } from '@schedule-x/event-modal'\n\nconst eventModal = createEventModalPlugin()\n\nconst calendar = createCalendar({\n  // ...other configuration\n  plugins: [eventModal],\n})\n\neventModal.close(); // close the modal",
        },
        {
          language: 'tsx',
          content:
            'import { useCalendarApp } from \'@schedule-x/react\'\nimport { createEventModalPlugin } from \'@schedule-x/event-modal\'\n\nconst customComponents = {\n  eventModal: ({ calendarEvent }) => {\n    return (\n      <div\n        style={{\n          padding: "40px",\n          background: "yellow",\n          color: "black",\n          borderRadius: "24px",\n          border: "1px solid black",\n          fontSize: "24px",\n          fontWeight: "bold",\n        }}\n      >\n        {calendarEvent.title}\n      </div>\n    );\n  },\n}\n\nfunction CalendarComponent() {\n  const calendar = useCalendarApp({\n    // ...other configuration\n\n    plugins: [createEventModalPlugin()],\n  })\n\n  return <>\n    <ScheduleXCalendar\n      customComponents={customComponents}\n      calendarApp={calendar}\n    />\n  </>\n}',
        },
      ],
      content:
        "Event modal If your events have more information than just their time and a short title, chances are it would be helpful to display information about the events in a modal. Install Usage Methods close Close the modal programmatically. Customization If you're using one of the framework adapter components, like for React, you can customize modal content via passing customComponents prop like so:",
    },
    {
      id: 'calendar-plugins-events-service',
      title: 'Events service plugin',
      description: 'Add, update, retrieve and remove events from the calendar.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/events-service',
      sourcePath: 'website/app/docs/calendar/plugins/events-service/page.mdx',
      section: 'calendar',
      headings: [
        'Events Service Plugin',
        'Install',
        'Methods',
        '`get(id)`',
        '`getAll()`',
        '`add(event)`',
        '`update(event)`',
        '`remove(id)`',
        '`set(events)`',
        '`setBackgroundEvents(backgroundEvents: BackgroundEvent[]): void`',
        'Example',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @schedule-x/events-service',
        },
        {
          language: 'js',
          content:
            "import { createEventsServicePlugin } from '@schedule-x/events-service'\n\nconst eventsServicePlugin = createEventsServicePlugin();\n\nconst calendar = createCalendar(\n  { /* config */ },\n  [eventsServicePlugin]\n)\ncalendar.render(document.getElementById('calendar'))\n\ncalendar.eventsService.add({\n  title: 'Event 1',\n  start: Temporal.PlainDate.from('2024-04-20'),\n  end: Temporal.PlainDate.from('2024-04-20'),\n  id: 1\n})\n\neventsServicePlugin.get(1) // { title: 'Event 1', start: '2024-04-20', end: '2024-04-20', id: 1 }\n\neventsServicePlugin.getAll() // [{ title: 'Event 1', start: '2024-04-20', end: '2024-04-20', id: 1 }]\n\neventsServicePlugin.update({\n  title: 'Real title',\n  start: Temporal.PlainDate.from('2024-04-20'),\n  end: Temporal.PlainDate.from('2024-04-20'),\n  id: 1\n})\n\neventsServicePlugin.remove(1)",
        },
      ],
      content:
        'Events Service Plugin This plugin provides APIs to add, update and remove events. Install Methods get(id) Returns a single event, based on the id that you pass to it as its single parameter. getAll() Returns all events that are currently in the calendar. add(event) Is called with one parameter: the new event to be added. The event must have a unique id. update(event) Updates an event that already exists in the calendar. Takes one parameter, which is the entire event you want to update. remove(id) Removes an event from the calendar. Takes one parameter, which is the id of the event you want to remove. set(events) Sets all events in the calendar. This will override all existing events in the calendar with the new ones you pass to it. setBackgroundEvents(backgroundEvents: BackgroundEvent[]): void Sets all background events in the calendar. This will override all existing background events in the calendar with the new ones you pass to it. Example',
    },
    {
      id: 'calendar-plugins-ical',
      title: 'iCalendar plugin',
      description: 'Plugin for importing events from an iCalendar source.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/ical',
      sourcePath: 'website/app/docs/calendar/plugins/ical/page.mdx',
      section: 'calendar',
      headings: ['iCalendar plugin', 'Installation', 'Usage'],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm install @schedule-x/ical',
        },
        {
          language: 'js',
          content:
            "import { createIcalendarPlugin } from '@schedule-x/ical'\n\nconst icalendarPlugin = createIcalendarPlugin({\n  data: 'BEGIN:VCALENDAR\\n' +\n    'VERSION:2.0\\n' +\n    'CALSCALE:GREGORIAN\\n' +\n    'BEGIN:VEVENT\\n' +\n    'SUMMARY:Good morning\\n' +\n    'DTSTART;TZID=America/New_York:20240801T103400\\n' +\n    'DTEND;TZID=America/New_York:20240801T110400\\n' +\n    'LOCATION:1000 Broadway Ave.\\\\, Brooklyn\\n' +\n    'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\\\\, Brooklyn\\n' +\n    'STATUS:CONFIRMED\\n' +\n    'SEQUENCE:3\\n' +\n    'END:VEVENT\\n' +\n    'BEGIN:VEVENT\\n' +\n    'RRULE:FREQ=DAILY;COUNT=3\\n' +\n    'SUMMARY:Good night\\n' +\n    'DTSTART;TZID=America/New_York:20240902T200000\\n' +\n    'DTEND;TZID=America/New_York:20240902T203000\\n' +\n    'LOCATION:900 Jay St.\\\\, Brooklyn\\n' +\n    'DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\\\\, Brooklyn\\n' +\n    'STATUS:CONFIRMED\\n' +\n    'SEQUENCE:3\\n' +\n    'END:VEVENT\\n' +\n    'END:VCALENDAR',\n})\n\nconst calendar = createCalendar({\n  // other config...\n  callbacks: {\n    onRangeUpdate(range) {\n      console.log('rendering events for new range', range)\n      icalendarPlugin.between(range.start, range.end)\n    },\n  },\n\n  plugins: [icalendarPlugin]\n})\n\ncalendar.render(document.getElementById('your-calendar'))",
        },
      ],
      content:
        'iCalendar plugin This plugin allows you to import events from an iCalendar source. This plugin assumes UTC timezone for all events. You will probably want to skip configuring a timezone for the calendar when using it. Reason for this is, that the ical plugin was first removed for v3 in order to lower migration effort, but then added again in order to help users migrate from v2. If you need to use different timezones for your ical events, feel free to open a PR that utilitzes the timezone features of ical.js, the library with which Schedule-X is parsing ical events. Installation Usage',
    },
    {
      id: 'calendar-plugins-interactive-event-modal',
      title: 'Interactive event modal',
      description:
        'A plugin for displaying an interactive modal for adding, editing, viewing and removing events.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/interactive-event-modal',
      sourcePath:
        'website/app/docs/calendar/plugins/interactive-event-modal/page.mdx',
      section: 'calendar',
      headings: [
        'Interactive event modal',
        'Features & demo',
        '2. Install the packages',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'Public methods',
        '`clickToCreate: (start: Temporal.ZonedDateTime | Temporal.PlainDate, otherEventProperties?: Partial) => void`',
        '`openForExistingEvent(id: EventId): void`',
        '`openEventCreationModal(id: string | number, start?: Temporal.ZonedDateTime | Temporal.PlainDate, otherEventProperties?: Partial)`',
        '`fields` configuration option',
        'Available fields',
        'Using the RRule fields',
        'Custom fields',
        'Changelog',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @sx-premium/interactive-event-modal',
        },
        {
          language: 'js',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport { createEventsServicePlugin, createEventRecurrencePlugin } from \"@schedule-x/event-recurrence\";\nimport { createInteractiveEventModal } from \"@sx-premium/interactive-event-modal\";\n\nimport '@sx-premium/interactive-event-modal/index.css'\n\n\nconst eventsService = createEventsServicePlugin()\nconst eventRecurrence = createEventRecurrencePlugin()\n\nconst eventModal = createInteractiveEventModal({\n  // dependency needed to add events\n  eventsService,\n\n  // (Optional): Available people for the event form\n  availablePeople: ['John Doe', 'Jane Doe'],\n\n  // (Optional): callback for when an event is added\n  onAddEvent: (event) => {\n    console.log(event)\n  },\n\n  // Optional: async callback for when an event is added. If added, it takes precedence over the onAddEvent callback.\n  onAddEventAsync: async (event) => {\n    console.log(event)\n  },\n\n  // (Optional): callback for when an event is updated\n  onDeleteEvent: (eventId) => {\n    console.log(eventId)\n  },\n\n  // (Optional): callback for when an event start property is updated\n  onStartUpdate(start) {\n    console.log(start)\n  },\n\n  // (Optional): callback for when an event end property is updated\n  onEndUpdate(end) {\n    console.log(end)\n  },\n\n  // (Optional): callback which is invoked before opening the modal. Return false to prevent the modal from opening\n  canOpenModal: (event) => {\n    return event.calendarId === 'calendar-1';\n  },\n\n  // (Optional): callback for deciding whether to display edit- and delete buttons for an event\n  isEventEditable(event) {\n    return event.calendarId === 'internal'\n  },\n\n  // (Optional): configure the time picker to use 12-hour format\n  has12HourTimeFormat: true,\n\n  // (Optional): prevent the modal from closing on click outside. \"false\" by default\n  preventClosingOnClickOutside: true,\n\n  // (Optional): add a gray \"move-bar\" bar at the top of the modal, which can be used to move the modal\n  movable: true,\n\n  // (Optional): configure whether the title field should be hidden (is currently shown by default)\n  hideTitle: false,\n\n  // (Optional): configuration for the field \"title\"\n  fields: {\n    title: {\n      label: 'Event Title',\n      name: 'event-title',\n      validator: (value) => {\n        return {\n          isValid: !!value && value.length >= 3,\n          message: 'Title must be at least 3 characters long'\n        }\n      }\n    },\n    description: {},\n  },\n\n  // (Optional): date picker config\n  datePicker: {\n    min: Temporal.PlainDate.from('2025-01-01'),\n    max: Temporal.PlainDate.from('2025-12-31'),\n  }\n})\n\nconst calendar = createCalendar({\n  // ...other configuration\n  plugins: [\n    eventModal,\n    eventsService,\n    eventRecurrence,\n  ],\n\n  callbacks: {\n    onDoubleClickDateTime(dateTime) {\n      eventModal.clickToCreate(dateTime, {\n        id: 'some-event-id',\n      })\n    }\n  }\n})\n\ncalendar.render(document.getElementById('your-calendar-wrapper'))",
        },
        {
          language: 'ts',
          content: 'fields: {\n  description: {}\n  // other fields\n}',
        },
        {
          language: 'ts',
          content:
            "export { rruleFields, createInteractiveEventModal } from '@sx-premium/interactive-event-modal'\n\nconst modal = createInteractiveEventModal({\n  fields: {\n    // your other fields\n    ...rruleFields()\n  }\n})",
        },
        {
          language: 'ts',
          content:
            "type InputField<T extends undefined | string | string[]> = {\n  label?: string\n  name?: string\n  onChange?: (value: T) => void\n  placeholder?: string\n}\n\ntype InputFieldWithValidation<T extends undefined | string | string[]> =\n  InputField<T> & {\n    validator?: (fieldValue: T) => ValidationResult\n  }\n\ntype CustomInputField<T extends undefined | string | string[]> =\n  InputFieldWithValidation<T> & {\n    type: 'text' | 'select' | 'textarea' | 'combobox' | 'combobox-multi' | 'any'\n    items?: SelectItem[]\n\n    // paired together with 'any' type, allows you to use any Preact-component as input.\n    // this is useful for anyone who needs to use a custom input component, like a rich text editor or a media upload.\n    InputComponent?: (\n      props: InputField<T> & {\n        initialValue: T\n      }\n    ) => JSX.Element\n  }\n\ntype ValidationResult = {\n  isValid: boolean\n  message?: string\n}\n\nexport type SelectItem = { label: string; value: string }",
        },
        {
          language: 'ts',
          content:
            "import { createEventsServicePlugin, createEventRecurrencePlugin } from \"@schedule-x/event-recurrence\";\nimport { createInteractiveEventModal, createInputField, translations as modalTranslations } from \"@sx-premium/interactive-event-modal\";\nimport { translations, mergeLocales } from '@schedule-x/translations'\nimport { createCalendar } from '@schedule-x/calendar'\n\nimport '@schedule-x/theme-default/dist/calendar.css'\nimport '@sx-premium/interactive-event-modal/index.css'\n\nconst eventsService = createEventsServicePlugin()\nconst eventRecurrence = createEventRecurrencePlugin()\nconst eventModal = createInteractiveEventModal({\n  eventsService,\n\n  fields: {\n    title: {},\n  },\n\n  customFields: {\n    additionalNotes: createInputField({ // will correspond to an event property \"additionalNotes\"\n      label: 'Additional notes',\n      name: 'additional-notes',\n      type: 'textarea',\n      validator: (value) => {\n        return {\n          isValid: !!value && value.length >= 3,\n          message: 'Custom field must be at least 3 characters long'\n        }\n      }\n    }),\n\n    locationSelect: createInputField({ // will correspond to an event property \"locationSelect\"\n      label: 'Location',\n      type: 'select',\n      items: [\n        { label: 'Lake view office', value: 'lake-view' },\n        { label: 'City center office', value: 'city-center' },\n        { label: 'Home office', value: 'home' },\n      ]\n    }),\n  }\n})\n\nconst calendar = createCalendar({\n  translations: mergeLocales(translations, modalTranslations),\n  plugins: [\n    eventModal,\n    eventsService,\n    eventRecurrence,\n  ],\n  // ...other configuration\n})",
        },
      ],
      content:
        'Interactive event modal A plugin for displaying an interactive modal for adding, editing and removing events. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. Features & demo Go to Demo 2. Install the packages 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage Public methods Parameters - id - id of the event that will be created - start - start date or datetime of the event that will be created - otherEventProperties - additional properties that will be added to the event that will be created clickToCreate: (start: Temporal.ZonedDateTime Temporal.PlainDate, otherEventProperties?: Partial ) = void Method for adding an event and opening the event editing modal. Preferably used with the onDoubleClickDateTime and onDoubleClickDate callbacks, to add events by clicking. openForExistingEvent(id: EventId): void Method for opening the modal for an existing event. openEventCreationModal(id: string number, start?: Temporal.ZonedDateTime Temporal.PlainDate, otherEventProperties?: Partial ) Method for programmatically opening the event creation modal. The id parameter is used for setting an id of the event that will be created, if the user chooses to click save. Can for example be used if you implement your own "Add event" button. fields configuration option Please note, that by default, all fields are displayed. If you, however, configure one of them, the rest will be hidden by default. Date and time pickers are an exception here, since these are required at least when adding an event. For adding a field but without custom configuration, simply add it with an empty object like so: Available fields Field name Type ---------------------- -------------------------- title InputFieldWithValidation description InputFieldWithValidation startDate InputField startTime InputField endDate InputField endTime InputField people InputFieldWithValidation calendarId InputFieldWithValidation resourceId InputFieldWithValidation rruleFrequency InputField rruleUntil InputField rruleCustomFrequency InputField rruleInterval InputField rruleCount InputField rruleByDay InputField Using the RRule fields The rrule fields depend on one another. Therefore, you either need to configure all of them, or none. You can easily configure all of them at once like this, if you don\'t need any custom configuration of them. Input field types Custom fields Additional to the default fields, you can add custom fields to a customFields property. The fields of this property follow the same structure as the default fields, but additionally you need to add one of the supported types: text , textarea , select , combobox or combobox-multi . For example: If you need to display these custom fields in the view mode of the modal, you can write a custom component for interactiveModalAdditionalFields , which then receives calendarEvent as a prop. View the docs for your framework (Vue, React etc.) to learn how custom components work in Schedule-X. Changelog See changelog page. Examples These can be added on request. Please let us know if you need an example for a specific framework. React example: https://github.com/schedule-x/react-examples/tree/main/interactive-event-modal Vue example: https://github.com/schedule-x/vue-examples/tree/main/interactive-event-modal Angular example: https://github.com/schedule-x/angular-examples/tree/main/sidebar--modal--drag-to-create Svelte example: https://github.com/schedule-x/svelte-examples',
    },
    {
      id: 'calendar-plugins-recurrence',
      title: 'Event recurrence plugin',
      description:
        'Plugin for creating recurring events according to the RFC5545 specification.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/recurrence',
      sourcePath: 'website/app/docs/calendar/plugins/recurrence/page.mdx',
      section: 'calendar',
      headings: [
        'Event recurrence',
        'ℹ️ Important note before getting started',
        'Installation',
        'Usage',
        'Supported rules',
        '`exdate`',
        'Events service',
      ],
      codeBlocks: [
        {
          language: 'sh',
          content: 'npm install @schedule-x/event-recurrence',
        },
        {
          language: 'js',
          content:
            "import { createEventRecurrencePlugin } from \"@schedule-x/event-recurrence\";\n\nconst calendar = createCalendar({\n  // ... other config options\n  plugins: [\n    createEventRecurrencePlugin()\n  ],\n  events: [\n    {\n      id: 123,\n      title: 'Bi-Weekly Event Monday and Wednesday',\n      start: Temporal.ZonedDateTime.from('2024-02-05T14:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-02-05T15:00:00+01:00[Europe/Berlin]'),\n      rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959'\n    },\n    {\n      id: 456,\n      title: 'Weekly Event on 4 occasions',\n      start: Temporal.PlainDate.from('2024-02-03'),\n      end: Temporal.PlainDate.from('2024-02-03'),\n      rrule: 'FREQ=WEEKLY;COUNT=4'\n    },\n    {\n      id: 789,\n      title: 'Daily event 5 times',\n      start: Temporal.ZonedDateTime.from('2024-02-05T12:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-02-05T13:55:00+01:00[Europe/Berlin]'),\n      rrule: 'FREQ=DAILY;COUNT=5',\n      calendarId: 'personal',\n    },\n    {\n      id: 121314,\n      title: 'Daily event mo-fr 10 times',\n      start: Temporal.ZonedDateTime.from('2024-02-05T12:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-02-05T13:55:00+01:00[Europe/Berlin]'),\n      rrule: 'FREQ=DAILY;COUNT=10;BYDAY=MO,TU,WE,TH,FR',\n      calendarId: 'work',\n    },\n    {\n      id: 141617,\n      title: 'Monthly event on the 7th 5 times',\n      start: Temporal.ZonedDateTime.from('2024-02-07T16:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-02-07T17:55:00+01:00[Europe/Berlin]'),\n      rrule: 'FREQ=MONTHLY;COUNT=5',\n    },\n    {\n      id: 151618,\n      title: 'Monthly event on the 1st Monday 12 times',\n      start: Temporal.ZonedDateTime.from('2024-08-05T04:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-08-05T06:00:00+01:00[Europe/Berlin]'),\n      rrule: 'FREQ=MONTHLY;BYDAY=1MO;COUNT=12',\n    },\n    {\n      rrule: 'FREQ=YEARLY;COUNT=5',\n      title: 'Event on the 8th of February for 5 years',\n      start: Temporal.ZonedDateTime.from('2024-02-08T16:00:00+01:00[Europe/Berlin]'),\n      end: Temporal.ZonedDateTime.from('2024-02-08T17:55:00+01:00[Europe/Berlin]'),\n      id: 181920\n    }\n  ]\n});",
        },
        {
          language: 'js',
          content:
            "const recurringEventWithExclusions = {\n  id: 123,\n  title: 'Weekly event',\n  start: Temporal.ZonedDateTime.from('2024-02-05T14:00:00+01:00[Europe/Berlin]'),\n  end: Temporal.ZonedDateTime.from('2024-02-05T15:00:00+01:00[Europe/Berlin]'),\n\n  // will create a recurrence set of 3 events: 2024-02-05 14:00, 2024-02-26 14:00, 2024-03-04 14:00\n  rrule: 'FREQ=WEEKLY;COUNT=5',\n  exdate: [\n    '20240212T140000',\n    '20240219T140000'\n  ]\n}",
        },
        {
          language: 'js',
          content:
            "import { createEventRecurrencePlugin, createEventsServicePlugin } from \"@schedule-x/event-recurrence\";\n\nconst recurrencePlugin = createEventRecurrencePlugin();\nconst eventsServicePlugin = createEventsServicePlugin();\n\nconst calendar = createCalendar({\n  /* other config */\n\n  plugins: [\n    recurrencePlugin,\n    eventsServicePlugin\n  ]\n});\n\ncalendar.render(document.getElementById('calendar'));\n\n// Add an event\neventsServicePlugin.add({\n  id: 1,\n  title: 'New event',\n  start: Temporal.ZonedDateTime.from('2024-02-05T14:00:00+01:00[Europe/Berlin]'),\n  end: Temporal.ZonedDateTime.from('2024-02-05T15:00:00+01:00[Europe/Berlin]'),\n  rrule: 'FREQ=WEEKLY;COUNT=3'\n});\n\n// Update\neventsServicePlugin.update({\n  id: 1,\n  title: 'New event',\n  start: Temporal.ZonedDateTime.from('2024-02-05T14:00:00+01:00[Europe/Berlin]'),\n  end: Temporal.ZonedDateTime.from('2024-02-05T15:00:00+01:00[Europe/Berlin]'),\n  rrule: 'FREQ=WEEKLY;COUNT=10'\n})\n\n// Get one event with id 123\nconst event = eventsServicePlugin.get(123);\n\n// Get all\nconst events = eventsServicePlugin.getAll();\n\n// Remove an event with id 123\neventsServicePlugin.remove(123);",
        },
      ],
      content:
        "Event recurrence ℹ️ Important note before getting started This plugin enables you to create recurring events according to the iCalendar specification. Please note, however, that this plugin only offers a partial implementation of the specification. There are 2 reasons for this: 1. Some rules just haven't been implemented yet. If there is a rule that you would like to see implemented, please open an issue on GitHub. 2. Some iCalendar rules are supported for display purposes but cannot be updated via drag & drop. For example, events using BYDAY with MONTHLY or YEARLY frequencies are fully supported, but cannot be updated by dragging. If you need to update such events programmatically, you can disable drag & drop for those specific events or handle updates through the events service. If you need an almost full implementation of the iCalendar spec, you can use the rrule library instead of this plugin. Here's an example of how to do so. However, this only works if you're merely using the calendar to display events. If you want to use interactive features like drag & drop or resizing, you cannot use the external rrule library . Installation Usage Supported rules Rule Supported values Required ---------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------- FREQ DAILY , WEEKLY , MONTHLY or YEARLY Yes COUNT Number No INTERVAL Number No BYDAY - compatible with all frequencies MO , TU , WE , TH , FR , SA , SU . Can optionally be prefixed with a position (e.g., 1MO for first Monday, -1FR for last Friday) but can't be updated using drag & drop. No BYMONTHDAY - compatible with MONTHLY (Single) Positive integer 1-31. Does not support list of values, since such lists cannot be updated in a predictable way using drag & drop. No UNTIL Floating date, for example 20240101 or date-time 20240101T120000 No WKST MO , TU , WE , TH , FR , SA , SU No exdate You can exclude certain dates or date-times from a recurrence set using the exdate rule. The expected format is RFC5455 floating date (e.g. 20240101 ) or datetime (e.g. 20240101T120000 ). For example: Events service When using this plugin, you can no longer use the regular events service plugin. Instead, you now need to import the events service plugin from this package:",
    },
    {
      id: 'calendar-plugins-resize',
      title: 'Resize plugin',
      description: 'Plugin for resizing events in the week- and day views.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/resize',
      sourcePath: 'website/app/docs/calendar/plugins/resize/page.mdx',
      section: 'calendar',
      headings: [
        'Resize',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'Configuration',
        'Methods',
        'setInterval(minutes: number)',
        'Changelog',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @sx-premium/resize',
        },
        {
          language: 'js',
          content:
            "import { createResizePlugin } from '@sx-premium/resize'\n\nconst calendar = createCalendar({\n  /* other configuration */\n  plugins: [\n    createResizePlugin()\n  ],\n\n  callbacks: {\n    onEventUpdate(updatedEvent) {\n      console.log('onEventUpdate', updatedEvent)\n    },\n\n    // (Optionally) run your validation or side effects\n    // return false to stop the update, and true to allow it\n    onBeforeEventUpdate(oldEvent, newEvent, $app) {\n      return false\n    }\n  }\n})",
        },
        {
          language: 'js',
          content:
            "import { createResizePlugin } from '@sx-premium/resize'\n\nconst calendar = createCalendar({\n  /* other configuration */\n  plugins: [\n    createResizePlugin(30) // 30 minute intervals when resizing\n  ]\n})",
        },
        {
          language: 'js',
          content:
            "import { createResizePlugin } from '@sx-premium/resize'\n\nconst resizePlugin = createResizePlugin()\n\nconst calendar = createCalendar({\n  /* other configuration */\n  plugins: [\n    resizePlugin\n  ]\n})\n\nresizePlugin.setInterval(30)",
        },
      ],
      content:
        'Resize Resize events in the time grid by dragging their bottom edge, and fullday/multiple-day events by dragging their right edge. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage Configuration You can configure the length, in minutes, of the intervals that are used when resizing: Available values are 15 (default), 30 and 60 Methods setInterval(minutes: number) Set the interval, in minutes, for resizing events. Changelog See changelog page.',
    },
    {
      id: 'calendar-plugins-scheduling-assistant',
      title: 'Resource scheduler component',
      description: 'Learn how to use the Schedule-X resource scheduler.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/scheduling-assistant',
      sourcePath:
        'website/app/docs/calendar/plugins/scheduling-assistant/page.mdx',
      section: 'calendar',
      headings: [
        'Scheduling assistant',
        'Features & demo',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'API',
        'SchedulingAssistant',
        'Changelog',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @sx-premium/scheduling-assistant @sx-premium/resource-scheduler @schedule-x/calendar\n@schedule-x/theme-default',
        },
        {
          language: 'js',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport { createHourlyView, createConfig, TimeUnits } from \"@sx-premium/resource-scheduler\";\nimport { createSchedulingAssistant } from '@sx-premium/scheduling-assistant'\n\nimport '@sx-premium/resource-scheduler/index.css'\nimport '@sx-premium/scheduling-assistant/index.css'\nimport '@schedule-x/theme-default/dist/index.css'\n\nconst rConfig = createConfig()\nrConfig.initialHours.value = new TimeUnits().getDayHoursBetween(\n  '2025-03-07 08:00',\n  '2025-03-07 19:00'\n)\nrConfig.infiniteScroll.value = false\nconst hourlyView = createHourlyView(rConfig)\n\nrConfig.resources.value = [\n  {\n    id: 'janedoe',\n    label: 'Jane Doe'\n  },\n  {\n    id: 'johnsmith',\n    label: 'John Smith'\n  },\n  {\n    id: 'tedmosby',\n    label: 'Ted Mosby'\n  }\n]\n\nconst schedulingAssistant = createSchedulingAssistant({\n  initialStart: Temporal.ZonedDateTime.from('2025-03-07T10:00:00+09:00[Asia/Tokyo]'),\n  initialEnd: Temporal.ZonedDateTime.from('2025-03-07T12:00:00+09:00[Asia/Tokyo]')\n})\n\nconst calendar = createCalendar({\n  selectedDate: Temporal.PlainDate.from('2025-03-07'),\n  events: [\n    {\n      id: 'event1',\n      resourceId: 'janedoe',\n      start: Temporal.ZonedDateTime.from('2025-03-07T09:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2025-03-07T10:00:00+09:00[Asia/Tokyo]'),\n      title: 'Event 1'\n    },\n    {\n      id: 'event2',\n      resourceId: 'johnsmith',\n      start: Temporal.ZonedDateTime.from('2025-03-07T10:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2025-03-07T11:00:00+09:00[Asia/Tokyo]'),\n      title: 'Event 2'\n    },\n    {\n      id: 'event3',\n      resourceId: 'tedmosby',\n      start: Temporal.ZonedDateTime.from('2025-03-07T11:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2025-03-07T12:00:00+09:00[Asia/Tokyo]'),\n      title: 'Event 3'\n    },\n    {\n      id: 'event4',\n      resourceId: 'janedoe',\n      start: Temporal.ZonedDateTime.from('2025-03-07T17:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2025-03-07T18:00:00+09:00[Asia/Tokyo]'),\n      title: 'Event 4'\n    }\n  ],\n  views: [hourlyView],\n  plugins: [\n    schedulingAssistant\n  ]\n})\n\ncalendar.render(document.getElementById('your-calendar-wrapper'))",
        },
        {
          language: 'ts',
          content:
            'export interface SchedulingAssistant extends PluginBase<string> {\n  currentStart: Signal<string>\n  currentEnd: Signal<string>\n  hasCollision: Signal<boolean>\n}',
        },
        {
          language: 'ts',
          content:
            "import { effect } from '@preact/signals'\n\neffect(() => {\n  console.log(schedulingAssistant.currentStart.value)\n})",
        },
      ],
      content:
        'Scheduling assistant An Outlook-inspired scheduling assistant that helps you find the best time for a meeting or event. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. Features & demo Go to Demo 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage API SchedulingAssistant Signal is a reactive variable which holds a value property. You can access the value anywhere in your code like schedulingAssistant.currentStart.value , or reactively listen to updates: Changelog See changelog page. Examples These can be added on request. Please let us know if you need an example for a specific framework.',
    },
    {
      id: 'calendar-plugins-scroll-controller',
      title: 'Scroll controller plugin',
      description:
        'Take control over the scrolling in the week- and day view grids.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/scroll-controller',
      sourcePath:
        'website/app/docs/calendar/plugins/scroll-controller/page.mdx',
      section: 'calendar',
      headings: ['Scroll controller', 'Install', 'Usage'],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @schedule-x/scroll-controller',
        },
        {
          language: 'js',
          content:
            "import { createScrollControllerPlugin } from '@schedule-x/scroll-controller'\n\nconst scrollController = createScrollControllerPlugin({\n  initialScroll: '07:50'\n})\n\nconst calendar = createCalendar({\n  /* other configuration */\n\n  plugins: [scrollController]\n})\ncalendar.render(document.getElementById('calendar'))\n\nscrollController.scrollTo('04:00')",
        },
      ],
      content:
        'Scroll controller Take control over the scrolling in the week- and day view grids. Install Usage',
    },
    {
      id: 'calendar-plugins-sidebar',
      title: 'Sidebar plugin',
      description:
        'A component for adding a sidebar to the calendar, with calendar toggles and possibility to add drag-to-create placeholder events.',
      url: 'https://schedule-x.dev/docs/calendar/plugins/sidebar',
      sourcePath: 'website/app/docs/calendar/plugins/sidebar/page.mdx',
      section: 'calendar',
      headings: [
        'Sidebar',
        'Features & demo',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'Changelog',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm install @sx-premium/sidebar',
        },
        {
          language: 'js',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport { createSidebarPlugin, translations as sidebarTranslations } from \"@sx-premium/sidebar\";\nimport { createEventsServicePlugin } from \"@schedule-x/events-service\";\nimport { createInteractiveEventModal, translations as modalTranslations } from \"@sx-premium/interactive-event-modal\";\nimport { createDragToCreatePlugin } from \"@sx-premium/drag-to-create\";\nimport { translations, mergeLocales } from '@schedule-x/translations'\n\nimport '@sx-premium/sidebar/index.css'\nimport '@sx-premium/interactive-event-modal/index.css'\nimport '@schedule-x/theme-default/dist/time-picker.css'\n\nconst eventsService = createEventsServicePlugin()\nconst interactiveEventModal = createInteractiveEventModal({\n  eventsService,\n  availablePeople: ['John Doe', 'Jane Doe'],\n  onAddEvent: (event) => {\n    console.log('Event added', event)\n  }\n})\nconst sidebar = createSidebarPlugin({\n  eventsService,\n\n  // Optional: Should the sidebar be open on render\n  openOnRender: false,\n\n  // Optional: Which calendars should be active on render\n  activeCalendarIds: ['personal', 'work', 'leisure', 'school'],\n\n  // Optional: Should there be calendar toggles\n  hasCalendarToggles: true,\n\n  // Optional: placeholder events for drag-to-create. These can later be updated by calling updatePlaceholderEvents\n  placeholderEvents: [\n    {\n      title: 'Morning brief',\n      calendarId: 'internal',\n      people: ['John Doe', 'Jane Doe', 'Steve Smith'],\n    },\n    {\n      title: 'Client demo',\n      calendarId: 'internal',\n      people: ['John Doe', 'Jane Doe'],\n    },\n    {\n      title: 'Team meeting',\n      calendarId: 'clients',\n      people: ['John Doe', 'Jane Doe', 'Steve Smith'],\n    }\n  ],\n\n  /**\n  * Optional: Should placeholder events be selectable\n  * If set to true, you can later grab the currently selected placeholder event via sidebar.selectedPlaceholderEvent.value\n  * This can, for example, help your users draw events belonging to different calendars\n  * */\n  isPlaceholderEventSelectable: true,\n\n  // Optional: factory function for generating event ids when events are created\n  idFactory: () => uuidv4() // or any other id generator\n})\n\n// Update placeholder events\nsidebar.updatePlaceholderEvents([\n  {\n    title: 'event 1',\n    calendarId: 'internal',\n  }\n])\n\nconst calendar = createCalendar(\n  {\n    translations: mergeLocales(\n      translations,\n      sidebarTranslations,\n      modalTranslations\n    ),\n\n    plugins: [\n      eventsService,\n      sidebar,\n      interactiveEventModal,\n      createDragToCreatePlugin(/* drag-to-create options */)\n    ]\n    // ...config options\n  },\n)\n\ncalendar.render(document.getElementById('your-calendar-wrapper'))",
        },
      ],
      content:
        'Sidebar A component for adding a sidebar to the calendar. Enables you to toggle the visibility of calendars, adds a button for opening the interactive event modal, and enables you to create events through dragging and dropping placeholder events. This is a premium plugin which requires an active license to be used. Learn more at Schedule-X premium. Features & demo Go to Demo 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage Changelog See changelog page. Examples These can be added on request. Please let us know if you need an example for a specific framework. React example: https://github.com/schedule-x/react-examples/blob/main/sidebar/src/App.tsx Angular example: https://github.com/schedule-x/angular-examples/tree/main/sidebar--modal--drag-to-create Svelte example: https://github.com/schedule-x/svelte-examples',
    },
    {
      id: 'calendar-plugins-timezone-select',
      title: 'Timezone select plugin',
      url: 'https://schedule-x.dev/docs/calendar/plugins/timezone-select',
      sourcePath: 'website/app/docs/calendar/plugins/timezone-select/page.mdx',
      section: 'calendar',
      headings: ['Timezone select plugin', 'Installation', 'Usage'],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm install @schedule-x/timezone-select',
        },
        {
          language: 'tsx',
          content:
            "// other imports\nimport { createTimezoneSelectPlugin, translations as timezoneTranslations } from '@schedule-x/timezone-select'\nimport { translations, mergeLocales } from '@schedule-x/translations'\nimport '@schedule-x/timezone-select/index.css'\n\nconst calendar = createCalendar({\n  /* other configuration */\n\n  plugins: [\n    createTimezoneSelectPlugin()\n  ],\n\n  translations: mergeLocales(\n    translations,\n    timezoneTranslations,\n  ),\n})",
        },
      ],
      content:
        'Timezone select plugin The timezone select plugin adds a timezone select UI component to the calendar. Installation Usage',
    },
    {
      id: 'calendar-resource-scheduler',
      title: 'Resource scheduler component',
      description: 'Learn how to use the Schedule-X resource scheduler.',
      url: 'https://schedule-x.dev/docs/calendar/resource-scheduler',
      sourcePath: 'website/app/docs/calendar/resource-scheduler/page.mdx',
      section: 'calendar',
      headings: [
        'Resource Scheduler',
        'Features & demo',
        '2. Installation',
        '2.1 Set up premium auth (only once)',
        '2.2 Install',
        'Usage',
        'API',
        'ResourceSchedulerConfig',
        'Resource',
        'ColorDefinition',
        'Changelog',
        'Examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @sx-premium/resource-scheduler @schedule-x/calendar @schedule-x/translations @schedule-x/theme-default',
        },
        {
          language: 'js',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport { createEventsServicePlugin } from \"@schedule-x/events-service\";\nimport { createInteractiveEventModal, translations as modalTranslations } from \"@sx-premium/interactive-event-modal\";\nimport { createHourlyView, createDailyView, createConfig, translations as resourceViewTranslations, TimeUnits } from\n\"@sx-premium/resource-scheduler\";\nimport { translations, mergeLocales } from '@schedule-x/translations'\nimport { signal } from \"@preact/signals\";\n\nimport '@sx-premium/resource-scheduler/index.css'\nimport '@sx-premium/interactive-event-modal/index.css'\nimport '@schedule-x/theme-default/dist/time-picker.css'\n\nconst resourceConfig = createConfig();\nconst hourlyView = createHourlyView(resourceConfig);\nconst dailyView = createDailyView(resourceConfig);\n\n// enable or disable drag and drop, resizing\nresourceConfig.resize.value = true\nresourceConfig.dragAndDrop.value = true\n\n// optionally set the initially displayed columns of the hourly view\n// can be combined with `infiniteScroll.value = false` to achieve a scheduler with fixed columns\nresourceConfig.initialHours.value = new TimeUnits().getDayHoursBetween(\n  Temporal.PlainDateTime.from('2025-03-07T08:00'),\n  Temporal.PlainDateTime.from('2025-03-07T19:00')\n)\n\n// optionally set the initially displayed days of the daily view\n// can be combined with `infiniteScroll.value = false` to achieve a scheduler with fixed columns\nresourceConfig.initialDays.value = new TimeUnits().getDaysBetween(\n  Temporal.PlainDate.from('2025-03-05'),\n  Temporal.PlainDate.from('2025-03-20')\n)\n\nconst resources = [\n  {\n    label: 'Room 100',\n    id: '1',\n    resources: [\n      {\n        label: 'Room 100A',\n        id: '1.1',\n        isOpen: signal(false),\n        resources: [\n          {\n            label: 'Room 100A1',\n            id: '1.1.1',\n            colorName: 'room-100A1',\n            lightColors: {\n              main: '#1c7df9',\n              container: '#d2e7ff',\n              onContainer: '#002859',\n            },\n          },\n          {\n            label: 'Room 100A2',\n            id: '1.1.2',\n          },\n          {\n            label: 'Room 100A3',\n            id: '1.1.3',\n          }\n        ],\n      },\n      {\n        label: 'Room 100B',\n        id: '1.2',\n        isOpen: signal(false),\n        resources: [\n          {\n            label: 'Room 100B1',\n            id: '1.2.1',\n          },\n          {\n            label: 'Room 100B2',\n            id: '1.2.2',\n          },\n          {\n            label: 'Room 100B3',\n            id: '1.2.3',\n          }\n        ]\n      }\n    ]\n  },\n  {\n    labelHTML: '<span>Room <strong>101</strong></span>',\n    id: '2',\n    colorName: 'room-101',\n    lightColors: {\n      main: '#1c7df9',\n      container: '#d2e7ff',\n      onContainer: '#002859'\n    },\n    darkColors: {\n      main: '#c0dfff',\n      onContainer: '#dee6ff',\n      container: '#426aa2'\n    }\n  }\n]\n\n\nconst eventsService = createEventsServicePlugin()\n\nconst interactiveEventModal = createInteractiveEventModal({\n  eventsService,\n\n  onAddEvent: (event) => {\n    console.log('Event added', event)\n  },\n\n  fields: {\n    title: {},\n    resourceId: {}\n  }\n})\n\nconst calendar = createCalendar({\n  resources,\n  translations: mergeLocales(\n    translations,\n    modalTranslations,\n    resourceViewTranslations\n  ),\n  events: [\n    {\n      id: 1,\n      title: 'Event 1',\n      start: Temporal.ZonedDateTime.from('2024-05-11T14:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2024-05-11T17:00:00+09:00[Asia/Tokyo]'),\n      resourceId: '1'\n    },\n    {\n      id: 2,\n      title: 'Event 2',\n      start: Temporal.ZonedDateTime.from('2024-05-11T14:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2024-05-11T16:00:00+09:00[Asia/Tokyo]'),\n      resourceId: '2'\n    }\n  ],\n  views: [hourlyView, dailyView],\n  plugins: [\n    eventsService,\n    interactiveEventModal\n  ]\n})\n\ncalendar.render(document.getElementById('your-calendar-wrapper'))",
        },
        {
          language: 'ts',
          content:
            "export type ResourceViewConfig = {\n  // width of a column in the hourly view\n  hourWidth: Signal<number>\n\n  // width of a column in the daily view\n  dayWidth: Signal<number>\n\n  // height of a resource row\n  resourceHeight: Signal<number>\n\n  // height of an event\n  eventHeight: Signal<number>\n\n  // should drag and drop be enabled\n  dragAndDrop: Signal<boolean>\n\n  // should resizing be enabled\n  resize: Signal<boolean>\n\n  // can be used to set the day boundaries of the hourly view\n  // start and end can be integers between 0 and 23, representing the hour of the day\n  dayBoundaries: Signal<{ start: number, end: number }>\n\n  // should infinite scroll be enabled\n  infiniteScroll: Signal<boolean>\n\n  // callback that runs when the user scrolls the hourly view\n  onLazyLoadDate?: (dates: Temporal.PlainDate[]) => void\n\n  // Can be used to debounce the lazy load date callback with any number of milliseconds. Defaults to 0.\n  lazyLoadDateDebounce: Signal<number>\n\n  // callback that runs when the user scrolls the daily view\n  onLazyLoadMonth?: (dates: Temporal.PlainDate[]) => void\n\n  // callback for detecting clicks in the hourly view\n  onClickDateTime: Signal<(datetime: Temporal.ZonedDateTime, resourceId: string) => void>\n\n  // callback for detecting double clicks in the hourly view\n  onDoubleClickDateTime: Signal<(datetime: Temporal.ZonedDateTime, resourceId: string) => void>\n\n  // callback for detecting clicks in the daily view\n  onClickDate: Signal<(date: Temporal.PlainDate, resourceId: string) => void>\n\n  // callback for detecting double clicks in the daily view\n  onDoubleClickDate: Signal<(date: Temporal.PlainDate, resourceId: string) => void>\n\n  // callback for detecting clicks on a resource\n  onClickResource: Signal<(resourceId: string) => void>\n\n  // Can be used to set the initially displayed hours of the hourly view\n  initialHours: Signal<Temporal.PlainDateTime[] | undefined>\n\n  // Can be used to set the initially displayed days of the daily view\n  initialDays: Signal<Temporal.PlainDate[] | undefined>\n\n  // Can be used to configure the snapping duration of drag & drop\n  dragSnapping: Signal<15 | 30 | 60>\n\n  // Can be used to configure the snapping duration of resizing\n  resizeSnapping: Signal<15 | 30 | 60>\n\n  // Dictates whether the current day should be highlighted in both daily and hourly view. Defaults to true.\n  highlightToday: signal(false),\n\n  // Can be used to configure the format of the day names in daily view. Defaults to 'short'. Disable day names by setting to false.\n  dayNameFormat: Signal<false | 'short' | 'long' | 'narrow' | ((date: Temporal.PlainDate, locale: string) => string)>\n}",
        },
        {
          language: 'ts',
          content:
            'export type Resource = {\n  label?: string\n  labelHTML?: string\n  id: string\n  colorName?: string\n  lightColors?: ColorDefinition\n  darkColors?: ColorDefinition\n  resources?: Resource[]\n  isOpen?: Signal<boolean>\n}',
        },
        {
          language: 'ts',
          content:
            'export type ColorDefinition = {\n  main: string\n  container: string\n  onContainer: string\n}',
        },
      ],
      content:
        'Resource Scheduler A view for displaying resources (people, rooms, equipment etc.) in a time grid. This is a premium feature which requires an active license to be used. Learn more at Schedule-X premium. Features & demo Go to Demo 2. Installation 2.1 Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2.2 Install Usage API ResourceSchedulerConfig Signal is a reactive variable which holds a value property. This enables you to reactively update the value of your config variables. So if you wish to override the default hourWidth of the hourly view, you can do so by setting config.hourWidth.value = 100 . Resource ColorDefinition Changelog See changelog page. Examples These can be added on request. Please let us know if you need an example for a specific framework. React example: https://github.com/schedule-x/react-examples/blob/main/resource-scheduler/src/App.tsx Vue example: https://github.com/schedule-x/vue-examples/tree/main/resource-scheduler Angular example: https://github.com/schedule-x/angular-examples/tree/main/resource-scheduler',
    },
    {
      id: 'calendar-temporal',
      title: 'Schedule-X & Temporal API',
      url: 'https://schedule-x.dev/docs/calendar/temporal',
      sourcePath: 'website/app/docs/calendar/temporal/page.mdx',
      section: 'calendar',
      headings: [
        'Schedule-X & Temporal API',
        'Polyfilling Temporal',
        'Example',
        'Browser support',
        'Converting different date and time formats to Temporal',
        'RFC 9557',
        'Old custom Schedule-X date and time formats',
        'JS Date',
      ],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import 'temporal-polyfill/global'\n\nconst date = Temporal.PlainDate.from('2025-01-01')\nconsole.log(date.toString())\n\nconst calendar = createCalendar({\n    events: [\n        {\n            id: 1,\n            start: Temporal.PlainDate.from('2025-01-01'),\n            end: Temporal.PlainDate.from('2025-01-02'),\n        },\n        {\n            id: 2,\n            start: Temporal.ZonedDateTime.from('2025-01-01T12:00:00+01:00[Europe/Berlin]'),\n            end: Temporal.ZonedDateTime.from('2025-01-01T13:00:00+01:00[Europe/Berlin]'),\n        }\n   ] \n})",
        },
        {
          language: 'ts',
          content:
            "const plainDate = Temporal.PlainDate.from('1996-12-19')\nconst zonedDateTime = Temporal.ZonedDateTime.from('1996-12-19T16:39:57-08:00[America/Los_Angeles]')",
        },
        {
          language: 'ts',
          content:
            "const oldDateString = '2025-01-01'\nconst plainDate = Temporal.PlainDate.from(oldDateString)\n\nfunction convertOldDateTimeStringToZonedDateTime(dateString: string): Temporal.ZonedDateTime {\n    const [date, time] = dateString.split(' ')\n    const [year, month, day] = date.split('-')\n    const [hour, minute] = time.split(':')\n    return Temporal.ZonedDateTime.from({\n        year: parseInt(year),\n        month: parseInt(month),\n        day: parseInt(day),\n        hour: parseInt(hour),\n        minute: parseInt(minute),\n        timeZone: 'UTC',\n    })\n}\n\nconst oldDateTimeString = '2025-01-01 12:00'\nconst zonedDateTime = convertOldDateTimeStringToZonedDateTime(oldDateTimeString)",
        },
        {
          language: 'ts',
          content:
            "function dateToZonedDateTime(date, timeZone = \"UTC\") {\n  // Convert JS Date → Instant\n  // This is basically the Temporal equivalent of a JS Date\n  // i.e. a plain point in time represented by a number of milliseconds since the Unix epoch\n  const instant = Temporal.Instant.fromEpochMilliseconds(date.getTime());\n\n  // Convert Instant → ZonedDateTime\n  return instant.toZonedDateTimeISO(timeZone);\n}\n\nconst jsDate = new Date('2025-01-01T12:00:00Z')\nconst zonedDateTime = dateToZonedDateTime(jsDate, 'Europe/Berlin')",
        },
      ],
      content:
        "Schedule-X & Temporal API Schedule-X uses the Temporal API to handle dates and times. If you are not yet familiar with this API or its background, here's a blog post that explains some of its benefits: https://docs.timetime.in/blog/js-dates-finally-fixed/ Since Temporal only started becoming available in browsers in 2025, most users of Schedule-X will need to polyfill it. On the one hand, this adds a dependency to your project, but on the other hand, it allows Schedule-X to tap into date and time features that are not available in the native Date API. This made it possible to implement support for timezones with very little effort, which is something the community has requested repeatedly. Polyfilling Temporal There are at least 2 well-maintained polyfills available for Temporal: - https://www.npmjs.com/package/temporal-polyfill - https://www.npmjs.com/package/@js-temporal/polyfill Example Browser support If you know all of your users well, and know that they are using a browser that supports Temporal, you do not need to polyfill it. You can check current browser support for Temporal here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global Objects/Temporal browser compatibility Converting different date and time formats to Temporal RFC 9557 If you are setting up a new application, consider saving strings compatibe with RFC 9557 in your DB. These are likely the future of date and time formats on the internet anyway. If you do, you can simply convert them to the appropriate Temporal object like so: Old custom Schedule-X date and time formats Schedule-X used to have its own custom date and time formats. These are not compatible with Temporal, but you can convert them to Temporal like so: JS Date If you are using a JS Date object, you can first convert it to a Temporal.Instant, and then convert it to a Temporal.ZonedDateTime:",
    },
    {
      id: 'calendar-theme',
      title: 'Theme',
      description:
        'Learn how to customize the appearance of the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/theme',
      sourcePath: 'website/app/docs/calendar/theme/page.mdx',
      section: 'calendar',
      headings: [
        '💅 Theme',
        'Shadcn Theme',
        'Customizing the default theme colors',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content: 'npm i @schedule-x/theme-shadcn',
        },
        {
          language: 'tsx',
          content:
            "import '@schedule-x/theme-shadcn/dist/index.css'\nimport { createCalendar } from '@schedule-x/calendar'\n\nconst calendar = createCalendar({\n  // ... other config,\n  theme: 'shadcn'\n})",
        },
        {
          language: 'css',
          content:
            ':root {\n  --sx-color-primary: #6750a4;\n  --sx-color-on-primary: #fff;\n  --sx-color-primary-container: #eaddff;\n  --sx-color-on-primary-container: #21005e;\n  --sx-color-secondary: #625b71;\n  --sx-color-on-secondary: #fff;\n  --sx-color-secondary-container: #e8def8;\n  --sx-color-on-secondary-container: #1e192b;\n  --sx-color-tertiary: #7d5260;\n  --sx-color-on-tertiary: #fff;\n  --sx-color-tertiary-container: #ffd8e4;\n  --sx-color-on-tertiary-container: #370b1e;\n  --sx-color-surface: #fef7ff;\n  --sx-color-surface-dim: #ded8e1;\n  --sx-color-surface-bright: #fef7ff;\n  --sx-color-on-surface: #1c1b1f;\n  --sx-color-surface-container: #f3edf7;\n  --sx-color-surface-container-low: #f7f2fa;\n  --sx-color-surface-container-high: #ece6f0;\n  --sx-color-background: #fff; // deviation from material 3, which would be #FEF7FF\n  --sx-color-on-background: #1c1b1f;\n  --sx-color-outline: #79747e;\n  --sx-color-outline-variant: #c4c7c5;\n  --sx-color-shadow: #000;\n  --sx-color-surface-tint: #6750a4;\n  --sx-color-neutral: var(--sx-color-outline);\n  --sx-color-neutral-variant: var(--sx-color-outline-variant);\n\n  // internally defined colors, not belonging to the material design spec\n  --sx-internal-color-gray-ripple-background: #e0e0e0;\n  --sx-internal-color-light-gray: #fafafa;\n  --sx-internal-color-text: #000;\n}',
        },
      ],
      content:
        '💅 Theme You are not required to use any of the styles from the @schedule-x/theme-default package. If you are up for it, you can create your own theme from scratch, or just override rules of the default theme. If you do so, however, you might want to pin your schedule-x dependencies to a specific version, to avoid unexpected updates that might break your custom styles. Shadcn Theme For apps that are using Shadcn with its default design, you may want to use @schedule-x/theme-shadcn . Demo app Schedule-X is in no way affiliated with Shadcn, and this theme is not an official Shadcn software. It is merely a theme for Schedule-X that is designed to match with the Shadcn design. Customizing the default theme colors Schedule-X uses global CSS variables to define colors. Therefore, you can override the following CSS variables to customize the colors of the default theme:',
    },
    {
      id: 'calendar-time-grid-resource-view',
      title: 'Time Grid Resource View',
      description: 'Learn how to use the Schedule-X time grid resource view.',
      url: 'https://schedule-x.dev/docs/calendar/time-grid-resource-view',
      sourcePath: 'website/app/docs/calendar/time-grid-resource-view/page.mdx',
      section: 'calendar',
      headings: [
        'Time Grid Resource View',
        'Features & demo',
        'Installation',
        '1. Set up premium auth (only once)',
        '2. Install',
        'Usage',
        'API',
        'Resource',
        'ColorDefinition',
        'Events with resources',
        'Changelog',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @sx-premium/time-grid-resource-view @schedule-x/calendar @schedule-x/theme-default',
        },
        {
          language: 'js',
          content:
            "import { createCalendar } from '@schedule-x/calendar'\nimport { createViewTimeGridResource } from \"@sx-premium/time-grid-resource-view\";\n\nimport '@schedule-x/theme-default/dist/index.css'\nimport '@sx-premium/time-grid-resource-view/index.css'\n\nconst resources = [\n  {\n    id: 'room-1',\n    label: 'Conference Room A',\n    colorName: 'room-a',\n    lightColors: {\n      main: '#1c7df9',\n      container: '#d2e7ff',\n      onContainer: '#002859',\n    },\n    darkColors: {\n      main: '#c0dfff',\n      onContainer: '#dee6ff',\n      container: '#426aa2',\n    },\n  },\n  {\n    id: 'room-2',\n    label: 'Meeting Room B',\n    colorName: 'room-b',\n    lightColors: {\n      main: '#f91c45',\n      container: '#ffd2dc',\n      onContainer: '#59000d',\n    },\n    darkColors: {\n      main: '#ffc0cc',\n      onContainer: '#ffdee6',\n      container: '#a24258',\n    },\n  },\n]\n\nconst calendar = createCalendar({\n  resources,\n  views: [createViewTimeGridResource()],\n  events: [\n    {\n      id: '1',\n      title: 'Team standup',\n      start: Temporal.ZonedDateTime.from('2024-05-06T09:00:00-04:00[America/New_York]'),\n      end: Temporal.ZonedDateTime.from('2024-05-06T09:30:00-04:00[America/New_York]'),\n      resourceId: 'room-1',\n    },\n    {\n      id: '2',\n      title: 'Client presentation',\n      start: Temporal.ZonedDateTime.from('2024-05-06T10:00:00-04:00[America/New_York]'),\n      end: Temporal.ZonedDateTime.from('2024-05-06T12:00:00-04:00[America/New_York]'),\n      resourceId: 'room-1',\n    },\n    {\n      id: '3',\n      title: 'Product review',\n      start: Temporal.ZonedDateTime.from('2024-05-06T09:00:00-04:00[America/New_York]'),\n      end: Temporal.ZonedDateTime.from('2024-05-06T10:30:00-04:00[America/New_York]'),\n      resourceId: 'room-2',\n    },\n    {\n      id: '4',\n      title: 'Design workshop',\n      start: Temporal.ZonedDateTime.from('2024-05-06T13:00:00-04:00[America/New_York]'),\n      end: Temporal.ZonedDateTime.from('2024-05-06T15:00:00-04:00[America/New_York]'),\n      resourceId: 'room-2',\n    },\n  ],\n})\n\ncalendar.render(document.getElementById('your-calendar-wrapper'))",
        },
        {
          language: 'ts',
          content:
            'export type Resource = {\n  id: string\n  label?: string\n  labelHTML?: string\n  colorName?: string\n  lightColors?: ColorDefinition\n  darkColors?: ColorDefinition\n}',
        },
        {
          language: 'ts',
          content:
            'export type ColorDefinition = {\n  main: string\n  container: string\n  onContainer: string\n}',
        },
        {
          language: 'ts',
          content:
            "{\n  id: '1',\n  title: 'Team meeting',\n  start: Temporal.ZonedDateTime.from('2024-05-06T09:00:00-04:00[America/New_York]'),\n  end: Temporal.ZonedDateTime.from('2024-05-06T10:00:00-04:00[America/New_York]'),\n  resourceId: 'room-1', // matches resource id\n}",
        },
      ],
      content:
        'Time Grid Resource View A view for displaying resources (people, rooms, equipment etc.) alongside regular calendar views. This view displays resources as columns, with each column showing the events for that resource within the current week. This is a premium feature which requires an active license to be used. Learn more at Schedule-X premium. Features & demo Go to Demo Installation 1. Set up premium auth (only once) Follow the instructions for setting up an .npmrc 2. Install Usage API Resource Resources are defined using the same structure as in the resource scheduler. Each resource requires an id and can have a label , custom colors, and other properties. ColorDefinition Events with resources To associate an event with a resource, add a resourceId property to the event object that matches the id of a resource. Changelog See changelog page.',
    },
    {
      id: 'calendar-views',
      title: 'Calendar views',
      description:
        'Learn about the different views available in the Schedule-X calendar',
      url: 'https://schedule-x.dev/docs/calendar/views',
      sourcePath: 'website/app/docs/calendar/views/page.mdx',
      section: 'calendar',
      headings: [
        'Calendar views',
        'A note on screen sizes',
        'The available views',
        'An example using all views',
        'Loading events',
        'Day, Week and Agenda views',
        'List view',
      ],
      codeBlocks: [
        {
          language: 'ts',
          content:
            "import {\n  createViewDay,\n  createViewWeekAgenda,\n  createViewMonthAgenda,\n  createViewMonthGrid,\n  createViewWeek,\n  createViewList,\n  createCalendar\n} from '@schedule-x/calendar'\nimport '@schedule-x/theme-default/dist/index.css'\n\nconst calendar = createCalendar({\n  views: [createViewDay(), createViewWeekAgenda(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek(), createViewList()],\n\n  events: [],\n})\n\ncalendar.render(document.getElementById('calendar'))",
        },
        {
          language: 'ts',
          content:
            "const calendar = createCalendar({\n  views: [createViewDay(), createViewWeekAgenda(), createViewMonthAgenda(), createViewMonthGrid(), createViewWeek()],\n \n  events: [],\n\n  callbacks: {\n    onRangeUpdate: ({ start, end }) => {\n      // Load events for the new range\n    }\n  }\n})\n \ncalendar.render(document.getElementById('calendar'))",
        },
        {
          language: 'ts',
          content:
            "const calendar = createCalendar({\n  views: [createViewList()],\n \n  events: [],\n\n  callbacks: {\n    onScrollDayIntoView: (date) => {\n      // Load events for the new range\n    }\n  }\n})\n \ncalendar.render(document.getElementById('calendar'))",
        },
      ],
      content:
        'Calendar views The views are the most basic building blocks of the calendar. There are currently 6 views available, as listed below, but first: A note on screen sizes The Schedule-X calendar is designed to be responsive. Given standard browser settings where 1rem = 16px, the calendar has an internal break point of 700px: below this break point, the calendar tries to display only views that are compatible with small screens. Above this break point, the calendar tries to display only views that are compatible with large screens. If your users will view the calendar on small as well as large screens, you need to include at least one view compatible with small screens and at least one view compatible with large screens. The available views View name Large screens Small screens -------------------------------------------------------------- --------------- --------------- Day Yes Yes Month grid Yes No Month agenda No Yes Week agenda No Yes Week Yes No List Yes Yes Resource view (premium) Yes Yes An example using all views Loading events The strategy for loading events will differ slightly depending on the view. Day, Week and Agenda views When a user navigates to new days, weeks or months, the calendar will invoke onRangeUpdate , which you can use to load the events for the new range. List view The list view is a bit different. When a user scrolls through the list, the calendar will invoke onScrollDayIntoView . You can then use this callback as a hint for when to load more events. For example, if you start by loading all events for January 2026, you can then use this callback to load events for February 2026, when the user reaches one of the last days of January.',
    },
    {
      id: 'frameworks-angular',
      title: 'Angular component',
      description:
        'Learn how to use the Schedule-X calendar in an Angular application',
      url: 'https://schedule-x.dev/docs/frameworks/angular',
      sourcePath: 'website/app/docs/frameworks/angular/page.mdx',
      section: 'frameworks',
      headings: [
        'Angular component',
        'Installing',
        'Basic usage',
        'Example',
        'Explanation',
        'Styles',
        'Custom markup',
        'Example',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @schedule-x/angular @schedule-x/calendar @schedule-x/theme-default',
        },
        {
          language: 'bash',
          content:
            'pnpm install @schedule-x/angular @schedule-x/calendar @schedule-x/theme-default @preact/signals preact',
        },
        {
          language: 'bash',
          content:
            'yarn add @schedule-x/angular @schedule-x/calendar @schedule-x/theme-default @preact/signals preact',
        },
        {
          language: 'ts',
          content:
            "// app.component.ts\nimport { Component } from '@angular/core';\nimport { RouterOutlet } from '@angular/router';\nimport { CalendarComponent } from \"@schedule-x/angular\";\nimport { createCalendar, createViewWeek } from \"@schedule-x/calendar\";\nimport '@schedule-x/theme-default/dist/index.css' // can alternatively be added in your angular.json\nimport 'temporal-polyfill/global';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [RouterOutlet, CalendarComponent],\n  templateUrl: './app.component.html',\n  styleUrl: './app.component.css'\n})\nexport class AppComponent {\n  title = 'angular-example';\n  calendarApp = createCalendar({\n    events: [\n      {\n        id: '1',\n        title: 'Event 1',\n        start: Temporal.Now.zonedDateTimeISO(),\n        end: Temporal.Now.zonedDateTimeISO().add({ hours: 1 }),\n\n      },\n    ],\n    views: [createViewWeek()],\n  })\n}",
        },
        {
          language: 'html',
          content:
            '<!-- app.component.html -->\n\n<main class="main">\n  <div class="content">\n    <sx-calendar [calendarApp]="calendarApp"></sx-calendar>\n  </div>\n</main>\n\n<router-outlet />',
        },
        {
          language: 'css',
          content:
            '.ng-calendar-wrapper {\n  width: 1200px;\n  max-width: 100vw;\n  height: 800px;\n  max-height: 90vh;\n}',
        },
        {
          language: 'html',
          content:
            '<ng-template #timeGridEvent let-arg>\n  <div style="background-color: #d6c5ea; border: 2px solid #856dc0; height: 100%; width: 100%; border-radius: 5px;\npadding: 5px">\n    <div>Time grid event: {{ arg.calendarEvent.title }}</div>\n  </div>\n</ng-template>',
        },
      ],
      content:
        'Angular component This page offers documentation for using the Schedule-X calendar in Angular. For general documentation on configuring the calendar, refer to the rest of the documentation. If you are using Schedule-X in an app with SSR, you need to make sure the component only renders in the browser. Installing Basic usage Example Explanation The calendar instance The createCalendar function takes a configuration object as its single argument, and returns an instance of the calendar app. The calendar instance contains some methods that you can use to interact with the calendar events and toggle between light and dark mode. For more on this, refer to the rest of the calendar docs. Styles The Schedule-X calendar is a responsive component. To achieve this, it cannot be delivered with a fixed height or width of its own. You need to define the height and width of the wrapping element .ng-calendar-wrapper according to your needs. For a regular desktop application, something like this might do the trick for you: Custom markup You can also use ng-template to take control over some of the markup rendered in the calendar. For example, you can create a custom event for the time grid, in the week- and day views, like this: All available templates are: Template name Description Args ----------------------------- ------------------------------------------------------------------ --------------------------------- timeGridEvent The component for timed events used in the week- and day views calendarEvent dateGridEvent The component for all-day events used in the week- and day views calendarEvent monthGridEvent The component for events used in the month grid view calendarEvent , hasStartDate monthAgendaEvent The component for events used in the month agenda view calendarEvent weekAgendaEvent The component for events used in the week agenda view calendarEvent monthAgendaDateDots Replaces the date dots in the month agenda view date , jsDate , events eventModal The component for the modal that opens when clicking an event calendarEvent headerContentLeftPrepend Prepends content to the left part of the header $app headerContentLeftAppend Appends content to the left part of the header $app headerContentRightPrepend Prepends content to the right part of the header $app headerContentRightAppend Appends content to the right part of the header $app Visual overview of all components Example An example repo with a working Angular setup can be found here.',
    },
    {
      id: 'frameworks-preact',
      title: 'Preact component',
      description:
        'Learn how to use the Schedule-X calendar in a Preact application',
      url: 'https://schedule-x.dev/docs/frameworks/preact',
      sourcePath: 'website/app/docs/frameworks/preact/page.mdx',
      section: 'frameworks',
      headings: [
        'Preact component',
        'Installing',
        'Basic usage',
        'Example',
        'Styles',
        'Custom components',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @schedule-x/preact @schedule-x/calendar @schedule-x/theme-default temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'pnpm install @schedule-x/preact @schedule-x/calendar @schedule-x/theme-default @preact/signals preact temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'yarn add @schedule-x/preact @schedule-x/calendar @schedule-x/theme-default @preact/signals preact temporal-polyfill',
        },
        {
          language: 'tsx',
          content:
            "import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/preact'\nimport {\n  createViewDay,\n  createViewWeekAgenda,\n  createViewMonthAgenda,\n  createViewMonthGrid,\n  createViewWeek,\n} from '@schedule-x/calendar'\nimport { createDragAndDropPlugin } from '@sx-premium/drag-and-drop'\nimport 'temporal-polyfill/global'\nimport '@schedule-x/theme-default/dist/index.css'\n\nconst dragAndDrop = createDragAndDropPlugin()\n\nfunction CalendarApp() {\n  const calendar = useCalendarApp({\n    views: [\n      createViewDay(),\n      createViewWeekAgenda(),\n      createViewWeek(),\n      createViewMonthGrid(),\n      createViewMonthAgenda(),\n    ],\n    events: [\n      {\n        id: '1',\n        title: 'Event 1',\n        start: Temporal.PlainDate.from('2023-12-16'),\n        end: Temporal.PlainDate.from('2023-12-16'),\n      },\n    ],\n    plugins: [dragAndDrop],\n  })\n\n  return (\n    <div>\n      <ScheduleXCalendar calendarApp={calendar} />\n    </div>\n  )\n}\n\nexport default CalendarApp;",
        },
        {
          language: 'css',
          content:
            '.sx-preact-calendar-wrapper {\n  width: 1200px;\n  max-width: 100vw;\n  height: 800px;\n  max-height: 90vh;\n}',
        },
      ],
      content:
        'Preact component This page offers documentation for using the Schedule-X calendar in Preact. For general documentation on configuring and interacting with the calendar, refer to the rest of the calendar documentation. Installing Curious about the temporal-polyfill package? Read more here. Basic usage Example Styles The Schedule-X calendar is a responsive component. To achieve this, it cannot be delivered with a fixed height or width of its own. You need to define the height and width of the wrapping element .sx-preact-calendar-wrapper according to your needs. For a regular desktop application, something like this might do the trick for you: Custom components The Schedule-X calendar is built with customization in mind. Currently, you can use the following custom components to take control over certain parts of the calendar. This is done by writing your own Preact components: Slot / Component name Description Props ----------------------------- --------------------------------------------------------------------- --------------------------------- timeGridEvent The component for timed events used in the week- and day views calendarEvent dateGridEvent The component for all-day events used in the week- and day views calendarEvent weekGridDate Replaces the day name and date in the header of day- and week views date weekGridHour Replaces the hour in the time axis of day- and week views hour , gridStep monthGridEvent The component for events used in the month grid view calendarEvent , hasStartDate monthGridDayName Replaces day names like "Mon", "Tue" in month grid day (0-6, like in JS-dates) monthGridDate Replaces date of month in month grid date , jsDate monthAgendaEvent The component for events used in the month agenda view calendarEvent weekAgendaEvent The component for events used in the week agenda view calendarEvent monthAgendaDateDots Replaces the date dots in the month agenda view date , jsDate , events eventModal The component for the modal that opens when clicking an event calendarEvent headerContentLeftPrepend Prepends content to the left part of the header $app headerContentLeftAppend Appends content to the left part of the header $app headerContentRightPrepend Prepends content to the right part of the header $app headerContentRightAppend Appends content to the right part of the header $app headerContent Replaces the whole header content $app sidebarAddEventButton "Add event" button in the sidebar plugin onClick resourceEvent Event element in resource scheduler calendarEvent , resource sidebarPlaceholderEvent Placeholder event in the sidebar plugin calendarEvent',
    },
    {
      id: 'frameworks-react',
      title: 'React component',
      description:
        'Learn how to use the Schedule-X calendar in a React application',
      url: 'https://schedule-x.dev/docs/frameworks/react',
      sourcePath: 'website/app/docs/frameworks/react/page.mdx',
      section: 'frameworks',
      headings: [
        'React component',
        'Installing',
        'Basic usage',
        'Example',
        'Styles',
        'Custom components',
        'More examples',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @schedule-x/react @schedule-x/calendar @schedule-x/theme-default @schedule-x/events-service temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'pnpm install @schedule-x/react @schedule-x/calendar @schedule-x/theme-default @schedule-x/events-service @preact/signals preact temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'yarn add @schedule-x/react @schedule-x/calendar @schedule-x/theme-default @schedule-x/events-service @preact/signals preact temporal-polyfill',
        },
        {
          language: 'js',
          content:
            "import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react/dist/index'",
        },
        {
          language: 'css',
          content:
            '.sx-react-calendar-wrapper {\n  width: 1200px;\n  max-width: 100vw;\n  height: 800px;\n  max-height: 90vh;\n}',
        },
      ],
      content:
        'React component This page offers documentation for using the Schedule-X calendar in React. For general documentation on configuring and interacting with the calendar, refer to the rest of the calendar documentation. Installing In this example we will set up a calendar with the default theme, and a plugin for retrieving and updating events. Curious about the temporal-polyfill package? Read more here. Basic usage Example Depending on your build tools, you might need to target the ESM file from @schedule-x/react explicitly: Styles The Schedule-X calendar is a responsive component. To achieve this, it cannot be delivered with a fixed height or width of its own. You need to define the height and width of the wrapping element .sx-react-calendar-wrapper according to your needs. For a regular desktop application, something like this might do the trick for you: Custom components The Schedule-X calendar is built with customization in mind. Currently, you can use the following custom components to take control over certain parts of the calendar. This is done by writing your own React components: Slot / Component name Description Props ----------------------------- --------------------------------------------------------------------- --------------------------------- timeGridEvent The component for timed events used in the week- and day views calendarEvent dateGridEvent The component for all-day events used in the week- and day views calendarEvent weekGridDate Replaces the day name and date in the header of day- and week views date weekGridHour Replaces the hour in the time axis of day- and week views hour , gridStep monthGridEvent The component for events used in the month grid view calendarEvent , hasStartDate monthGridDayName Replaces day names like "Mon", "Tue" in month grid day (0-6, like in JS-dates) monthGridDate Replaces date of month in month grid date , jsDate monthAgendaEvent The component for events used in the month agenda view calendarEvent weekAgendaEvent The component for events used in the week agenda view calendarEvent monthAgendaDateDots Replaces the date dots in the month agenda view date , jsDate , events eventModal The component for the modal that opens when clicking an event calendarEvent headerContentLeftPrepend Prepends content to the left part of the header $app headerContentLeftAppend Appends content to the left part of the header $app headerContentRightPrepend Prepends content to the right part of the header $app headerContentRightAppend Appends content to the right part of the header $app headerContent Replaces the whole header content $app sidebarAddEventButton "Add event" button in the sidebar plugin onClick resourceEvent Event element in resource scheduler calendarEvent , resource sidebarPlaceholderEvent Placeholder event in the sidebar plugin calendarEvent An example of how to use these components can be found here: https://github.com/schedule-x/react-example/blob/main/src/App.tsx Visual overview of all components More examples A repo with more examples can be found here: https://github.com/schedule-x/react-examples',
    },
    {
      id: 'frameworks-svelte',
      title: 'Svelte component',
      description:
        'Learn how to use the Schedule-X calendar in a Svelte application',
      url: 'https://schedule-x.dev/docs/frameworks/svelte',
      sourcePath: 'website/app/docs/frameworks/svelte/page.mdx',
      section: 'frameworks',
      headings: [
        'Svelte component',
        'Installing',
        'Basic usage',
        'Example',
        'Explanation',
        'Styles',
        'Slots & custom components',
        'Custom component example',
        'Links',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @schedule-x/svelte @schedule-x/calendar @schedule-x/theme-default temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'pnpm install @schedule-x/svelte @schedule-x/calendar @schedule-x/theme-default @preact/signals preact temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'yarn add @schedule-x/svelte @schedule-x/calendar @schedule-x/theme-default @preact/signals preact temporal-polyfill',
        },
        {
          language: 'svelte',
          content:
            "<div>\n\t{#if calendarApp}\n\t\t<ScheduleXCalendar calendarApp={calendarApp} />\n\t{/if}\n</div>\n\n<script lang=\"ts\">\n\timport { ScheduleXCalendar } from '@schedule-x/svelte';\n\timport { createCalendar, createViewDay, createViewWeek } from '@schedule-x/calendar';\n\timport '@schedule-x/theme-default/dist/index.css';\n\timport 'temporal-polyfill/global'\n\timport { onMount } from 'svelte';\n \n\tlet calendarApp = $state();\n\tonMount(() => {\n\t\tcalendarApp = createCalendar({\n\t\t\tviews: [createViewDay(), createViewWeek()],\n\t\t\tevents: [\n\t\t\t\t{\n\t\t\t\t\tid: '1',\n\t\t\t\t\ttitle: 'Event 1',\n\t\t\t\t\tstart: Temporal.PlainDate.from('2024-07-06'),\n\t\t\t\t\tend: Temporal.PlainDate.from('2024-07-06'),\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tid: '2',\n\t\t\t\t\ttitle: 'Event 2',\n\t\t\t\t\tstart: Temporal.ZonedDateTime.from('2024-07-06T02:00:00+09:00[Asia/Tokyo]'),\n\t\t\t\t\tend: Temporal.ZonedDateTime.from('2024-07-06T04:00:00+09:00[Asia/Tokyo]'),\n\t\t\t\t},\n\t\t\t]\n\t\t});\n\t});\n</script>",
        },
        {
          language: 'css',
          content:
            '.sx-svelte-calendar-wrapper {\n  width: 1200px;\n  max-width: 100vw;\n  height: 800px;\n  max-height: 90vh;\n}',
        },
        {
          language: 'svelte',
          content:
            '// TimeGridEvent.svelte\n<div>\n\t{calendarEvent.title}\n</div>\n\n<script lang="ts">\n\texport let calendarEvent;\n</script>',
        },
        {
          language: 'svelte',
          content:
            "// App.svelte\n<div>\n\t<ScheduleXCalendar calendarApp=\"{calendarApp}\" timeGridEvent=\"{TimeGridEvent}\" />\n</div>\n\n<script lang=\"ts\">\n\timport { ScheduleXCalendar } from '@schedule-x/svelte';\n\timport { createCalendar, createViewDay, createViewWeek } from '@schedule-x/calendar';\n\timport '@schedule-x/theme-default/dist/index.css';\n\timport TimeGridEvent from '$lib/TimeGridEvent.svelte';\n\timport 'temporal-polyfill/global'\n\n\tconst calendarApp = createCalendar({\n\t\tviews: [createViewWeek(), createViewDay()],\n\t\tevents: [\n\t\t\t{\n\t\t\t\tid: '2',\n\t\t\t\ttitle: 'Event 2',\n\t\t\t\tstart: Temporal.ZonedDateTime.from('2024-07-06T02:00:00+09:00[Asia/Tokyo]'),\n\t\t\t\tend: Temporal.ZonedDateTime.from('2024-07-06T04:00:00+09:00[Asia/Tokyo]'),\n\t\t\t},\n\t\t]\n\t})\n</script>",
        },
      ],
      content:
        'Svelte component This page offers documentation for using the Schedule-X calendar in Svelte. For general documentation on configuring the calendar, refer to the rest of the documentation. Installing Curious about the temporal-polyfill package? Read more here. If you\'re using a package manager that does not automatically download peer dependencies, you will additionally need to install @schedule-x/calendar , @preact/signals and preact . This is for example the case for yarn and npm < v7 . Basic usage Example Explanation The calendar instance The createCalendar function takes a configuration object as its single argument, and returns an instance of the calendar app. The calendar instance contains some methods that you can use to interact with the calendar events and toggle between light and dark mode. For more on this, refer to the rest of the calendar docs. The component The ScheduleXCalendar component then takes the calendar instance as a prop calendarApp and renders the calendar for you. This means you should not call the render method of the calendar instance yourself, as shown in other examples in the docs. Styles The Schedule-X calendar is a responsive component. To achieve this, it cannot be delivered with a fixed height or width of its own. You need to define the height and width of the wrapping element .sx-svelte-calendar-wrapper according to your needs. For a regular desktop application, something like this might do the trick for you: Slots & custom components Schedule-X is built with customization in mind. Therefore, you can take control over many parts of the UI of the calendar, by passing your own Svelte components as props. Currently, these components can be customized: Slot / Component name Description Props ----------------------------- --------------------------------------------------------------------- --------------------------------- timeGridEvent The component for timed events used in the week- and day views calendarEvent dateGridEvent The component for all-day events used in the week- and day views calendarEvent weekGridDate Replaces the day name and date in the header of day- and week views date weekGridHour Replaces the hour in the time axis of day- and week views hour , gridStep monthGridEvent The component for events used in the month grid view calendarEvent , hasStartDate monthGridDayName Replaces day names like "Mon", "Tue" in month grid day (0-6, like in JS-dates) monthGridDate Replaces date of month in month grid date , jsDate monthAgendaEvent The component for events used in the month agenda view calendarEvent weekAgendaEvent The component for events used in the week agenda view calendarEvent monthAgendaDateDots Replaces the date dots in the month agenda view date , jsDate , events eventModal The component for the modal that opens when clicking an event calendarEvent headerContentLeftPrepend Prepends content to the left part of the header $app headerContentLeftAppend Appends content to the left part of the header $app headerContentRightPrepend Prepends content to the right part of the header $app headerContentRightAppend Appends content to the right part of the header $app headerContent Replaces the whole header content $app sidebarAddEventButton "Add event" button in the sidebar plugin onClick resourceEvent Event element in resource scheduler calendarEvent , resource sidebarPlaceholderEvent Placeholder event in the sidebar plugin calendarEvent Visual overview of all components Custom component example Links Svelte example: https://github.com/schedule-x/svelte-example',
    },
    {
      id: 'frameworks-vue',
      title: 'Vue component',
      description:
        'Learn how to use the Schedule-X calendar in a Vue application',
      url: 'https://schedule-x.dev/docs/frameworks/vue',
      sourcePath: 'website/app/docs/frameworks/vue/page.mdx',
      section: 'frameworks',
      headings: [
        'Vue component',
        'Installing',
        'Basic usage',
        'Example',
        'Explanation',
        'Styles',
        'Slots & custom components',
        'Slot example',
        'Custom component example',
        'Links',
      ],
      codeBlocks: [
        {
          language: 'bash',
          content:
            'npm install @schedule-x/vue @schedule-x/calendar @schedule-x/theme-default temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'pnpm install @schedule-x/vue @schedule-x/calendar @schedule-x/theme-default @preact/signals preact temporal-polyfill',
        },
        {
          language: 'bash',
          content:
            'yarn add @schedule-x/vue @schedule-x/calendar @schedule-x/theme-default @preact/signals preact temporal-polyfill',
        },
        {
          language: 'vue',
          content:
            "<script setup>\nimport { ScheduleXCalendar } from '@schedule-x/vue'\nimport {\n  createCalendar,\n  createViewDay,\n  createViewWeekAgenda,\n  createViewMonthAgenda,\n  createViewMonthGrid,\n  createViewWeek,\n} from '@schedule-x/calendar'\nimport '@schedule-x/theme-default/dist/index.css'\nimport 'temporal-polyfill/global'\n\n// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues\n// For updating events, use the events service plugin\nconst calendarApp = createCalendar({\n  selectedDate: Temporal.PlainDate.from('2023-12-19'),\n  views: [\n    createViewDay(),\n    createViewWeekAgenda(),\n    createViewWeek(),\n    createViewMonthGrid(),\n    createViewMonthAgenda(),\n  ],\n  events: [\n    {\n      id: 1,\n      title: 'Event 1',\n      start: Temporal.PlainDate.from('2023-12-19'),\n      end: Temporal.PlainDate.from('2023-12-19'),\n    },\n    {\n      id: 2,\n      title: 'Event 2',\n      start: Temporal.ZonedDateTime.from('2023-12-20T12:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2023-12-20T13:00:00+09:00[Asia/Tokyo]'),\n    },\n  ],\n})\n</script>\n\n<template>\n  <div>\n    <ScheduleXCalendar :calendar-app=\"calendarApp\" />\n  </div>\n</template>",
        },
        {
          language: 'css',
          content:
            '.sx-vue-calendar-wrapper {\n  width: 1200px;\n  max-width: 100vw;\n  height: 800px;\n  max-height: 90vh;\n}',
        },
        {
          language: 'vue',
          content:
            '<template>\n  <ScheduleXCalendar :calendar-app="calendarApp">\n    <template #timeGridEvent="{ calendarEvent }">\n      <div class="event">\n        {{ calendarEvent.title }}\n      </div>\n    </template>\n  </ScheduleXCalendar>\n</template>',
        },
        {
          language: 'vue',
          content:
            "<script setup>\nimport { ScheduleXCalendar } from '@schedule-x/vue'\nimport { createCalendar, createViewWeek } from '@schedule-x/calendar'\nimport CustomTimeGridEvent from './some-path/CustomTimeGridEvent.vue'\nimport '@schedule-x/theme-default/dist/index.css'\nimport 'temporal-polyfill/global'\n\nconst viewWeek = createViewWeek()\n\nconst calendarApp = createCalendar({\n  views: [viewWeek],\n  defaultView: viewWeek.name,\n  events: [\n    {\n      id: 2,\n      title: 'Event 2',\n      start: Temporal.ZonedDateTime.from('2023-12-20T12:00:00+09:00[Asia/Tokyo]'),\n      end: Temporal.ZonedDateTime.from('2023-12-20T13:00:00+09:00[Asia/Tokyo]'),\n    },\n  ],\n})\n\nconst customComponents = {\n  timeGridEvent: CustomTimeGridEvent,\n}\n</script>\n\n<template>\n  <div>\n    <ScheduleXCalendar\n      :calendar-app=\"calendarApp\"\n      :custom-components=\"customComponents\"\n    />\n  </div>\n</template>",
        },
      ],
      content:
        'Vue component This page offers documentation for using the Schedule-X calendar in Vue. For general documentation on configuring the calendar, refer to the rest of the documentation. If you are using Schedule-X with Nuxt, all code examples below should work, but everything needs to be wrapped in a component. Installing Curious about the temporal-polyfill package? Read more here. If you\'re using a package manager that does not automatically download peer dependencies, you will additionally need to install @schedule-x/calendar , @preact/signals and preact . This is for example the case for yarn and npm < v7 . Basic usage Example Explanation The calendar instance The createCalendar function takes a configuration object as its single argument, and returns an instance of the calendar app. The calendar instance contains some methods that you can use to interact with the calendar events and toggle between light and dark mode. For more on this, refer to the rest of the calendar docs. The component The ScheduleXCalendar component then takes the calendar instance as a prop calendar-app and renders the calendar for you. This means you should not call the render method of the calendar instance yourself, as shown in other examples in the docs. Styles The Schedule-X calendar is a responsive component. To achieve this, it cannot be delivered with a fixed height or width of its own. You need to define the height and width of the wrapping element .sx-vue-calendar-wrapper according to your needs. For a regular desktop application, something like this might do the trick for you: Slots & custom components The Schedule-X calendar is built with customization in mind. Using Vue slots or custom components, you can take control over the rendering in parts of the UI. Currently, these components can be customized: Slot / Component name Description Props ----------------------------- --------------------------------------------------------------------- --------------------------------- timeGridEvent The component for timed events used in the week- and day views calendarEvent dateGridEvent The component for all-day events used in the week- and day views calendarEvent weekGridDate Replaces the day name and date in the header of day- and week views date weekGridHour Replaces the hour in the time axis of day- and week views hour , gridStep monthGridEvent The component for events used in the month grid view calendarEvent , hasStartDate monthGridDayName Replaces day names like "Mon", "Tue" in month grid day (0-6, like in JS-dates) monthGridDate Replaces date of month in month grid date , jsDate monthAgendaEvent The component for events used in the month agenda view calendarEvent weekAgendaEvent The component for events used in the week agenda view calendarEvent monthAgendaDateDots Replaces the date dots in the month agenda view date , jsDate , events eventModal The component for the modal that opens when clicking an event calendarEvent headerContentLeftPrepend Prepends content to the left part of the header $app headerContentLeftAppend Appends content to the left part of the header $app headerContentRightPrepend Prepends content to the right part of the header $app headerContentRightAppend Appends content to the right part of the header $app headerContent Replaces the whole header content $app sidebarAddEventButton "Add event" button in the sidebar plugin onClick resourceEvent Event element in resource scheduler calendarEvent , resource sidebarPlaceholderEvent Placeholder event in the sidebar plugin calendarEvent Visual overview of all components Slot example Custom component example Links Vue example: https://github.com/schedule-x/vue-example Nuxt example: https://github.com/schedule-x/nuxt-example Custom components example: https://github.com/schedule-x/vue-example/blob/main/src/App.vue',
    },
  ],
  plugins: [
    {
      id: 'calendar-controls',
      title: 'Calendar controls plugin',
      packageName: '@schedule-x/calendar-controls',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/calendar-controls',
      description:
        'Add some additional controls, to programmatically change the calendar view, set the date, or update the calendar configuration.',
      isPremium: false,
    },
    {
      id: 'community-plugins',
      title: 'Community plugins',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/community-plugins',
      description: 'A list of community plugins for the Schedule-X.',
      isPremium: false,
    },
    {
      id: 'current-time',
      title: 'Current time plugin',
      packageName: '@schedule-x/current-time',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/current-time',
      description: 'Add a current time indicator to the calendar.',
      isPremium: false,
    },
    {
      id: 'custom-plugins',
      title: 'Custom plugins',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/custom-plugins',
      description:
        'Write your own plugins to extend the functionality of the calendar.',
      isPremium: false,
    },
    {
      id: 'drag-and-drop',
      title: 'Drag and drop plugin',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/drag-and-drop',
      description:
        'Update event time and date using a classical drag and drop.',
      isPremium: true,
    },
    {
      id: 'drag-to-create',
      title: 'Drag to create plugin',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/drag-to-create',
      description:
        'Create events by dragging an external placeholder element onto the calendar.',
      isPremium: true,
    },
    {
      id: 'draw',
      title: 'Draw plugin',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/draw',
      description: 'Plugin for drawing events in the Schedule-X calendar',
      isPremium: true,
    },
    {
      id: 'event-modal',
      title: 'Event modal plugin',
      packageName: '@schedule-x/event-modal',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/event-modal',
      description: 'Display more information about events in a modal.',
      isPremium: false,
    },
    {
      id: 'recurrence',
      title: 'Event recurrence plugin',
      packageName: '@schedule-x/event-recurrence',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/recurrence',
      description:
        'Plugin for creating recurring events according to the RFC5545 specification.',
      isPremium: false,
    },
    {
      id: 'events-service',
      title: 'Events service plugin',
      packageName: '@schedule-x/events-service',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/events-service',
      description: 'Add, update, retrieve and remove events from the calendar.',
      isPremium: false,
    },
    {
      id: 'ical',
      title: 'iCalendar plugin',
      packageName: '@schedule-x/ical',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/ical',
      description: 'Plugin for importing events from an iCalendar source.',
      isPremium: false,
    },
    {
      id: 'interactive-event-modal',
      title: 'Interactive event modal',
      docsUrl:
        'https://schedule-x.dev/docs/calendar/plugins/interactive-event-modal',
      description:
        'A plugin for displaying an interactive modal for adding, editing, viewing and removing events.',
      isPremium: true,
    },
    {
      id: 'resize',
      title: 'Resize plugin',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/resize',
      description: 'Plugin for resizing events in the week- and day views.',
      isPremium: true,
    },
    {
      id: 'scheduling-assistant',
      title: 'Resource scheduler component',
      docsUrl:
        'https://schedule-x.dev/docs/calendar/plugins/scheduling-assistant',
      description: 'Learn how to use the Schedule-X resource scheduler.',
      isPremium: true,
    },
    {
      id: 'scroll-controller',
      title: 'Scroll controller plugin',
      packageName: '@schedule-x/scroll-controller',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/scroll-controller',
      description:
        'Take control over the scrolling in the week- and day view grids.',
      isPremium: false,
    },
    {
      id: 'sidebar',
      title: 'Sidebar plugin',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/sidebar',
      description:
        'A component for adding a sidebar to the calendar, with calendar toggles and possibility to add drag-to-create placeholder events.',
      isPremium: true,
    },
    {
      id: 'timezone-select',
      title: 'Timezone select plugin',
      packageName: '@schedule-x/timezone-select',
      docsUrl: 'https://schedule-x.dev/docs/calendar/plugins/timezone-select',
      isPremium: false,
    },
  ],
}
