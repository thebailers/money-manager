import axios from 'axios'

export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    axios.defaults.headers.common['Authorization']
  }
}
