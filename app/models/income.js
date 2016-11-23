var mongoose = require('mongoose')
var Schema = mongoose.Schema

var IncomeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, {
  collection: 'income'
})

module.exports = mongoose.model('Income', IncomeSchema)
