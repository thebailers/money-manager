import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import monthNames from '../utils/monthNames'
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
        <h2>Transactions for {this.props.params.month} {this.props.params.year}</h2>
        <Transactions transactions={transactions} />
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

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.all
  }
}

export default connect(mapStateToProps, { fetchTransactions })(ArchivedData)
