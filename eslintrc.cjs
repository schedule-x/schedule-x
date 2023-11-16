/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:boundaries/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'boundaries'],
  root: true,
  settings: {
    'boundaries/elements': [
      {
        type: 'calendar',
        pattern: 'packages/calendar/*',
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
        type: 'shared',
        pattern: 'packages/shared/*',
      },
      {
        type: 'translations',
        pattern: 'packages/translations/*',
      },
    ],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'max-lines': ['error', 150],
    '@typescript-eslint/no-empty-interface': 'off',
    'boundaries/element-types': [
      1,
      {
        default: 'disallow',
        rules: [
          {
            from: 'calendar',
            allow: ['shared', 'date-picker', 'translations'],
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
  ignorePatterns: ['**/dist/**', '**/seeded-events.ts'],
}
