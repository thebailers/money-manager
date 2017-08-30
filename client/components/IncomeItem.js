import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { fetchIncome, deleteIncome } from '../actions/actionCreators'

class IncomeItem extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    const id = this.props.income._id

    this.props.deleteIncome(id)
      .then(() => {
        this.props.fetchIncome()
      })
  }

  render () {
    const { income } = this.props

    return (
      <tr key={income._id}>
        <td>{income.name}</td>
        <td>{income.category}</td>
        <td>{income.date}</td>
        <td>{`£${numeral(income.amount).format('£ 0,0[.]00')}`}</td>
        <td><Link to={`/income/edit/${income._id}`} className='button'>Edit</Link></td>
        <td><a onClick={this.handleDelete} className='button'>Delete</a></td>
      </tr>
    )
  }
}

const { object, func } = PropTypes

IncomeItem.propTypes = {
  income: object,
  fetchIncome: func,
  deleteIncome: func
}

export default connect(null, { fetchIncome, deleteIncome })(IncomeItem)
