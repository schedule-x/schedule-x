# GitHub issues

The common issue tracker for the entire Schedule-X project is located here: https://github.com/schedule-x/schedule-x/issues

Users can open issues for anything regarding the core repo, the framework adapter repos, or the premium plugins even though their code are closed-source.

Any issues opened in other repos, should be transferred to the above issue tracker, since it will be easier to track than multiple issue trackers across multiple repos.

## Issue triage & processing

When a user opens a new issue, please first:

1) Make sure they have supplied enough context. If it's a bug, make sure it can be easily reproduced. Otherwise ask for more context or a repro. If it's a feature, make sure you get on the same page of what exactly should be built. Best case scenario: discuss the exact APIs. This might prevent misunderstandings and "second rounds". Any issue which does not supply more context when asked for, will be closed after some time of inactivity.

2) When an issue has enough context to be worked on, please label it with "enhancement" for anything which is a new feature, "bug" for anything which works differently than the docs or common sense would have you expect, or "docs" if it's merely an improvement to the public docs.

3) When you start working on a feature- or fix branch for an issue, please open a PR and connect the issue with the PR. This will show the issue author that things are moving. To keep computation volumes down a bit, you might not want to push every single "wip" commit if you push a bunch of those (Tom does so a lot).

4) When you believe you are finished with the fix, please go through the PR checklist to make sure you are very confident this will work in different environments and be backwards compatible. If you have contributed many times to the project, you will start getting more of a "spider sense" for when to be thorough with this, and when to skip ahead. Tom surely does not go through the checklist for every single PR, but first time contributors surely should.

5) Review your code, and ask for another review if applicable.

6) Merge, and please do so using squash strategy (there is a dropdown in the green merge button on GitHub, where you can select squashing). Also make sure the squash commit adheres to conventional commit guidelines: https://www.conventionalcommits.org/en/v1.0.0/

7) The issue connected to your PR should now be auto-closed.