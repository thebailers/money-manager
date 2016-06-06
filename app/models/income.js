var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncomeSchema = new Schema({
  name: String,
	amount: Number,
	date: Number,
	category: String,
	type: String
}, {
	collection: 'income'
});

module.exports = mongoose.model('Income', IncomeSchema);
