var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionsSchema = new Schema({
  	name: String,
	amount: Number,
	date: { type: Date, default: Date.now }
}, {
	collection: 'transactions'
});

module.exports = mongoose.model('Transactions', TransactionsSchema);
