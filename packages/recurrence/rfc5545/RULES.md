# RFC 5545 rules as referenced in code

The source code of this package contains references to the RFC 5545. They are all formatted as such:

```ts
/* RFC5545: #1 */
```

In such a comment, `#1` corresponds to a rule number listed below. All of these rules are
quoted as they appear in the RFC 5545.

If such a comment appears inline, it means that the rule is the reason behind
the logic of that one line of code.

For blocks of code, the rule is listed at the top of the block, and the block itself is separated from the rest of the
code by a blank line.

## #1

For cases where a "VEVENT" calendar component
specifies a "DTSTART" property with a DATE-TIME value type but no
"DTEND" property, the event ends on the same calendar date and
time of day specified by the "DTSTART" property.
