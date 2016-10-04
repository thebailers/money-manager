import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { fetchTransaction, editTransaction } from '../actions/actionCreators'
import numeral from 'numeral'
import moment from 'moment'

class TransactionEdit extends Component {

  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount () {
    this.props.fetchTransaction(this.props.params.id)
  }

  onSubmit (props) {
    this.props.editTransaction(this.props.transaction._id, props)
      .then(() => {
        this.context.router.push('/')
      })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { fields: { name, amount, date }, handleSubmit, transaction } = this.props

    if (!transaction) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <section>
        <h2>Transaction <Link className='actionlink' to='/'>Go back</Link></h2>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <table className='financials -transactions'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th className='actions'>&nbsp;</th>
                <th className='actions'>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{transaction.name}</td>
                <td>{moment(transaction.date).format('Do MMM YYYY')}</td>
                <td>{`£${numeral(transaction.amount).format('£ 0,0[.]00')}`}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><input type='text' {...name} /></td>
                <td><input type='date' {...date} /></td>
                <td><input type='text' {...amount} /></td>
                <td><button type='submit' className='button'>Save</button></td>
                <td><Link to='/' className='button'>Cancel</Link></td>
              </tr>
              <tr>
                <td><div className='text-help'>{name.touched ? name.error : ''}</div></td>
                <td><div className='text-help'>{date.touched ? date.error : ''}</div></td>
                <td><div className='text-help'>{amount.touched ? amount.error : ''}</div></td>
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

TransactionEdit.propTypes = {
  fetchTransaction: React.PropTypes.func.isRequired,
  editTransaction: React.PropTypes.func.isRequired,
  transaction: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  params: React.PropTypes.object
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

function mapStateToProps (state) {
  return {
    transaction: state.transactions.transaction,
    initialValues: state.transactions.transaction
  }
}

export default reduxForm({
  form: 'EditTransactions',
  fields: ['name', 'date', 'amount'],
  validate
}, mapStateToProps, { fetchTransaction, editTransaction })(TransactionEdit)
