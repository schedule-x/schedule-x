import {
  describe,
  it,
  expect,
  afterEach,
} from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen } from '@testing-library/preact'
import {
  appSingletonWithGerman,
  appSingletonWithLocale,
} from '../../../utils/stateless/testing/create-app-singleton'
import { assertDayNames, factory } from './utils'

describe('DayNames', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render day names', () => {
    factory(appSingletonWithGerman())

    expect(screen.queryAllByTestId('day-name').length).toBe(7)
    assertDayNames(['M', 'D', 'M', 'D', 'F', 'S', 'S'])
  })

  it('should render day names in Chinese', () => {
    factory(appSingletonWithLocale('zh-CN'))

    expect(screen.queryAllByTestId('day-name').length).toBe(7)
    assertDayNames(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])
  })
})
