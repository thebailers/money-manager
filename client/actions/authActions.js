import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt from 'jsonwebtoken'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
})

export const login = data => dispatch => axios.post('/auth/signin', data)
  .then(res => {
    const token = res.data.token
    localStorage.setItem('mm-jwtToken', token)
    setAuthToken(token)
    dispatch(setCurrentUser(jwt.decode(token)))
  })

export const logout = () => dispatch => {
  localStorage.removeItem('mm-jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
