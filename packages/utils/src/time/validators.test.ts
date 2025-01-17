import { isExpired } from './validators'

const expires = 3600 // 1 hour

const now_5_min = new Date()
now_5_min.setMinutes(now_5_min.getMinutes() - 5)

const now_1_hour = new Date()
now_1_hour.setHours(now_1_hour.getHours() - 1)

describe('test time helper', () => {
  describe('expired date', () => {
    it('should return true if date is expired', () => {
      const expired = isExpired(now_5_min, expires)

      expect(expired).toBeFalsy()
    })

    it('should return false if date is not expired', () => {
      const expired = isExpired(now_1_hour, expires)

      expect(expired).toBeTruthy()
    })
  })
})
