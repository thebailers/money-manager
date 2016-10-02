import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import { Link } from 'react-router'
import numeral from 'numeral'

import Total from './Total'
import sumObjectValues from '../utils/sumObjectValues'

class Income extends Component {
  componentWillMount () {
    this.props.fetchIncome()
  }

  handleDelete (id) {
    this.props.deleteIncome(id)
      .then(() => {
        this.props.fetchIncome()
      })
  }

  render () {
    const { income } = this.props

    if (!income) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const incomeTotal = sumObjectValues(income, 'amount')

    return (
      <section>
        <h2>Income <Link className='actionlink' to='/income/add'>Add</Link></h2>
        <table className='financials'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Payment Date</th>
              <th className='activefilter'>Amount</th>
              <th className='actions'>&nbsp;</th>
              <th className='actions'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.income.map((income) => {
              return (
                <tr key={income._id}>
                  <td>{income.name}</td>
                  <td>{income.category}</td>
                  <td>{income.date}</td>
                  <td>{`£${numeral(income.amount).format('£ 0,0[.]00')}`}</td>
                  <td><Link to={`/income/edit/${income._id}`} className='button'>Edit</Link></td>
                  <td><a onClick={this.handleDelete.bind(this, income._id)} className='button'>Delete</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <section className='sumtotal'>
          <Total value={incomeTotal} type='Income' />
        </section>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    income: state.income.all
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Income)
