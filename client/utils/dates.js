import monthNames from './monthNames'

exports.getMonthName = (m) => (monthNames[m])

// m = array of objects with dates :: return objects for the current calendar month
exports.filterByCurrentMonth = (m) => {
  const n = new Date()
  const d = new Date(m.date)
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

exports.filterByMonth = (y, m) => (t) => {
  const d = new Date(t.date)
  const n = new Date(y, exports.getMonthInt(m), 1)
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

exports.getMonthInt = (m) => {
  return monthNames.findIndex(item => m.toLowerCase() === item.toLowerCase())
}
