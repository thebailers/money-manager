import { FETCH_INCOME, FETCH_ONE_INCOME, FETCH_IRREGULAR_INCOME } from '../actions/actionCreators'

export const INITIAL_STATE = { all: [], allIrregular: [], income: {} }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ONE_INCOME:
      return { ...state, income: action.payload.data }
    case FETCH_INCOME:
      return { ...state, all: action.payload.data }
    case FETCH_IRREGULAR_INCOME:
      return { ...state, allIrregular: action.payload.data }
    default:
      return state
  }
}
