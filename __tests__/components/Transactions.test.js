'use strict'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Transactions from '../../client/components/Transactions'
import Transaction from '../../client/components/Transaction'

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
];

const noTransactions = [];

describe('<Transactions />', () => {
  test('The component matches the snapshot', () => {
    const wrapper = shallow(<Transactions transactions={transactions} />)
    expect(wrapper).toMatchSnapshot()
  })
  
  test('Should render three <Transaction /> Components', () => {
    const wrapper = shallow(<Transactions transactions={transactions} />)
    expect(wrapper.find(Transaction)).toHaveLength(3)
  })

  test('Should correctly update the orderby state value', () => {
    const wrapper = shallow(<Transactions transactions={transactions} />)
    // @todo
  })

  test('Should correctly update the transactions order', () => {
    const wrapper = shallow(<Transactions transactions={transactions} />)
    // @todo
  })

  test('Should render a no transactions message if there are no transactions', () => {
    const wrapper = mount(<Transactions transactions={noTransactions} />)
    expect(wrapper.find('.no-transactions').exists()).toBeTruthy()
  })

  test('Should render a link to add a transaction if not locked and no transactions', () => {
    const wrapper = mount(<Transactions transactions={noTransactions} locked={false} />)
    expect(wrapper.find('.add').exists()).toBeTruthy()
  })

  test('Should not contain a link to add a transaction if locked and no transactions', () => {
    const wrapper = mount(<Transactions transactions={noTransactions} locked={true} />)
    expect(wrapper.find('.add').exists()).toBeFalsy()
  })

  test('Should render a message if there are no transactions', () => {
    const wrapper = shallow(<Transactions transactions={noTransactions} />)
    // @todo
  })
})

