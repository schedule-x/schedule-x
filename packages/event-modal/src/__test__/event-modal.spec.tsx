import {
  describe,
  expect,
  it,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, render, screen } from '@testing-library/preact'
import EventModal from '../event-modal'
import { getDescriptionEl, getLocationEl, getPeopleEl, setup } from './utils'
import { beforeEach, vi } from 'vitest'

describe('EventModal', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('displaying info about the event', () => {
    it('should display event title', () => {
      const { $app, calendarEvent } = setup()
      render(<EventModal $app={$app} />)

      expect(screen.queryByText(calendarEvent.title as string)).toBeTruthy()
    })

    it('should display event time', () => {
      const { $app } = setup()
      render(<EventModal $app={$app} />)

      expect(
        screen.queryByText('October 7, 2023 – October 8, 2023' as string)
      ).toBeTruthy()
    })

    it('should not display any event location', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.location = undefined
      render(<EventModal $app={$app} />)

      expect(getLocationEl()).toBeFalsy()
    })

    it('should display event location', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.location = 'Test Location'
      render(<EventModal $app={$app} />)

      expect(getLocationEl()).toBeTruthy()
      expect(screen.queryByText(calendarEvent.location as string)).toBeTruthy()
    })

    it('should not display any people participating in the event', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.people = undefined
      render(<EventModal $app={$app} />)

      expect(getPeopleEl()).toBeFalsy()
    })

    it('should display people participating in the event', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.people = ['John Doe', 'Jane Doe']
      render(<EventModal $app={$app} />)

      expect(getPeopleEl()).toBeTruthy()
      expect(screen.queryByText('John Doe & Jane Doe' as string)).toBeTruthy()
    })

    it('should not display any event description', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.description = undefined
      render(<EventModal $app={$app} />)

      expect(getDescriptionEl()).toBeFalsy()
    })

    it('should display event description', () => {
      const { $app, calendarEvent } = setup()
      calendarEvent.description = 'Test Description'
      render(<EventModal $app={$app} />)

      expect(getDescriptionEl()).toBeTruthy()
      expect(
        screen.queryByText(calendarEvent.description as string)
      ).toBeTruthy()
    })
  })

  describe('Displaying a custom component', () => {
    it('call the customComponentFn', () => {
      const customComponentFn = vi.fn()
      const { $app } = setup(customComponentFn)
      render(<EventModal $app={$app} />)

      expect(customComponentFn).toHaveBeenCalledOnce()
    })

    it('should not display any default content', () => {
      const customComponentFn = vi.fn()
      const { $app, calendarEvent } = setup(customComponentFn)
      render(<EventModal $app={$app} />)

      expect(screen.queryByText(calendarEvent.title as string)).toBeFalsy()
      expect(
        screen.queryByText('October 7, 2023 – October 8, 2023' as string)
      ).toBeFalsy()
      expect(getLocationEl()).toBeFalsy()
      expect(getPeopleEl()).toBeFalsy()
      expect(getDescriptionEl()).toBeFalsy()
    })
  })
})
