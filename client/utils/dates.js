import monthNames from './monthNames'

exports.getMonthName = (m) => (monthNames[m])

// m = array of objects with dates :: return objects for the current calendar month
exports.filterByCurrentMonth = (obj) => {
  const n = new Date()
  const d = new Date(obj.date)
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

exports.filterByMonth = (y, m) => (t) => {
  if (typeof m === 'string') {
    m = exports.getMonthInt(m)
  }

  const d = new Date(t.date)
  const n = new Date(y, m, 1)

  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

// start and end is a date format 'YYYY MM DD'
exports.filterByRange = (start, end) => (t) => {
  return t.date >= start && t.date <= end
}

exports.getMonthInt = (m) => {
  return monthNames.findIndex(item => m.toLowerCase() === item.toLowerCase())
}
