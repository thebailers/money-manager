var User = require('../api/user/userModel')
var Transactions = require('../api/transactions/transactionsModel')
var Expenditure = require('../api/expenditure/expenditureModel')
var Income = require('../api/income/incomeModel')
var _ = require('lodash')
var logger = require('./logger')

logger.log('Seeding the Database')

var users = [
  { _id: "58c2a33cc6cd5a5d15a8fc0c", username: 'CarlSagan', password: 'pw', firstname: 'Carl', lastname: 'Sagan' },
  { _id: "58c2a33cc6cd5a5d15a8fc0d", username: 'RichardFeynman', password: 'pw', firstname: 'Richard', lastname: 'Feynman' },
  { _id: "58c2a33cc6cd5a5d15a8fc0e", username: 'AlanWatts', password: 'pw', firstname: 'Alan', lastname: 'Watts' }
]

var transactions = [
  {
    "_id": "588900efdf9d3e0905a2d604",
    "amount": 4.50,
    "name": "Cashew Nuts",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "58890108df9d3e0905a2d605",
    "amount": 6.25,
    "name": "Monmouth Coffee",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "588b67fbada9d2040bee4ef4",
    "amount": 399,
    "name": "Flight to Copenhagen",
    "__v": 0,
    "date": "2017-01-27T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "588900efdf9d3e0905a2d605",
    "amount": 4.50,
    "name": "Hazel Nuts",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0d"
  },
  {
    "_id": "58890108df9d3e0905a2d606",
    "amount": 6.25,
    "name": "Salt Beef Sandwich",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0d"
  },
  {
    "_id": "588b67fbada9d2040bee4ef7",
    "amount": 638,
    "name": "Flight to Muscat",
    "__v": 0,
    "date": "2017-01-27T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0d"
  },
  {
    "_id": "588900efdf9d3e0905a2d608",
    "amount": 4.50,
    "name": "Brazil Nuts",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0e"
  },
  {
    "_id": "58890108df9d3e0905a2d609",
    "amount": 6.25,
    "name": "Cloudy Lemonade",
    "__v": 0,
    "date": "2017-01-25T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0e"
  },
  {
    "_id": "588b67fbada9d2040bee4ef0",
    "amount": 799,
    "name": "Flight to Tokyo",
    "__v": 0,
    "date": "2017-01-27T00:00:00.000Z",
    "user": "58c2a33cc6cd5a5d15a8fc0e"
  }
]

var income = [
  {
    "_id": "5862db33e7c717750a0803ea",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 3000,
    "name": "Paper Round",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "58890053df9d3e0905a2d5ff",
    "type": "Recurring",
    "date": 5,
    "category": "Salary",
    "amount": 400,
    "name": "YouTube Unboxing Channel",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "58906158530a4a6b5a64c30b",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 300,
    "name": "Dog Walking",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0c"
  },
  {
    "_id": "5862db33e7c717750a0803e1",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 3000,
    "name": "Lemonade Stand",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0d"
  },
  {
    "_id": "58890053df9d3e0905a2d5f2",
    "type": "Recurring",
    "date": 5,
    "category": "Salary",
    "amount": 400,
    "name": "Meth Lab",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0d"
  },
  {
    "_id": "58906158530a4a6b5a64c303",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 300,
    "name": "Poker",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0d"
  },
  {
    "_id": "5862db33e7c717750a0803e4",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 3000,
    "name": "Todo App Sales",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0e"
  },
  {
    "_id": "58890053df9d3e0905a2d5f5",
    "type": "Recurring",
    "date": 5,
    "category": "Salary",
    "amount": 400,
    "name": "YouTube Gaming Channel",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0e"
  },
  {
    "_id": "58906158530a4a6b5a64c306",
    "type": "Recurring",
    "date": 1,
    "category": "Salary",
    "amount": 300,
    "name": "Ferret Walking",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0e"
  }
]

var expenditure = [
  {
    "_id": "5889006ddf9d3e0905a2d600",
    "type": "Recurring",
    "date": 1,
    "category": "Bills",
    "amount": 2000,
    "name": "Bills",
    "__v": 0
  },
  {
    "_id": "5889007edf9d3e0905a2d601",
    "type": "Recurring",
    "date": 12,
    "category": "Entertainment",
    "amount": 9.99,
    "name": "Spotify",
    "__v": 0
  },
  {
    "_id": "5889009adf9d3e0905a2d602",
    "type": "Recurring",
    "date": 23,
    "category": "Entertainment",
    "amount": 7.49,
    "name": "Netflix",
    "__v": 0
  }
]

var createDoc = function(model, doc) {
  return new Promise(function(resolve, reject) {
    new model(doc).save(function(err, saved) {
      return err ? reject(err) : resolve(saved)
    })
  })
}

var cleanDB = function() {
  logger.log('... cleaning the DB');
  var cleanPromises = [User, Transactions, Expenditure, Income]
    .map(function(model) {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
}

var createUsers = function(data) {

  var promises = users.map(function(user) {
    return createDoc(User, user);
  })

  return Promise.all(promises)
    .then(function(users) {
      return _.merge({users: users}, data || {});
    })
}

var createTransactions = function(data) {
  var promises = transactions.map(function(transaction) {
    return createDoc(Transactions, transaction);
  });

  return Promise.all(promises)
    .then(function(trasnsactions) {
      return _.merge({trasnsactions: trasnsactions}, data || {});
    });
};

var createExpenditure = function(data) {
  var promises = expenditure.map(function(expenditure) {
    return createDoc(Expenditure, expenditure);
  });

  return Promise.all(promises)
    .then(function(expenditure) {
      return _.merge({expenditure: expenditure}, data || {});
    });
};

var createIncome = function(data) {
  var promises = income.map(function(income) {
    return createDoc(Income, income);
  });

  return Promise.all(promises)
    .then(function(income) {
      return _.merge({income: income}, data || {});
    })
    .then(function() {
      return 'Seeded DB with 3 Users, 3 Transactions, Income & Expenditure';
    })
};

cleanDB()
  .then(createUsers)
  .then(createTransactions)
  .then(createExpenditure)
  .then(createIncome)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
