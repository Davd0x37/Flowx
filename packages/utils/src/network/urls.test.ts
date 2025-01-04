import { resolveUrl } from './urls'

const TEST_URL = 'https://localhost.local'
const TEST_URL_PATHNAME = 'testing'

describe('test network helpers', () => {
  describe('resolve url', () => {
    it('should resolve base path', () => {
      const path = resolveUrl(TEST_URL)

      expect(path.href).toMatch(TEST_URL)
    })

    it('should resolve base path with additional paths', () => {
      const path = resolveUrl(TEST_URL_PATHNAME, TEST_URL)

      expect(path.href).toEqual(`${TEST_URL}/${TEST_URL_PATHNAME}`)
    })
  })
})
