/// <reference types="vitest" />
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        datePicker001: resolve(
          'cypress/pages/date-picker/001-navigate-months.html'
        ),
        dragAndDrop001: resolve(
          'cypress/pages/calendar/001-drag-and-drop.html'
        ),
      },
    },
  },
})
