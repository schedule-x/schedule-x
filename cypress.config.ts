import { defineConfig } from 'cypress'
const { configureVisualRegression } = require('cypress-visual-regression')
import { getPlatformForCypressSnapshots } from './cypress/utils/platform'

const platformForCypressSnapshots = getPlatformForCypressSnapshots()

export default defineConfig({
  video: false,
  env: {
    SNAPSHOT_BASE_DIRECTORY: `./cypress/snapshots/${platformForCypressSnapshots}/base`,
    SNAPSHOT_DIFF_DIRECTORY: `./cypress/snapshots/${platformForCypressSnapshots}/diff`,
    ALWAYS_GENERATE_DIFF: true,
    screenshotsFolder: `./cypress/snapshots/${platformForCypressSnapshots}/actual`,
    trashAssetsBeforeRuns: true,
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      configureVisualRegression(on, config)
    },
  },
})
