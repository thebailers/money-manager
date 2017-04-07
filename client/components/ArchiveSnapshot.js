import React, { Component } from 'react'
import { Link } from 'react-router'
import monthNames from '../utils/monthNames'
import TimePeriodSearch from './TimePeriodSearch'

class ArchiveSnapshot extends Component {
  constructor (props) {
    super(props)

    this.state = {
      archiveLinksReady: false,
      archives: []
    }
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
      const month = monthNames[d.getMonth()]
      const name = (i === 1 ? 'Last month' : `${month} ${year}`)

      archives.push({
        name,
        year,
        month: month.toLowerCase()
      })
    }

    this.setState({ archiveLinksReady: true, archives })
  }

  render () {
    if (!this.state.archiveLinksReady) {
      return <div>Loading...</div>
    }

    return (
      <section className="archives dashboard-archive-panel">
        <h3 className='title'>Archives</h3>
        <ul className='archive-list'>
          {this.state.archives.map((archive, i) => {
            return (
              <li key={i}><Link to={`/archives/${archive.year}/${archive.month}`}>{archive.name}</Link></li>
            )
          })}
        </ul>
        <a href="#">Custom date range</a>
        <TimePeriodSearch />
      </section>
    )
  }
}

ArchiveSnapshot.propTypes = {
  archiveCount: React.PropTypes.number.isRequired
}

export default ArchiveSnapshot
