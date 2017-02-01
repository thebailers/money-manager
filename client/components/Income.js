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

class Income extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orderBy: 'date-desc'
    }

    this.orderBy = this.orderBy.bind(this)
  }

  componentWillMount () {
    this.props.fetchIncome()
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
