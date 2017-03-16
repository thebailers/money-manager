import reducer from '../../client/reducers/transactions'
import * as types from '../../client/actions/actionCreators'
import { INITIAL_STATE } from '../../client/reducers/transactions'

const transactions = [
  {
    "_id": "588900efdf9d3e0905a2d604",
    "amount": 4.50,
    "name": "Cashew Nuts",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "58890108df9d3e0905a2d605",
    "amount": 6.25,
    "name": "Monmouth Coffee",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "588b67fbada9d2040bee4ef4",
    "amount": 399,
    "name": "Flight to Copenhagen",
    "__v": 0,
    "date": "2017-01-27T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  }
]

describe('transactions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      INITIAL_STATE
    )
  })

  it('should handle FETCH_TRANSACTIONS', () => {
    expect(
      reducer(
        INITIAL_STATE, {
          type: types.FETCH_TRANSACTION,
          payload: {
            data: {
              "_id": "58890108df9d3e0905a2d605",
              "amount": 6.25,
              "name": "Monmouth Coffee",
              "__v": 0,
              "date": "2017-01-25T00:00:00.000Z",
              "user": "58c2a33cc6cd5a5d15a8fc0c"
            }
          }
        }
      )
    ).toEqual(
      {
        all: [],
        transaction: {
          "_id": "58890108df9d3e0905a2d605",
          "amount": 6.25,
          "name": "Monmouth Coffee",
          "__v": 0,
          "date": "2017-01-25T00:00:00.000Z",
          "user": "58c2a33cc6cd5a5d15a8fc0c"
        }
      }
    )
  })
})
