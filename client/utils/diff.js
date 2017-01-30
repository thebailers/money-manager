import _ from 'ramda'

const diff = _.curry((key, a, b) => {
  if (a[key] < b[key]) {
    return -1
  }
  if (a[key] > b[key]) {
    return 1
  }
  return 0
})

export default diff
