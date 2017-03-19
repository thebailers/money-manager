import { FETCH_TRANSACTIONS, FETCH_TRANSACTION, DELETE_TRANSACTION } from '../actions/actionCreators'

export const INITIAL_STATE = { all: [], transaction: {} }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return { ...state, transaction: action.payload.data }
    case FETCH_TRANSACTIONS:
      return { ...state, all: action.payload.data }
    case DELETE_TRANSACTION:
      return { ...state }
    default:
      return state
  }
}
