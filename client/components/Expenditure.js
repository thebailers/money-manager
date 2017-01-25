import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteExpenditure, fetchExpenditure } from '../actions/actionCreators'
import { Link } from 'react-router'
import ExpenditureItem from './ExpenditureItem'
import Total from './Total'
import sumObjectValues from '../utils/sumObjectValues'

class Expenditure extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillMount () {
    this.props.fetchExpenditure()
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

    if (!expenditure) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const expenditureTotal = sumObjectValues(expenditure, 'amount')

    return (
      <section>
        <h2>Expenditure <Link className='actionlink' to='/expenditure/add'>Add</Link></h2>
        <table className='financials'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th className='activefilter'>Amount</th>
              <th className='actions'>&nbsp;</th>
              <th className='actions'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {expenditure.map((expenditure) => {
              return (
                <ExpenditureItem {...this.props} key={expenditure._id} expenditure={expenditure} />
              )
            })}
          </tbody>
        </table>

        <section className='sumtotal'>
          <Total value={expenditureTotal} type='Expenditure' />
        </section>
      </section>
     )
  }
}

const { func, array } = React.PropTypes

Expenditure.propTypes = {
  fetchExpenditure: func.isRequired,
  deleteExpenditure: func.isRequired,
  expenditure: array,
  handleDelete: func.isRequired
}

const mapStateToProps = (state) => ({
  expenditure: state.expenditure.all
})

export default connect(mapStateToProps, { deleteExpenditure, fetchExpenditure })(Expenditure)
