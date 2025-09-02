# Dependency updates

Schedule-X uses renovate bot to keep dependencies up to date.

Our only job as devs is to:

1) make decisions about whether we need to test them manually, or trust all the automated tests and just merge. Most of the time, the automated tests will suffice. Major version updates for production dependencies like Preact, crucial dev dependencies like SCSS, or website dependencies like GitLab or Lemon Squeezy, could call for some manual testing.

2) Merge by a squash commit. Double-check that the commit always adheres to comventional commit. Please rewrite the commit "type" for website dependencies that are labeled as "fix". These will be included in the automatically generated CHANGELOG.md, if they are merged as a fix. We don't want this since they aren't a library dependency. Instead, rewrite to "chore: {commit body}"