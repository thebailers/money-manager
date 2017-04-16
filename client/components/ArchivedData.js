import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import monthNames from '../utils/monthNames'
import { filterByMonth } from '../utils/dates'
import { fetchTransactions } from '../actions/actionCreators'
import Transactions from './Transactions'

class ArchivedData extends Component {
  componentDidMount () {
    const { month, year } = this.props.params

    const monthToInt = monthNames.findIndex(i => month.toLowerCase() === i.toLowerCase())
    const daysInMonth = moment(`${year}-${monthToInt}`, 'YYYY-MM').daysInMonth()

    const start = new Date(year, monthToInt, 1)
    const end = new Date(year, monthToInt, daysInMonth)

    this.props.fetchTransactions(start, end)
  }
  render () {
    const { transactions } = this.props

    if (!transactions) {
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
      </section>
    )
  }
}

const { object, func, array } = React.PropTypes

ArchivedData.propTypes = {
  params: object.isRequired,
  fetchTransactions: func.isRequired,
  transactions: array
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.all.filter(filterByMonth(ownProps.params.year, ownProps.params.month))
  }
}

export default connect(mapStateToProps, { fetchTransactions })(ArchivedData)
