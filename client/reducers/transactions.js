import { FETCH_TRANSACTIONS, FETCH_TRANSACTION } from '../actions/actionCreators'

export const INITIAL_STATE = { all: [], transaction: {} }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return { ...state, transaction: action.payload.data }
    case FETCH_TRANSACTIONS:
      return { ...state, all: action.payload.data }
    default:
      return state
  }
}
