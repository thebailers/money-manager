import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import Transactions from './Transactions'
import ArchiveSnapshot from './ArchiveSnapshot'
import Total from './Total'
import Remaining from './Remaining'
import sumObjectValues from '../utils/sumObjectValues'
import { filterByCurrentMonth } from '../utils/dates'

class Dashboard extends Component {

  componentDidMount () {
    if (this.props.isAuthenticated) {
      const end = new Date()
      const start = new Date(end.getFullYear(), end.getMonth(), 1)

      this.props.fetchTransactions(start, end)
      this.props.fetchExpenditure()
      this.props.fetchIncome()
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { transactions, expenditure, income } = this.props

    if (!transactions || !expenditure || !income) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const transactionsTotal = sumObjectValues(transactions, 'amount')
    const expenditureTotal = sumObjectValues(expenditure, 'amount')
    const incomeTotal = sumObjectValues(income, 'amount')

    return (
      <section>
        <Transactions transactions={transactions} />

        <section className='sumtotal'>
          <Total value={transactionsTotal} type='Transactions' />
          <Total value={expenditureTotal} type='Expenditure' />
          <Total value={incomeTotal} type='Income' />

          <Remaining
            incomeTotal={incomeTotal}
            expenditureTotal={expenditureTotal}
            transactionsTotal={transactionsTotal}
          />

        </section>

        <ArchiveSnapshot archiveCount={5} />

      </section>
     )
  }
}
const { func, array, bool } = React.PropTypes

Dashboard.propTypes = {
  fetchExpenditure: func.isRequired,
  fetchIncome: func.isRequired,
  transactions: array,
  expenditure: array,
  income: array,
  fetchTransactions: func.isRequired,
  isAuthenticated: bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    allTransactions: state.transactions.all,
    transactions: state.transactions.all.filter(filterByCurrentMonth),
    expenditure: state.expenditure.all,
    income: state.income.all,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
