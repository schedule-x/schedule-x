---
slug: welcome-to-schedule-x
title: Welcome to Schedule-X
authors: [oesterlund]
---

_At the moment, there is not much to see here. But here's some background and vision for the project:_

During 2022 and 2023, I've been working on [Qalendar](https://tomosterlund.github.io/qalendar/), a material design
inspired calendar for Vue 3. Though rewarding to
see a
tiny, yet very helpful, community grow around this project, I noticed over the year and a half of developing it, that it
had a couple of basic problems:

- It is inspired by material design 2. The current specification is version 3, and this design also looks drastically
  more modern.

* It is merely _inspired_ by, and not _compliant_ with the material design specification. This has some usability
  drawbacks, but also makes the component fit less well into applications that **actually** implement the spec.
* It is limited to Vue. Building extensions for other frameworks, would still require implementors to download Vue.
* It is only extensible to a limited amount: implementers can customize looks and some other features. However,
  extending it with new views is impossible for an implementer.

This library is an attempt to fix all the 4 above problems. So the vision of this project is:

- to create a library with scheduling components, all adhering to material design 3
- to offer these components to implementers using different web frontend frameworks
- to make the components extensible, allowing massive control for the implementer

Does this mean a complete rewrite of Qalendar? Yes, it does. But it also means that the components might be useful to a
greater number of people.
