import 'temporal-polyfill/global'
import {
  describe,
  it,
  expect,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { getTemporalDuration } from '../temporal-duration'

describe('getTemporalDuration', () => {
  it('preserves sub-minute precision', () => {
    const duration = getTemporalDuration(
      Temporal.ZonedDateTime.from('2024-02-04T16:00:30+03:00[Europe/Moscow]'),
      Temporal.ZonedDateTime.from('2024-02-04T17:00:00+03:00[Europe/Moscow]')
    )

    expect(duration.total({ unit: 'seconds' })).toEqual(3570)
  })

  it('supports nanosecond level differences', () => {
    const duration = getTemporalDuration(
      Temporal.ZonedDateTime.from(
        '2024-02-04T16:00:00.000000123+03:00[Europe/Moscow]'
      ),
      Temporal.ZonedDateTime.from(
        '2024-02-04T16:00:00.000000999+03:00[Europe/Moscow]'
      )
    )

    expect(duration.total({ unit: 'nanoseconds' })).toEqual(876)
  })
})
