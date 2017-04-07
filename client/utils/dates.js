import moment from 'moment'

const f = 'YYYY-MM-DD'

// d = date object
// o = desired output, eg 'MM', 'DD' for two decimal month or day
exports.getFormattedDate = (d, o) => {
  const e = moment(d, f)
  return e.format(o)
}
