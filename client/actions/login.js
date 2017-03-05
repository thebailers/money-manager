import axios from 'axios'

export const login = data => dispatch => axios.post('/auth/signin', data)
