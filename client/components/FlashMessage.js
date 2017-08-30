import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class FlashMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hide: false
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount () {
    if (this.props.message) {
      setTimeout(() => {
        this.setState({ hide: true })
        setTimeout(() => {
          this.props.deleteFlashMessage(this.props.message.id)
        }, 1000)
      }, 3000)
    }
  }

  onClick () {
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render () {
    const { type, text } = this.props.message

    return (
      <div className={classnames('alert', {
        'success': type === 'success',
        'error': type === 'error',
        'hide': this.state.hide === true
      })}>
        <button onClick={this.onClick} className='close'>&times;</button>
        {text}
      </div>
    )
  }
}

const { object, func } = PropTypes

FlashMessage.propTypes = {
  message: object.isRequired,
  deleteFlashMessage: func.isRequired
}

export default FlashMessage
