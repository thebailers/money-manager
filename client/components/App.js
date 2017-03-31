import React, { Component } from 'react'
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
        <article className='articlebody'>
          {this.props.children}
        </article>
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  isAuthenticated: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App)
