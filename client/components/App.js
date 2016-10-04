import React, { Component } from 'react'

import Header from './Header'
import Navigation from './Navigation'

export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Navigation />
        <article className='articlebody'>
          {this.props.children}
        </article>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}
