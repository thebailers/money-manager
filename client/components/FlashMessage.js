import React, { Component } from 'react'
import classnames from 'classnames'

class FlashMessage extends Component {
  render () {
    const { type, text } = this.props.message
    return (
      <div className={classnames('alert', {
        'success': type === 'success',
        'error': type === 'error'
      })}>
        {text}
      </div>
    )
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default FlashMessage
