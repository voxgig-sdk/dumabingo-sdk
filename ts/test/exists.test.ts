
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DumabingoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DumabingoSDK.test()
    equal(testsdk instanceof DumabingoSDK, true,
      'DumabingoSDK.test() must return a client synchronously')
  })

})
