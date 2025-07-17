
import { IANATimezone } from './tzdb';

export const getOffsetForTimezone = (timezone: IANATimezone): string => {
    const now = Temporal.Now.instant();
    const zdt = now.toZonedDateTimeISO(timezone);
    const offset = zdt.offset;

    return offset
}