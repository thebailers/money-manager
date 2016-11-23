var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TransactionsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: { type: Date, default: Date.now, required: true }
}, {
  collection: 'transactions'
})

module.exports = mongoose.model('Transactions', TransactionsSchema)
