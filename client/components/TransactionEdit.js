import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchTransaction, editTransaction } from '../actions/actionCreators'
import numeral from 'numeral'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

class TransactionEdit extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      date: null,
      focused: false,
      amount: '',
      errors: {},
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.outsideRange = this.outsideRange.bind(this)
  }

  componentDidMount () {
    this.props.fetchTransaction(this.props.params.id)
  }

  componentWillReceiveProps (nextProps) {
    if (typeof nextProps.transaction !== 'undefined') {
      const { transaction } = nextProps
      this.setState({
        name: transaction.name,
        date: moment(transaction.date),
        amount: transaction.amount
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    // valudation
    let errors = {}
    if (this.state.name === '') errors.name = 'Please enter a name'
    if (this.state.date === '') errors.date = 'Please enter a date'
    if (this.state.amount === '') errors.amount = 'Please enter a value'

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { name, date, amount } = this.state
      const { editTransaction, transaction } = this.props
      this.setState({ loading: true })
      editTransaction(transaction._id, { name, date, amount }).then(
        (res) => this.context.router.push('/')
      )
    }
  }

  handleChange (e) {
    if (!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors)
      delete errors[e.target.name]
      this.setState({
        [e.target.name]: e.target.value,
        errors
      })
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  onDateChange (e) {
    this.setState({ date: moment(e._d) })
  }

  onFocusChange () {
    this.setState({ focused: !this.state.focused })
  }

  outsideRange () {
    return false
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { transaction } = this.props

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
        <form onSubmit={this.handleSubmit}>
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
                <td className="field">
                  <input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </td>
                <td className="field">
                  <SingleDatePicker
                    id="date"
                    date={this.state.date}
                    focused={this.state.focused}
                    onDateChange={this.onDateChange}
                    onFocusChange={this.onFocusChange}
                    isOutsideRange={this.outsideRange}
                  />
                </td>
                <td className="field">
                  <input id="amount" name="amount" type="text" value={this.state.amount} onChange={this.handleChange} />
                </td>
                <td><button type='submit' className='button'>Save</button></td>
                <td><Link to='/' className='button'>Cancel</Link></td>
              </tr>
              <tr>
                <td><div className='text-help'>{this.state.errors.name}</div></td>
                <td><div className='text-help'>{this.state.errors.date}</div></td>
                <td><div className='text-help'>{this.state.errors.amount}</div></td>
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
  transaction: React.PropTypes.object,
  params: React.PropTypes.object
}

function mapStateToProps (state) {
  return {
    transaction: state.transactions.transaction
  }
}

export default connect(mapStateToProps, { fetchTransaction, editTransaction })(TransactionEdit)
