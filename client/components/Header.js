import React, { Component } from 'react'
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
        <li><Link className='signup button green' to='/register'>Sign up</Link></li>
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
