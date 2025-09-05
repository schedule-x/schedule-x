# Usage of Temporal

With v3 of the open source packages, and v13 of premium, Schedule-X moved away from its own custom, floating date- and time format. Instead it adopted the use of [Temporal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal).

Events can now have `start` and `end` properties of types `Temporal.ZonedDateTime`, or `Temporal.PlainDate`. In the resource view, there is also configuration options that use `Temporal.PlainDateTime`.

More on the background for the migration: https://github.com/schedule-x/schedule-x/issues/1130 and https://github.com/schedule-x/schedule-x/issues/1133

## Some notes on SX usage of Temporal

### Comparisons

Schedule-X compares times of events by first aligning the timezone of all timestamps to be compared, and then doing string comparisons like `event1.start.toString() < event2.start.toString()`. As long as all timestamps are in the same timezone, this will work just fine. However, it could be highly error prone, as soon as someone comes along who doesn't understand how `Temporal.ZonedDateTime` works, and hasn't yet seen how the `calendar-event.impl` class works internally to align all event timestamps to the currently used timezone.

For this reason, the project should try to move in the direction of comparing timestamps like so: `event1.start.epochNanoseconds < event2.start.epochNanoseconds`, as long as we know we're only dealing with Temporal.ZonedDateTime (in week- and day views for example). For other views, string comparisons can still make sense, depending on the context.

### Verbose use of `temporal-polyfill/global` in tests

All unit test suites currently import the temporal polyfill. This might look odd to someone who enjoys lean test code, but is done so, simply because it enables you to open a debug shell for a test file, without having to configure any global config file for each shell.

