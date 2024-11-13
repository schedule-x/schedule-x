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
3. Check out a feature branch
4. Commit message should adhere to [Conventional commits](https://www.conventionalcommits.org/en). For 
   example:
* `feat: add new feature`
* `fix: fix bug`
* `docs: update readme`
* `chore: update dependencies`
5. Push your changes to your fork and open a pull request to the main-branch of the Schedule-X repository

#### Code stuff

- `npm i`
- `husky install` - configuring the gitHooks. Might not work on windows. In this case just need to make sure to lint and format on your own.
- `npm run dev`

Voila! You should now have a working version of Schedule-X running on your machine.

In `development/main.tsx` you can find a "workbench" type file, which is used as the entry point for development.
You can modify this to fit your needs while developing.

## Running tests

To run all tests of the packages affected by your changes, run `npm run test:unit:changed`. This is also what will 
later run in the GitHub Actions pipeline.

To run all tests locally, run `test:unit:all`.

## Project structure

If you are interested in contributing with code, it might be helpful for some initial orientation, to have a look at 
the files in `documentation/adr`. These offer some basic explanations and graphical representations of the
architecture and design decisions.
