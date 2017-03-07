import React, { Component } from 'react'
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
        <li><a href='/login'>Log in</a></li>
        <li><a className='signup button green' href='#'>Sign up</a></li>
      </ul>
    )

    return (
      <header>
        <div className='logo'>My £oney Manager</div>
        {isAuthenticated ? userLinks : guestLinks}
      </header>
    )
  }
}

Header.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(Header)
