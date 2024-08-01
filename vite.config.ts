/// <reference types="vitest" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      extension: ['.ts', '.tsx'],
      reporter: ['text', 'html', 'lcov', 'text-summary'],
      exclude: ['website/**', 'development/**', 'libs/**', '**/__test__/**'],
    },
    useAtomics: true,
  },
})
