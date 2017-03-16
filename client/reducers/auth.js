import isEmpty from 'lodash/isEmpty'
import { SET_CURRENT_USER } from '../actions/authActions'

export const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, { isAuthenticated: !isEmpty(action.user), user: action.user })
    default:
      return state
  }
}
