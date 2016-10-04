import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { addExpenditure } from '../actions/actionCreators'

class ExpenditureAdd extends Component {

  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (props) {
    this.props.addExpenditure(props)
      .then(() => {
        this.context.router.push('/expenditure')
      })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { fields: { name, category, date, type, amount }, handleSubmit } = this.props

    return (
      <section>
        <h2>Add Expenditure <Link className="actionlink" to="/expenditure">Go back</Link></h2>
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

const { func, object } = React.PropTypes

ExpenditureAdd.propTypes = {
  handleSubmit: func.isRequired,
  addExpenditure: func.isRequired,
  fields: object.isRequired
}

function validate (values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please describe the expenditure.'
  }

  if (!values.category) {
    errors.category = 'Please assign a category.'
  }

  if (!values.date) {
    errors.date = 'Please enter a date for your expenditure.'
  }

  if (isNaN(parseFloat(values.date)) && isFinite(values.date)) {
    errors.date = 'The date must just be a number (for now)'
  }

  if (!values.type) {
    errors.type = 'Please enter a type for your expenditure.'
  }

  if (!values.amount) {
    errors.amount = 'What was the value of the expenditure?'
  }

  return errors
}

export default reduxForm({
  form: 'AddExpenditure',
  fields: ['name', 'category', 'date', 'type', 'amount'],
  validate
}, null, { addExpenditure })(ExpenditureAdd)
