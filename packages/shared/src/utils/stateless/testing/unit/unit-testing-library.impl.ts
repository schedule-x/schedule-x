import {
  describe as viDescribe,
  it as viIt,
  expect as viExpect,
  beforeEach as viBeforeEach,
  afterEach as viAfterEach,
  beforeAll as viBeforeAll,
  afterAll as viAfterAll,
  vi,
} from 'vitest'

export const describe = viDescribe
export const it = viIt
export const expect = viExpect
export const beforeEach = viBeforeEach
export const afterEach = viAfterEach
export const beforeAll = viBeforeAll
export const afterAll = viAfterAll
export const mockFn = vi.fn
export const spyOn = vi.spyOn
