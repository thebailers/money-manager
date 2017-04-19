import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addIncome, addIrregularIncome } from '../actions/actionCreators'
import classnames from 'classnames'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'

class IncomeAdd extends Component {

  constructor () {
    super()
    this.state = {
      name: '',
      category: '',
      date: '1',
      type: 'recurring',
      amount: '',
      focused: false,
      loading: false,
      recurring: true,
      oneOff: false,
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onFocusChange = this.onFocusChange.bind(this)
    this.outsideRange = this.outsideRange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    // valudation
    let errors = {}
    if (this.state.name === '') errors.name = 'Please enter a name'
    if (this.state.category === '') errors.category = 'Please enter category'
    if (this.state.day === '') errors.day = 'Please enter the day the income is paid into your account'
    if (this.state.date === '') errors.date = 'Please enter a date'
    if (this.state.type === '') errors.type = 'Is the income one-off or recurring'
    if (this.state.amount === '') errors.amount = 'Please enter a value'

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { name, category, date, type, amount } = this.state
      this.setState({ loading: true })

      let add = (this.state.type === 'recurring') ? this.props.addIncome : this.props.addIrregularIncome

      add({ name, category, date, type, amount })
        .then(() => {
          this.context.router.push('/income')
        })
    }
  }

  handleChange (e) {
    if (e.target.name === 'type') {
      if (e.target.value === 'recurring') {
        this.setState({ date: '1' })
      } else {
        this.setState({ date: moment(new Date()) })
      }
    }

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

  static contextTypes = {
    router: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
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

  renderDateFormat () {
    if (this.state.type === 'recurring') {
      return <input type="text" name="day" id="date" value={this.state.date} onChange={this.handleChange} />
    } else {
      return (
        <SingleDatePicker
          id="date"
          date={this.state.date}
          focused={this.state.focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          isOutsideRange={this.outsideRange}
        />
      )
    }
  }

  render () {
    return (
      <section>
        <h2>Add Income <Link className="actionlink" to="/income">Go back</Link></h2>
        <form onSubmit={this.handleSubmit}>
          <div className={classnames('field', { error: !!this.state.errors.name })}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.name}</div>
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" value={this.state.category} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.category}</div>
          </div>

          <div className="field">
            <label htmlFor="type">Type</label>

            <select value={this.state.type} onChange={this.handleChange} name="type">
              <option value='recurring'>Recurring</option>
              <option value='oneoff'>One-off</option>
            </select>

            <div className="text-help">{this.state.errors.type}</div>
          </div>

          <div className="field">
            <label htmlFor="date">Date</label>

            {this.renderDateFormat()}

            <div className="text-help">{this.state.errors.date}</div>
          </div>

          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.amount}</div>
          </div>

          <button type="submit">Add</button>

        </form>
      </section>
    )
  }
}

const { func } = React.PropTypes

IncomeAdd.propTypes = {
  addIncome: func.isRequired,
  addIrregularIncome: func.isRequired
}

export default connect(null, { addIncome, addIrregularIncome })(IncomeAdd)
