# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.5.0](https://github.com/schedule-x/schedule-x/compare/v2.4.3...v2.5.0) (2024-11-09)

### Bug Fixes

- reactivity errors from using preact useEffect for signals ([#770](https://github.com/schedule-x/schedule-x/issues/770)) ([79b3199](https://github.com/schedule-x/schedule-x/commit/79b3199fa1d3be45e117ad3be5f922bdb7621875))

### Features

- background events ([#646](https://github.com/schedule-x/schedule-x/issues/646)) ([489f396](https://github.com/schedule-x/schedule-x/commit/489f396302c9f9d745dfc75128c3aa0e58ac80da))

## [2.4.3](https://github.com/schedule-x/schedule-x/compare/v2.4.2...v2.4.3) (2024-11-07)

### Bug Fixes

- missing \_options after dnd ([#761](https://github.com/schedule-x/schedule-x/issues/761)) ([ebe80a6](https://github.com/schedule-x/schedule-x/commit/ebe80a6ce3de5f834ddea6e35090aac661b0ccc2))

## [2.4.2](https://github.com/schedule-x/schedule-x/compare/v2.4.1...v2.4.2) (2024-11-06)

### Bug Fixes

- **ical:** infer all-day events ([#724](https://github.com/schedule-x/schedule-x/issues/724)) ([af24a89](https://github.com/schedule-x/schedule-x/commit/af24a89cca2b0b122bf8f323f98eb217b48845ca))
- remove node step in build workflow ([#754](https://github.com/schedule-x/schedule-x/issues/754)) ([4cbf89a](https://github.com/schedule-x/schedule-x/commit/4cbf89afbab9b18050647ab03676e80a5b02a80f))
- update Dutch translations ([#745](https://github.com/schedule-x/schedule-x/issues/745)) ([151fa56](https://github.com/schedule-x/schedule-x/commit/151fa569a0cd53f0a1441f75ba41c0fe06e315e3))

## [2.4.1](https://github.com/schedule-x/schedule-x/compare/v2.4.0...v2.4.1) (2024-10-10)

### Bug Fixes

- **date-picker:** increase default max date ([#727](https://github.com/schedule-x/schedule-x/issues/727)) ([d385f05](https://github.com/schedule-x/schedule-x/commit/d385f05f8b39fc6ad9321a1eecc92e66c5bd7c03))
- serbian translations ([#726](https://github.com/schedule-x/schedule-x/issues/726)) ([f9fee04](https://github.com/schedule-x/schedule-x/commit/f9fee04590b69fcd7addd484a47e386cb3af5820))

# [2.4.0](https://github.com/schedule-x/schedule-x/compare/v2.3.0...v2.4.0) (2024-10-04)

### Features

- add serbian translations ([#714](https://github.com/schedule-x/schedule-x/issues/714)) ([e941cce](https://github.com/schedule-x/schedule-x/commit/e941ccea52d9b529e5bf83f4857cf83ce0bdb468))

# [2.3.0](https://github.com/schedule-x/schedule-x/compare/v2.2.1...v2.3.0) (2024-10-01)

### Bug Fixes

- **calendar-controls:** enable overriding parts of week options ([#707](https://github.com/schedule-x/schedule-x/issues/707)) ([5ce464e](https://github.com/schedule-x/schedule-x/commit/5ce464e434c9069aca212a6cc947e495f8f2f5e6))

### Features

- add custom component typing for interactive modal ([#710](https://github.com/schedule-x/schedule-x/issues/710)) ([805b432](https://github.com/schedule-x/schedule-x/commit/805b4320e6e6ccd93a3ed36e9ad738102dd94e1c))

## [2.2.1](https://github.com/schedule-x/schedule-x/compare/v2.2.0...v2.2.1) (2024-09-27)

### Bug Fixes

- plugin type declarations ([#705](https://github.com/schedule-x/schedule-x/issues/705)) ([53e3796](https://github.com/schedule-x/schedule-x/commit/53e379692d4ba253dc696868af74490cc49e39a0))

# [2.2.0](https://github.com/schedule-x/schedule-x/compare/v2.1.0...v2.2.0) (2024-09-26)

### Features

- add new plugin api on calendar instance ([#702](https://github.com/schedule-x/schedule-x/issues/702)) ([5b8caa2](https://github.com/schedule-x/schedule-x/commit/5b8caa2e09baf33a0f7151b3ac19c198301f93b6))

# [2.1.0](https://github.com/schedule-x/schedule-x/compare/v2.0.0...v2.1.0) (2024-09-24)

### Bug Fixes

- **event-modal:** fix positioning at the bottom of calendar ([#690](https://github.com/schedule-x/schedule-x/issues/690)) ([960378b](https://github.com/schedule-x/schedule-x/commit/960378b98ab2249439c4fff14b3870a4e9d95064))

### Features

- add beforeRender and onRender lifecycle methods ([#691](https://github.com/schedule-x/schedule-x/issues/691)) ([76846a2](https://github.com/schedule-x/schedule-x/commit/76846a2d923ce4c36b3da596de09d6fb1715fc55))
- ical source ([#668](https://github.com/schedule-x/schedule-x/issues/668)) ([6060760](https://github.com/schedule-x/schedule-x/commit/606076002ceda2194a899afeb25ade03a9e9128c))

# [2.0.0-alpha.0](https://github.com/schedule-x/schedule-x/compare/v1.64.0-alpha.0...v2.0.0-alpha.0) (2024-09-19)

### Features

- changes on ui of events and calendar header ([159f9c8](https://github.com/schedule-x/schedule-x/commit/159f9c8013a8ef81ac1884e6d65ec49df9584a6c))
- rename APIs on plugins ([34f4400](https://github.com/schedule-x/schedule-x/commit/34f44000bd3d3e14b6644fa3d4a9102739536224))

### BREAKING CHANGES

- add time, if existing, to month grid events
- add time, if existing, to date grid events
- view location in time grid events by default, removing showLocation option
- hide view selection when only one view is available

# [1.64.0-alpha.0](https://github.com/schedule-x/schedule-x/compare/v1.63.1...v1.64.0-alpha.0) (2024-09-17)

### Features

- make config values reactive ([#662](https://github.com/schedule-x/schedule-x/issues/662)) ([0ad317d](https://github.com/schedule-x/schedule-x/commit/0ad317dcb7b831cd82de9d33b154000f4dfc1182))

## [1.63.1](https://github.com/schedule-x/schedule-x/compare/v1.63.0...v1.63.1) (2024-09-12)

### Bug Fixes

- prevent positionInTimeGrid from crashing if given event date is not in given week object ([#658](https://github.com/schedule-x/schedule-x/issues/658)) ([bc3de01](https://github.com/schedule-x/schedule-x/commit/bc3de01dc9d64dbfebc09aee59c64782a3bbad81))

# [1.63.0](https://github.com/schedule-x/schedule-x/compare/v1.62.0...v1.63.0) (2024-09-09)

### Features

- enable using custom content in events ([#651](https://github.com/schedule-x/schedule-x/issues/651)) ([cbe7ccb](https://github.com/schedule-x/schedule-x/commit/cbe7ccba544fae1b95546a3992c43854107930c3))
- focus modal when opening through keyboard ([#652](https://github.com/schedule-x/schedule-x/issues/652)) ([9749c1a](https://github.com/schedule-x/schedule-x/commit/9749c1ac73d217a740bc42f936f8507dd8f196e9))

# [1.62.0](https://github.com/schedule-x/schedule-x/compare/v1.61.0...v1.62.0) (2024-09-07)

### Features

- **calendar:** header content custom component ([#647](https://github.com/schedule-x/schedule-x/issues/647)) ([b302bbc](https://github.com/schedule-x/schedule-x/commit/b302bbcd15c76d10dfc51291fa4d5d490ad4ceed))

# [1.61.0](https://github.com/schedule-x/schedule-x/compare/v1.60.1...v1.61.0) (2024-09-04)

### Features

- add a config option to show location in week/day view ([#348](https://github.com/schedule-x/schedule-x/issues/348)) ([#635](https://github.com/schedule-x/schedule-x/issues/635)) ([c6dccc2](https://github.com/schedule-x/schedule-x/commit/c6dccc25032f83ceb1982da859ba90e60f68c2a9))
- implement "clicking" on events with keyboard ([#636](https://github.com/schedule-x/schedule-x/issues/636)) ([#637](https://github.com/schedule-x/schedule-x/issues/637)) ([3a81836](https://github.com/schedule-x/schedule-x/commit/3a81836e1c53a31046e04d7e9a4a4b4bf4c37f99))

## [1.60.1](https://github.com/schedule-x/schedule-x/compare/v1.60.0...v1.60.1) (2024-09-02)

### Bug Fixes

- **theme-default:** z-index event modal ([#632](https://github.com/schedule-x/schedule-x/issues/632)) ([85c7178](https://github.com/schedule-x/schedule-x/commit/85c71785d5a8fec0e0e6a2a9a1b10459821a639e))

# [1.60.0](https://github.com/schedule-x/schedule-x/compare/v1.59.2...v1.60.0) (2024-08-29)

### Features

- add an option for hour labels format on the time axis ([#622](https://github.com/schedule-x/schedule-x/issues/622)) ([ca05bf3](https://github.com/schedule-x/schedule-x/commit/ca05bf356c4860ecbe64a4f299b3b7892ca6ea90))

## [1.59.2](https://github.com/schedule-x/schedule-x/compare/v1.59.1...v1.59.2) (2024-08-28)

### Bug Fixes

- **theme-default:** event z-index when dragging ([#618](https://github.com/schedule-x/schedule-x/issues/618)) ([874560f](https://github.com/schedule-x/schedule-x/commit/874560f9a0ac40f508a41270794d7a9efa1d2fab))
- **theme-default:** remove source maps ([#613](https://github.com/schedule-x/schedule-x/issues/613)) ([929a290](https://github.com/schedule-x/schedule-x/commit/929a29049ba09e46ffea6ad0baecce5c41d94b7d))

## [1.59.1](https://github.com/schedule-x/schedule-x/compare/v1.59.0...v1.59.1) (2024-08-26)

### Bug Fixes

- **theme-default:** enable using styles in angular.json ([#612](https://github.com/schedule-x/schedule-x/issues/612)) ([ce2d903](https://github.com/schedule-x/schedule-x/commit/ce2d903860073653f0f0a9f7bbda88b71b55525b))

# [1.59.0](https://github.com/schedule-x/schedule-x/compare/v1.58.1...v1.59.0) (2024-08-24)

### Bug Fixes

- set names for globals in umd bundle ([#606](https://github.com/schedule-x/schedule-x/issues/606)) ([d36a6a2](https://github.com/schedule-x/schedule-x/commit/d36a6a2d6ce638ef3ac36c32dcbc289602b3a43b))

### Features

- **current-time:** add timeZoneOffset parameter ([#600](https://github.com/schedule-x/schedule-x/issues/600)) ([29d4da2](https://github.com/schedule-x/schedule-x/commit/29d4da21bd6dd0b8205c7bae97fbf9d1547063a8))

## [1.58.1-alpha.0](https://github.com/schedule-x/schedule-x/compare/v1.58.0...v1.58.1-alpha.0) (2024-08-09)

### Bug Fixes

- **calendar:** fix out of order effect ([946f7fb](https://github.com/schedule-x/schedule-x/commit/946f7fb86473838ca39c4fd6493e90fac124e250))
- **calendar:** prevent race condition when setting events on range update ([2f474d6](https://github.com/schedule-x/schedule-x/commit/2f474d635fa2c39f0df309e5a5288380cd547334))

# [1.58.0](https://github.com/schedule-x/schedule-x/compare/v1.57.1...v1.58.0) (2024-08-09)

### Features

- add Catalan translations ([#590](https://github.com/schedule-x/schedule-x/issues/590)) ([45785ba](https://github.com/schedule-x/schedule-x/commit/45785ba63ccece7443bd835a6a4b64bcb2c78aab))

## [1.57.1](https://github.com/schedule-x/schedule-x/compare/v1.57.0...v1.57.1) (2024-08-02)

### Bug Fixes

- **calendar:** enable using multiple calendars with same views ([#587](https://github.com/schedule-x/schedule-x/issues/587)) ([6cb0f5e](https://github.com/schedule-x/schedule-x/commit/6cb0f5ea52ab51433c7434aa444c6edfa77651a4))
- **date-picker:** export config type as interface ([#586](https://github.com/schedule-x/schedule-x/issues/586)) ([27af897](https://github.com/schedule-x/schedule-x/commit/27af89750ddf92852c270d3cea22f3309439530b))

# [1.57.0](https://github.com/schedule-x/schedule-x/compare/v1.56.0...v1.57.0) (2024-08-01)

### Features

- add Ukrainian language support ([#576](https://github.com/schedule-x/schedule-x/issues/576)) ([634cba8](https://github.com/schedule-x/schedule-x/commit/634cba8c26c5658912157113e08f1554cb2aa11c))

# [1.56.0](https://github.com/schedule-x/schedule-x/compare/v1.55.0...v1.56.0) (2024-07-29)

### Bug Fixes

- **calendar:** custom event not updating on drag and drop ([#565](https://github.com/schedule-x/schedule-x/issues/565)) ([b653b51](https://github.com/schedule-x/schedule-x/commit/b653b513002f9f353ee4a706b3200618fad72afb))
- event left property when using eventWidth config ([#569](https://github.com/schedule-x/schedule-x/issues/569)) ([0a78440](https://github.com/schedule-x/schedule-x/commit/0a78440a265d346778b5ccf294c36eeb513c476e))
- throw away state of month grid days when navigating through months ([#570](https://github.com/schedule-x/schedule-x/issues/570)) ([0885f95](https://github.com/schedule-x/schedule-x/commit/0885f9543708d999f221b0c71a1bffbd6bc86bf3))

### Features

- add Estonian language support ([#568](https://github.com/schedule-x/schedule-x/issues/568)) ([8f3c4d9](https://github.com/schedule-x/schedule-x/commit/8f3c4d91e63e66680d6626b2f849dd3d12e97332))

# [1.55.0](https://github.com/schedule-x/schedule-x/compare/v1.54.0...v1.55.0) (2024-07-27)

### Bug Fixes

- **calendar:** fix faulty number of +n events in month grid ([#560](https://github.com/schedule-x/schedule-x/issues/560)) ([5ac3c0c](https://github.com/schedule-x/schedule-x/commit/5ac3c0cfe3e5cb3356515ddd821002484dc34627))

### Features

- **calendar:** add data-date attribute for date axis dates ([#561](https://github.com/schedule-x/schedule-x/issues/561)) ([9a503c6](https://github.com/schedule-x/schedule-x/commit/9a503c6aba5755656c484ab921965c9c0b5318df))
- **calendar:** set event width in time grid ([#562](https://github.com/schedule-x/schedule-x/issues/562)) ([8cec16e](https://github.com/schedule-x/schedule-x/commit/8cec16e75d9e619c9c599d91b7757a2156bdc57d))
- **date-picker:** add onEscapeKeyDown ([#564](https://github.com/schedule-x/schedule-x/issues/564)) ([01add2b](https://github.com/schedule-x/schedule-x/commit/01add2b7a5a52320e0d3adcce9d606b82389f810))

# [1.54.0](https://github.com/schedule-x/schedule-x/compare/v1.53.0...v1.54.0) (2024-07-25)

### Features

- **calendar:** add data-date-grid-date attribute ([#556](https://github.com/schedule-x/schedule-x/issues/556)) ([dea82fc](https://github.com/schedule-x/schedule-x/commit/dea82fc6db96961b9c1bceebc2d562db94b58a50))
- close popups on escape press ([#557](https://github.com/schedule-x/schedule-x/issues/557)) ([eff1036](https://github.com/schedule-x/schedule-x/commit/eff1036bea065083b68d11ac0acca57232160778))

# [1.53.0](https://github.com/schedule-x/schedule-x/compare/v1.52.0...v1.53.0) (2024-07-20)

### Features

- **calendar:** set is-selected class in week- and month grids ([#553](https://github.com/schedule-x/schedule-x/issues/553)) ([5555acd](https://github.com/schedule-x/schedule-x/commit/5555acdb11d3d680259eecca850e6bab525896dd))
- date picker disabled ([#552](https://github.com/schedule-x/schedule-x/issues/552)) ([60c791e](https://github.com/schedule-x/schedule-x/commit/60c791eb952e1573f5c862664d807d93bcccb4db))

# [1.52.0](https://github.com/schedule-x/schedule-x/compare/v1.51.0...v1.52.0) (2024-07-19)

### Bug Fixes

- **calendar:** event bubbling order in firefox ([#550](https://github.com/schedule-x/schedule-x/issues/550)) ([0d496ea](https://github.com/schedule-x/schedule-x/commit/0d496ea1c8e4e0e6d13d90372c1fd2535e4d3134))

### Features

- **calendar:** add weekday class names ([#549](https://github.com/schedule-x/schedule-x/issues/549)) ([d92a216](https://github.com/schedule-x/schedule-x/commit/d92a21621a11a1b69668924d061feaf0f957f49c))
- **event-modal:** add close method ([#551](https://github.com/schedule-x/schedule-x/issues/551)) ([b691a57](https://github.com/schedule-x/schedule-x/commit/b691a57f697ca552c9b98ed8b80e03e52de109a8))

# [1.51.0](https://github.com/schedule-x/schedule-x/compare/v1.50.0...v1.51.0) (2024-07-12)

### Features

- **calendar:** add overflow classes to month grid events ([#543](https://github.com/schedule-x/schedule-x/issues/543)) ([02719a3](https://github.com/schedule-x/schedule-x/commit/02719a39550e6f1c322cc83aed77e33afa64f704))
- export functions for converting between Date object and string ([#542](https://github.com/schedule-x/schedule-x/issues/542)) ([0f5dd4e](https://github.com/schedule-x/schedule-x/commit/0f5dd4e28b73709bc2589a7dd81d0146e73274c6))

# [1.50.0](https://github.com/schedule-x/schedule-x/compare/v1.49.0...v1.50.0) (2024-07-09)

### Features

- add name option to date- and time picker configs ([#533](https://github.com/schedule-x/schedule-x/issues/533)) ([56357e5](https://github.com/schedule-x/schedule-x/commit/56357e59950c1b637a1e4ae391298e66129fd46d))
- time picker design ([#532](https://github.com/schedule-x/schedule-x/issues/532)) ([975c4c7](https://github.com/schedule-x/schedule-x/commit/975c4c7e21d8d82ceda953fad8acf0e5a7edecd6))
- **time-picker:** 12-hour clock ([#528](https://github.com/schedule-x/schedule-x/issues/528)) ([9d469d9](https://github.com/schedule-x/schedule-x/commit/9d469d9550cf6cdf249ba556753e58b93d9b94eb))
- **time-picker:** add arrow key incrementing and decrementing ([#531](https://github.com/schedule-x/schedule-x/issues/531)) ([23c1cdb](https://github.com/schedule-x/schedule-x/commit/23c1cdb7ae70b796a4947dae67d1dfb6e519a1b6))

# [1.49.0](https://github.com/schedule-x/schedule-x/compare/v1.48.0...v1.49.0) (2024-07-06)

### Features

- add nDays to weekOptions ([#525](https://github.com/schedule-x/schedule-x/issues/525)) ([76589f6](https://github.com/schedule-x/schedule-x/commit/76589f654c1315eeffcb4bd98cf0d131644f8f40))
- enable navigating month views with screen reader ([#523](https://github.com/schedule-x/schedule-x/issues/523)) ([6577fe0](https://github.com/schedule-x/schedule-x/commit/6577fe096bcac1fa81fb8ed79bbb0d67e9492114))

# [1.48.0](https://github.com/schedule-x/schedule-x/compare/v1.47.1...v1.48.0) (2024-07-03)

### Bug Fixes

- **calendar:** stop propagation of clicks on n-events button ([#518](https://github.com/schedule-x/schedule-x/issues/518)) ([6a49c1e](https://github.com/schedule-x/schedule-x/commit/6a49c1e2641426199e0f0dc33514eb66e3486aaa))
- **theme-default:** prevent modal from overflowing on small screens ([#514](https://github.com/schedule-x/schedule-x/issues/514)) ([2d6bae5](https://github.com/schedule-x/schedule-x/commit/2d6bae57ad6f9ff308e1a3f15a9ed5d3944e2f74))

### Features

- **calendar:** add isResponsive option and isCalendarSmall callback ([#504](https://github.com/schedule-x/schedule-x/issues/504)) ([9014bf4](https://github.com/schedule-x/schedule-x/commit/9014bf44acf152c9c022ce336ea53de5fa77d690))
- enable using calendar controls plugin before calendar has rendered ([#519](https://github.com/schedule-x/schedule-x/issues/519)) ([8e60f9e](https://github.com/schedule-x/schedule-x/commit/8e60f9ea7b2abf155021b16f39fcb80c3d29f0d1))

## [1.47.1](https://github.com/schedule-x/schedule-x/compare/v1.47.0...v1.47.1) (2024-06-29)

### Bug Fixes

- **date-picker:** fix dark theme when teleporting popup ([#509](https://github.com/schedule-x/schedule-x/issues/509)) ([f331ac0](https://github.com/schedule-x/schedule-x/commit/f331ac097be3857bf57d0390db4ba210a284cc5f))
- **time-picker:** fix dark theme for teleported popup ([#510](https://github.com/schedule-x/schedule-x/issues/510)) ([9caa34b](https://github.com/schedule-x/schedule-x/commit/9caa34bcbbbc148b883a9cafac396a8220d94970))

# [1.47.0](https://github.com/schedule-x/schedule-x/compare/v1.46.7...v1.47.0) (2024-06-28)

### Bug Fixes

- **calendar:** update range automatically when setting view ([#506](https://github.com/schedule-x/schedule-x/issues/506)) ([1ca4928](https://github.com/schedule-x/schedule-x/commit/1ca4928e17de382159e6d01f5035dd5068021ed5))

### Features

- **calendar:** create slots for header content ([#501](https://github.com/schedule-x/schedule-x/issues/501)) ([ed5ced5](https://github.com/schedule-x/schedule-x/commit/ed5ced5f395cf159bfe1ba3e767df2dcbb534c2d))

## [1.46.7](https://github.com/schedule-x/schedule-x/compare/v1.46.6...v1.46.7) (2024-06-24)

### Bug Fixes

- **calendar:** prevent click events to fire when dragging ([0bf2905](https://github.com/schedule-x/schedule-x/commit/0bf290557187579786fd82e4a1e906e52529613b))
- **calendar:** prevent onClickDateTime from firing when dragging ([#499](https://github.com/schedule-x/schedule-x/issues/499)) ([80f168d](https://github.com/schedule-x/schedule-x/commit/80f168d076bee4d55a79fcf5b7b976341ec9f8eb))
- **shared:** make typing of $app flexible for plugins ([#498](https://github.com/schedule-x/schedule-x/issues/498)) ([349b62d](https://github.com/schedule-x/schedule-x/commit/349b62d37bda705fc3209a09577c9bc282e963dc))

## [1.46.6](https://github.com/schedule-x/schedule-x/compare/v1.46.5...v1.46.6) (2024-06-22)

### Bug Fixes

- improve tolerance for app interface in plugins ([#493](https://github.com/schedule-x/schedule-x/issues/493)) ([ed9790d](https://github.com/schedule-x/schedule-x/commit/ed9790de9b587445808ee2d2b34b6fb8e47acd9e))

## [1.46.5](https://github.com/schedule-x/schedule-x/compare/v1.46.4...v1.46.5) (2024-06-21)

### Bug Fixes

- **calendar:** align items in header ([#495](https://github.com/schedule-x/schedule-x/issues/495)) ([a16a6e2](https://github.com/schedule-x/schedule-x/commit/a16a6e2a920068a2da138355249e0add0a5fc284))

## [1.46.4](https://github.com/schedule-x/schedule-x/compare/v1.46.3...v1.46.4) (2024-06-18)

### Bug Fixes

- **calendar:** get \_options on external event ([#491](https://github.com/schedule-x/schedule-x/issues/491)) ([057a1c7](https://github.com/schedule-x/schedule-x/commit/057a1c7def8f3804ef2522316447523c926ec8ce))

## [1.46.3](https://github.com/schedule-x/schedule-x/compare/v1.46.2...v1.46.3) (2024-06-17)

### Bug Fixes

- **calendar:** dont display people in time grid event when passed empty array ([#490](https://github.com/schedule-x/schedule-x/issues/490)) ([a5274bb](https://github.com/schedule-x/schedule-x/commit/a5274bbfeadc311bc64c0ef82ac563b84739aa90))

## [1.46.2](https://github.com/schedule-x/schedule-x/compare/v1.46.1...v1.46.2) (2024-06-17)

### Bug Fixes

- change month agenda date when date picker date changes ([#488](https://github.com/schedule-x/schedule-x/issues/488)) ([083295a](https://github.com/schedule-x/schedule-x/commit/083295ac7be0f85e0b610bae8032a6c633418ae1))

## [1.46.1](https://github.com/schedule-x/schedule-x/compare/v1.46.0...v1.46.1) (2024-06-11)

### Bug Fixes

- **theme-default:** scope styles that were global by accident ([#481](https://github.com/schedule-x/schedule-x/issues/481)) ([d2af629](https://github.com/schedule-x/schedule-x/commit/d2af629f354bb377abd65d544132aa7395090950))

# [1.46.0](https://github.com/schedule-x/schedule-x/compare/v1.45.1...v1.46.0) (2024-06-10)

### Features

- add Czech translations ([#479](https://github.com/schedule-x/schedule-x/issues/479)) ([3ec7f87](https://github.com/schedule-x/schedule-x/commit/3ec7f87d554b9eaf01c183b918413af8f1dfd753))

## [1.45.1](https://github.com/schedule-x/schedule-x/compare/v1.45.0...v1.45.1) (2024-06-08)

### Bug Fixes

- **calendar:** only update custom event component when event changes ([#474](https://github.com/schedule-x/schedule-x/issues/474)) ([0cddf8a](https://github.com/schedule-x/schedule-x/commit/0cddf8ac87a4adee52a1c6813b83f0d0e2dde421))

# [1.45.0](https://github.com/schedule-x/schedule-x/compare/v1.44.0...v1.45.0) (2024-06-06)

### Bug Fixes

- **calendar-controls:** update range when setting view ([#463](https://github.com/schedule-x/schedule-x/issues/463)) ([ebfb4a6](https://github.com/schedule-x/schedule-x/commit/ebfb4a65b7152b39af6dcfc60dda18ae86fb9104))

### Features

- **calendar:** add double click callbacks ([#465](https://github.com/schedule-x/schedule-x/issues/465)) ([ddf22d0](https://github.com/schedule-x/schedule-x/commit/ddf22d044686574c0b9734228ec8b81c2169e5cb))
- **calendar:** add onClickAgendaDate callback ([#464](https://github.com/schedule-x/schedule-x/issues/464)) ([cb403ba](https://github.com/schedule-x/schedule-x/commit/cb403bad43ece41558663739d9e5deb9551ac168))

# [1.44.0](https://github.com/schedule-x/schedule-x/compare/v1.43.0...v1.44.0) (2024-06-06)

### Features

- add \_options property for events ([#457](https://github.com/schedule-x/schedule-x/issues/457)) ([23bddad](https://github.com/schedule-x/schedule-x/commit/23bddada52327134753885a838ab658ee0cfd254))
- add beforeInit lifecycle hook for plugins ([#456](https://github.com/schedule-x/schedule-x/issues/456)) ([61830dd](https://github.com/schedule-x/schedule-x/commit/61830dd0b89edf37a6e677c5f160dfb7e0707485))

# [1.43.0-alpha.0](https://github.com/schedule-x/schedule-x/compare/v1.42.3...v1.43.0-alpha.0) (2024-06-03)

### Features

- create function for detecting time overlap ([e3fcafb](https://github.com/schedule-x/schedule-x/commit/e3fcafb83a178a607c46c74965f7ecea2c64bf6f))
- refactor day keys in time grid ([ca8fdef](https://github.com/schedule-x/schedule-x/commit/ca8fdefe707a596bbc4d61bdc490917748c995f3))
- refactor day keys in time grid ([1f5716e](https://github.com/schedule-x/schedule-x/commit/1f5716efa1896cfd6308ced6d4ffb9622b67606a))
- refactor day keys in time grid ([abcfc7d](https://github.com/schedule-x/schedule-x/commit/abcfc7d2760f32ee81ff02930616c1acf41c085c))
- refactor event concurrency ([f29c62b](https://github.com/schedule-x/schedule-x/commit/f29c62b053fe4465b5927b3b58015a272cd1f383))

## [1.42.3](https://github.com/schedule-x/schedule-x/compare/v1.42.2...v1.42.3) (2024-05-31)

### Bug Fixes

- bug in addMonths function ([#449](https://github.com/schedule-x/schedule-x/issues/449)) ([2fb2f71](https://github.com/schedule-x/schedule-x/commit/2fb2f71f993bce04915cad2a0a355a4bde3847d9))
- update range on resize screen ([#448](https://github.com/schedule-x/schedule-x/issues/448)) ([94e50f2](https://github.com/schedule-x/schedule-x/commit/94e50f227687d6ceea325c07893766a4bc7b84d8))

## [1.42.2](https://github.com/schedule-x/schedule-x/compare/v1.42.1...v1.42.2) (2024-05-30)

### Bug Fixes

- enable opening date picker popup by clicking input chevron ([#442](https://github.com/schedule-x/schedule-x/issues/442)) ([c71ec23](https://github.com/schedule-x/schedule-x/commit/c71ec237b8dec502f7d4c2001b1589bfd89bdef2))

## [1.42.1](https://github.com/schedule-x/schedule-x/compare/v1.42.0...v1.42.1) (2024-05-24)

### Bug Fixes

- event facade types for event ids ([#439](https://github.com/schedule-x/schedule-x/issues/439)) ([a100e47](https://github.com/schedule-x/schedule-x/commit/a100e47b5e90b836ce19826c08f922a827695e82))

# [1.42.0](https://github.com/schedule-x/schedule-x/compare/v1.41.2...v1.42.0) (2024-05-22)

### Features

- add class for leading and trailing dates in month grid ([#434](https://github.com/schedule-x/schedule-x/issues/434)) ([7206e72](https://github.com/schedule-x/schedule-x/commit/7206e723285ed2786cc9c6fd8b8d6ea41b5ab145))
- add support for language Bahasa (Indonesia) ([#433](https://github.com/schedule-x/schedule-x/issues/433)) ([87c747f](https://github.com/schedule-x/schedule-x/commit/87c747f95d50bbdb9e6263d66de0baae3721a0e2))

## [1.41.2](https://github.com/schedule-x/schedule-x/compare/v1.41.1...v1.41.2) (2024-05-17)

### Bug Fixes

- remove preact/jsx-runtime from bundle ([#428](https://github.com/schedule-x/schedule-x/issues/428)) ([19e5dd0](https://github.com/schedule-x/schedule-x/commit/19e5dd07b5974362f9c353f129cf74cba5522358))

## [1.41.1](https://github.com/schedule-x/schedule-x/compare/v1.41.0...v1.41.1) (2024-05-16)

### Bug Fixes

- remove preact compat from bundle ([#424](https://github.com/schedule-x/schedule-x/issues/424)) ([5b921f2](https://github.com/schedule-x/schedule-x/commit/5b921f24770f00d994353104c86f97919cb97bac))

# [1.41.0](https://github.com/schedule-x/schedule-x/compare/v1.40.0...v1.41.0) (2024-05-11)

### Features

- **calendar:** create possibility to add a filterPredicate for events ([#421](https://github.com/schedule-x/schedule-x/issues/421)) ([131490a](https://github.com/schedule-x/schedule-x/commit/131490a1dd6096c5def5881d707dc3f2627853d9))

# [1.40.0](https://github.com/schedule-x/schedule-x/compare/v1.39.0...v1.40.0) (2024-05-11)

### Features

- add getDate and onSelectedDateUpdate apis ([#419](https://github.com/schedule-x/schedule-x/issues/419)) ([adfd5e6](https://github.com/schedule-x/schedule-x/commit/adfd5e60a6cb2c85c6cfeb31fc70b427205f87d5))
- **calendar:** expose further public apis ([#418](https://github.com/schedule-x/schedule-x/issues/418)) ([e2be1b0](https://github.com/schedule-x/schedule-x/commit/e2be1b0915786794121d923aebe0e72860c0de2e))

# [1.39.0](https://github.com/schedule-x/schedule-x/compare/v1.38.0...v1.39.0) (2024-05-08)

### Features

- **shared:** expose deepCloneEvent API ([#414](https://github.com/schedule-x/schedule-x/issues/414)) ([72a2d52](https://github.com/schedule-x/schedule-x/commit/72a2d52175f2baaf9d16929e99382876ce8a0f41))

# [1.38.0](https://github.com/schedule-x/schedule-x/compare/v1.37.0...v1.38.0) (2024-05-06)

### Features

- **event-modal:** set modal position on scroll ([#403](https://github.com/schedule-x/schedule-x/issues/403)) ([518aa63](https://github.com/schedule-x/schedule-x/commit/518aa631d25c2bbc9700f0f68cf0f04d7fe6d4be))
- hide forward backward nav based on css ([#410](https://github.com/schedule-x/schedule-x/issues/410)) ([314e0aa](https://github.com/schedule-x/schedule-x/commit/314e0aa5a1379ff5a923fcd7221111badaa818c3))
- reposition popups and modals on scroll ([#408](https://github.com/schedule-x/schedule-x/issues/408)) ([de0d92d](https://github.com/schedule-x/schedule-x/commit/de0d92d7a2adc1783adfee515cfccb9379ceba8b))

# [1.37.0](https://github.com/schedule-x/schedule-x/compare/v1.36.0...v1.37.0) (2024-05-01)

### Features

- expose apis from shared ([#401](https://github.com/schedule-x/schedule-x/issues/401)) ([30783ae](https://github.com/schedule-x/schedule-x/commit/30783ae2ee948a18186130ef24ff47a5a0d7a949))

# [1.36.0](https://github.com/schedule-x/schedule-x/compare/v1.35.0...v1.36.0) (2024-04-30)

### Bug Fixes

- **calendar:** prevent duplicate custom component ids ([#396](https://github.com/schedule-x/schedule-x/issues/396)) ([a0af6d2](https://github.com/schedule-x/schedule-x/commit/a0af6d2891bdeeb7d8d67ed044970b565f511f1d))
- **calendar:** prevent redundant range updates ([#395](https://github.com/schedule-x/schedule-x/issues/395)) ([fbdd100](https://github.com/schedule-x/schedule-x/commit/fbdd1003d0cb1792fe2fdacf468e74917efcd7da))

### Features

- add data-event-id attribute to all events ([#388](https://github.com/schedule-x/schedule-x/issues/388)) ([106833b](https://github.com/schedule-x/schedule-x/commit/106833b2079bbfb76e1f7a409b3cd9a40585daf9))
- **shared:** expose more interfaces ([#394](https://github.com/schedule-x/schedule-x/issues/394)) ([5e9b6e7](https://github.com/schedule-x/schedule-x/commit/5e9b6e771ee832aa6f74b9345eef395201eba1ea))

# [1.35.0](https://github.com/schedule-x/schedule-x/compare/v1.34.0...v1.35.0) (2024-04-26)

### Bug Fixes

- prevent too frequent updates on resize ([#386](https://github.com/schedule-x/schedule-x/issues/386)) ([0a5a299](https://github.com/schedule-x/schedule-x/commit/0a5a2998bc12ce695c61fd6db13b14b2d4bd386f))

### Features

- enable configuring interval in resize plugin ([#384](https://github.com/schedule-x/schedule-x/issues/384)) ([49cd041](https://github.com/schedule-x/schedule-x/commit/49cd04173e33d9e2920330062f8c2735ba422adc))

# [1.34.0](https://github.com/schedule-x/schedule-x/compare/v1.33.0...v1.34.0) (2024-04-20)

### Bug Fixes

- prevent redundant rerenders in time grid ([#365](https://github.com/schedule-x/schedule-x/issues/365)) ([e63b813](https://github.com/schedule-x/schedule-x/commit/e63b813b29b33fd5d8c68b62c926eae39091c083))

### Features

- **calendar:** add callback for clicking plus events button ([#367](https://github.com/schedule-x/schedule-x/issues/367)) ([da11f78](https://github.com/schedule-x/schedule-x/commit/da11f788f121bd561af16ef0c67f60f20d1cefdc))
- **calendar:** add config option nEventsPerDay for month grid ([#368](https://github.com/schedule-x/schedule-x/issues/368)) ([a285d3d](https://github.com/schedule-x/schedule-x/commit/a285d3d92db3b6638c9235c9da2c50a4aa561525))
- **calendar:** expose interfaces ([#366](https://github.com/schedule-x/schedule-x/issues/366)) ([a00c950](https://github.com/schedule-x/schedule-x/commit/a00c950dd5265fa9ad591d4d0daa9aa80f877c20))
- rename plugin ([#369](https://github.com/schedule-x/schedule-x/issues/369)) ([8e89b0f](https://github.com/schedule-x/schedule-x/commit/8e89b0f4658e80276510e4ce092c3a4132eaede3))

# [1.33.0](https://github.com/schedule-x/schedule-x/compare/v1.32.0...v1.33.0) (2024-04-19)

### Bug Fixes

- event recurrence update fn ([#358](https://github.com/schedule-x/schedule-x/issues/358)) ([b229acb](https://github.com/schedule-x/schedule-x/commit/b229acb75b7a6957923559f51c68e06b6fe274fc))

### Features

- **calendar:** add new class name for leading and trailing in month agenda ([#359](https://github.com/schedule-x/schedule-x/issues/359)) ([1323eb2](https://github.com/schedule-x/schedule-x/commit/1323eb28d52240c4a7e001ba8890e03015a14027))
- **events-service:** rename package ([#364](https://github.com/schedule-x/schedule-x/issues/364)) ([830bfc1](https://github.com/schedule-x/schedule-x/commit/830bfc1f23c1c01133b93b208eba256ff903baf9))

# [1.32.0](https://github.com/schedule-x/schedule-x/compare/v1.31.0...v1.32.0) (2024-04-15)

### Features

- add event updater plugin ([#349](https://github.com/schedule-x/schedule-x/issues/349)) ([0e81005](https://github.com/schedule-x/schedule-x/commit/0e8100569e9781a993915ceff1f0196fa4d846d0))
- add Kyrgyz translations ([#350](https://github.com/schedule-x/schedule-x/issues/350)) ([f48f6d6](https://github.com/schedule-x/schedule-x/commit/f48f6d6579c028b8e825e77ca810b27956cc8cc6))
- expose interfaces for external config and events ([#352](https://github.com/schedule-x/schedule-x/issues/352)) ([a9148f0](https://github.com/schedule-x/schedule-x/commit/a9148f0b732f20aea5497a25ab0d8c3cfddac7b0))

# [1.31.0](https://github.com/schedule-x/schedule-x/compare/v1.30.1...v1.31.0) (2024-04-13)

### Features

- add time picker component ([#337](https://github.com/schedule-x/schedule-x/issues/337)) ([f5605fc](https://github.com/schedule-x/schedule-x/commit/f5605fccd17c69f76a8a19c33ce1718d3fc1a451))

## [1.30.1](https://github.com/schedule-x/schedule-x/compare/v1.30.0...v1.30.1) (2024-04-08)

### Bug Fixes

- enable updating custom events in agenda view ([0c09c06](https://github.com/schedule-x/schedule-x/commit/0c09c0650703c2c01dd562790a8c2d6d35e978ab))

# [1.30.0](https://github.com/schedule-x/schedule-x/compare/v1.29.1...v1.30.0) (2024-04-06)

### Features

- add turkish language support ([#336](https://github.com/schedule-x/schedule-x/issues/336)) ([7bbae58](https://github.com/schedule-x/schedule-x/commit/7bbae58547c1279a4a3d5ec28826e5324efc2c5c))

## [1.29.1](https://github.com/schedule-x/schedule-x/compare/v1.29.0...v1.29.1) (2024-04-05)

### Bug Fixes

- enable reactively updating the list of events in month agenda view ([#334](https://github.com/schedule-x/schedule-x/issues/334)) ([c9b0f10](https://github.com/schedule-x/schedule-x/commit/c9b0f10116ab0a3d0ae87a873692c05d3ae32dce))

# [1.29.0](https://github.com/schedule-x/schedule-x/compare/v1.28.0...v1.29.0) (2024-04-04)

### Bug Fixes

- force event modal to render again when clicking new event ([#331](https://github.com/schedule-x/schedule-x/issues/331)) ([ecb97f3](https://github.com/schedule-x/schedule-x/commit/ecb97f3979b65cff5ca7896f87a06a843955c72e))

### Features

- enable configuring label text in date picker ([#330](https://github.com/schedule-x/schedule-x/issues/330)) ([397ba7e](https://github.com/schedule-x/schedule-x/commit/397ba7e0acad4f0ac730be5858d2363a0664cda5))

# [1.28.0](https://github.com/schedule-x/schedule-x/compare/v1.27.1...v1.28.0) (2024-04-02)

### Features

- add macedonian language support ([#321](https://github.com/schedule-x/schedule-x/issues/321)) ([02482a8](https://github.com/schedule-x/schedule-x/commit/02482a855ec9d9f1b1d1a97bfc0bec3ebef764a3))
- enable teleporting date picker ([#323](https://github.com/schedule-x/schedule-x/issues/323)) ([f441e60](https://github.com/schedule-x/schedule-x/commit/f441e606aaa5c1b0a49caa898e281acb72b1e3e4))

## [1.27.1](https://github.com/schedule-x/schedule-x/compare/v1.27.0...v1.27.1) (2024-04-01)

### Bug Fixes

- fix DST recurrence calculation ([#317](https://github.com/schedule-x/schedule-x/issues/317)) ([5ec04b9](https://github.com/schedule-x/schedule-x/commit/5ec04b96f40efba6430aa102aa91f91aec8ea0ac))

# [1.27.0](https://github.com/schedule-x/schedule-x/compare/v1.26.0...v1.27.0) (2024-03-28)

### Features

- add Slovak language support([#312](https://github.com/schedule-x/schedule-x/issues/312)) ([#313](https://github.com/schedule-x/schedule-x/issues/313)) ([471a0a8](https://github.com/schedule-x/schedule-x/commit/471a0a8087f7e5511167398baf043638cfc4d814))

# [1.26.0](https://github.com/schedule-x/schedule-x/compare/v1.25.0...v1.26.0) (2024-03-28)

### Features

- create current time indicator plugin ([#310](https://github.com/schedule-x/schedule-x/issues/310)) ([a618b62](https://github.com/schedule-x/schedule-x/commit/a618b62cf1811b99d22641d0eeeb3cf4eb01bbf2))

# [1.25.0](https://github.com/schedule-x/schedule-x/compare/v1.24.0...v1.25.0) (2024-03-16)

### Features

- add "set" API to events facade ([#295](https://github.com/schedule-x/schedule-x/issues/295)) ([a29b202](https://github.com/schedule-x/schedule-x/commit/a29b20215f346902348e8be6e353146386c4791a))
- make config option "calendars" reactive ([#294](https://github.com/schedule-x/schedule-x/issues/294)) ([ad54682](https://github.com/schedule-x/schedule-x/commit/ad54682829e29e20564d9e7c3dcd5101701996fe))

# [1.24.0](https://github.com/schedule-x/schedule-x/compare/v1.23.0...v1.24.0) (2024-03-16)

### Features

- add config options minDate and maxDate ([#293](https://github.com/schedule-x/schedule-x/issues/293)) ([3d21392](https://github.com/schedule-x/schedule-x/commit/3d213920201cc7bbd126b720cc900b89952d048e))

# [1.23.0](https://github.com/schedule-x/schedule-x/compare/v1.22.0...v1.23.0) (2024-03-11)

### Bug Fixes

- js error in scroll controller plugin ([#289](https://github.com/schedule-x/schedule-x/issues/289)) ([2d40159](https://github.com/schedule-x/schedule-x/commit/2d40159e161a847bc8f655e46d42744fe771a10e))
- local error when starting vite devserver ([#291](https://github.com/schedule-x/schedule-x/issues/291)) ([40c6d48](https://github.com/schedule-x/schedule-x/commit/40c6d481ea856595b04db633d4f61043b3cf64ac))

### Features

- export CustomComponentFns API as CustomComponents ([#290](https://github.com/schedule-x/schedule-x/issues/290)) ([bd5028d](https://github.com/schedule-x/schedule-x/commit/bd5028db0ba8a96759c3e0c3e6107daa8059b3bf))

# [1.22.0](https://github.com/schedule-x/schedule-x/compare/v1.21.0...v1.22.0) (2024-03-08)

### Features

- add Brazilian Portuguese language support ([#279](https://github.com/schedule-x/schedule-x/issues/279)) ([ebc0bf7](https://github.com/schedule-x/schedule-x/commit/ebc0bf70715219dd00b5d5807fe29759154f8677))
- add Dutch language support ([#281](https://github.com/schedule-x/schedule-x/issues/281)) ([c82c515](https://github.com/schedule-x/schedule-x/commit/c82c515262be663150f6a7ab7e2a0831dd039562))
- add the ability to customize event modals ([#282](https://github.com/schedule-x/schedule-x/issues/282)) ([a053c3c](https://github.com/schedule-x/schedule-x/commit/a053c3c7144d6d3d8c3b8f30478672f8bebe49f2))

# [1.21.0](https://github.com/schedule-x/schedule-x/compare/v1.20.0...v1.21.0) (2024-03-04)

### Bug Fixes

- event concurrency algorithm ([#271](https://github.com/schedule-x/schedule-x/issues/271)) ([37b4b2d](https://github.com/schedule-x/schedule-x/commit/37b4b2d42db40bdc5e5ae1eda7cc2a8982f01706))

### Features

- make view api generic ([#272](https://github.com/schedule-x/schedule-x/issues/272)) ([8f0d20c](https://github.com/schedule-x/schedule-x/commit/8f0d20c2a5185720993eeaa8b9af2414a172e7d7))

# [1.20.0](https://github.com/schedule-x/schedule-x/compare/v1.19.0...v1.20.0) (2024-03-04)

### Bug Fixes

- overlap in multiple event-concurrency where only a few overlap ([#265](https://github.com/schedule-x/schedule-x/issues/265)) ([6e9a996](https://github.com/schedule-x/schedule-x/commit/6e9a996f3bf32af368c8ac118ba177b42e5cc829))

### Features

- add support for Spanish ([#269](https://github.com/schedule-x/schedule-x/issues/269)) ([6080e01](https://github.com/schedule-x/schedule-x/commit/6080e016cc74e5493b3377078220400598f7b246))

# [1.19.0](https://github.com/schedule-x/schedule-x/compare/v1.18.0...v1.19.0) (2024-02-28)

### Features

- add support for polish language ([#262](https://github.com/schedule-x/schedule-x/issues/262)) ([459a8bc](https://github.com/schedule-x/schedule-x/commit/459a8bc5d40bfa1acb1bd24b037eaf375b9865fe))

# [1.18.0](https://github.com/schedule-x/schedule-x/compare/v1.17.1...v1.18.0) (2024-02-23)

### Bug Fixes

- **deps:** update dependency @uiw/codemirror-theme-github to v4.21.23 ([#249](https://github.com/schedule-x/schedule-x/issues/249)) ([076012d](https://github.com/schedule-x/schedule-x/commit/076012d55c8e27f5316c26718a8bbf71b1285194))

### Features

- add calendar controls plugin ([#253](https://github.com/schedule-x/schedule-x/issues/253)) ([db414d6](https://github.com/schedule-x/schedule-x/commit/db414d69b2fc95b6699b40699c0a546168a82f30))

## [1.17.1](https://github.com/schedule-x/schedule-x/compare/v1.17.0...v1.17.1) (2024-02-17)

### Bug Fixes

- enable touch device users to scroll upon touching events ([#232](https://github.com/schedule-x/schedule-x/issues/232)) ([36e4818](https://github.com/schedule-x/schedule-x/commit/36e48187d509df664155c5aec1a9af13e8e10146))
- typo in Danish translations ([#242](https://github.com/schedule-x/schedule-x/issues/242)) ([84430ee](https://github.com/schedule-x/schedule-x/commit/84430eee21ca1ebada604cfb212829f9125b3a68))

# [1.17.0](https://github.com/schedule-x/schedule-x/compare/v1.16.0...v1.17.0) (2024-02-10)

### Bug Fixes

- prevent event modal from closing on click inside ([#235](https://github.com/schedule-x/schedule-x/issues/235)) ([39c9c3e](https://github.com/schedule-x/schedule-x/commit/39c9c3e34c48f1480880cbec3848988f07bb3893))

### Features

- add support for freq=YEARLY, MONTHLY and DAILY in rrule ([#233](https://github.com/schedule-x/schedule-x/issues/233)) ([f3046ca](https://github.com/schedule-x/schedule-x/commit/f3046ca62fbe9cd6dee3d02d0f5270480b3d7b61))
- improve seo ([#231](https://github.com/schedule-x/schedule-x/issues/231)) ([5702536](https://github.com/schedule-x/schedule-x/commit/5702536e7edd05710ee0ef6219f0464a8c8c9db6))

# [1.16.0](https://github.com/schedule-x/schedule-x/compare/v1.15.0...v1.16.0) (2024-02-09)

### Features

- add danish translations ([#217](https://github.com/schedule-x/schedule-x/issues/217)) ([5bd9249](https://github.com/schedule-x/schedule-x/commit/5bd9249a7fa863d359187d443745e13da905a456))

# [1.15.0](https://github.com/schedule-x/schedule-x/compare/v1.14.0...v1.15.0) (2024-02-06)

### Features

- update recurrent events on resize ([#225](https://github.com/schedule-x/schedule-x/issues/225)) ([dd522d4](https://github.com/schedule-x/schedule-x/commit/dd522d422c53a247d3a8661a15214d0349679922))

# [1.14.0](https://github.com/schedule-x/schedule-x/compare/v1.13.0...v1.14.0) (2024-02-05)

### Features

- add french lang ([#222](https://github.com/schedule-x/schedule-x/issues/222)) ([ee5581a](https://github.com/schedule-x/schedule-x/commit/ee5581a2b209471be5499147a7ec9443971bfc21))

# [1.13.0](https://github.com/schedule-x/schedule-x/compare/v1.12.2...v1.13.0) (2024-02-05)

### Features

- add events facade for recurrence plugin ([#220](https://github.com/schedule-x/schedule-x/issues/220)) ([dde1806](https://github.com/schedule-x/schedule-x/commit/dde180679d18f6ecf72a6616e824a9f9e321aa7a))
- enable dragging a recurring events ([#219](https://github.com/schedule-x/schedule-x/issues/219)) ([35441e7](https://github.com/schedule-x/schedule-x/commit/35441e74546f4a9fe7c41e3f321bf6ecf1a4fb2b))
- enable showing weekly events through rrule ([#218](https://github.com/schedule-x/schedule-x/issues/218)) ([6f33d0f](https://github.com/schedule-x/schedule-x/commit/6f33d0f8c29f35115502a744b3dc6816b75f9495))
- recurrence library ([#208](https://github.com/schedule-x/schedule-x/issues/208)) ([f7488bd](https://github.com/schedule-x/schedule-x/commit/f7488bd89862e6a04d81452c067cfec6866a8ea6))

## [1.12.2](https://github.com/schedule-x/schedule-x/compare/v1.12.1...v1.12.2) (2024-02-02)

### Bug Fixes

- prevent date picker input from listening to external change events ([#211](https://github.com/schedule-x/schedule-x/issues/211)) ([6d38592](https://github.com/schedule-x/schedule-x/commit/6d3859212af2591bfd80970b9942390ca5aea5c8))

## [1.12.1](https://github.com/schedule-x/schedule-x/compare/v1.12.0...v1.12.1) (2024-01-29)

### Bug Fixes

- prevent redundant calls of onEventUpdate on resizing ([#189](https://github.com/schedule-x/schedule-x/issues/189)) ([6b7bf65](https://github.com/schedule-x/schedule-x/commit/6b7bf6544628793ef399862713a1c91c16bd7b2e))

# [1.12.0](https://github.com/schedule-x/schedule-x/compare/v1.11.0...v1.12.0) (2024-01-27)

### Features

- enable resizing events in date grid ([#182](https://github.com/schedule-x/schedule-x/issues/182)) ([f84a6c5](https://github.com/schedule-x/schedule-x/commit/f84a6c56d7e5d1f690ba5fae69db8e935e4bf49f))

# [0.5.0-alpha.0](https://github.com/schedule-x/schedule-x/compare/v0.4.0...v0.5.0-alpha.0) (2023-12-23)

### Features

- enable custom component time grid event ([#110](https://github.com/schedule-x/schedule-x/issues/110)) ([bdf5e6b](https://github.com/schedule-x/schedule-x/commit/bdf5e6b35279508c1c9ff724df05e496d7f82ad6))

# [0.3.0-alpha.0](https://github.com/schedule-x/schedule-x/compare/v0.2.0...v0.3.0-alpha.0) (2023-12-16)

### Features

- add e2e testing lib ([#104](https://github.com/schedule-x/schedule-x/issues/104)) ([c63be37](https://github.com/schedule-x/schedule-x/commit/c63be37db2ce3083846e8d71f069aa8a6b5d7b42))
- build testing lib ([e058379](https://github.com/schedule-x/schedule-x/commit/e058379565684bf59ca519cffdf282a0b9776118))

# [0.1.0-alpha.13](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.5...v0.1.0-alpha.13) (2023-11-25)

### Bug Fixes

- broken bundling of dependencies ([#79](https://github.com/schedule-x/schedule-x/issues/79)) ([dd24893](https://github.com/schedule-x/schedule-x/commit/dd2489360c25a0bbc4e454323b15ff1a61069b89))
- text alignment in modal ([#84](https://github.com/schedule-x/schedule-x/issues/84)) ([57e90c0](https://github.com/schedule-x/schedule-x/commit/57e90c0690318b3369dd33f05eb19a1c2d865569))

### Features

- improve type declaration files ([5cf7667](https://github.com/schedule-x/schedule-x/commit/5cf76676cb8bc49752ccf4d68e367170b904670f))

# [0.1.0-alpha.12](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.5...v0.1.0-alpha.12) (2023-11-24)

### Bug Fixes

- broken bundling of dependencies ([#79](https://github.com/schedule-x/schedule-x/issues/79)) ([dd24893](https://github.com/schedule-x/schedule-x/commit/dd2489360c25a0bbc4e454323b15ff1a61069b89))

# [0.1.0-alpha.11](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.10...v0.1.0-alpha.11) (2023-11-24)

**Note:** Version bump only for package schedule-x

# [0.1.0-alpha.10](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.5...v0.1.0-alpha.10) (2023-11-24)

### Bug Fixes

- broken bundling of dependencies ([#79](https://github.com/schedule-x/schedule-x/issues/79)) ([dd24893](https://github.com/schedule-x/schedule-x/commit/dd2489360c25a0bbc4e454323b15ff1a61069b89))

# [0.1.0-alpha.9](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.8...v0.1.0-alpha.9) (2023-11-20)

### Bug Fixes

- broken deps ([18ae83f](https://github.com/schedule-x/schedule-x/commit/18ae83f06a7c5ab98cf3f9031fd68399ab56ebcc))
- broken deps ([82a18b6](https://github.com/schedule-x/schedule-x/commit/82a18b681aa2418c5939c39b61d3f61685acba42))
- remove log statements ([69431b3](https://github.com/schedule-x/schedule-x/commit/69431b374e61aa3b9eac0489d73945ec1c8cd70e))
- remove vite build ([6670a2e](https://github.com/schedule-x/schedule-x/commit/6670a2e284c5e5689567ceed7a292a8eee9e67d7))

# [0.1.0-alpha.8](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.7...v0.1.0-alpha.8) (2023-11-18)

### Bug Fixes

- broken deps ([ba06ab5](https://github.com/schedule-x/schedule-x/commit/ba06ab5e0fd362cd6e7f844e9b4ad0bcf276e8a9))

# [0.1.0-alpha.7](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.6...v0.1.0-alpha.7) (2023-11-18)

### Bug Fixes

- broken deps ([2677447](https://github.com/schedule-x/schedule-x/commit/26774474f0efeaa1002e47e4fb94b39a3d3e8036))
- broken deps ([25c359e](https://github.com/schedule-x/schedule-x/commit/25c359e486924f426db3f00d731fd10673ec43ab))
- broken type ([0831948](https://github.com/schedule-x/schedule-x/commit/083194828e4bc3ae33ed8c4884ad427e491dcd87))

# [0.1.0-alpha.6](https://github.com/schedule-x/schedule-x/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2023-11-18)

### Bug Fixes

- broken dependency on shared lib ([24bfee2](https://github.com/schedule-x/schedule-x/commit/24bfee261efdbbd8482105e0b5b008f08316e76c))
- broken type ([a636214](https://github.com/schedule-x/schedule-x/commit/a636214ba4c0fd42b7853e0753657a3d82f72012))

# 0.1.0-alpha.5 (2023-11-18)

### Bug Fixes

- architecture breaks ([#42](https://github.com/schedule-x/schedule-x/issues/42)) ([331e541](https://github.com/schedule-x/schedule-x/commit/331e541283c734d61ccb67f2bcf7cbaf013d0fef))
- chinese day names in agenda mode ([#74](https://github.com/schedule-x/schedule-x/issues/74)) ([b6debf3](https://github.com/schedule-x/schedule-x/commit/b6debf347c46c81327514ef5962b11e35efe93ec))
- **deps:** update docusaurus monorepo to v2.4.3 ([#46](https://github.com/schedule-x/schedule-x/issues/46)) ([14df43b](https://github.com/schedule-x/schedule-x/commit/14df43b21aa4cd3cd2edc6c55672999b727a9438))
- **drag-and-drop:** improve date grid d&d ([#76](https://github.com/schedule-x/schedule-x/issues/76)) ([2a8ba83](https://github.com/schedule-x/schedule-x/commit/2a8ba8340d7871d582d38171055dcebc42baa31c))
- show only one day in day mode with hybrid day boundaries ([#52](https://github.com/schedule-x/schedule-x/issues/52)) ([7c360e4](https://github.com/schedule-x/schedule-x/commit/7c360e46037f334044ced7c3660484782053e5ef))
- svg compilation ([#17](https://github.com/schedule-x/schedule-x/issues/17)) ([493e9ba](https://github.com/schedule-x/schedule-x/commit/493e9ba6bf05834902b1dade8baeda60774268c8))

### Features

- add click outside functionality for popup ([#8](https://github.com/schedule-x/schedule-x/issues/8)) ([6a04bec](https://github.com/schedule-x/schedule-x/commit/6a04becc2356c2e78ed49b0da9e3be5174862520))
- add placement config ([#9](https://github.com/schedule-x/schedule-x/issues/9)) ([3344d69](https://github.com/schedule-x/schedule-x/commit/3344d69c042ba09e875aa80c2497c2f6bf336bac))
- add style option fullWidth ([#21](https://github.com/schedule-x/schedule-x/issues/21)) ([a33c878](https://github.com/schedule-x/schedule-x/commit/a33c8780fe010c4e0fd7300438f7f8d4c5a695a0))
- add translations ([#20](https://github.com/schedule-x/schedule-x/issues/20)) ([d3f55ac](https://github.com/schedule-x/schedule-x/commit/d3f55ace9f06e4fc7a0068f3de94b9a868407724))
- allow empty string value ([#14](https://github.com/schedule-x/schedule-x/issues/14)) ([94aa1b9](https://github.com/schedule-x/schedule-x/commit/94aa1b92375f7b8409d7008fbed599bc02fc46ae))
- allow typing date ([#10](https://github.com/schedule-x/schedule-x/issues/10)) ([c1f0778](https://github.com/schedule-x/schedule-x/commit/c1f0778e9e3e639e9c085ef23eaade964a82cd9e))
- calendar header ([#26](https://github.com/schedule-x/schedule-x/issues/26)) ([b4e489f](https://github.com/schedule-x/schedule-x/commit/b4e489f13cce4dbd7dd11d2a325ff1718aa8b3ec))
- calendar views bootstrapping ([#27](https://github.com/schedule-x/schedule-x/issues/27)) ([4971912](https://github.com/schedule-x/schedule-x/commit/4971912dd17bf9c9c12d669f14b66abb3472808a))
- **calendar:** bootstrap app ([d24c509](https://github.com/schedule-x/schedule-x/commit/d24c509c31ba27d67019aa7be34cd3bdae2c1f35))
- **calendar:** create apis for adding, getting, updating and removing events ([#77](https://github.com/schedule-x/schedule-x/issues/77)) ([065cbc3](https://github.com/schedule-x/schedule-x/commit/065cbc3e270d96ed8effec91d1095ef271267cca))
- **calendar:** create calendars config option ([#36](https://github.com/schedule-x/schedule-x/issues/36)) ([3f2dda0](https://github.com/schedule-x/schedule-x/commit/3f2dda061fa40eb13d80e7563107f9510f2311b2))
- **calendar:** create date axis component ([#32](https://github.com/schedule-x/schedule-x/issues/32)) ([29c82f4](https://github.com/schedule-x/schedule-x/commit/29c82f47751a7b8b6a9ccdd1fd31379efa481487))
- **calendar:** create day view ([4097b6c](https://github.com/schedule-x/schedule-x/commit/4097b6c875077fe100a3301e9a31d01935a88582))
- **calendar:** create dayBoundaries config option ([#29](https://github.com/schedule-x/schedule-x/issues/29)) ([c97079e](https://github.com/schedule-x/schedule-x/commit/c97079e3bb3b3d624b116e60b1d8ce58f717faf5))
- **calendar:** create event duration getters ([#30](https://github.com/schedule-x/schedule-x/issues/30)) ([21d22d8](https://github.com/schedule-x/schedule-x/commit/21d22d88bf542895d7a8638b726eb6e05b74a11f))
- **calendar:** position events in agenda ([#65](https://github.com/schedule-x/schedule-x/issues/65)) ([56c2419](https://github.com/schedule-x/schedule-x/commit/56c2419b1b272faa5a5652a8d72fe70b646284e4))
- **calendar:** set calendar date range ([#34](https://github.com/schedule-x/schedule-x/issues/34)) ([885eaa0](https://github.com/schedule-x/schedule-x/commit/885eaa074b6e2f62b49016abcd8a664eb981664f))
- create month agenda day selection ([#64](https://github.com/schedule-x/schedule-x/issues/64)) ([e7ef9a5](https://github.com/schedule-x/schedule-x/commit/e7ef9a5a88c34f9ee845f9250267a46ae46b7245))
- create month grid ([#54](https://github.com/schedule-x/schedule-x/issues/54)) ([d7625a1](https://github.com/schedule-x/schedule-x/commit/d7625a1028e2e30287bfcb64e1aa4f98475dd1b4))
- create month view for date picker ([#1](https://github.com/schedule-x/schedule-x/issues/1)) ([52d05c7](https://github.com/schedule-x/schedule-x/commit/52d05c788fbd215ac9f416f1051ad9cf0e172e1e))
- create week date grid ([#39](https://github.com/schedule-x/schedule-x/issues/39)) ([36c5b6e](https://github.com/schedule-x/schedule-x/commit/36c5b6eb506077166b3f576377b6b82817dbc11b))
- dark mode ([#19](https://github.com/schedule-x/schedule-x/issues/19)) ([f3b6a4a](https://github.com/schedule-x/schedule-x/commit/f3b6a4ac467ce4af0498019090c79e75763beb90))
- dark mode ([#71](https://github.com/schedule-x/schedule-x/issues/71)) ([93fe6bc](https://github.com/schedule-x/schedule-x/commit/93fe6bc4f6f07b8a84db11053edc1f44d1db066c))
- date grid drag and drop ([#47](https://github.com/schedule-x/schedule-x/issues/47)) ([38b9f7f](https://github.com/schedule-x/schedule-x/commit/38b9f7fceec4b02c192d0231744fb8ea1dc958e6))
- date picker min max ([#5](https://github.com/schedule-x/schedule-x/issues/5)) ([b92aafe](https://github.com/schedule-x/schedule-x/commit/b92aafec67608356384f047383d6f38d95323902))
- detect screen size before initial rendering of view ([#70](https://github.com/schedule-x/schedule-x/issues/70)) ([6abb2eb](https://github.com/schedule-x/schedule-x/commit/6abb2eb4304f4ddd92f9612b4c0ed5cf2905dee8))
- drag and drop month view ([#57](https://github.com/schedule-x/schedule-x/issues/57)) ([741ac17](https://github.com/schedule-x/schedule-x/commit/741ac172e97be349f0758a6d0ae7efdf871c17cc))
- enable reacting to event updates with an onEventUpdate callback ([#75](https://github.com/schedule-x/schedule-x/issues/75)) ([47abd63](https://github.com/schedule-x/schedule-x/commit/47abd63e3426ca68bf027265fcc66aa901d2d5a8))
- enable switching from date picker month view to years view ([#2](https://github.com/schedule-x/schedule-x/issues/2)) ([2194f2b](https://github.com/schedule-x/schedule-x/commit/2194f2b76db5da4b78a1818dac8f1b3faddc6ff5))
- event concurrency ([#37](https://github.com/schedule-x/schedule-x/issues/37)) ([e833b7f](https://github.com/schedule-x/schedule-x/commit/e833b7f3263a2457f5dff8554e70036ef513d978))
- event modal ([#48](https://github.com/schedule-x/schedule-x/issues/48)) ([5026be8](https://github.com/schedule-x/schedule-x/commit/5026be8ff514a8d7a3e134277f1d5b5d55b5f518))
- events ([#28](https://github.com/schedule-x/schedule-x/issues/28)) ([0bd270a](https://github.com/schedule-x/schedule-x/commit/0bd270a7d5f4f858fc451217d478ec9992cd7d35))
- expose single ts declarations for packages ([#78](https://github.com/schedule-x/schedule-x/issues/78)) ([d4a5e43](https://github.com/schedule-x/schedule-x/commit/d4a5e437ab52a7643423ff59f377c8834422d89b))
- implement date picker years view ([#3](https://github.com/schedule-x/schedule-x/issues/3)) ([8ff0489](https://github.com/schedule-x/schedule-x/commit/8ff04898ffb6ccdc2a66a27532f25a51d865ed39))
- make it possible to select a date ([#4](https://github.com/schedule-x/schedule-x/issues/4)) ([b5fb130](https://github.com/schedule-x/schedule-x/commit/b5fb13072da25b4a13c0236e0095b473ebb5f8fb))
- mobile header ([#67](https://github.com/schedule-x/schedule-x/issues/67)) ([d0438be](https://github.com/schedule-x/schedule-x/commit/d0438be58b06dad09846134bb069742330cfbb2b))
- month agenda events ([#66](https://github.com/schedule-x/schedule-x/issues/66)) ([5e8e2b1](https://github.com/schedule-x/schedule-x/commit/5e8e2b17a641fced2458abc8bc82de572cb8b4f3))
- popup position ([#12](https://github.com/schedule-x/schedule-x/issues/12)) ([fcf93fc](https://github.com/schedule-x/schedule-x/commit/fcf93fcbe147b1c162322f32b7cfced2bb484ae6))
- position events in month ([#55](https://github.com/schedule-x/schedule-x/issues/55)) ([858f1be](https://github.com/schedule-x/schedule-x/commit/858f1beae063c119752cdb2d2c227434ddb3be10))
- render events in week grid ([#33](https://github.com/schedule-x/schedule-x/issues/33)) ([eaf1d64](https://github.com/schedule-x/schedule-x/commit/eaf1d64d898dbac69a839eb566bb6be4793ea74c))
- small calendar detection ([#59](https://github.com/schedule-x/schedule-x/issues/59)) ([e1bcaff](https://github.com/schedule-x/schedule-x/commit/e1bcaff5d53ebd738c4596f5532c07cfea0faebf))
- style event ([#35](https://github.com/schedule-x/schedule-x/issues/35)) ([1848f8c](https://github.com/schedule-x/schedule-x/commit/1848f8c2f673324477da637b8cf025ea5ce1e342))
- style leading and trailing dates differently ([#11](https://github.com/schedule-x/schedule-x/issues/11)) ([a2ef08a](https://github.com/schedule-x/schedule-x/commit/a2ef08ab35a60f9eb4b244fc1a681a33a54d4bdf))
- time grid drag and drop ([#41](https://github.com/schedule-x/schedule-x/issues/41)) ([1505c70](https://github.com/schedule-x/schedule-x/commit/1505c702372354cc3c3b8706ad479623c9f6fb8e))
- translations package ([#13](https://github.com/schedule-x/schedule-x/issues/13)) ([f946dd3](https://github.com/schedule-x/schedule-x/commit/f946dd340b9c5059be4ec48c2202a5830cf7a22b))
- value binding in app class and event listeners in config ([#15](https://github.com/schedule-x/schedule-x/issues/15)) ([e382ca0](https://github.com/schedule-x/schedule-x/commit/e382ca0e24cb3df189aa0111a5a6bb95d81ff45d))
- week view grid ([#31](https://github.com/schedule-x/schedule-x/issues/31)) ([ccaf510](https://github.com/schedule-x/schedule-x/commit/ccaf510ad47bf167f27c3ed17573e01cd6dcc69c))

# 0.1.0-alpha.4 (2023-08-28)

### Bug Fixes

- svg compilation ([#17](https://github.com/schedule-x/schedule-x/issues/17)) ([493e9ba](https://github.com/schedule-x/schedule-x/commit/493e9ba6bf05834902b1dade8baeda60774268c8))

### Features

- add click outside functionality for popup ([#8](https://github.com/schedule-x/schedule-x/issues/8)) ([6a04bec](https://github.com/schedule-x/schedule-x/commit/6a04becc2356c2e78ed49b0da9e3be5174862520))
- add placement config ([#9](https://github.com/schedule-x/schedule-x/issues/9)) ([3344d69](https://github.com/schedule-x/schedule-x/commit/3344d69c042ba09e875aa80c2497c2f6bf336bac))
- add translations ([#20](https://github.com/schedule-x/schedule-x/issues/20)) ([d3f55ac](https://github.com/schedule-x/schedule-x/commit/d3f55ace9f06e4fc7a0068f3de94b9a868407724))
- allow empty string value ([#14](https://github.com/schedule-x/schedule-x/issues/14)) ([94aa1b9](https://github.com/schedule-x/schedule-x/commit/94aa1b92375f7b8409d7008fbed599bc02fc46ae))
- allow typing date ([#10](https://github.com/schedule-x/schedule-x/issues/10)) ([c1f0778](https://github.com/schedule-x/schedule-x/commit/c1f0778e9e3e639e9c085ef23eaade964a82cd9e))
- create month view for date picker ([#1](https://github.com/schedule-x/schedule-x/issues/1)) ([52d05c7](https://github.com/schedule-x/schedule-x/commit/52d05c788fbd215ac9f416f1051ad9cf0e172e1e))
- dark mode ([#19](https://github.com/schedule-x/schedule-x/issues/19)) ([f3b6a4a](https://github.com/schedule-x/schedule-x/commit/f3b6a4ac467ce4af0498019090c79e75763beb90))
- date picker min max ([#5](https://github.com/schedule-x/schedule-x/issues/5)) ([b92aafe](https://github.com/schedule-x/schedule-x/commit/b92aafec67608356384f047383d6f38d95323902))
- enable switching from date picker month view to years view ([#2](https://github.com/schedule-x/schedule-x/issues/2)) ([2194f2b](https://github.com/schedule-x/schedule-x/commit/2194f2b76db5da4b78a1818dac8f1b3faddc6ff5))
- implement date picker years view ([#3](https://github.com/schedule-x/schedule-x/issues/3)) ([8ff0489](https://github.com/schedule-x/schedule-x/commit/8ff04898ffb6ccdc2a66a27532f25a51d865ed39))
- make it possible to select a date ([#4](https://github.com/schedule-x/schedule-x/issues/4)) ([b5fb130](https://github.com/schedule-x/schedule-x/commit/b5fb13072da25b4a13c0236e0095b473ebb5f8fb))
- popup position ([#12](https://github.com/schedule-x/schedule-x/issues/12)) ([fcf93fc](https://github.com/schedule-x/schedule-x/commit/fcf93fcbe147b1c162322f32b7cfced2bb484ae6))
- style leading and trailing dates differently ([#11](https://github.com/schedule-x/schedule-x/issues/11)) ([a2ef08a](https://github.com/schedule-x/schedule-x/commit/a2ef08ab35a60f9eb4b244fc1a681a33a54d4bdf))
- translations package ([#13](https://github.com/schedule-x/schedule-x/issues/13)) ([f946dd3](https://github.com/schedule-x/schedule-x/commit/f946dd340b9c5059be4ec48c2202a5830cf7a22b))
- value binding in app class and event listeners in config ([#15](https://github.com/schedule-x/schedule-x/issues/15)) ([e382ca0](https://github.com/schedule-x/schedule-x/commit/e382ca0e24cb3df189aa0111a5a6bb95d81ff45d))

# 0.1.0-alpha.3 (2023-08-27)

### Bug Fixes

- svg compilation ([#17](https://github.com/schedule-x/schedule-x/issues/17)) ([493e9ba](https://github.com/schedule-x/schedule-x/commit/493e9ba6bf05834902b1dade8baeda60774268c8))

### Features

- add click outside functionality for popup ([#8](https://github.com/schedule-x/schedule-x/issues/8)) ([6a04bec](https://github.com/schedule-x/schedule-x/commit/6a04becc2356c2e78ed49b0da9e3be5174862520))
- add placement config ([#9](https://github.com/schedule-x/schedule-x/issues/9)) ([3344d69](https://github.com/schedule-x/schedule-x/commit/3344d69c042ba09e875aa80c2497c2f6bf336bac))
- allow empty string value ([#14](https://github.com/schedule-x/schedule-x/issues/14)) ([94aa1b9](https://github.com/schedule-x/schedule-x/commit/94aa1b92375f7b8409d7008fbed599bc02fc46ae))
- allow typing date ([#10](https://github.com/schedule-x/schedule-x/issues/10)) ([c1f0778](https://github.com/schedule-x/schedule-x/commit/c1f0778e9e3e639e9c085ef23eaade964a82cd9e))
- create month view for date picker ([#1](https://github.com/schedule-x/schedule-x/issues/1)) ([52d05c7](https://github.com/schedule-x/schedule-x/commit/52d05c788fbd215ac9f416f1051ad9cf0e172e1e))
- dark mode ([#19](https://github.com/schedule-x/schedule-x/issues/19)) ([f3b6a4a](https://github.com/schedule-x/schedule-x/commit/f3b6a4ac467ce4af0498019090c79e75763beb90))
- date picker min max ([#5](https://github.com/schedule-x/schedule-x/issues/5)) ([b92aafe](https://github.com/schedule-x/schedule-x/commit/b92aafec67608356384f047383d6f38d95323902))
- enable switching from date picker month view to years view ([#2](https://github.com/schedule-x/schedule-x/issues/2)) ([2194f2b](https://github.com/schedule-x/schedule-x/commit/2194f2b76db5da4b78a1818dac8f1b3faddc6ff5))
- implement date picker years view ([#3](https://github.com/schedule-x/schedule-x/issues/3)) ([8ff0489](https://github.com/schedule-x/schedule-x/commit/8ff04898ffb6ccdc2a66a27532f25a51d865ed39))
- make it possible to select a date ([#4](https://github.com/schedule-x/schedule-x/issues/4)) ([b5fb130](https://github.com/schedule-x/schedule-x/commit/b5fb13072da25b4a13c0236e0095b473ebb5f8fb))
- popup position ([#12](https://github.com/schedule-x/schedule-x/issues/12)) ([fcf93fc](https://github.com/schedule-x/schedule-x/commit/fcf93fcbe147b1c162322f32b7cfced2bb484ae6))
- style leading and trailing dates differently ([#11](https://github.com/schedule-x/schedule-x/issues/11)) ([a2ef08a](https://github.com/schedule-x/schedule-x/commit/a2ef08ab35a60f9eb4b244fc1a681a33a54d4bdf))
- translations package ([#13](https://github.com/schedule-x/schedule-x/issues/13)) ([f946dd3](https://github.com/schedule-x/schedule-x/commit/f946dd340b9c5059be4ec48c2202a5830cf7a22b))
- value binding in app class and event listeners in config ([#15](https://github.com/schedule-x/schedule-x/issues/15)) ([e382ca0](https://github.com/schedule-x/schedule-x/commit/e382ca0e24cb3df189aa0111a5a6bb95d81ff45d))

# 0.1.0-alpha.2 (2023-08-18)

### Features

- add click outside functionality for popup ([#8](https://github.com/schedule-x/schedule-x/issues/8)) ([6a04bec](https://github.com/schedule-x/schedule-x/commit/6a04becc2356c2e78ed49b0da9e3be5174862520))
- add placement config ([#9](https://github.com/schedule-x/schedule-x/issues/9)) ([3344d69](https://github.com/schedule-x/schedule-x/commit/3344d69c042ba09e875aa80c2497c2f6bf336bac))
- allow empty string value ([#14](https://github.com/schedule-x/schedule-x/issues/14)) ([94aa1b9](https://github.com/schedule-x/schedule-x/commit/94aa1b92375f7b8409d7008fbed599bc02fc46ae))
- allow typing date ([#10](https://github.com/schedule-x/schedule-x/issues/10)) ([c1f0778](https://github.com/schedule-x/schedule-x/commit/c1f0778e9e3e639e9c085ef23eaade964a82cd9e))
- create month view for date picker ([#1](https://github.com/schedule-x/schedule-x/issues/1)) ([52d05c7](https://github.com/schedule-x/schedule-x/commit/52d05c788fbd215ac9f416f1051ad9cf0e172e1e))
- date picker min max ([#5](https://github.com/schedule-x/schedule-x/issues/5)) ([b92aafe](https://github.com/schedule-x/schedule-x/commit/b92aafec67608356384f047383d6f38d95323902))
- enable switching from date picker month view to years view ([#2](https://github.com/schedule-x/schedule-x/issues/2)) ([2194f2b](https://github.com/schedule-x/schedule-x/commit/2194f2b76db5da4b78a1818dac8f1b3faddc6ff5))
- implement date picker years view ([#3](https://github.com/schedule-x/schedule-x/issues/3)) ([8ff0489](https://github.com/schedule-x/schedule-x/commit/8ff04898ffb6ccdc2a66a27532f25a51d865ed39))
- make it possible to select a date ([#4](https://github.com/schedule-x/schedule-x/issues/4)) ([b5fb130](https://github.com/schedule-x/schedule-x/commit/b5fb13072da25b4a13c0236e0095b473ebb5f8fb))
- popup position ([#12](https://github.com/schedule-x/schedule-x/issues/12)) ([fcf93fc](https://github.com/schedule-x/schedule-x/commit/fcf93fcbe147b1c162322f32b7cfced2bb484ae6))
- style leading and trailing dates differently ([#11](https://github.com/schedule-x/schedule-x/issues/11)) ([a2ef08a](https://github.com/schedule-x/schedule-x/commit/a2ef08ab35a60f9eb4b244fc1a681a33a54d4bdf))
- translations package ([#13](https://github.com/schedule-x/schedule-x/issues/13)) ([f946dd3](https://github.com/schedule-x/schedule-x/commit/f946dd340b9c5059be4ec48c2202a5830cf7a22b))
- value binding in app class and event listeners in config ([#15](https://github.com/schedule-x/schedule-x/issues/15)) ([e382ca0](https://github.com/schedule-x/schedule-x/commit/e382ca0e24cb3df189aa0111a5a6bb95d81ff45d))

# 0.1.0-alpha.1 (2023-08-09)

### Features

- create month view for date picker ([#1](https://github.com/schedule-x/schedule-x/issues/1)) ([52d05c7](https://github.com/schedule-x/schedule-x/commit/52d05c788fbd215ac9f416f1051ad9cf0e172e1e))
- date picker min max ([#5](https://github.com/schedule-x/schedule-x/issues/5)) ([b92aafe](https://github.com/schedule-x/schedule-x/commit/b92aafec67608356384f047383d6f38d95323902))
- enable switching from date picker month view to years view ([#2](https://github.com/schedule-x/schedule-x/issues/2)) ([2194f2b](https://github.com/schedule-x/schedule-x/commit/2194f2b76db5da4b78a1818dac8f1b3faddc6ff5))
- implement date picker years view ([#3](https://github.com/schedule-x/schedule-x/issues/3)) ([8ff0489](https://github.com/schedule-x/schedule-x/commit/8ff04898ffb6ccdc2a66a27532f25a51d865ed39))
- make it possible to select a date ([#4](https://github.com/schedule-x/schedule-x/issues/4)) ([b5fb130](https://github.com/schedule-x/schedule-x/commit/b5fb13072da25b4a13c0236e0095b473ebb5f8fb))

# 0.1.0-alpha.0 (2023-08-09)

### Features

- create month view for date picker ([#1](https://github.com/schedule-x/schedule-x/issues/1)) ([52d05c7](https://github.com/schedule-x/schedule-x/commit/52d05c788fbd215ac9f416f1051ad9cf0e172e1e))
- date picker min max ([#5](https://github.com/schedule-x/schedule-x/issues/5)) ([b92aafe](https://github.com/schedule-x/schedule-x/commit/b92aafec67608356384f047383d6f38d95323902))
- enable switching from date picker month view to years view ([#2](https://github.com/schedule-x/schedule-x/issues/2)) ([2194f2b](https://github.com/schedule-x/schedule-x/commit/2194f2b76db5da4b78a1818dac8f1b3faddc6ff5))
- implement date picker years view ([#3](https://github.com/schedule-x/schedule-x/issues/3)) ([8ff0489](https://github.com/schedule-x/schedule-x/commit/8ff04898ffb6ccdc2a66a27532f25a51d865ed39))
- make it possible to select a date ([#4](https://github.com/schedule-x/schedule-x/issues/4)) ([b5fb130](https://github.com/schedule-x/schedule-x/commit/b5fb13072da25b4a13c0236e0095b473ebb5f8fb))
