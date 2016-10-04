import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { fetchExpenditure, deleteExpenditure } from '../actions/actionCreators'

class ExpenditureItem extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    const id = this.props.expenditure._id

    this.props.deleteExpenditure(id)
      .then(() => {
        this.props.fetchExpenditure()
      })
  }

  render () {
    const { expenditure } = this.props

    return (
      <tr key={expenditure._id}>
        <td>{expenditure.name}</td>
        <td>{expenditure.category}</td>
        <td>{expenditure.date}</td>
        <td>{`£${numeral(expenditure.amount).format('£ 0,0[.]00')}`}</td>
        <td><Link to={`/expenditure/edit/${expenditure._id}`} className='button'>Edit</Link></td>
        <td><a onClick={this.handleDelete} className='button'>Delete</a></td>
      </tr>
    )
  }
}

const { object, func } = React.PropTypes

ExpenditureItem.propTypes = {
  expenditure: object,
  fetchExpenditure: func,
  deleteExpenditure: func
}

export default connect(null, { fetchExpenditure, deleteExpenditure })(ExpenditureItem)
