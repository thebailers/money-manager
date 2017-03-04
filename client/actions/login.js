import axios from 'axios'

export const LOGIN = 'LOGIN'

export const login = (data) => ({
  type: LOGIN,
  payload: axios.post('/auth/signin', data)
})
