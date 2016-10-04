import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { addIncome } from '../actions/actionCreators'

class IncomeAdd extends Component {

  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (props) {
    this.props.addIncome(props)
      .then(() => {
        this.context.router.push('/income')
      })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { fields: { name, category, date, type, amount }, handleSubmit } = this.props

    return (
      <section>
        <h2>Add Income <Link className="actionlink" to="/income">Go back</Link></h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <label>Name</label>
          <input type="text" {...name} />
          <div className="text-help">{name.touched ? name.error : ''}</div>

          <label>Category</label>
          <input type="text" {...category} />
          <div className="text-help">{category.touched ? category.error : ''}</div>

          <label>Date</label>
          <input type="string" {...date} />
          <div className="text-help">{date.touched ? date.error : ''}</div>

          <label>Type</label>
          <input type="text" {...type} />
          <div className="text-help">{type.touched ? type.error : ''}</div>

          <label>Amount</label>
          <input type="text" {...amount} />
          <div className="text-help">{amount.touched ? amount.error : ''}</div>

          <button type="submit">Add</button>

        </form>
      </section>
    )
  }
}

IncomeAdd.propTypes = {
  addIncome: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired
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

export default reduxForm({
  form: 'AddIncome',
  fields: ['name', 'category', 'date', 'type', 'amount'],
  validate
}, null, { addIncome })(IncomeAdd)
