import { defineConfig } from 'cypress';
import getCompareSnapshotsPlugin from "cypress-visual-regression/dist/plugin";
import { getPlatformForCypressSnapshots } from "./cypress/utils/platform";

const platformForCypressSnapshots = getPlatformForCypressSnapshots();

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
      getCompareSnapshotsPlugin(on, config);
    },
  },
});