var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ExpenditureSchema = new Schema({
  name: String,
  amount: Number,
  date: Number,
  category: String,
  type: String
}, {
  collection: 'expenditure'
})

module.exports = mongoose.model('Expenditure', ExpenditureSchema)
