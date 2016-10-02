import React, { Component } from 'react'
import numeral from 'numeral'

class Remaining extends Component {
  render () {
    const { incomeTotal, expenditureTotal, transactionsTotal } = this.props
    return (
      <div className='total'>
        <span className='label'>Remaining</span>
        <span className='value'>{`£${numeral((incomeTotal - expenditureTotal) - transactionsTotal).format('£ 0,0[.]00')}`}</span>
      </div>
    )
  }
}

export default Remaining
