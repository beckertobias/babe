import React from 'react';
import ReactDOM from 'react-dom';
import Transactions from './Transactions';
import { cleanup, render, Simulate, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as transactionUtils from '../services/TransactionService';

const mockUsers = {
  lead: 'user1',
  leadEmail: 'user1@domain.com',
  partner: 'user2',
  partnerEmail: 'user2@domain.com',
};

const mockTransaction = {
  item: 'MockBillItem',
  amount: '100',
  lender: mockUsers.partnerEmail,
  split: 50,
  addedBy: mockUsers.leadEmail,
};

jest.mock('../services/TransactionService', () => {
  return {
    postTransaction: jest.fn(transaction => Promise.resolve(transaction)),
  };
});

afterEach(cleanup);

test('renders partner username', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Transactions users={mockUsers} />, container);
  expect(container.textContent).toMatch('user2');
});

test('test', () => {
  const setIsLoading = jest.fn();
  const setTransactions = jest.fn(transaction => transaction);
  render(
    <Transactions
      users={mockUsers}
      setIsLoading={setIsLoading}
      setTransactions={setTransactions}
    />,
  );

  userEvent.type(screen.getByTestId('billItem'), 'MockBillItem');
  userEvent.type(screen.getByTestId('billAmount'), '100');
  userEvent.click(screen.getByLabelText(/I paid/i));

  userEvent.click(screen.getByText(/^split$/i));

  expect(transactionUtils.postTransaction).toHaveBeenCalledTimes(1);
  expect(transactionUtils.postTransaction).toHaveBeenCalledWith(
    expect.objectContaining({
      ...mockTransaction,
    }),
  );
});
