import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import Transactions from './Transactions'
import ArchiveSnapshot from './ArchiveSnapshot'
import Total from './Total'
import sumObjectValues from '../utils/sumObjectValues'
import { filterByCurrentMonth, getMonthName } from '../utils/dates'
import { calculatePercentage } from '../utils/general'
import { formatMonetaryValue } from '../utils/currency'
import ProgressBar from './common/ProgressBar'

class Dashboard extends Component {

  componentDidMount () {
    if (this.props.isAuthenticated) {
      const end = new Date()
      const start = new Date(end.getFullYear(), end.getMonth(), 1)

      this.props.fetchTransactions(start, end)
      this.props.fetchExpenditure()
      this.props.fetchIncome()
      this.props.fetchIrregularIncome()
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { transactions, expenditure, income, incomeIrregular, incomeIrregularAll, allTransactions } = this.props

    if (!transactions || !expenditure || !income || !incomeIrregular || !allTransactions) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    // Array of all merged income
    const mergedIncome = [...income, ...incomeIrregular]

    // Array of all merged expenditure
    const mergedExpenditure = [...transactions, ...expenditure]

    // Numeric values of current cashflow values
    const transactionsTotal = sumObjectValues(transactions, 'amount')
    const expenditureTotal = sumObjectValues(expenditure, 'amount')
    const incomeTotal = sumObjectValues(mergedIncome, 'amount')
    const outgoingTotal = sumObjectValues(mergedExpenditure, 'amount')

    // Numeric value - remainder of income, less transactions & expenditure
    const remaining = (incomeTotal - expenditureTotal) - transactionsTotal

    // Returns numeric percentage representation of outgoings against income
    const percentage = calculatePercentage(outgoingTotal, incomeTotal)

    // Current date for dashboard date display
    const date = new Date()

    return (
      <section>
        <Transactions transactions={transactions} />

        <section className='cashflow-totals section-divide'>
          <h2>Cashflow for {getMonthName(date.getMonth())} {date.getFullYear()}</h2>

          <section className='expenditure-remaining'>
            <ProgressBar
              percentage={percentage}
              annotated
              limit={formatMonetaryValue(incomeTotal)}
              current={formatMonetaryValue(outgoingTotal)}
            />
          </section>

          <div className='totals'>
            <Total value={outgoingTotal} type='Expenditure' />
            <Total value={incomeTotal} type='Income' />
            <Total value={remaining} type='Remaining' />
          </div>

        </section>

        <ArchiveSnapshot
          archiveCount={5}
          transactions={allTransactions}
          income={income}
          incomeIrregular={incomeIrregularAll}
          expenditure={expenditure}
        />

      </section>
     )
  }
}
const { func, array, bool } = PropTypes

Dashboard.propTypes = {
  fetchExpenditure: func.isRequired,
  fetchIncome: func.isRequired,
  fetchIrregularIncome: func.isRequired,
  transactions: array,
  allTransactions: array,
  expenditure: array,
  income: array,
  incomeIrregular: array,
  incomeIrregularAll: array,
  fetchTransactions: func.isRequired,
  isAuthenticated: bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    allTransactions: state.transactions.all,
    transactions: state.transactions.all.filter(filterByCurrentMonth),
    expenditure: state.expenditure.all,
    income: state.income.all,
    incomeIrregularAll: state.income.allIrregular,
    incomeIrregular: state.income.allIrregular.filter(filterByCurrentMonth),
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
