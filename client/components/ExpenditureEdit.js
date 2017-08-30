import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import numeral from 'numeral'
import { fetchOneExpenditure, editExpenditure } from '../actions/actionCreators'

class ExpenditureEdit extends Component {
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
    this.props.fetchOneExpenditure(this.props.params.id)
  }

  componentWillReceiveProps (nextProps) {
    if (typeof nextProps.expenditure !== 'undefined') {
      const { expenditure } = nextProps
      this.setState({
        name: expenditure.name,
        category: expenditure.category,
        date: expenditure.date,
        type: expenditure.type,
        amount: expenditure.amount
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
      this.props.editExpenditure(this.props.expenditure._id, { name, category, date, type, amount })
        .then(() => {
          this.context.router.push('/expenditure')
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
    const { expenditure } = this.props

    if (!expenditure) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <section>
        <h2>Expenditure <Link className='actionlink' to='/expenditure'>Go back</Link></h2>
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
                <td>{expenditure.name}</td>
                <td>{expenditure.category}</td>
                <td>{expenditure.date}</td>
                <td>{expenditure.type}</td>
                <td>{`£${numeral(expenditure.amount).format('£ 0,0[.]00')}`}</td>
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
                <td><Link to='/expenditure' className='button'>Cancel</Link></td>
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

ExpenditureEdit.propTypes = {
  fetchOneExpenditure: func.isRequired,
  editExpenditure: func.isRequired,
  expenditure: object,
  params: object.isRequired
}

function mapStateToProps (state) {
  return {
    expenditure: state.expenditure.expenditure
  }
}

export default connect(mapStateToProps, { fetchOneExpenditure, editExpenditure })(ExpenditureEdit)
