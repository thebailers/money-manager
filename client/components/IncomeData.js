import React, { Component } from 'react'
import { Link } from 'react-router'
import IncomeItem from './IncomeItem'
import _ from 'ramda'
import diff from '../utils/diff'

class IncomeData extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orderBy: 'date-desc'
    }

    this.orderBy = this.orderBy.bind(this)
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

    // Display link to add a first transaction if allowed
    if (income.length === 0 && !this.props.locked) {
      return (
        <div className='alert error'>No income. <Link className='actionlink' to='/income/add'>Add one.</Link></div>
      )
    }

    // Show no transactions notice without add functionality if locked
    if (income.length === 0 && this.props.locked) {
      return (
        <div className='alert error'>No income for this time period.</div>
      )
    }

    return (
      <section className='income'>
        <h2>Income {(!this.props.locked) ? <Link className='actionlink' to='/income/add'>Add</Link> : ''}</h2>
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
    )
  }
}

IncomeData.propTypes = {
  income: React.PropTypes.array,
  locked: React.PropTypes.bool
}

export default IncomeData
