import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addExpenditure } from '../actions/actionCreators'
import classnames from 'classnames'
import { formatMonetaryValue } from '../utils/currency'

class ExpenditureAdd extends Component {

  constructor () {
    super()
    this.state = {
      name: '',
      category: '',
      date: '',
      type: '',
      amount: '',
      focused: false,
      loading: false,
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    // validation
    let errors = {}
    if (this.state.name === '') errors.name = 'Please describe the expenditure.'
    if (this.state.category === '') errors.category = 'Please assign a category.'
    if (this.state.date === '') errors.date = 'What day of the month does the payment leave your account?'
    if (this.state.type === '') errors.type = 'Is the expenditure irregular or recurring'
    if (this.state.amount === '') errors.amount = 'What is the value of this expenditure'

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { name, category, date, type, amount } = this.state
      this.setState({ loading: true })
      this.props.addExpenditure({ name, category, date, type, amount })
        .then(() => {
          this.context.router.push('/expenditure')
        })
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

  handleBlur (e) {
    if (e.target.name === 'amount') {
      this.setState({ [e.target.name]: formatMonetaryValue(e.target.value) })
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    return (
      <section>
        <h2>Add Expenditure <Link className="actionlink" to="/expenditure">Go back</Link></h2>
        <form onSubmit={this.handleSubmit}>
          <div className={classnames('field', { error: !!this.state.errors.name })}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.name}</div>
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <select value={this.state.category} name="category" onChange={this.handleChange}>
              <option value="General">General</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Gambling">Gambling</option>
              <option value="Groceries">Groceries</option>
              <option value="Clothes">Clothes</option>
              <option value="Toiletries">Toiletries</option>
              <option value="Baby">Baby</option>
              <option value="Interest">Interest/Fees</option>
              <option value="FoodBeverages">Food &amp; Beverages</option>
              <option value="Leisure">Sport &amp; Leisure</option>
              <option value="Electrical">Electrical</option>
              <option value="Pets">Pets</option>
            </select>
            <div className="text-help">{this.state.errors.category}</div>
          </div>

          <div className="field">
            <label htmlFor="date">Date</label>
            <input type="text" name="date" id="date" value={this.state.date} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.date}</div>
          </div>

          <div className="field">
            <label htmlFor="type">Type</label>
            <input type="text" id="type" name="type" value={this.state.type} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.type}</div>
          </div>

          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <div className="text-help">{this.state.errors.amount}</div>
          </div>

          <button type="submit">Add</button>

        </form>
      </section>
    )
  }
}

const { func } = React.PropTypes

ExpenditureAdd.propTypes = {
  addExpenditure: func.isRequired
}

export default connect(null, { addExpenditure })(ExpenditureAdd)
