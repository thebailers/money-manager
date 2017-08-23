import reducer from '../../client/reducers/income'
import * as types from '../../client/actions/actionCreators'
import { INITIAL_STATE } from '../../client/reducers/income'

const income = [
  {
    "_id": "5862db33e7c717750a0803ea",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 3000,
    "name": "Paper Round",
    "__v": 0
  },
  {
    "_id": "58890053df9d3e0905a2d5ff",
    "type": "Recurring",
    "date": 5,
    "category": "Salary",
    "amount": 400,
    "name": "YouTube Unboxing Channel",
    "__v": 0
  },
  {
    "_id": "58906158530a4a6b5a64c30b",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 300,
    "name": "Dog Walking",
    "__v": 0
  }
]

describe('income reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  })

  it('should handle FETCH_INCOME', () => {
    expect(
      reducer(
        INITIAL_STATE, {
          type: types.FETCH_ONE_INCOME,
          payload: {
            data: {
              "_id": "5862db33e7c717750a0803ea",
              "type": "Recurring",
              "date": 1,
              "category": "Salary",
              "amount": 3000,
              "name": "Paper Round",
              "__v": 0
            }
          }
        }
      )
    ).toEqual(
      {
        all: [],
        allIrregular: [],
        income: {
          "_id": "5862db33e7c717750a0803ea",
          "type": "Recurring",
          "date": 1,
          "category": "Salary",
          "amount": 3000,
          "name": "Paper Round",
          "__v": 0
        }
      }
    )
  })

  it('should handle FETCH_INCOME', () => {
    expect(
      reducer(
        INITIAL_STATE, {
          type: types.FETCH_INCOME,
          payload: {
            data: [{
              "_id": "5862db33e7c717750a0803ea",
              "type": "Recurring",
              "date": 1,
              "category": "Salary",
              "amount": 3000,
              "name": "Paper Round",
              "__v": 0
            },
            {
              "_id": "58890053df9d3e0905a2d5ff",
              "type": "Recurring",
              "date": 5,
              "category": "Salary",
              "amount": 400,
              "name": "YouTube Unboxing Channel",
              "__v": 0
            },
            {
              "_id": "58906158530a4a6b5a64c30b",
              "type": "Recurring",
              "date": 1,
              "category": "Salary",
              "amount": 300,
              "name": "Dog Walking",
              "__v": 0
            }]
          }
        }
      )
    ).toEqual(
      {
        all: [
          {
            "_id": "5862db33e7c717750a0803ea",
            "type": "Recurring",
            "date": 1,
            "category": "Salary",
            "amount": 3000,
            "name": "Paper Round",
            "__v": 0
          },
          {
            "_id": "58890053df9d3e0905a2d5ff",
            "type": "Recurring",
            "date": 5,
            "category": "Salary",
            "amount": 400,
            "name": "YouTube Unboxing Channel",
            "__v": 0
          },
          {
            "_id": "58906158530a4a6b5a64c30b",
            "type": "Recurring",
            "date": 1,
            "category": "Salary",
            "amount": 300,
            "name": "Dog Walking",
            "__v": 0
          }
        ], income: {}, allIrregular: []
      }
    )
  })
})
