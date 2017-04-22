import React, { Component } from 'react'
import { connect } from 'react-redux'
// import moment from 'moment'
// import monthNames from '../utils/monthNames'
import { filterByMonth } from '../utils/dates'
import { fetchTransactions, fetchIncome, fetchIrregularIncome } from '../actions/actionCreators'
import Transactions from './Transactions'
import IncomeData from './IncomeData'

class ArchivedData extends Component {
  componentDidMount () {
    // const { month, year } = this.props.params
    //
    // const monthToInt = monthNames.findIndex(i => month.toLowerCase() === i.toLowerCase())
    // const daysInMonth = moment(`${year}-${monthToInt}`, 'YYYY-MM').daysInMonth()

    // const start = new Date(year, monthToInt, 1)
    // const end = new Date(year, monthToInt, daysInMonth)

    // this.props.fetchTransactions(start, end)
    // this.props.fetchIncome(start, end)

    // if (this.props.income.length === 0) {
    //   this.props.fetchIncome()
    //   this.props.fetchIrregularIncome()
    // }

    this.props.fetchIncome()
    this.props.fetchIrregularIncome()

    if (this.props.transactions.length === 0) {
      this.props.fetchTransactions()
    }
  }
  render () {
    const { transactions, income, irregularIncome } = this.props
    const incomeAll = [...income, ...irregularIncome]

    if (!transactions || !incomeAll) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <section>
        <h2><span className='capitalize'>{this.props.params.month}</span> {this.props.params.year}</h2>
        <Transactions transactions={transactions} locked />

        <IncomeData income={incomeAll} locked />
      </section>
    )
  }
}

const { object, func, array } = React.PropTypes

ArchivedData.propTypes = {
  params: object.isRequired,
  fetchTransactions: func.isRequired,
  fetchIncome: func.isRequired,
  fetchIrregularIncome: func.isRequired,
  transactions: array,
  irregularIncome: array,
  income: array
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.all.filter(filterByMonth(ownProps.params.year, ownProps.params.month)),
    income: state.income.all,
    irregularIncome: state.income.allIrregular.filter(filterByMonth(ownProps.params.year, ownProps.params.month))
  }
}

export default connect(mapStateToProps, { fetchTransactions, fetchIncome, fetchIrregularIncome })(ArchivedData)
