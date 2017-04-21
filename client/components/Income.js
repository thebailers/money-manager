import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import { Link } from 'react-router'
import Total from './Total'
import IncomeItem from './IncomeItem'
import sumObjectValues from '../utils/sumObjectValues'
import _ from 'ramda'
import diff from '../utils/diff'
import { filterByCurrentMonth } from '../utils/dates'

class Income extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orderBy: 'date-desc'
    }

    this.orderBy = this.orderBy.bind(this)
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.fetchIncome()
      this.props.fetchIrregularIncome()
    }
  }

  orderBy (e) {
    let key = e.target.getAttribute('data-orderby')
    const clickedSplitKey = _.split('-', key)
    const stateSplitKey = _.split('-', this.state.orderBy)

    // If the data is already ordered - reverse the ordering
    if (_.split('-', this.state.orderBy)[0] === clickedSplitKey[0]) {
      let keyVal = clickedSplitKey[0]
      key = (stateSplitKey[1] === 'asc') ? `${keyVal}-desc` : `${keyVal}-asc`
      this.setState({ orderBy: key })
      return
    }

    this.setState({ orderBy: key })
  }

  orderData (data) {
    // Specify how to sort based on the appended orderBy flag in this.state.orderBy
    if (_.split('-', this.state.orderBy)[1] === 'asc') {
      return _.sort(diff(_.split('-', this.state.orderBy)[0]), data)
    }

    return _.reverse(_.sort(diff(_.split('-', this.state.orderBy)[0]), data))
  }

  render () {
    const { income, incomeIrregular } = this.props

    if (!income || !incomeIrregular) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const allIncome = [...income, ...incomeIrregular]
    const allIncomeTotal = sumObjectValues(allIncome, 'amount')
    const incomeTotal = sumObjectValues(income, 'amount')
    const irregularIncomeTotal = sumObjectValues(incomeIrregular, 'amount')

    return (
      <section>
        <h2>Income <Link className='actionlink' to='/income/add'>Add</Link></h2>

        <section>
          <h3>Regular Income</h3>
          <table className='financials'>
            <thead>
              <tr>
                <th className={(_.split('-', this.state.orderBy)[0] === 'name') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='name-asc'>Name</th>
                <th>Category</th>
                <th className={((_.split('-', this.state.orderBy)[0] === 'date') ? 'activefilter' : '')} onClick={this.orderBy} data-orderby='date-desc'>Payment Date</th>
                <th className={(_.split('-', this.state.orderBy)[0] === 'amount') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='amount-asc'>Amount</th>
                <th className='actions nobor'>&nbsp;</th>
                <th className='actions nobor'>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {this.orderData(income).map((income) => {
                return (
                  <IncomeItem {...this.props} key={income._id} income={income} />
                )
              })}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Irregular Income</h3>
          <table className='financials'>
            <thead>
              <tr>
                <th className={(_.split('-', this.state.orderBy)[0] === 'name') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='name-asc'>Name</th>
                <th>Category</th>
                <th className={((_.split('-', this.state.orderBy)[0] === 'date') ? 'activefilter' : '')} onClick={this.orderBy} data-orderby='date-desc'>Payment Date</th>
                <th className={(_.split('-', this.state.orderBy)[0] === 'amount') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='amount-asc'>Amount</th>
                <th className='actions nobor'>&nbsp;</th>
                <th className='actions nobor'>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {this.orderData(incomeIrregular).map((income) => {
                return (
                  <IncomeItem {...this.props} key={income._id} income={income} />
                )
              })}
            </tbody>
          </table>
        </section>

        <section className='sumtotal'>
          <Total value={allIncomeTotal} type='All Income' />
          <Total value={incomeTotal} type='Income' />
          <Total value={irregularIncomeTotal} type='Irregular Income' />
        </section>
      </section>
    )
  }
}

const { func, arrayOf, object, bool } = React.PropTypes

Income.propTypes = {
  income: arrayOf(object),
  incomeIrregular: arrayOf(object),
  fetchIncome: func.isRequired,
  fetchIrregularIncome: func.isRequired,
  isAuthenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  income: state.income.all,
  incomeIrregular: state.income.allIrregular.filter(filterByCurrentMonth),
  isAuthenticated: state.auth.isAuthenticated
})

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Income)
