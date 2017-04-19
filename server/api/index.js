var router = require('express').Router()

router.use('/transactions', require('./transactions/transactionRoutes'))
router.use('/expenditure', require('./expenditure/expenditureRoutes'))
router.use('/income', require('./income/incomeRoutes'))
router.use('/income-irregular', require('./income-irregular/incomeIrregularRoutes'))
router.use('/users', require('./user/userRoutes'))

module.exports = router
