import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import TimeUnitsBuilder from '@schedule-x/shared/src/utils/stateful/time-units/time-units.builder'
import { WeekDay } from '@schedule-x/shared/src/enums/time/week-day.enum'
import { createAgendaMonth } from '../../utils/stateless/create-agenda-month'
import { cleanup, render } from '@testing-library/preact'
import MonthAgendaDayNames from '../month-agenda-day-names'
import { MonthAgendaWeek } from '../../types/month-agenda'
import CalendarAppSingleton from '@schedule-x/shared/src/interfaces/calendar/calendar-app-singleton'
import { AppContext } from '../../../../utils/stateful/app-context'
import { __createAppWithViews__ } from '../../../../utils/stateless/testing/__create-app-with-views__'

const factory = (week: MonthAgendaWeek, $app: CalendarAppSingleton) => {
  render(
    <AppContext.Provider value={$app}>
      <MonthAgendaDayNames week={week} />
    </AppContext.Provider>
  )
}

const DAY_NAME_SELECTOR = '.sx__month-agenda-day-name'

const getDayN = (n: number) => {
  return document.querySelectorAll(DAY_NAME_SELECTOR)[n]
}

describe('MonthAgendaDayNames', () => {
  afterEach(() => {
    cleanup()
  })

  describe('A week starting on Sunday', () => {
    it('should list all days in English', () => {
      const $app = __createAppWithViews__()
      const timeUnitsImpl = new TimeUnitsBuilder()
        .withFirstDayOfWeek(WeekDay.SUNDAY)
        .build()
      const agendaMonth = createAgendaMonth('2023-11-01', timeUnitsImpl)
      factory(agendaMonth.weeks[0], $app)

      expect(document.querySelectorAll(DAY_NAME_SELECTOR).length).toBe(7)
      expect(getDayN(0).textContent).toBe('S')
      expect(getDayN(1).textContent).toBe('M')
      expect(getDayN(2).textContent).toBe('T')
      expect(getDayN(3).textContent).toBe('W')
      expect(getDayN(4).textContent).toBe('T')
      expect(getDayN(5).textContent).toBe('F')
      expect(getDayN(6).textContent).toBe('S')
    })

    it('should list all days in German', () => {
      const $app = __createAppWithViews__({
        locale: 'de-DE',
      })
      const timeUnitsImpl = new TimeUnitsBuilder()
        .withFirstDayOfWeek(WeekDay.SUNDAY)
        .build()
      const agendaMonth = createAgendaMonth('2023-11-01', timeUnitsImpl)
      factory(agendaMonth.weeks[0], $app)

      expect(document.querySelectorAll(DAY_NAME_SELECTOR).length).toBe(7)
      expect(getDayN(0).textContent).toBe('S')
      expect(getDayN(1).textContent).toBe('M')
      expect(getDayN(2).textContent).toBe('D')
      expect(getDayN(3).textContent).toBe('M')
      expect(getDayN(4).textContent).toBe('D')
      expect(getDayN(5).textContent).toBe('F')
      expect(getDayN(6).textContent).toBe('S')
    })
  })

  describe('A week starting on Monday', () => {
    it('should list all days in English', () => {
      const $app = __createAppWithViews__()
      const timeUnitsImpl = new TimeUnitsBuilder()
        .withFirstDayOfWeek(WeekDay.MONDAY)
        .build()
      const agendaMonth = createAgendaMonth('2023-11-01', timeUnitsImpl)
      factory(agendaMonth.weeks[0], $app)

      expect(document.querySelectorAll(DAY_NAME_SELECTOR).length).toBe(7)
      expect(getDayN(0).textContent).toBe('M')
      expect(getDayN(1).textContent).toBe('T')
      expect(getDayN(2).textContent).toBe('W')
      expect(getDayN(3).textContent).toBe('T')
      expect(getDayN(4).textContent).toBe('F')
      expect(getDayN(5).textContent).toBe('S')
      expect(getDayN(6).textContent).toBe('S')
    })

    it('should list all days in German', () => {
      const $app = __createAppWithViews__({
        locale: 'de-DE',
      })
      const timeUnitsImpl = new TimeUnitsBuilder()
        .withFirstDayOfWeek(WeekDay.MONDAY)
        .build()
      const agendaMonth = createAgendaMonth('2023-11-01', timeUnitsImpl)
      factory(agendaMonth.weeks[0], $app)

      expect(document.querySelectorAll(DAY_NAME_SELECTOR).length).toBe(7)
      expect(getDayN(0).textContent).toBe('M')
      expect(getDayN(1).textContent).toBe('D')
      expect(getDayN(2).textContent).toBe('M')
      expect(getDayN(3).textContent).toBe('D')
      expect(getDayN(4).textContent).toBe('F')
      expect(getDayN(5).textContent).toBe('S')
      expect(getDayN(6).textContent).toBe('S')
    })
  })
})
