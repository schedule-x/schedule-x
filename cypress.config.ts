import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin.js'
import { platform } from 'os'

export const getPlatformForCypressSnapshots = () => {
  const isMac = platform() === 'darwin'
  const isLinux = platform() === 'linux'
  if (!isMac && !isLinux) {
    throw new Error('Unsupported platform for cypress snapshots')
  }

  return isMac ? 'mac' : 'linux'
}

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
      getCompareSnapshotsPlugin(on, config)
    },
  },
})
