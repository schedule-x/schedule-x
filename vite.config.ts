/// <reference types="vitest" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      extension: ['.ts', '.tsx'],
      reporter: ['text', 'html', 'lcov', 'text-summary'],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        datePicker001: resolve(
          __dirname,
          'cypress/pages/date-picker/001-navigate.html'
        ),
      },
    },
  },
})
