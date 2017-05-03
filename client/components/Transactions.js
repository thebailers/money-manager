import React, { Component } from 'react'
import { Link } from 'react-router'
import Transaction from './Transaction'
import _ from 'ramda'
import diff from '../utils/diff'

class Transactions extends Component {
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
    const { transactions } = this.props

    // Display link to add a first transaction if allowed
    if (transactions.length === 0 && !this.props.locked) {
      return (
        <div>
          <h1>Transactions</h1>
          <p>No transactions. <Link className='actionlink' to='/transactions/add'>Add one</Link></p>
        </div>
      )
    }

    // Show no transactions notice without add functionality if locked
    if (transactions.length === 0 && this.props.locked) {
      return (
        <div>
          <h1>Transactions</h1>
          <div className='alert error'>No transactions for this time period</div>
        </div>
      )
    }

    return (
      <section className='transactions'>
        <h2>Transactions {(!this.props.locked) ? <Link className='actionlink' to='/transactions/add'>Add</Link> : ''}</h2>
        <table className='financials -transactions'>
          <thead>
            <tr>
              <th className={`${(_.split('-', this.state.orderBy)[0] === 'name') ? 'activefilter' : ''} filterable`} onClick={this.orderBy} data-orderby='name-asc'>Name</th>
              <th className={((_.split('-', this.state.orderBy)[0] === 'date') ? 'activefilter' : '')} onClick={this.orderBy} data-orderby='date-desc'>Date</th>
              <th className={(_.split('-', this.state.orderBy)[0] === 'amount') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='amount-asc'>Amount</th>
              <th className='actions nobor'>&nbsp;</th>
              <th className='actions nobor'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.orderData(transactions).map(
              (transaction, i) =>
                <Transaction {...this.props} key={i} transaction={transaction} />
            )}
          </tbody>
        </table>
      </section>
    )
  }
}

Transactions.propTypes = {
  transactions: React.PropTypes.array,
  locked: React.PropTypes.bool
}

export default Transactions
