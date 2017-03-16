import reducer from '../../client/reducers/auth'
import * as types from '../../client/actions/authActions'
import { INITIAL_STATE } from '../../client/reducers/auth'

describe ('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  })
})
