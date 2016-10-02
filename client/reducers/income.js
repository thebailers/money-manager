import {
  FETCH_INCOME,
  FETCH_ONE_INCOME,
  ADD_INCOME,
  EDIT_INCOME,
  DELETE_INCOME
} from '../actions/actionCreators'

const INITIAL_STATE = { all: [], income: null }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ONE_INCOME:
      return { ...state, income: action.payload.data }
    case FETCH_INCOME:
      return { ...state, all: action.payload.data }
    case ADD_INCOME:
      return { data: action.data }
    case EDIT_INCOME:
      return { data: action.data }
    case DELETE_INCOME:
      return { ...state }
    default:
      return state
  }
}
