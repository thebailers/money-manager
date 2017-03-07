import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  render () {
    const { isAuthenticated, user } = this.props.auth

    const userLinks = (
      <ul className='navigation'>
        <li>Hello {user.firstname}</li>
        <li><a href='#'>Accounts</a></li>
        <li><a href='/login'>Log out</a></li>
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
  auth: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)
