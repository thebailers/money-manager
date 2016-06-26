var Transaction = require('./app/models/transactions');
var Expenditure = require('./app/models/expenditure');
var Income = require('./app/models/income');

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var compiler = webpack(config);

mongoose.connect('mongodb://localhost:27017/cashbook');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.post('/api/transactions', function(req, res) {
	var transaction = new Transaction();

	transaction.name = req.body.name;
	transaction.amount = req.body.amount;
	transaction.date = req.body.date;

	transaction.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'Transaction saved!' });
	});

});

app.get('/api/transactions', function(req, res) {
	Transaction.find(function(err, transaction) {
		if (err)
			res.send(err);
		res.json(transaction);
	});
});

app.get('/api/transactions/:id', function(req, res) {
    Transaction.findById(req.params.id, function(err, transaction) {
      if (err)
        res.send(err);
      res.json(transaction);
    });
});

app.put('/api/transactions/:id', function(req, res) {

	Transaction.findById(req.params.id, function(err, transaction) {
		if (err)
			res.send(err);

			transaction.name = req.body.name;
			transaction.amount = req.body.amount;
			transaction.date = req.body.date;

			transaction.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'Transaction updated!' });
		});
	});
});


app.delete('/api/transactions/:id', function(req, res) {
	Transaction.remove({
		_id: req.params.id
	}, function(err, transaction) {
		if (err)
			res.send(err);
		res.json({ message: 'Transaction deleted!' })
	});
});

app.post('/api/expenditure', function(req, res) {
		
	var expenditure = new Expenditure(); 
		
	expenditure.name = req.body.name; 
	expenditure.amount = req.body.amount;
	expenditure.category = req.body.category;
	expenditure.date = req.body.date;
	expenditure.type = req.body.type;

	expenditure.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'Expenditure created!' });
	});
});

app.get('/api/expenditure', function(req, res) {
	Expenditure.find(function(err, expenditure) {
		if (err)
			res.send(err);
			res.json(expenditure);
		});
});

app.get('/api/expenditure/:id', function(req, res) {
		Expenditure.findById(req.params.id, function(err, expenditure) {
			if (err)
				res.send(err);
			res.json(expenditure);
		});
});

app.put('/api/expenditure/:id', function(req, res) {

	Expenditure.findById(req.params.id, function(err, expenditure) {
		if (err)
			res.send(err);

			expenditure.name = req.body.name;
			expenditure.amount = req.body.amount;
			expenditure.category = req.body.category;
			expenditure.date = req.body.date;
			expenditure.type = req.body.type;

			expenditure.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'expenditure updated!' });
		});
	});
});

app.delete('/api/expenditure/:id', function(req, res) {
	Expenditure.remove({
		_id: req.params.id
	}, function(err, expenditure) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
});

app.get('/api/income', function(req, res) {
	Income.find(function(err, income) {
		if (err)
			res.send(err);
		res.json(income);
	});
});

app.post('/api/income', function(req, res) {
		
	var income = new Income();
		
	income.name = req.body.name; 
	income.amount = req.body.amount;
	income.category = req.body.category;
	income.date = req.body.date;
	income.type = req.body.type;

	income.save(function(err) {
		
		if (err)
			res.send(err);
		res.json({ message: 'Income added!' });
	});
});

app.get('/api/income/:id', function(req, res) {
	Income.findById(req.params.id, function(err, income) {
		if (err)
			res.send(err);
		res.json(income);
	});
});

app.put('/api/income/:id', function(req, res) {
	Income.findById(req.params.id, function(err, income) {
		
		if (err)
			res.send(err);

		income.name = req.body.name; 
		income.amount = req.body.amount;
		income.category = req.body.category;
		income.date = req.body.date;
		income.type = req.body.type;
 
		income.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Income updated!' });
		});
	});
});

app.delete('/api/income/:id', function(req, res) {
	Income.remove({
		_id: req.params.id
	}, function(err, income) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, 'localhost', function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:7770');
});
