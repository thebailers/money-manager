var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var ExpenditureSchema = new Schema({
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
  },
  user: {
    type: ObjectId
  }
}, {
  collection: 'expenditure'
})

module.exports = mongoose.model('Expenditure', ExpenditureSchema)
