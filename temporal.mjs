import { Temporal } from 'temporal-polyfill'

const zdt = Temporal.ZonedDateTime.from('2025-07-11T10:00:00.000+02:00[Europe/Berlin]')

console.log(zdt.toPlainDateTime().toString())