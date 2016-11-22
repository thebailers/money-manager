var router = require('express').Router()

router.use('/transactions', require('./transactions/transactionRoutes'))
router.use('/expenditure', require('./expenditure/expenditureRoutes'))
router.use('/income', require('./income/incomeRoutes'))

module.exports = router
