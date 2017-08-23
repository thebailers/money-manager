'use strict'

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Total from '../../client/components/Total'

it('displays the label with the correct text', () => {
  const type = 'Transactions'
  const component = TestUtils.renderIntoDocument(
    <Total value={100} type={type} />
  )
  const spanLabel = TestUtils.findRenderedDOMComponentWithClass(
    component,
    'label'
  )
  expect(spanLabel.textContent).toEqual(type)
})

it('outputs the correctly formatted value', () => {
  const component = TestUtils.renderIntoDocument(
    <Total value={100} type='Transactions' />
  )
  const spanValue = TestUtils.findRenderedDOMComponentWithClass(
    component,
    'value'
  )
  expect(spanValue.textContent).toEqual('£100')
})
