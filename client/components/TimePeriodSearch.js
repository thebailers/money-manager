import React, { Component } from 'react'

export default class TimePeriodSearch extends Component {
  constructor (props) {
    super(props)

    const date = new Date()
    const day = (`0${date.getDay()}`).slice(-2)
    const month = (`0${date.getMonth()}`).slice(-2)
    const now = `${date.getFullYear()}-${month}-${day}`

    this.state = {
      startDate: now,
      endDate: now
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    console.log('handled submit')
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
          <label htmlFor='start'>Start date</label>
          <input type='date' id='start' name='start' value={this.state.startDate} / >
        </div>
        <div className='form-row'>
          <label htmlFor='end'>Start date</label>
          <input type='date' id='end' name='end' value={this.state.endDate} / >
        </div>
        <div className='form-row'>
          <button className='button orange'>Search</button>
        </div>
      </form>
    )
  }
}
