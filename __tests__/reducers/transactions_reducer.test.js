import reducer from '../../client/reducers/transactions'
import * as types from '../../client/actions/actionCreators'

describe('transactions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      { all: [], transaction: {} }
    )
  })
})
