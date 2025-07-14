import { describe, it, expect } from "../../testing/unit/unit-testing-library.impl";
import { getOffsetForTimezone } from "../get-offset-for-timezone";

function getTimezoneName(timezone: string): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short"
    });
      
    const parts = formatter.formatToParts(new Date());
    const timeZonePart = parts.find(part => part.type === "timeZoneName");

    return timeZonePart?.value ?? ''
}

describe('getOffsetForTimezone', () => {
    it('should return the offset for America/New_York', () => {
        const isEDT = getTimezoneName('America/New_York') === 'EDT'
        const offset = getOffsetForTimezone('America/New_York')
        
        if (isEDT) {
            expect(offset).toBe('-04:00')
        } else {
            expect(offset).toBe('-05:00')
        }
    })

    it('should return the offset for Europe/Berlin', () => {
        const isCEST = getTimezoneName('Europe/Berlin') === 'GMT+2'
        const offset = getOffsetForTimezone('Europe/Berlin')

        if (isCEST) {
            expect(offset).toBe('+02:00')
        } else {
            expect(offset).toBe('+01:00')
        }
    })
})