# Releases

The Schedule-X open source [core repo](https://github.com/schedule-x/schedule-x), is released through local script execution from any of its maintainers. It uses Lerna to do so efficiently, since publishing so many packages would be cumbersome otherwise.

## Workflow

1) When wanting to release all features and fixes since the last release, start by checkout out the `main` branch, and then:
2) `nvm use`
3) `git pull`
4) `npm run release`. This will first build new dist folders for all packages, and then prompt you to confirm a release of a new version. If the versioning looks correct, move on.

Prerequisite to publishing, is being signed in to npm.

## Publishing beta released

When wanting to release a public beta (please only do so if you're trying to gather broader feedback), adjust the version numbers manually of the package.json files you want to release, make sure to push all your changes to the branch you're working on, and then:

1) `nvm use`
2) `npm run build`
3) `node scripts/publish-beta.mjs`

## Framework adapters

The framework adapters, such as https://github.com/schedule-x/vue, get PRs opened automatically when new versions are released for the core repo. Typically this happens within the first few hours of a release.

Our jobs as devs is merely to merge these PRs, and make sure the commit "type" is always "feat". The full commit message should then look something like this: `feat(deps): update schedule-x monorepo packages to v2.35.0`. This will ensure that semantic-release will automatically publish to npm once we merge.