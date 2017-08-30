import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from './Header'
import Navigation from './Navigation'
import FlashMessagesList from './FlashMessagesList'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        {(this.props.isAuthenticated ? <Navigation location={this.props.location} /> : '')}
        <FlashMessagesList />
        <article className='articlebody container'>
          {this.props.children}
        </article>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App)
