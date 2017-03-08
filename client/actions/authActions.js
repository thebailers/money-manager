import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
})

export const register = userdata => dispatch => axios.post('/api/users', userdata)
  .then(res => {
    console.log(res)
  })

export const login = data => dispatch => axios.post('/auth/signin', data)
  .then(res => {
    const token = res.data.token
    localStorage.setItem('mm-jwtToken', token)
    setAuthToken(token)
    dispatch(setCurrentUser(jwtDecode(token)))
  })

export const logout = () => dispatch => {
  localStorage.removeItem('mm-jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}
