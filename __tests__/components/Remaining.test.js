'use strict'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Remaining from '../../client/components/Remaining'

it('calculates the correct resulting value', () => {
  const incomeTotal = 2508
  const expenditureTotal = 2230.20
  const transactionsTotal = 521.20

  const component = TestUtils.renderIntoDocument(
    <Remaining
      incomeTotal={incomeTotal}
      expenditureTotal={expenditureTotal}
      transactionsTotal={transactionsTotal}
    />
  )

  const remainingValue = TestUtils.findRenderedDOMComponentWithClass(
    component,
    'value'
  )

  expect(remainingValue.textContent).toEqual('£-243.40')
})