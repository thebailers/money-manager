import React, { Component, PropTypes } from 'react'
import dates from '../utils/dates'

export default class TimePeriodSearch extends Component {
  constructor (props) {
    super(props)

    const d = new Date()
    const now = `${d.getFullYear()}-${dates.getFormattedDate(d, 'MM')}-${dates.getFormattedDate(d, 'DD')}`

    this.state = {
      start: now,
      end: now
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.context.router.push(`/archives/range/${this.state.start}/${this.state.end}`)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
          <label htmlFor='start'>Start date</label>
          <input type='date' id='start' name='start' value={this.state.start} onChange={this.handleChange} / >
        </div>
        <div className='form-row'>
          <label htmlFor='end'>End date</label>
          <input type='date' id='end' name='end' value={this.state.end} onChange={this.handleChange} / >
        </div>
        <div className='form-row'>
          <button className='button orange'>Search</button>
        </div>
      </form>
    )
  }
}
