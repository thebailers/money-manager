import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { addIncome } from '../actions/actionCreators'
import classnames from 'classnames'

class IncomeAdd extends Component {

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
  }

  handleSubmit (e) {
    e.preventDefault()

    // valudation
    let errors = {}
    if (this.state.name === '') errors.name = 'Please enter a name'
    if (this.state.category === '') errors.category = 'Please enter category'
    if (this.state.date === '') errors.date = 'Please enter a date'
    if (this.state.type === '') errors.type = 'Is the income one-off or recurring'
    if (this.state.amount === '') errors.amount = 'Please enter a value'

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { name, category, date, type, amount } = this.state
      this.setState({ loading: true })
      this.props.addIncome({ name, category, date, type, amount })
        .then(() => {
          this.context.router.push('/income')
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

  static contextTypes = {
    router: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
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
            <input type="text" id="amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
            <div className="text-help">{this.state.errors.amount}</div>
          </div>

          <button type="submit">Add</button>

        </form>
      </section>
    )
  }
}

IncomeAdd.propTypes = {
  addIncome: React.PropTypes.func.isRequired
}

export default connect(null, { addIncome })(IncomeAdd)
