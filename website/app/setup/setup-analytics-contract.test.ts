import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  getRecommendationAnalytics,
  setupAnalyticsEvents,
} from './setup-analytics-contract'

describe('setupAnalyticsEvents', () => {
  it('keeps the canonical analytics event names stable', () => {
    assert.deepEqual(setupAnalyticsEvents, {
      entryClicked: 'setup_entry_clicked',
      stepViewed: 'setup_step_viewed',
      uiSelected: 'setup_ui_selected',
      backendSelected: 'setup_backend_selected',
      recommendationViewed: 'setup_recommendation_viewed',
      navigationClicked: 'setup_navigation_clicked',
      recommendationClicked: 'setup_recommendation_clicked',
    })
  })
})

describe('getRecommendationAnalytics', () => {
  it('maps every answer pair to stable result IDs', () => {
    assert.deepEqual(getRecommendationAnalytics('display', 'frontend'), {
      pathId: 'display_frontend_open_source',
      recommendationId: 'open_source',
    })
    assert.deepEqual(getRecommendationAnalytics('interactive', 'frontend'), {
      pathId: 'interactive_frontend_premium',
      recommendationId: 'premium',
    })
    assert.deepEqual(getRecommendationAnalytics('display', 'cloud'), {
      pathId: 'display_cloud_cloud',
      recommendationId: 'cloud',
    })
    assert.deepEqual(getRecommendationAnalytics('interactive', 'cloud'), {
      pathId: 'interactive_cloud_cloud',
      recommendationId: 'cloud',
    })
  })
})
