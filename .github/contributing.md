# Contributor's guide

## Issues

For bug reports or feature requests, choose one of the templates provided
at: https://github.com/schedule-x/schedule-x/issues/new/choose

Please note that issues based on the templates will have a greater chance of being resolved than issues that provide 
less information and clarity.

## Developing

This setup guide has yet to be battle tested, so please send a message in the Discord channel if you run into any 
issues.

### Getting up and running

#### Git stuff

1. Click the fork button in GitHub
2. Clone your fork to your local machine
3. **Check out a new branch**!!! (Do not work on **main**) This helps maintainers when checking out your branch 
   locally. If you work on your main branch, the maintainers will have to delete their own local main branch to check 
   out yours.
4. Commit message should adhere to [Conventional commits](https://www.conventionalcommits.org/en). For 
   example:
* `feat: add new feature`
* `fix: fix bug`
* `docs: update readme`
* `chore: update dependencies`

#### Code stuff

- `npm i`
- `husky install` - configuring the gitHooks
- `npm run dev`

Voila! You should now have a working version of Schedule-X running on your machine.

## Running tests

To run all tests of the packages affected by your changes, run `npm run test:unit:changed`. This is also what will 
later run in the GitHub Actions pipeline.

To run all tests locally, run `test:unit:all`.