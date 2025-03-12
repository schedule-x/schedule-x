/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    useAtomics: true,
    setupFiles: ['../../libs/vitest-config/src/vitest-setup.ts'],
  },
})
