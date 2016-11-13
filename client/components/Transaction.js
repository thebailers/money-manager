import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { deleteTransaction, fetchTransactions } from '../actions/actionCreators'
import numeral from 'numeral'
import moment from 'moment'

class Transaction extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    const id = this.props.transaction._id

    this.props.deleteTransaction(id)
      .then(() => {
        this.props.fetchTransactions()
      })
  }

  render () {
    const { transaction } = this.props

    return (
      <tr>
        <td>{transaction.name}</td>
        <td>{moment(transaction.date).format('Do MMM YYYY')}</td>
        <td>{`£${numeral(transaction.amount).format('£ 0,0[.]00')}`}</td>
        <td><Link to={`/transaction/edit/${transaction._id}`} className='button'>Edit</Link></td>
        <td><button className='button' onClick={this.handleDelete}>Delete</button></td>
      </tr>
    )
  }
}

const { func } = React.PropTypes

Transaction.propTypes = {
  transaction: React.PropTypes.object.isRequired,
  deleteTransaction: func.isRequired,
  fetchTransactions: func.isRequired
}

export default connect(null, { deleteTransaction, fetchTransactions })(Transaction)
