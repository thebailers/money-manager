import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

const { number, string } = PropTypes

Total.propTypes = {
  value: number.isRequired,
  type: string.isRequired
}

export default Total
