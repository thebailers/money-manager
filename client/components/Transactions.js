import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import { Link } from 'react-router'
import Transaction from './Transaction'
import Total from './Total'
import Remaining from './Remaining'
import sumObjectValues from '../utils/sumObjectValues'
import _ from 'ramda'
import diff from '../utils/diff'
// import sortStringCaseInsensitive from '../utils/sortStringCaseInsensitive'

class Transactions extends Component {

  constructor (props) {
    super(props)

    this.state = {
      orderBy: 'name-asc'
    }

    this.orderBy = this.orderBy.bind(this)
  }

  componentWillMount () {
    this.props.fetchTransactions()
    this.props.fetchExpenditure()
    this.props.fetchIncome()
  }

  static contextTypes = {
    router: PropTypes.object
  }

  orderBy (e) {
    let key = e.target.getAttribute('data-orderby')
    const clickedSplitKey = _.split('-', key)
    const stateSplitKey = _.split('-', this.state.orderBy)

    // If the data is already ordered - reverse the ordering
    if (_.split('-', this.state.orderBy)[0] === clickedSplitKey[0]) {
      let keyVal = clickedSplitKey[0]
      key = (stateSplitKey[1] === 'asc') ? `${keyVal}-desc` : `${keyVal}-asc`
      this.setState({ orderBy: key })
      return
    }

    this.setState({ orderBy: key })
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
    const orderTransactions = (_.split('-', this.state.orderBy)[1] === 'asc') ? _.sort(diff(this.state.orderBy)) : _.reverse()

    return (
      <section>
        <h2>Transactions <Link className='actionlink' to='/transactions/add'>Add</Link></h2>
        <table className='financials -transactions'>
          <thead>
            <tr>
              <th className={(_.split('-', this.state.orderBy)[0] === 'name') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='name-asc'>Name</th>
              <th className={((_.split('-', this.state.orderBy)[0] === 'date') ? 'activefilter' : '') + ' sort-asc'} onClick={this.orderBy} data-orderby='date-desc'>Date</th>
              <th className={(_.split('-', this.state.orderBy)[0] === 'amount') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='amount-asc'>Amount</th>
              <th className='actions'>&nbsp;</th>
              <th className='actions'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {orderTransactions(transactions).map(
              (transaction, i) =>
                <Transaction {...this.props} key={i} transaction={transaction} />
            )}
          </tbody>
        </table>

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

      </section>
     )
  }
}
const { func, array } = React.PropTypes

Transactions.propTypes = {
  fetchExpenditure: func.isRequired,
  fetchIncome: func.isRequired,
  transactions: array,
  expenditure: array,
  income: array,
  fetchTransactions: func.isRequired
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.all,
    expenditure: state.expenditure.all,
    income: state.income.all
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
