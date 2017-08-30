import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

    const end = new Date()
    const start = new Date(end.getFullYear(), end.getMonth(), 1)

    this.props.deleteTransaction(id)
      .then(() => {
        this.props.fetchTransactions(start, end)
      })
  }

  render () {
    const { transaction } = this.props

    return (
      <tr>
        <td>{transaction.name}</td>
        <td>{moment(transaction.date).format('Do MMM YYYY')}</td>
        <td>{`£${numeral(transaction.amount).format('£ 0,0[.]00')}`}</td>
        <td>
          <Link
            to={`/transaction/edit/${transaction._id}`}
            className='button edit-icon color-lightgrey'>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            <span className='screen-reader'>Edit</span>
          </Link>
        </td>
        <td>
          <button className='button delete-icon color-lightgrey' onClick={this.handleDelete}>
            <i className="fa fa-trash" aria-hidden="true"></i>
            <span className='screen-reader'>Delete</span>
          </button>
        </td>
      </tr>
    )
  }
}

const { func, object } = PropTypes

Transaction.propTypes = {
  transaction: object.isRequired,
  deleteTransaction: func.isRequired,
  fetchTransactions: func.isRequired
}

export default connect(null, { deleteTransaction, fetchTransactions })(Transaction)
