import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const login = data => dispatch => axios.post('/auth/signin', data)
  .then(
    res => {
      const token = res.data.token
      localStorage.setItem('mm-jwtToken', token)
      setAuthToken(token)
    }
  )
