import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../actions/actionCreators'
import { Link } from 'react-router'
import Total from './Total'
import IncomeItem from './IncomeItem'
import sumObjectValues from '../utils/sumObjectValues'

class Income extends Component {

  componentWillMount () {
    this.props.fetchIncome()
  }

  render () {
    const { income } = this.props

    if (!income) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const incomeTotal = sumObjectValues(income, 'amount')

    return (
      <section>
        <h2>Income <Link className='actionlink' to='/income/add'>Add</Link></h2>
        <table className='financials'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Payment Date</th>
              <th className='activefilter'>Amount</th>
              <th className='actions'>&nbsp;</th>
              <th className='actions'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {income.map((income) => {
              return (
                <IncomeItem {...this.props} key={income._id} income={income} />
              )
            })}
          </tbody>
        </table>

        <section className='sumtotal'>
          <Total value={incomeTotal} type='Income' />
        </section>
      </section>
    )
  }
}

Income.propTypes = {
  income: React.PropTypes.arrayOf(React.PropTypes.object),
  fetchIncome: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  income: state.income.all
})

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Income)
