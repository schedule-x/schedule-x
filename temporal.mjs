import { Temporal } from 'temporal-polyfill'
const sunday = Temporal.PlainDate.from({ year: 2025, month: 7, day: 13 })
console.log(sunday.dayOfWeek)