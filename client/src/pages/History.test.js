import React from 'react';
import ReactDOM from 'react-dom';
import History from './History';
import { cleanup } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import * as transactionUtils from '../services/TransactionService';

const mockUsers = {
  lead: 'user1',
  leadEmail: 'user1@domain.com',
  partner: 'user2',
  partnerEmail: 'user2@domain.com',
};

const mockTransactions = [
  {
    _id: '1',
    item: 'MockBillItem1',
    amount: 100,
    lender: mockUsers.partnerEmail,
    split: 50,
    addedBy: mockUsers.leadEmail,
    date: '2020-10-07T13:08:28.903Z',
  },
  {
    _id: '2',
    item: 'MockBillItem2',
    amount: 200,
    lender: mockUsers.leadEmail,
    split: 50,
    addedBy: mockUsers.partnerEmail,
    date: '2020-09-07T13:08:28.903Z',
  },
];

const mockCurrency = '£';

afterEach(cleanup);

test('renders user names', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <History
      currency={mockCurrency}
      transactions={mockTransactions}
      users={mockUsers}
    />,
    container,
  );
  expect(container.textContent).toMatch(mockUsers.lead);
  expect(container.textContent).toMatch(mockUsers.partner);
});

test('renders transaction items', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <History
      currency={mockCurrency}
      transactions={mockTransactions}
      users={mockUsers}
    />,
    container,
  );
  expect(container.textContent).toMatch(mockTransactions[0].item);
  expect(container.textContent).toMatch(mockTransactions[1].item);
});

test('renders transaction amounts', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <History
      currency={mockCurrency}
      transactions={mockTransactions}
      users={mockUsers}
    />,
    container,
  );
  expect(container.textContent).toMatch(mockTransactions[0].amount.toString());
  expect(container.textContent).toMatch(mockTransactions[1].amount.toString());
});
