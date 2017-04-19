var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var IncomeIrregularSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: { type: Date, default: Date.now, required: true },
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
  collection: 'incomeirregular'
})

module.exports = mongoose.model('IncomeIrregular', IncomeIrregularSchema)
