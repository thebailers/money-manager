import React, { Component } from 'react'
import classnames from 'classnames'

class FlashMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hide: false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render () {
    const { type, text } = this.props.message

    if (this.props.message) {
      setTimeout(() => {
        this.setState({ hide: true })
        setTimeout(() => {
          this.props.deleteFlashMessage(this.props.message.id)
        }, 1000)
      }, 3000)
    }

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

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

export default FlashMessage
