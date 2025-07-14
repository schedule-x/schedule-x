import { Temporal } from 'temporal-polyfill'
const now = Temporal.Now.instant();
const zdt = now.toZonedDateTimeISO('America/New_York');
const offset = zdt.offset;

console.log(offset); // e.g., "-04:00"