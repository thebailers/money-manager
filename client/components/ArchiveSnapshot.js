import React, { Component } from 'react'
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
    const { transactions, income, expenditure } = this.props
    const currencyFormat = '£ 0,0[.]00'

    if (!this.state.archiveLinksReady) {
      return <div>Loading...</div>
    }

    return (
      <section className="archives dashboard-archive-panel">
        <h3 className='title'>Archives</h3>
        <ul className='archive-list'>
          {this.state.archives.map((archive, i) => {
            const { year, month, name } = archive
            return (
              <li key={i}>
                <Link to={`/archives/${year}/${month}`}>
                  {name}
                </Link>
                <span>
                  T: {`£${numeral(sumObjectValues(transactions.filter(filterByMonth(year, month)), 'amount')).format(currencyFormat)}`}
                  I: {`£${numeral(sumObjectValues(income, 'amount')).format(currencyFormat)}`}
                  E: {`£${numeral(sumObjectValues(expenditure, 'amount')).format(currencyFormat)}`}
                </span>
              </li>
            )
          })}
        </ul>
        <div className={classnames('custom-date-range', this.state.customFormIsVisible ? 'is-active' : '')}>
          <a onClick={this.toggleSearchForm} className='date-range-toggle' href="#">Custom date range</a>
          {(this.state.customFormIsVisible) ? <TimePeriodSearch /> : ''}
        </div>
      </section>
    )
  }
}

const { number, array } = React.PropTypes

ArchiveSnapshot.propTypes = {
  archiveCount: number.isRequired,
  transactions: array.isRequired,
  income: array.isRequired,
  expenditure: array.isRequired
}

export default ArchiveSnapshot
