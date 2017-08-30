import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import numeral from 'numeral'

import { fetchOneIncome, editIncome } from '../actions/actionCreators'

class IncomeEdit extends Component {

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

  componentDidMount () {
    this.props.fetchOneIncome(this.props.params.id)
  }

  componentWillReceiveProps (nextProps) {
    if (typeof nextProps.income !== 'undefined') {
      const { income } = nextProps
      this.setState({
        name: income.name,
        category: income.category,
        date: income.date,
        type: income.type,
        amount: income.amount
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    // valudation
    let errors = {}
    if (this.state.name === '') errors.name = 'Please enter a name'
    if (this.state.category === '') errors.category = 'Please enter category'
    if (this.state.date === '') errors.date = 'Please enter a date'
    if (this.state.type === '') errors.type = 'Is the expenditure one-off or recurring'
    if (this.state.amount === '') errors.amount = 'Please enter a value'

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { name, category, date, type, amount } = this.state
      this.setState({ loading: true })
      this.props.editIncome(this.props.income._id, { name, category, date, type, amount })
        .then(() => {
          this.context.router.push('/income')
        })
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

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    const { income } = this.props

    if (!income) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section>
        <h2>Income <Link className='actionlink' to='/income'>Go back</Link></h2>
        <form onSubmit={this.handleSubmit}>
          <table className='financials -transactions'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th className='actions'>&nbsp;</th>
                <th className='actions'>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{income.name}</td>
                <td>{income.category}</td>
                <td>{income.date}</td>
                <td>{income.type}</td>
                <td>{`£${numeral(income.amount).format('£ 0,0[.]00')}`}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                </td>
                <td>
                  <input type="text" id="category" name="category" value={this.state.category} onChange={this.handleChange} />
                </td>
                <td>
                  <input type="text" name="date" id="date" value={this.state.date} onChange={this.handleChange} />
                </td>
                <td>
                  <input type="text" id="type" name="type" value={this.state.type} onChange={this.handleChange} />
                </td>
                <td>
                  <input type="text" id="amount" name="amount" value={this.state.amount} onChange={this.handleChange} />
                </td>
                <td><button type='submit' className='button'>Save</button></td>
                <td><Link to='/income' className='button'>Cancel</Link></td>
              </tr>
              <tr>
                <td><div className='text-help'>{this.state.errors.name}</div></td>
                <td><div className='text-help'>{this.state.errors.category}</div></td>
                <td><div className='text-help'>{this.state.errors.date}</div></td>
                <td><div className='text-help'>{this.state.errors.type}</div></td>
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

const { func, object } = PropTypes

IncomeEdit.propTypes = {
  fetchOneIncome: func.isRequired,
  editIncome: func.isRequired,
  income: object,
  params: object.isRequired
}

function mapStateToProps (state) {
  return {
    income: state.income.income,
    initialValues: state.income.income
  }
}

export default connect(mapStateToProps, { fetchOneIncome, editIncome })(IncomeEdit)
