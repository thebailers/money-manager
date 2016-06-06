// BASE SETUP
// =============================================================================
var Expenditure = require('./app/models/expenditure');
var Income = require('./app/models/income');

// call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cashbook');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.route('/income')
	.get(function(req, res) {
	  Income.find(function(err, income) {
	    if (err)
	      res.send(err);

	    res.json(income);
    });
  })

  .post(function(req, res) {
    
    var income = new Income();
    
    income.name = req.body.name; // set the bears name (comes fro mthe request)
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

router.route('/income/:id')
  
  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Income.findById(req.params.id, function(err, income) {
      if (err)
        res.send(err);

      res.json(income);
    });
  })

  .put(function(req, res) {

    // use our bear model to find the bear we want
    Income.findById(req.params.id, function(err, income) {
    
      if (err)
        res.send(err);

      income.name = req.body.name; 
      income.amount = req.body.amount;
		  income.category = req.body.category;
		  income.date = req.body.date;
		  income.type = req.body.type;
 
      // save the bear
      income.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Income updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Income.remove({
      _id: req.params.id
    }, function(err, income) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });



router.route('/expenditure')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    
    var expenditure = new Expenditure(); // create a new instance of the bearm odel
    expenditure.name = req.body.name; // set the bears name (comes fro mthe request)
		expenditure.amount = req.body.amount;
		expenditure.category = req.body.category;
		expenditure.date = req.body.date;
		expenditure.type = req.body.type;

    // save the bear and check for errors
    expenditure.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Expenditure created!' });
    });
  })

  .get(function(req, res) {
    Expenditure.find(function(err, expenditure) {
      if (err)
        res.send(err);

      res.json(expenditure);
    });
  });

router.route('/expenditure/:id')
  
  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Expenditure.findById(req.params.id, function(err, expenditure) {
      if (err)
        res.send(err);

      res.json(expenditure);
    });
  })

  .put(function(req, res) {

    // use our bear model to find the bear we want
    Expenditure.findById(req.params.id, function(err, expenditure) {
    
      if (err)
        res.send(err);

      expenditure.name = req.body.name;
		  expenditure.amount = req.body.amount;
		  expenditure.category = req.body.category;
		  expenditure.date = req.body.date;
		  expenditure.type = req.body.type;

   
      // save the bear
      expenditure.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'expenditure updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Expenditure.remove({
      _id: req.params.id
    }, function(err, expenditure) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
