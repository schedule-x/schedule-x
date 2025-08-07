import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createEventsServicePlugin } from '../events-service-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'

describe('validating events when adding them', () => {
  describe('when adding valid events with .set', () => {
    it.each([
      {
        id: '1',
        start: Temporal.PlainDate.from('2021-01-01'),
        end: Temporal.PlainDate.from('2021-01-02'),
      },
      {
        id: '2',
        start: Temporal.ZonedDateTime.from('2021-01-01T00:00:00+03:00[Europe/Moscow]'),
        end: Temporal.ZonedDateTime.from('2021-01-02T00:00:00+03:00[Europe/Moscow]'),
      },
    ])(`should not throw an error`, (event) => {
      const eventsService = createEventsServicePlugin()
      const $app = __createAppWithViews__()
      eventsService.beforeRender($app)

      expect(() => eventsService.set([event])).not.toThrow()
    })
  })

  describe('when adding invalid events with .set', () => {
    it.each([
      {
        id: '1',
        start: '20210101',
        end: '20210102',
      },
      {
        id: '2',
        start: '2021-01-01 00:00:00',
        end: '2021-01-02 00:00:00',
      },
    ])(`should throw an error`, (event) => {
      const eventsService = createEventsServicePlugin()
      const $app = __createAppWithViews__()
      eventsService.beforeRender($app)

      expect(() => eventsService.set([event])).toThrow()
    })
  })

  describe('when adding valid events with .add', () => {
    it.each([
      {
        id: '1',
        start: Temporal.PlainDate.from('2021-01-01'),
        end: Temporal.PlainDate.from('2021-01-02'),
      },
      {
        id: '2',
        start: Temporal.ZonedDateTime.from('2021-01-01T00:00:00+03:00[Europe/Moscow]'),
        end: Temporal.ZonedDateTime.from('2021-01-02T00:00:00+03:00[Europe/Moscow]'),
      },
    ])(`should not throw an error`, (event) => {
      const eventsService = createEventsServicePlugin()
      const $app = __createAppWithViews__()
      eventsService.beforeRender($app)

      expect(() => eventsService.add(event)).not.toThrow()
    })
  })

  describe('when adding invalid events with .add', () => {
    it.each([
      {
        id: '1',
        start: '20210101',
        end: '20210102',
      },
      {
        id: '2',
        start: '2021-01-01 00:00:00',
        end: '2021-01-02 00:00:00',
      },
    ])(`should throw an error`, (event) => {
      const eventsService = createEventsServicePlugin()
      const $app = __createAppWithViews__()
      eventsService.beforeRender($app)

      expect(() => eventsService.add(event)).toThrow()
    })
  })

  describe('when updating a valid event', () => {
    it.each([
      {
        id: '1',
        start: Temporal.PlainDate.from('2021-01-01'),
        end: Temporal.PlainDate.from('2021-01-02'),
      },
      {
        id: '2',
        start: Temporal.ZonedDateTime.from('2021-01-01T00:00:00+03:00[Europe/Moscow]'),
        end: Temporal.ZonedDateTime.from('2021-01-02T00:00:00+03:00[Europe/Moscow]'),
      },
    ])(`should not throw an error`, (event) => {
      const eventsService = createEventsServicePlugin()
      const $app = __createAppWithViews__()
      eventsService.beforeRender($app)

      expect(() => eventsService.update(event)).not.toThrow()
    })
  })

  describe('when updating an invalid event', () => {
    it.each([
      {
        id: '1',
        start: '20210101',
        end: '20210102',
      },
      {
        id: '2',
        start: '2021-01-01 00:00:00',
        end: '2021-01-02 00:00:00',
      },
    ])(`should throw an error`, (event) => {
      const eventsService = createEventsServicePlugin()
      const $app = __createAppWithViews__()
      eventsService.beforeRender($app)

      expect(() => eventsService.update(event)).toThrow()
    })
  })
})
