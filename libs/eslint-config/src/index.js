/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:boundaries/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-lines': ['error', 150],
    '@typescript-eslint/no-empty-interface': 'off',
  },
  ignorePatterns: ['**/dist/**', '**/seeded-events.ts'],
}
