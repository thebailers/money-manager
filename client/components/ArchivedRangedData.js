import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTransactions } from '../actions/actionCreators'
import Transactions from './Transactions'

class ArchivedData extends Component {
  componentDidMount () {
    const start = this.props.params.start
    const end = this.props.params.end

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
        <h2>Date Range</h2>
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

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.all
  }
}

export default connect(mapStateToProps, { fetchTransactions })(ArchivedData)
