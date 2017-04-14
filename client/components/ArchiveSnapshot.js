import React, { Component } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import { getMonthName, getMonthInt } from '../utils/dates'
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
    const { transactions } = this.props

    if (!this.state.archiveLinksReady) {
      return <div>Loading...</div>
    }

    return (
      <section className="archives dashboard-archive-panel">
        <h3 className='title'>Archives</h3>
        <ul className='archive-list'>
          {this.state.archives.map((archive, i) => {
            return (
              <li key={i}>
                <Link to={`/archives/${archive.year}/${archive.month}`}>
                  {archive.name}
                </Link>
                <span>
                  T: {sumObjectValues(transactions.filter((t) => {
                    const d = new Date(t.date)
                    const n = new Date(archive.year, getMonthInt(archive.month), 1)
                    return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
                  }), 'amount')}
                  I: VALUE
                  E: VALUE
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

ArchiveSnapshot.propTypes = {
  archiveCount: React.PropTypes.number.isRequired,
  transactions: React.PropTypes.array.isRequired
}

export default ArchiveSnapshot
