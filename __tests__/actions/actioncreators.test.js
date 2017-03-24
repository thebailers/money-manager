import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../client/actions/actionCreators'
import nock from 'nock'
import expect from 'expect'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('dispatches FETCH_TRANSACTIONS when data is returned', () => {
    nock('http://localhost:3000/')
      .get('/api/transactions')
      .reply(200, [
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
        }
      ])

    const expectedActions = [
      {
        type: actions.FETCH_TRANSACTIONS,
        payload: [
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
          }
        ]
      }
    ]

    const store = mockStore({ transactions: [] })
    console.log(actions)
    return store.dispatch(actions.fetchTransactions())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
