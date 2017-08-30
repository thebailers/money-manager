'use strict'

import React from 'react'
import { shallow } from 'enzyme'
import Transactions from '../../client/components/Transactions'

const transactions = [
  {
    "_id": "588900efdf9d3e0905a2d604",
    "amount": 4.5,
    "name": "Cashew Nuts",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0c",
    "date": "2017-05-01T00:00:00.000Z"
  },
  {
    "_id": "58890108df9d3e0905a2d605",
    "amount": 6.25,
    "name": "Monmouth Coffee",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0c",
    "date": "2017-05-25T00:00:00.000Z"
  },
  {
    "_id": "588b67fbada9d2040bee4ef4",
    "amount": 399,
    "name": "Flight to Copenhagen",
    "__v": 0,
    "user": "58c2a33cc6cd5a5d15a8fc0c",
    "date": "2017-02-27T00:00:00.000Z"
  }
]

test('The component matches the snapshot', () => {
  const wrapper = shallow(<Transactions transactions={transactions} />)
  expect(wrapper).toMatchSnapshot()
})

