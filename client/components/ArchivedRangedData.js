import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTransactions } from '../actions/actionCreators'
import Transactions from './Transactions'
import moment from 'moment'
import { filterByRange } from '../utils/dates'

class ArchivedData extends Component {
  componentDidMount () {
    this.props.fetchTransactions()
  }
  render () {
    const { transactions } = this.props
    const friendlyDate = 'Do MMMM YYYY'

    if (!transactions) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <section>
        <h2>Results for {moment(this.props.params.start).format(friendlyDate)} to {moment(this.props.params.end).format(friendlyDate)}</h2>
        <Transactions transactions={transactions} locked />
      </section>
    )
  }
}

const { object, func, array } = PropTypes

ArchivedData.propTypes = {
  params: object.isRequired,
  fetchTransactions: func.isRequired,
  transactions: array
}

const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions.all.filter(filterByRange(ownProps.params.start, ownProps.params.end))
  }
}

export default connect(mapStateToProps, { fetchTransactions })(ArchivedData)
