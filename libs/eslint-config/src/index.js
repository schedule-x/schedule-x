/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-lines': ['error', 250],
    '@typescript-eslint/no-empty-interface': 'off',
  },
  ignorePatterns: ['**/dist/**', '**/seeded-events.ts'],
}
