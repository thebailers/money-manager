import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteExpenditure, fetchExpenditure } from '../actions/actionCreators'
import { Link } from 'react-router'
import ExpenditureItem from './ExpenditureItem'
import Total from './Total'
import sumObjectValues from '../utils/sumObjectValues'
import _ from 'ramda'
import diff from '../utils/diff'

class Expenditure extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orderBy: 'date-desc'
    }

    this.orderBy = this.orderBy.bind(this)
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.fetchExpenditure()
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
    const { expenditure } = this.props

    if (!expenditure) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const expenditureTotal = sumObjectValues(expenditure, 'amount')

    return (
      <section>
        <h2>Expenditure <Link className='actionlink' to='/expenditure/add'>Add</Link></h2>
        <table className='financials'>
          <thead>
            <tr>
              <th className={(_.split('-', this.state.orderBy)[0] === 'name') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='name-asc'>Name</th>
              <th>Category</th>
              <th className={((_.split('-', this.state.orderBy)[0] === 'date') ? 'activefilter' : '')} onClick={this.orderBy} data-orderby='date-desc'>Date</th>
              <th className={(_.split('-', this.state.orderBy)[0] === 'amount') ? 'activefilter' : ''} onClick={this.orderBy} data-orderby='amount-asc'>Amount</th>
              <th className='actions nobor'>&nbsp;</th>
              <th className='actions nobor'>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.orderData(expenditure).map((expenditure) => {
              return (
                <ExpenditureItem {...this.props} key={expenditure._id} expenditure={expenditure} />
              )
            })}
          </tbody>
        </table>

        <section className='sumtotal'>
          <Total value={expenditureTotal} type='Expenditure' />
        </section>
      </section>
     )
  }
}

const { func, array, bool } = React.PropTypes

Expenditure.propTypes = {
  fetchExpenditure: func.isRequired,
  deleteExpenditure: func.isRequired,
  expenditure: array,
  isAuthenticated: bool.isRequired
}

const mapStateToProps = (state) => ({
  expenditure: state.expenditure.all,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { deleteExpenditure, fetchExpenditure })(Expenditure)
