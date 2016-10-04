import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { addTransaction } from '../actions/actionCreators'

class TransactionAdd extends Component {

  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (props) {
    this.props.addTransaction(props)
      .then(() => {
        this.context.router.push('/')
      })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { fields: { name, amount, date }, handleSubmit } = this.props

    return (
      <section>
        <h2>Add Transaction <Link className="actionlink" to="/">Go back</Link></h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <label>Name</label>
          <input type="text" {...name} />
          <div className="text-help">{name.touched ? name.error : ''}</div>

          <label>Date</label>
          <input type="date" {...date} />
          <div className="text-help">{date.touched ? date.error : ''}</div>

          <label>Amount</label>
          <input type="text" {...amount} />
          <div className="text-help">{amount.touched ? amount.error : ''}</div>

          <button type="submit">Add</button>
        </form>
      </section>
    )
  }
}

TransactionAdd.propTypes = {
  addTransaction: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

function validate (values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please briefly describe the transaction.'
  }

  if (!values.date) {
    errors.date = 'Please enter a date for your transaction.'
  }

  if (!values.amount) {
    errors.amount = 'What was the value of the transaction?'
  }

  return errors
}

export default reduxForm({
  form: 'AddTransaction',
  fields: ['name', 'date', 'amount'],
  validate
}, null, { addTransaction })(TransactionAdd)
