import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classnames from 'classnames'
import numeral from 'numeral'
import { getMonthName, filterByMonth } from '../utils/dates'
import TimePeriodSearch from './TimePeriodSearch'
import sumObjectValues from '../utils/sumObjectValues'

class ArchiveSnapshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      archiveLinksReady: false,
      archives: [],
      customFormIsVisible: false
    }

    this.toggleSearchForm = this.toggleSearchForm.bind(this)
  }

  componentDidMount () {
    this.buildArchives()
  }

  buildArchives () {
    const archives = []
    const d = new Date()

    for (var i = 1; i <= this.props.archiveCount; i++) {
      d.setMonth(d.getMonth() - 1)
      const year = d.getFullYear()
      const month = getMonthName(d.getMonth())
      const name = (i === 1 ? 'Last month' : `${month} ${year}`)

      archives.push({
        name,
        year,
        month: month.toLowerCase()
      })
    }

    this.setState({ archiveLinksReady: true, archives })
  }

  toggleSearchForm (e) {
    e.preventDefault()
    this.setState({ customFormIsVisible: !this.state.customFormIsVisible })
  }

  render () {
    const { transactions, income, incomeIrregular, expenditure } = this.props
    const currencyFormat = '£ 0,0[.]00'

    if (!this.state.archiveLinksReady) {
      return <div>Loading...</div>
    }

    return (
      <section className="archives dashboard-archive-panel">
        <h3 className='title'>Five Month Snapshot</h3>
        <p>View data from the previous 5 months income and outgoings, or select a custom date range below&hellip;</p>
        <table className='archive-list'>
          <thead>
            <tr>
              <th className='nobor'><i className='fa fa-calendar' aria-hidden='true'></i></th>
              <th className='nobor'><i className='fa fa-credit-card' aria-hidden='true'></i></th>
              <th className='nobor'><i className='fa fa-credit-card' aria-hidden='true'></i><i className='fa fa-long-arrow-left color-green icon-shift-left-10' aria-hidden='true'></i></th>
              <th className='nobor'><i className='fa fa-credit-card' aria-hidden='true'></i><i className='fa fa-long-arrow-right color-orange icon-shift-left-10' aria-hidden='true'></i></th>
            </tr>
          </thead>
          <tbody>
            {this.state.archives.map((archive, i) => {
              const { year, month, name } = archive
              const currentMonthTransactions = transactions.filter(filterByMonth(year, month))
              const allExpenditure = [...currentMonthTransactions, ...expenditure]
              const irregularIncomeByMonth = incomeIrregular.filter(filterByMonth(year, month))
              const mergedIncome = [...income, ...irregularIncomeByMonth]

              return (
                <tr className={classnames(allExpenditure < mergedIncome ? 'positive' : 'negative')} key={i}>
                  <td>
                    <Link to={`/archives/${year}/${month}`}>
                      {name}
                    </Link>
                  </td>
                  <td>{`£${numeral(sumObjectValues(currentMonthTransactions, 'amount')).format(currencyFormat)}`}</td>
                  <td>{`£${numeral(sumObjectValues(mergedIncome, 'amount')).format(currencyFormat)}`}</td>
                  <td>{`£${numeral(sumObjectValues(expenditure, 'amount')).format(currencyFormat)}`}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className={classnames('custom-date-range', this.state.customFormIsVisible ? 'is-active' : '')}>
          <a onClick={this.toggleSearchForm} className='date-range-toggle' href="#">Custom date range</a>
          {(this.state.customFormIsVisible) ? <TimePeriodSearch /> : ''}
        </div>
      </section>
    )
  }
}

const { number, array } = PropTypes

ArchiveSnapshot.propTypes = {
  archiveCount: number.isRequired,
  transactions: array.isRequired,
  income: array.isRequired,
  incomeIrregular: array,
  expenditure: array.isRequired
}

export default ArchiveSnapshot
