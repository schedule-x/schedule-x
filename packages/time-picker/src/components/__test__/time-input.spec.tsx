import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/preact'
import TimeInput from '../time-input'
import { afterEach, vi } from 'vitest'
import { RefObject } from 'preact/compat'
import { stubInterface } from 'ts-sinon'

describe('TimeInput', () => {
  afterEach(() => {
    cleanup()
  })

  describe('when the input value is changed', () => {
    it('should call the onChange callback with the new value', () => {
      const onChangeMock = vi.fn()
      const inputRef = stubInterface<RefObject<HTMLInputElement>>()
      render(
        <TimeInput
          initialValue="12"
          onChange={onChangeMock}
          inputRef={inputRef}
          validRange={[0, 23]}
        />
      )

      fireEvent.input(document.querySelector('input')!, {
        target: { value: '17' },
      })

      expect(onChangeMock).toHaveBeenCalledWith('17')
    })
  })

  describe('rendering with a default value', () => {
    it('should render the input with the default value', () => {
      const inputRef = stubInterface<RefObject<HTMLInputElement>>()
      const { getByDisplayValue } = render(
        <TimeInput
          initialValue="12"
          onChange={vi.fn()}
          inputRef={inputRef}
          validRange={[0, 23]}
        />
      )

      expect(getByDisplayValue('12')).toBeTruthy()
    })
  })

  describe('correcting invalid values', () => {
    it.each([['-1'], ['24'], ['100'], ['a'], ['1a'], ['a1']])(
      'should correct values out of range or incorrect values to be 00',
      async (incorrectValue) => {
        const onChangeMock = vi.fn()
        const inputRef = stubInterface<RefObject<HTMLInputElement>>()
        render(
          <TimeInput
            initialValue="12"
            onChange={onChangeMock}
            inputRef={inputRef}
            validRange={[0, 23]}
          />
        )

        const htmlInputElement = document.querySelector('input')!
        fireEvent.input(htmlInputElement, {
          target: { value: incorrectValue },
        })
        htmlInputElement.focus()
        htmlInputElement.blur()

        await waitFor(() => {
          expect(onChangeMock).toHaveBeenCalledWith('00')
        })
      }
    )
  })

  describe('incrementing and decrementing the value with arrow keys', () => {
    it('should increment the value when the ArrowUp key is pressed', async () => {
      const onChangeMock = vi.fn()
      const inputRef = stubInterface<RefObject<HTMLInputElement>>()
      render(
        <TimeInput
          initialValue="12"
          onChange={onChangeMock}
          inputRef={inputRef}
          validRange={[0, 23]}
        />
      )

      const htmlInputElement = document.querySelector('input')!
      fireEvent.keyDown(htmlInputElement, { key: 'ArrowUp' })
      fireEvent.keyDown(htmlInputElement, { key: 'ArrowUp' })
      fireEvent.keyDown(htmlInputElement, { key: 'ArrowUp' })

      await waitFor(() => {
        expect(onChangeMock).toHaveBeenCalledWith('13')
        expect(onChangeMock).toHaveBeenCalledWith('14')
        expect(onChangeMock).toHaveBeenCalledWith('15')
        expect(onChangeMock).not.toHaveBeenCalledWith('16')
      })
    })
  })
})
