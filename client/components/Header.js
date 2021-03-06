import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'

class Header extends Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout (e) {
    e.preventDefault()
    this.props.logout()
  }

  render () {
    const { isAuthenticated, user } = this.props.auth

    const userLinks = (
      <ul className='navigation'>
        <li>Hello {user.firstname}</li>
        <li><a href='#'>Accounts</a></li>
        <li><a href='#' onClick={this.logout}>Log out</a></li>
      </ul>
    )

    const guestLinks = (
      <ul className='navigation'>
        <li><Link to='/login'>Log in</Link></li>
        <li><Link className='signup button lightgrey' to='/register'>Sign up</Link></li>
      </ul>
    )

    return (
      <header className='container'>
        <div className='logo'>My £oney Manager</div>
        {isAuthenticated ? userLinks : guestLinks}
      </header>
    )
  }
}

const { object, func } = PropTypes

Header.propTypes = {
  auth: object.isRequired,
  logout: func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(Header)
