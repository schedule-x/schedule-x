export const setupAnalyticsEvents = {
  entryClicked: 'setup_entry_clicked',
  stepViewed: 'setup_step_viewed',
  uiSelected: 'setup_ui_selected',
  backendSelected: 'setup_backend_selected',
  recommendationViewed: 'setup_recommendation_viewed',
  navigationClicked: 'setup_navigation_clicked',
  recommendationClicked: 'setup_recommendation_clicked',
} as const

export type UiNeed = 'display' | 'interactive'
export type BackendNeed = 'cloud' | 'frontend'
export type RecommendationId = 'open_source' | 'premium' | 'cloud'
export type RecommendationDestinationId =
  | 'docs_calendar'
  | 'docs_premium'
  | 'github_repository'
  | 'premium_pricing'
  | 'interactive_demo'
  | 'cloud_signup'
  | 'cloud_sync_quickstart'
  | 'cloud_docs'
export type SetupPathId =
  | 'display_frontend_open_source'
  | 'interactive_frontend_premium'
  | 'display_cloud_cloud'
  | 'interactive_cloud_cloud'

export type RecommendationAnalytics = {
  pathId: SetupPathId
  recommendationId: RecommendationId
}

export const getRecommendationAnalytics = (
  ui: UiNeed,
  backend: BackendNeed
): RecommendationAnalytics => {
  if (backend === 'cloud') {
    return {
      pathId: `${ui}_cloud_cloud`,
      recommendationId: 'cloud',
    }
  }

  if (ui === 'interactive') {
    return {
      pathId: 'interactive_frontend_premium',
      recommendationId: 'premium',
    }
  }

  return {
    pathId: 'display_frontend_open_source',
    recommendationId: 'open_source',
  }
}
