import axios from 'axios'

export const login = data => dispatch => axios.post('/auth/signin', data)
  .then(
    res => {
      const token = res.data.token
      localStorage.setItem('mm-jwtToken', token)
    }
  )
