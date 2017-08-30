import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

export default class Navigation extends Component {
  render () {
    return (
      <nav>
        <ul className='subnav'>
          <li className={this.props.location.pathname === '/' ? 'active' : ''}><Link to='/'>Dashboard</Link></li>
          <li className={this.props.location.pathname === '/expenditure' ? 'active' : ''}><Link to='/expenditure'>Expenditure</Link></li>
          <li className={this.props.location.pathname === '/income' ? 'active' : ''}><Link to='/income'>Income</Link></li>
        </ul>
      </nav>
    )
  }
}

const { object } = PropTypes

Navigation.propTypes = {
  location: object
}
