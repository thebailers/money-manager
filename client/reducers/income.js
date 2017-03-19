import { FETCH_INCOME, FETCH_ONE_INCOME } from '../actions/actionCreators'

export const INITIAL_STATE = { all: [], income: null }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ONE_INCOME:
      return { ...state, income: action.payload.data }
    case FETCH_INCOME:
      return { ...state, all: action.payload.data }
    default:
      return state
  }
}
