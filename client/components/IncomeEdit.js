import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import numeral from 'numeral'

import { fetchOneIncome, editIncome } from '../actions/actionCreators'

class IncomeEdit extends Component {

  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.props.fetchOneIncome(this.props.params.id)
  }

  onSubmit (props) {
    this.props.editIncome(this.props.income._id, props)
      .then(() => {
        this.context.router.push('/income')
      })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { fields: { name, category, date, amount, type }, handleSubmit, income } = this.props

    if (!income) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section>
        <h2>Income <Link className='actionlink' to='/income'>Go back</Link></h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <table className='financials -transactions'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th className='actions'>&nbsp;</th>
                <th className='actions'>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{income.name}</td>
                <td>{income.category}</td>
                <td>{income.date}</td>
                <td>{`£${numeral(income.amount).format('£ 0,0[.]00')}`}</td>
                <td>{income.type}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><input type='text' {...name} /></td>
                <td><input type='text' {...category} /></td>
                <td><input type='text' {...date} /></td>
                <td><input type='text' {...amount} /></td>
                <td><input type='text' {...type} /></td>
                <td><button type='submit' className='button'>Save</button></td>
                <td><Link to='/' className='button'>Cancel</Link></td>
              </tr>
              <tr>
                <td><div className='text-help'>{name.touched ? name.error : ''}</div></td>
                <td><div className='text-help'>{category.touched ? category.error : ''}</div></td>
                <td><div className='text-help'>{date.touched ? date.error : ''}</div></td>
                <td><div className='text-help'>{amount.touched ? amount.error : ''}</div></td>
                <td><div className='text-help'>{type.touched ? type.error : ''}</div></td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </form>
      </section>
    )
  }
}

const { func, object } = React.PropTypes

IncomeEdit.propTypes = {
  fetchOneIncome: func.isRequired,
  editIncome: func.isRequired,
  handleSubmit: func.isRequired,
  income: object,
  params: object.isRequired,
  fields: object.isRequired
}

function validate (values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please describe the income.'
  }

  if (!values.category) {
    errors.category = 'Please assign a category.'
  }

  if (!values.date) {
    errors.date = 'Please enter a date for your income payment.'
  }

  if (isNaN(parseFloat(values.date)) && isFinite(values.date)) {
    errors.date = 'The date must just be a number (for now)'
  }

  if (!values.type) {
    errors.type = 'Please enter a type for your income.'
  }

  if (!values.amount) {
    errors.amount = 'What was the value of the income?'
  }

  return errors
}

function mapStateToProps (state) {
  return {
    income: state.income.income,
    initialValues: state.income.income
  }
}

export default reduxForm({
  form: 'EditIncome',
  fields: ['name', 'category', 'date', 'amount', 'type'],
  validate
}, mapStateToProps, { fetchOneIncome, editIncome })(IncomeEdit)
