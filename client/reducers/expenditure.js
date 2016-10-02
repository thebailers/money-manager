import {
  FETCH_EXPENDITURE,
  FETCH_ONE_EXPENDITURE,
  ADD_EXPENDITURE,
  EDIT_EXPENDITURE,
  DELETE_EXPENDITURE
} from '../actions/actionCreators'

const INITIAL_STATE = { all: [], expenditure: null }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ONE_EXPENDITURE:
      return { ...state, expenditure: action.payload.data }
    case FETCH_EXPENDITURE:
      return { ...state, all: action.payload.data }
    case ADD_EXPENDITURE:
      return { data: action.data }
    case EDIT_EXPENDITURE:
      return { data: action.data }
    case DELETE_EXPENDITURE:
      return { ...state }
    default:
      return state
  }
}
