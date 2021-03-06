'use strict'

import sumObjectValues from '../client/utils/sumObjectValues'

const obj = [
  {
    'id': 0,
    'item': 'Tesla Model S',
    'amount': 85000
  },
  {
    'id': 1,
    'item': 'iPhone 6S',
    'amount': 600
  },
  {
    'id': 2,
    'item': 'MacBook Pro',
    'amount': 1700
  }
]

const identifier = 'amount'

describe('sumObjectValues', () => {
  it('correctly sums amount keys in an array of objects', () => {
    expect(sumObjectValues(obj, identifier)).toBe(87300)
  })
})
