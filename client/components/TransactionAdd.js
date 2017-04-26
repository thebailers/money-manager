import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addTransaction } from '../actions/actionCreators'
import { SingleDatePicker } from 'react-dates'
import classnames from 'classnames'
import moment from 'moment'
import { formatMonetaryValue } from '../utils/currency'

class TransactionAdd extends Component {

  constructor () {
    super()
    this.state = {
      name: '',
      date: moment(new Date()),
      focused: false,
      amount: '',
      errors: {},
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.outsideRange = this.outsideRange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    // validation
    let errors = {}
    if (this.state.name === '') errors.name = 'Please enter a name'
    if (this.state.date === '') errors.date = 'Please enter a date'
    if (this.state.amount === '') errors.amount = 'Please enter a value'

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { name, date, amount } = this.state
      this.setState({ loading: true })
      this.props.addTransaction({ name, date, amount })
        .then(() => {
          this.context.router.push('/')
        })
    }
  }

  handleBlur (e) {
    if (e.target.name === 'amount') {
      this.setState({ [e.target.name]: formatMonetaryValue(e.target.value) })
    }
  }

  handleChange (e) {
    if (this.state.errors[e.target.name]) {
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
    return (
      <section className={classnames({loading: this.state.loading})}>
        <h2>Add Transaction <Link className="actionlink" to="/">Go back</Link></h2>
        <form onSubmit={this.handleSubmit}>

          <div className={classnames('field', { error: !!this.state.errors.name })}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
            <span className="text-help">{this.state.errors.name}</span>
          </div>

          <div className={classnames('field', { error: !!this.state.errors.date })}>
            <label htmlFor="date">Date</label>
            <SingleDatePicker
              id="date"
              date={this.state.date}
              focused={this.state.focused}
              onDateChange={this.onDateChange}
              onFocusChange={this.onFocusChange}
              isOutsideRange={this.outsideRange}
            />
            <span className="text-help">{this.state.errors.date}</span>
          </div>

          <div className={classnames('field', { error: !!this.state.errors.amount })}>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              name="amount"
              type="text"
              value={this.state.amount}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <span className="text-help">{this.state.errors.amount}</span>
          </div>

          <button type="submit">Add</button>
        </form>
      </section>
    )
  }
}

const { func } = React.PropTypes

TransactionAdd.propTypes = {
  addTransaction: func.isRequired
}

export default connect(null, { addTransaction })(TransactionAdd)
