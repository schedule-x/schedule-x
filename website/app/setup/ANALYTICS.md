# Find my setup analytics

The setup flow uses the existing `window.lightAnalytics.track` client exposed by
the Light Analytics script in the root layout. It does not load another SDK or
persist analytics state in cookies or browser storage.

Every event includes:

- `flow_id`: a random, in-memory ID shared by one client-side wizard attempt.
- `entry_point`: `landing_hero`, `site_header`, or `direct` when the first event
  came from a direct/untracked setup page load.

## Event mapping

| Event                          | Trigger                                                     | Additional properties                                                                    |
| ------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `setup_entry_clicked`          | A tracked site CTA opens `/setup`                           | `entry_point`                                                                            |
| `setup_step_viewed`            | The UI or backend question renders                          | `step_id` (`ui` or `backend`), plus `ui_need` on the backend step                        |
| `setup_ui_selected`            | A UI choice is clicked                                      | `ui_need` (`display` or `interactive`)                                                   |
| `setup_backend_selected`       | A backend choice is clicked                                 | `ui_need`, `backend_need` (`frontend` or `cloud`)                                        |
| `setup_navigation_clicked`     | A question-screen docs or back link is clicked              | `surface`, `action_id`, `destination_id`, and `ui_need` when known                       |
| `setup_recommendation_viewed`  | A resolved recommendation renders                           | `ui_need`, `backend_need`, `path_id`, `recommendation_id`                                |
| `setup_recommendation_clicked` | A result-screen primary, secondary, or docs link is clicked | `ui_need`, `backend_need`, `path_id`, `recommendation_id`, `action_id`, `destination_id` |

The four stable path IDs are:

- `display_frontend_open_source`
- `interactive_frontend_premium`
- `display_cloud_cloud`
- `interactive_cloud_cloud`

Recommendation IDs are `open_source`, `premium`, and `cloud`. Link actions are
`primary`, `secondary`, or `docs`; destinations use semantic IDs such as
`cloud_signup`, `premium_pricing`, and `docs_calendar` instead of visible copy.

Question navigation uses `skip_to_docs` or `back_to_ui`. The current flow has no
restart or close control to instrument.
