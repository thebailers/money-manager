import React, { Component } from 'react'
import numeral from 'numeral'

class Total extends Component {
  render () {
    const { value, type } = this.props
    return (
      <div className='total'>
        <span className='label'>{type}</span>
        <span className='value'>{`£${numeral(value).format('£ 0,0[.]00')}`}</span>
      </div>
    )
  }
}

Total.propTypes = {
  value: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired
}

export default Total
