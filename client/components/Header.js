import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <header>
        <div className='logo'>My £oney Manager</div>
        <ul className='navigation'>
          <li><a href='#'>Accounts</a></li>
          <li><a href='/login'>Log in</a></li>
          <li><a className='signup button green' href='#'>Sign up</a></li>
        </ul>
      </header>
    )
  }
}
