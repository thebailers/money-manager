import monthNames from './monthNames'

exports.getMonthName = (m) => (monthNames[m])

// m = array of objects with dates :: return objects for the current calendar month
exports.filterByCurrentMonth = (m) => {
  const n = new Date()
  const d = new Date(m.date)
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
}

// exports.filterByMonth = (m, el) => {
//   console.log(m) // 3
//   console.log(el) // undefined
// }

exports.getMonthInt = (m) => {
  return monthNames.findIndex(item => m.toLowerCase() === item.toLowerCase())
}
