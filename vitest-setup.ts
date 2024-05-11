import { expect } from '@schedule-x/shared/src/utils/stateless/testing/unit/unit-testing-library.impl'

expect.extend({
  toHaveClass(received: Element, className: string) {
    const pass = received.classList.contains(className)
    if (pass) {
      return {
        message: () => `expected ${received} not to have class ${className}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to have class ${className}`,
        pass: false,
      }
    }
  }
})
