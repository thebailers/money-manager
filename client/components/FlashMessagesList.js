import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlashMessage from './FlashMessage'
import { deleteFlashMessage } from '../actions/flashMessages'

class FlashMessagesList extends Component {
  render () {
    const messages = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    )
    return (
      <div>{messages}</div>
    )
  }
}

const { array, func } = PropTypes

FlashMessagesList.propTypes = {
  messages: array.isRequired,
  deleteFlashMessage: func.isRequired
}

function mapStateToProps (state) {
  return {
    messages: state.flashMessages
  }
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList)
