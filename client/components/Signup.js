import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

const { func } = PropTypes

Signup.propTypes = {
  addFlashMessage: func.isRequired
}

export default connect(null, { addFlashMessage })(Signup)
