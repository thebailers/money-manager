const mockData = [
  {
    '_id': '576fd7e2cdcd122d0c364cd4',
    'amount': 0.65,
    'name': 'A bottle of water',
    '__v': 0,
    'date': '2016-06-26T00:00:00.000Z'
  },
  {
    '_id': '5775722fcdcd122d0c364cd6',
    'amount': 2.99,
    'name': 'A toy for my daughter',
    '__v': 0,
    'date': '2016-06-30T00:00:00.000Z'
  },
  {
    '_id': '57757247cdcd122d0c364cd7',
    'amount': 4.5,
    'name': 'Another toy, for my son.',
    '__v': 0,
    'date': '2016-06-30T00:00:00.000Z'
  }
]

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockData))
}))

import {
  fetchTransactions
} from '../client/actions/actionCreators.js'

describe('actions', () => {
  describe('fetchTransactions', () => {
    it('should have a type of \'FETCH_TRANSACTIONS\'', () => {
      expect(fetchTransactions().type).toEqual('FETCH_TRANSACTIONS')
    })

    it('should pass on the fetched transactions', () => {
      expect(fetchTransactions(mockData).payload).toEqual(mockData)
    })
  })
})
