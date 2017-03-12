var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var TransactionsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: { type: Date, default: Date.now, required: true },
  user: {
    type: ObjectId
  }
}, {
  collection: 'transactions'
})

module.exports = mongoose.model('Transactions', TransactionsSchema)
