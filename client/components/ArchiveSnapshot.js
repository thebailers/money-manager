import React, { Component } from 'react'

class ArchiveSnapshot extends Component {
  render () {
    return (
      <section className="archives">
        <h3>Recent Months</h3>
        <ul>
          <li>Last Month</li>
          <li>January 2017</li>
          <li>December 2016</li>
          <li>November 2016</li>
          <li>October 2016</li>
        </ul>
        <a href="#">Custom date range</a>
      </section>
    )
  }
}

export default ArchiveSnapshot
