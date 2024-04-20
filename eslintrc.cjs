/* eslint-env node */
module.exports = {
  extends: ['@schedule-x/eslint-config', 'plugin:boundaries/recommended'],
  plugins: ['boundaries'],
  root: true,
  settings: {
    'boundaries/elements': [
      {
        type: 'calendar',
        pattern: 'packages/calendar/*',
      },
      {
        type: 'calendar-controls',
        pattern: 'packages/calendar-controls/*',
      },
      {
        type: 'current-time',
        pattern: 'packages/current-time/*',
      },
      {
        type: 'date-picker',
        pattern: 'packages/date-picker/*',
      },
      {
        type: 'drag-and-drop',
        pattern: 'packages/drag-and-drop/*',
      },
      {
        type: 'event-modal',
        pattern: 'packages/event-modal/*',
      },
      {
        type: 'event-recurrence',
        pattern: 'packages/event-recurrence/*',
      },
      {
        type: 'events-service',
        pattern: 'packages/events-service/*',
      },
      {
        type: 'recurrence',
        pattern: 'packages/recurrence/*',
      },
      {
        type: 'resize',
        pattern: 'packages/resize/*',
      },
      {
        type: 'shared',
        pattern: 'packages/shared/*',
      },
      {
        type: 'translations',
        pattern: 'packages/translations/*',
      },
    ],
    'boundaries/ignore': ['**/*.spec.ts', '**/*.spec.tsx'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'boundaries/element-types': [
      2,
      {
        default: 'disallow',
        message:
          'Modules in the "${file.type}" package are not allowed to depend on modules from the "${dependency.type}" package',
        rules: [
          {
            from: 'calendar',
            allow: ['shared', 'date-picker', 'translations'],
          },
          {
            from: 'calendar-controls',
            allow: ['shared'],
          },
          {
            from: 'current-time',
            allow: ['shared'],
          },
          {
            from: 'date-picker',
            allow: ['shared', 'translations'],
          },
          {
            from: 'drag-and-drop',
            allow: ['shared'],
          },
          {
            from: 'event-modal',
            allow: ['shared'],
          },
          {
            from: 'event-recurrence',
            allow: ['shared', 'recurrence'],
          },
          {
            from: 'events-service',
            allow: ['shared'],
          },
          {
            from: 'recurrence',
            allow: ['shared'],
          },
          {
            from: 'resize',
            allow: ['shared'],
          },
          {
            from: 'shared',
            allow: [],
          },
          {
            from: 'translations',
            allow: ['shared'],
          },
        ],
      },
    ],
  },
}
