import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { createEventsServicePlugin } from '../events-service-plugin.impl'
import { __createAppWithViews__ } from '@schedule-x/calendar/src/utils/stateless/testing/__create-app-with-views__'

describe('Events-service plugin', () => {
  it('should add an event', () => {
    const $app = __createAppWithViews__()
    const underTest = createEventsServicePlugin()
    underTest.beforeRender($app)

    const event = {
      id: '1',
      title: 'event 1',
      start: '2110-10-10 10:10',
      end: '2110-10-10 11:10',
    }
    underTest.add(event)

    expect($app.calendarEvents.list.value.length).toBe(1)
    expect($app.calendarEvents.list.value[0].id).toBe('1')
    expect($app.calendarEvents.list.value[0].title).toBe('event 1')
    expect($app.calendarEvents.list.value[0].start).toBe('2110-10-10 10:10')
    expect($app.calendarEvents.list.value[0].end).toBe('2110-10-10 11:10')
  })

  it('should update an event', () => {
    const $app = __createAppWithViews__()
    const underTest = createEventsServicePlugin()
    underTest.beforeRender($app)
    const event = {
      id: '1',
      title: 'event 1',
      start: '2110-10-10 10:10',
      end: '2110-10-10 11:10',
    }
    underTest.add(event)

    const updatedEvent = {
      id: '1',
      title: 'updated event 1',
      start: '2110-10-10 10:10',
      end: '2110-10-10 11:10',
    }
    underTest.update(updatedEvent)

    expect($app.calendarEvents.list.value.length).toBe(1)
    expect($app.calendarEvents.list.value[0].id).toBe('1')
    expect($app.calendarEvents.list.value[0].title).toBe('updated event 1')
    expect($app.calendarEvents.list.value[0].start).toBe('2110-10-10 10:10')
    expect($app.calendarEvents.list.value[0].end).toBe('2110-10-10 11:10')
  })

  it('should get an event', () => {
    const $app = __createAppWithViews__()
    const underTest = createEventsServicePlugin()
    underTest.beforeRender($app)
    const event = {
      id: '1',
      title: 'event 1',
      start: '2110-10-10 10:10',
      end: '2110-10-10 11:10',
      _options: {
        additionalClasses: ['class1', 'class2'],
      },
    }
    underTest.add(event)

    const result = underTest.get('1')

    expect(result?.id).toBe('1')
    expect(result?.title).toBe('event 1')
    expect(result?.start).toBe('2110-10-10 10:10')
    expect(result?.end).toBe('2110-10-10 11:10')
    expect(result?._options?.additionalClasses).toEqual(['class1', 'class2'])
  })

  it.each([['1'], [1]])(
    'should remove an event with different id types',
    (id) => {
      const $app = __createAppWithViews__()
      const underTest = createEventsServicePlugin()
      underTest.beforeRender($app)
      const event = {
        id: id,
        title: 'event 1',
        start: '2110-10-10 10:10',
        end: '2110-10-10 11:10',
      }
      underTest.add(event)

      underTest.remove(id)

      expect($app.calendarEvents.list.value.length).toBe(0)
    }
  )

  it('should get multiple events', () => {
    const $app = __createAppWithViews__()
    const underTest = createEventsServicePlugin()
    underTest.beforeRender($app)
    const event1 = {
      id: '1',
      title: 'event 1',
      start: '2110-10-10 10:10',
      end: '2110-10-10 11:10',
    }
    const event2 = {
      id: '2',
      title: 'event 2',
      start: '2110-10-10 10:10',
      end: '2110-10-10 11:10',
    }
    underTest.add(event1)
    underTest.add(event2)

    const result = underTest.getAll()

    expect(result.length).toBe(2)
    expect(result[0].id).toBe('1')
    expect(result[0].title).toBe('event 1')
    expect(result[0].start).toBe('2110-10-10 10:10')
    expect(result[0].end).toBe('2110-10-10 11:10')
    expect(result[1].id).toBe('2')
    expect(result[1].title).toBe('event 2')
    expect(result[1].start).toBe('2110-10-10 10:10')
    expect(result[1].end).toBe('2110-10-10 11:10')
  })

  it('should set the complete list of events', () => {
    const $app = __createAppWithViews__({
      events: [
        {
          id: '1',
          title: 'event 1',
          start: '2110-10-10 10:10',
          end: '2110-10-10 11:10',
        },
        {
          id: '2',
          title: 'event 2',
          start: '2110-10-10 10:10',
          end: '2110-10-10 11:10',
        },
      ],
    })
    const underTest = createEventsServicePlugin()
    underTest.beforeRender($app)
    expect($app.calendarEvents.list.value.length).toBe(2)

    const newEvents = [
      {
        id: '3',
        title: 'event 3',
        start: '2000-10-10 10:10',
        end: '2000-10-10 11:10',
      },
    ]
    underTest.set(newEvents)

    expect($app.calendarEvents.list.value.length).toBe(1)
    expect($app.calendarEvents.list.value[0].id).toBe('3')
    expect($app.calendarEvents.list.value[0].title).toBe('event 3')
    expect($app.calendarEvents.list.value[0].start).toBe('2000-10-10 10:10')
    expect($app.calendarEvents.list.value[0].end).toBe('2000-10-10 11:10')
  })
})
