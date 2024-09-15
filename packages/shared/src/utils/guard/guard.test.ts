import { AppError } from '../error/errorUtils'
import { internalGuard, isSupported } from './index.ts'

const exampleObject = {
  key: 'value',
}

describe('Test internal guards', () => {
  it('should return boolean if functionality is supported', () => {
    const supported = isSupported('key', exampleObject)

    expect(supported).toBeTruthy()
  })

  it('should return runtime global handler if functionality is supported', () => {
    expect.assertions(3)

    try {
      const wnd = internalGuard('console')

      expect(wnd).not.toBeNull()
      expect(wnd).not.toBeUndefined()
      expect(wnd).toHaveProperty('console')
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('should throw error if functionality is not supported', () => {
    expect.assertions(1)

    try {
      const wnd = internalGuard('testFun')

      expect(wnd).not.toBeNull()
      expect(wnd).not.toBeUndefined()
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
