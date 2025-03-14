import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import {defineConfig, globalIgnores} from "eslint/config";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  globalIgnores(['node_modules', '**/dist/**', '**/seeded-events.ts', '**/.next', '**/next.config.js', '**/coverage/**']),
  {
    plugins: {
      boundaries,
    },
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
          type: 'ical',
          pattern: 'packages/ical/*',
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
          type: 'scroll-controller',
          pattern: 'packages/scroll-controller/*',
        },
        {
          type: 'shared',
          pattern: 'packages/shared/*',
        },
        {
          type: 'time-picker',
          pattern: 'packages/time-picker/*',
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
      'max-lines': ['error', {max: 300}],
      '@typescript-eslint/no-empty-object-type': 0,
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
              from: 'ical',
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
              from: 'scroll-controller',
              allow: ['shared'],
            },
            {
              from: 'shared',
              allow: [],
            },
            {
              from: 'time-picker',
              allow: ['shared'],
            },
            {
              from: 'translations',
              allow: ['shared'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
]);
