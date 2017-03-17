import reducer from '../../client/reducers/auth'
import * as types from '../../client/actions/authActions'
import { INITIAL_STATE } from '../../client/reducers/auth'

const users = [
  { _id: "58c2a33cc6cd5a5d15a8fc0c", username: 'CarlSagan', password: 'pw', firstname: 'Carl', lastname: 'Sagan' },
  { _id: "58c2a33cc6cd5a5d15a8fc0d", username: 'RichardFeynman', password: 'pw', firstname: 'Richard', lastname: 'Feynman' },
  { _id: "58c2a33cc6cd5a5d15a8fc0e", username: 'AlanWatts', password: 'pw', firstname: 'Alan', lastname: 'Watts' }
]

describe ('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  })

  it('should handle SET_CURRENT_USER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SET_CURRENT_USER,
        user: {
          _id: "58c2a33cc6cd5a5d15a8fc0c",
          username: 'CarlSagan',
          password: 'pw',
          firstname: 'Carl',
          lastname: 'Sagan'
        }
      })
    ).toEqual(
      {
        isAuthenticated: true,
        user: {
          _id: "58c2a33cc6cd5a5d15a8fc0c",
          username: 'CarlSagan',
          password: 'pw',
          firstname: 'Carl',
          lastname: 'Sagan'
        }
      }
    )
  })
})
