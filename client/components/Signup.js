import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFlashMessage } from '../actions/flashMessages'
import SignupForm from './SignupForm'

class Signup extends Component {
  render () {
    const { addFlashMessage } = this.props
    return (
      <SignupForm addFlashMessage={addFlashMessage} />
    )
  }
}

Signup.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage })(Signup)
